import { TUser } from './user.interface';
import User from './user.modal';

const getAllUsersFromDB = async () => {
  return await User.find({});
};

const getSingleUserFromDB = async (userId: number) => {
  return await User.findOne({ userId });
};

const createUser = async (user: TUser) => {
  return await User.create(user);
};

const userServices = { getAllUsersFromDB, getSingleUserFromDB, createUser };

export default userServices;
