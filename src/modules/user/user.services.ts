import User from './user.modal';

const getAllUsersFromDB = async () => {
  return await User.find({});
};

const getSingleUserFromDB = async (userId: number) => {
  return await User.findOne({ userId });
};

const userServices = { getAllUsersFromDB, getSingleUserFromDB };

export default userServices;
