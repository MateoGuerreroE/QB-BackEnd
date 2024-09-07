export class UserCreateInput {
  firstName!: string;
  lastName!: string;
  emailAddress!: string;
  isEnabled?: boolean;
  createdBy?: string;
  secret: string;
}
