import { IsString, IsNotEmpty } from 'class-validator';

export class RegisterTeacherDto {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  teacher_name: string;

  @IsString()
  @IsNotEmpty({ message: '手机号不能为空' })
  phone_num: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  teach_pwd: string;
}
