import { IsString, IsNotEmpty } from 'class-validator';

export class GroupMembersDto {
  @IsString()
  @IsNotEmpty({ message: '任务ID不能为空' })
  task_id: string;

  @IsString()
  @IsNotEmpty({ message: '组长ID不能为空' })
  leader_id: string;
}
