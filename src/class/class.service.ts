import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { GetCourseListParamsDto } from './dto/get-course-list-params.dto';
import { CreateCourseDto } from './dto/create-course.dto';

@Injectable()
export class ClassService {
  constructor(private prisma: PrismaService) {}

  /**
   * 获取所有班级
   * @returns
   */
  async getAllClass() {
    try {
      const classes = await this.prisma.classes.findMany({
        select: {
          class_name: true,
        },
        where: {
          state: 1,
        },
      });

      if (!classes || classes.length === 0) {
        throw new HttpException(
          '错误,请先导入学生数据',
          HttpStatus.BAD_REQUEST,
        );
      }

      return {
        class_list: classes || [],
      };
    } catch (error) {
      console.log(error, '======error');
      throw new HttpException(
        '获取班级列表失败，请稍后重试',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 创建课程
   * @param createCourseParams
   * @returns
   */
  async createCourse(createCourseParams: CreateCourseDto) {
    const { teacher_id, course_name, course_desc, course_img, class_id_list } =
      createCourseParams;

    const isExist = await this.prisma.courses.findFirst({
      where: { course_name, teacher_id: Number(teacher_id) },
    });

    if (isExist) {
      throw new HttpException(
        '课程已存在，请勿重复导入',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const course = await this.prisma.courses.create({
        data: {
          course_name,
          course_desc,
          course_img,
          teacher_id: Number(teacher_id),
        },
      });

      console.log(course, '======course');

      if (course) {
        const classIdList = (
          JSON.parse(class_id_list) as Array<{ class_name: string }>
        ).map((item: { class_name: string }) => {
          return {
            class_name: item.class_name,
            course_id: course.id,
          };
        });

        console.log(classIdList, '======classIdList');

        const chooseResult = await this.prisma.chooseCourse.createMany({
          data: classIdList,
        });

        console.log(chooseResult, '======chooseResult');

        if (chooseResult.count > 0) {
          return {
            msg: '创建课程成功',
          };
        } else {
          throw new HttpException(
            '创建课程失败，请稍后重试',
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    } catch (error) {
      console.log(error, '======error');
      throw new HttpException(
        '创建课程失败，请稍后重试',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 删除课程
   * @param deleteCourseParams
   * @returns
   */
  async deleteCourse(deleteCourseParams: { course_id: number }) {
    const { course_id } = deleteCourseParams;

    try {
      const course = await this.prisma.courses.update({
        where: { id: course_id, state: 1 },
        data: {
          state: 0,
        },
      });

      if (course) {
        return {
          msg: '删除课程成功',
        };
      } else {
        throw new HttpException(
          '删除课程失败，请稍后重试',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      console.log(error, '======error');
      throw new HttpException(
        '删除课程失败，请稍后重试',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 获取课程列表
   * @param getCourseListParams
   * @returns
   */
  async getCourseList(getCourseListParams: GetCourseListParamsDto) {
    const { teacher_id, student_id } = getCourseListParams;

    try {
      if (teacher_id) {
        // 教师获取课程列表
        const courses = await this.prisma.courses.findMany({
          where: {
            teacher_id: Number(teacher_id),
            state: 1,
          },
          select: {
            id: true,
            course_name: true,
            course_desc: true,
            course_img: true,
            ChooseCourse: {
              select: {
                class_name: true,
              },
            },
          },
          orderBy: {
            create_time: 'desc',
          },
        });

        // 转换数据返回格式
        const result = courses.map((course) => ({
          course_id: course.id,
          course_name: course.course_name,
          course_desc: course.course_desc,
          course_img_url: course.course_img,
          choose_courses: course.ChooseCourse.map((choose) => ({
            class_name: choose.class_name,
          })),
        }));

        return result;
      } else if (student_id) {
        // 学生获取课程列表 - 通过 ChooseCourse 关联查询
        const courses = await this.prisma.courses.findMany({
          where: {
            ChooseCourse: {
              some: {
                classes: {
                  Students: {
                    some: {
                      student_id: student_id,
                    },
                  },
                },
              },
            },
            state: 1,
          },
          select: {
            id: true,
            course_name: true,
            course_desc: true,
            course_img: true,
            ChooseCourse: {
              select: {
                class_name: true,
              },
            },
          },
          orderBy: {
            create_time: 'desc',
          },
        });

        // 转换数据格式
        const result = courses.map((course) => ({
          course_id: course.id,
          course_name: course.course_name,
          course_desc: course.course_desc,
          course_img_url: course.course_img,
          choose_courses: course.ChooseCourse.map((choose) => ({
            class_name: choose.class_name,
          })),
        }));

        return result;
      }

      throw new HttpException(
        '获取课程列表失败，参数错误',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      console.log(error, '======error');
      throw new HttpException(
        '获取课程列表失败，请稍后重试',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
