import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UserCreateInput {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  emailAddress!: string;

  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @IsOptional()
  @IsStrongPassword()
  secret: string;
}
