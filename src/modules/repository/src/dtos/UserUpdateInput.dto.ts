import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UserUpdateInput {
  @IsString()
  userId!: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}
