import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { LoginDto } from './dto/login.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { ImportStudentDataDto } from './dto/import-student-data.dto';
import { GroupMembersDto } from './dto/group-members.dto';
import { JwtService } from '@nestjs/jwt';

// 定义查询结果的类型
interface TeacherWithPassword {
  id: number;
  uid: number;
  username: string;
  phone_num: string;
  password: string;
  create_time: Date;
  update_time: Date;
  state: number;
  upass: string; // users.password 的别名
}

interface StudentWithPassword {
  uid: number;
  student_id: string;
  student_name: string;
  teacher_id: number;
  class_name: string;
  gender: number;
  password: string;
  create_time: Date;
  update_time: Date;
  state: number;
  upass: string; // users.password 的别名
}

interface Student {
  student_id: string;
  student_name: string;
  grade: string;
  major: string;
  class: string;
  class_name: string;
}

// 定义学生数据类型
interface StudentData {
  account: string;
  username: string;
  password: string;
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  /**
   * 老师注册
   * @param registerTeacher
   * @returns
   */
  async registerTeacher(registerTeacher: RegisterTeacherDto) {
    const { teacher_name, phone_num, teach_pwd } = registerTeacher;

    // 根据手机号判断是否已存在用户
    const isExist = await this.prisma.teachers.findFirst({
      where: {
        phone_num,
        state: 1,
      },
    });
    if (isExist) {
      throw new HttpException('该手机号已注册', HttpStatus.BAD_REQUEST);
    }

    // 创建用户
    const resultUser = await this.prisma.users.create({
      data: {
        account: phone_num,
        username: teacher_name,
        password: teach_pwd,
      },
    });

    if (!resultUser) {
      throw new HttpException('注册失败请重试', HttpStatus.BAD_REQUEST);
    }

    // 创建老师
    const result = await this.prisma.teachers.create({
      data: {
        uid: resultUser?.uid,
        username: teacher_name,
        password: teach_pwd,
        phone_num: phone_num,
      },
    });

    if (result) {
      return {
        token: this.jwtService.sign({
          userID: phone_num,
          uid: resultUser?.uid,
        }),
      };
    } else {
      throw new HttpException('注册失败请重试', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 老师登录
   * @param loginTeacher
   * @returns
   */
  async loginTeacher(loginTeacher: LoginDto) {
    const { phone_num, teach_pwd } = loginTeacher;

    // 使用 Prisma 的原始查询，保持原有的 SQL 逻辑
    const result = await this.prisma.$queryRaw<TeacherWithPassword[]>`
      SELECT tea.*, users.password as upass 
      FROM teachers as tea 
      LEFT JOIN users on users.uid = tea.uid
      WHERE tea.phone_num = ${phone_num} 
        AND tea.state = 1 
        AND users.state = 1 
      LIMIT 1
    `;

    const [teacher] = result;

    if (!teacher) {
      throw new HttpException(
        '该手机号未注册，请先注册',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 验证密码
    if (teacher.upass !== teach_pwd) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    // 生成 JWT token
    const token = this.jwtService.sign({
      userID: phone_num,
      uid: teacher.uid,
    });

    return {
      isTeacher: true,
      user_id: teacher.id,
      uid: teacher.uid,
      user_name: teacher.username,
      token,
    };
  }

  /**
   * 学生登录
   */
  async loginStudent(loginStudent: LoginStudentDto) {
    const { student_id, student_pwd } = loginStudent;

    // 使用 Prisma 的原始查询，保持原有的 SQL 逻辑
    const result = await this.prisma.$queryRaw<StudentWithPassword[]>`
      SELECT stu.*,users.password as upass 
      From students as stu 
      LEFT JOIN users on users.uid = stu.uid
      WHERE stu.student_id = ${student_id} and stu.state = 1 
      and users.state = 1 limit 1
    `;

    const [student] = result;

    if (!student) {
      throw new HttpException(
        '该学号未注册，请先联系老师注册',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (student.upass !== student_pwd) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    // 生成 JWT token
    const token = this.jwtService.sign({
      userID: student_id,
      uid: student.uid,
    });

    return {
      isTeacher: false,
      user_id: student.student_id,
      uid: student.uid,
      user_name: student.student_name,
      token,
    };
  }

  /**
   * 导入学生数据
   */
  async importStudentData(importStudentData: ImportStudentDataDto) {
    const { teacher_id, student_list } = importStudentData;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const studentList: Student[] = JSON.parse(student_list);
    await this.createClasses(teacher_id, studentList);

    const studentData = studentList.map((student) => ({
      account: student.student_id,
      username: student.student_name,
      password:
        student.student_id.length > 6 ? student.student_id.slice(-6) : '123456',
    }));

    const createMultipleWithReturn = async (data: StudentData[]) => {
      return await this.prisma.$transaction(
        data.map((item: StudentData) =>
          this.prisma.users.create({ data: item }),
        ),
      );
    };

    const createResult: any[] = await createMultipleWithReturn(studentData);
    if (!createResult.length) {
      throw new HttpException('导入失败请重试', HttpStatus.BAD_REQUEST);
    }

    const accountToUidMap: Map<string, number> = new Map();
    createResult.forEach((item: { account: string; uid: number }) => {
      accountToUidMap.set(item.account, item.uid);
    });

    const studentListData = studentList.map((student) => {
      const uid = accountToUidMap.get(student.student_id);
      if (!uid) {
        throw new HttpException(
          `未找到学生 ${student.student_id} 对应的用户ID`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        student_id: student.student_id,
        student_name: student.student_name,
        uid,
        class_name: student.class_name,
        teacher_id: parseInt(teacher_id),
        password:
          student.student_id.length > 6
            ? student.student_id.slice(-6)
            : '123456',
      };
    });

    const result = await this.prisma.students.createMany({
      data: studentListData,
      skipDuplicates: true,
    });

    if (result.count > 0) {
      return {
        msg: `导入成功`,
      };
    } else {
      throw new HttpException('导入失败请重试', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 根据导入的学生数据创建班级
   */
  async createClasses(teacherId: string, studentList: Student[]) {
    const classMap = new Map();
    const classes: Student[] = [];
    studentList.forEach((item: Student) => {
      if (!classMap.has(item.class_name)) {
        classes.push(item);
        classMap.set(item.class_name, item);
      }
    });

    const classData = classes.map((classItem) => ({
      class_name: classItem.class_name,
      grade: classItem.grade,
      major: classItem.major,
      class: classItem.class,
      teacher_id: parseInt(teacherId),
    }));

    const result = await this.prisma.classes.createMany({
      data: classData,
      skipDuplicates: true,
    });

    if (result.count > 0) {
      return {
        msg: `成功创建 ${result.count} 个新班级`,
      };
    } else {
      return {
        msg: '所有班级已存在，无需创建',
      };
    }
  }

  /**
   * 获取热门作品
   */
  async getHotWorkList(pageNo: number, pageSize: number) {
    try {
      // 使用 Prisma 的原始查询，保持原有的 SQL 逻辑
      const result = await this.prisma.$queryRaw`
          SELECT works.*,grps.task_id,grps.group_name,grps.group_leader,tasks.task_type,
          (SELECT count(comments.id)  from comments WHERE comments.work_id = works.id) as comment_count,
          works.like_count + works.pageviews as hot_sum
          from works
          LEFT JOIN groups_student as grps on grps.work_id = works.id
          LEFT JOIN tasks on tasks.task_id = grps.task_id 
          where tasks.state = 1 and works.state = 1 and grps.state = 1
          ORDER BY hot_sum desc
          LIMIT ${pageNo * pageSize},${pageSize}
        `;
      return result;
    } catch (error) {
      console.log(error, '======error');
      throw new HttpException(
        '获取热门作品失败，请稍后重试',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 获取小组成员
   */
  async getGroupMembers(getGroupMembers: GroupMembersDto) {
    try {
      const { task_id, leader_id } = getGroupMembers;

      // 使用 Prisma 的原始查询，保持原有的 SQL 逻辑
      const result = await this.prisma.$queryRaw`
          SELECT grpm.*,users.username as student_name,students.uid from group_members as grpm 
          LEFT JOIN students on students.student_id = grpm.student_id
          LEFT JOIN users on students.uid = users.uid
          where grpm.task_id = ${task_id} and 
          grpm.leader_id = ${leader_id}
          and grpm.state = 1 and students.state = 1 and users.state = 1
      `;
      return result;
    } catch (error) {
      console.log(error, '======error');
      throw new HttpException(
        '获取小组成员失败，请稍后重试',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
