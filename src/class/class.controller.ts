import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClassService } from './class.service';
import { GetCourseListParamsDto } from './dto/get-course-list-params.dto';
import { RequireLogin } from '../custom.decorator';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller()
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  /**
   * 获取所有班级
   * @returns
   */
  @Get('get_all_class')
  @RequireLogin()
  async getAllClass() {
    return await this.classService.getAllClass();
  }

  /**
   * 创建课程
   * @param createCourseParams
   * @returns
   */
  @Post('create_course')
  @RequireLogin()
  async createCourse(@Body() createCourseParams: CreateCourseDto) {
    return await this.classService.createCourse(createCourseParams);
  }

  /**
   * 删除课程
   * @param deleteCourseParams
   * @returns
   */
  @Post('delete_course')
  @RequireLogin()
  async deleteCourse(@Body() deleteCourseParams: { course_id: number }) {
    return await this.classService.deleteCourse(deleteCourseParams);
  }

  /**
   * 获取课程列表
   * @param getCourseListParams
   * @returns
   */

  @Post('get_course_list')
  @RequireLogin()
  async getCourseList(@Body() getCourseListParams: GetCourseListParamsDto) {
    return await this.classService.getCourseList(getCourseListParams);
  }
}
