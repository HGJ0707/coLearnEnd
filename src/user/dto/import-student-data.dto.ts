import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class ImportStudentDataDto {
  @IsNumber()
  @IsNotEmpty({ message: '教师id 不能为空' })
  teacher_id: string;

  @IsString()
  @IsNotEmpty({ message: '学生信息不能为空' })
  student_list: string;
}
