import { Model } from 'mongoose';

export type TFullName = {
  firstName: string;
  lastName: string;
};

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Array<string>;
  address: TAddress;
};

export interface UserModel extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  findByUserId(userId: number): Promise<TUser | null>;
}
