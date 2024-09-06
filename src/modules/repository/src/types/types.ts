import { UserCreateInput } from '../dtos/UserCreateInput.dto';
import { UserUpdateInput } from '../dtos/UserUpdateInput.dto';

export interface UserRecord {
  userId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  isEnabled: boolean;
  isDeleted: boolean;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  deletedAt?: Date;
  deletedBy?: string;
}

export interface UserToCreate extends UserCreateInput {
  createdBy: string;
}

export interface UserToUpdate extends UserUpdateInput {}
