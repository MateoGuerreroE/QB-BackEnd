import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class UserLoginData {
  @IsEmail()
  emailAddress!: string;

  @IsString({ message: 'Invalid password' })
  password!: string;
}
