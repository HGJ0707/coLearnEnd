import { IsString, IsNotEmpty } from 'class-validator';

export class LoginStudentDto {
  @IsString()
  @IsNotEmpty({ message: '学号不能为空' })
  student_id: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  student_pwd: string;
}
