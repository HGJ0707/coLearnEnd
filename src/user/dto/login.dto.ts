import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty({ message: '手机号/学号不能为空' })
  phone_num: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  teach_pwd: string;
}
