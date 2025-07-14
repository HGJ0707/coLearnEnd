import {
  Controller,
  Post,
  Body,
  Query,
  DefaultValuePipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterTeacherDto } from './dto/register-teacher.dto';
import { LoginDto } from './dto/login.dto';
import { LoginStudentDto } from './dto/login-student.dto';
import { ImportStudentDataDto } from './dto/import-student-data.dto';
import { GroupMembersDto } from './dto/group-members.dto';
import { generateParseIntPipe } from '../utils';
import { RequireLogin } from '../custom.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 教师注册
   * @param registerTeacher
   * @returns
   */
  @Post('register')
  async registerTeacher(@Body() registerTeacher: RegisterTeacherDto) {
    return await this.userService.registerTeacher(registerTeacher);
  }

  /**
   * 教师登录
   * @param loginTeacher
   * @returns
   */
  @Post('login_teacher')
  async loginTeacher(@Body() loginTeacher: LoginDto) {
    return await this.userService.loginTeacher(loginTeacher);
  }

  /**
   * 学生登录
   */
  @Post('login_student')
  async loginStudent(@Body() loginStudent: LoginStudentDto) {
    return await this.userService.loginStudent(loginStudent);
  }

  /**
   * 导入学生信息
   */
  @Post('import_student_data')
  @RequireLogin()
  async importStudentData(@Body() importStudentData: ImportStudentDataDto) {
    return await this.userService.importStudentData(importStudentData);
  }

  /**
   * 获取热门作品
   */
  @Post('get_hot_work_list')
  @RequireLogin()
  async getHotWorkList(
    @Query('pageNo', new DefaultValuePipe(1), generateParseIntPipe('pageNo'))
    pageNo: number,
    @Query(
      'pageSize',
      new DefaultValuePipe(10),
      generateParseIntPipe('pageSize'),
    )
    pageSize: number,
  ) {
    return await this.userService.getHotWorkList(pageNo, pageSize);
  }

  /**
   * 获取小组成员
   */
  @Post('get_group_members')
  @RequireLogin()
  async getGroupMembers(@Body() getGroupMembers: GroupMembersDto) {
    return await this.userService.getGroupMembers(getGroupMembers);
  }
}
