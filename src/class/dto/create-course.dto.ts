import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsNumber()
  @IsNotEmpty({ message: '教师ID不能为空' })
  teacher_id: number;

  @IsString()
  @IsNotEmpty({ message: '课程名称不能为空' })
  course_name: string;

  @IsString()
  @IsNotEmpty({ message: '课程描述不能为空' })
  course_desc: string;

  @IsString()
  @IsNotEmpty({ message: '课程封面不能为空' })
  course_img: string;

  @IsString()
  @IsNotEmpty({ message: '班级列表不能为空' })
  class_id_list: string;
}
