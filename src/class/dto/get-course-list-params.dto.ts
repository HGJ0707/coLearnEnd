import { IsNotEmpty, ValidateIf } from 'class-validator';

export class GetCourseListParamsDto {
  // 有两个参数 teacher_id 和 student_id，两个参数同时只会有有一个有值
  @IsNotEmpty({ message: '教师ID不能为空' })
  @ValidateIf((o: GetCourseListParamsDto) => !o.student_id)
  teacher_id: string;

  @IsNotEmpty({ message: '学生ID不能为空' })
  @ValidateIf((o: GetCourseListParamsDto) => !o.teacher_id)
  student_id: string;
}
