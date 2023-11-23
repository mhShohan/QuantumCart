import { TOrder, TUser } from './user.interface';
import User from './user.modal';

const getAllUsersFromDB = async () => {
  return await User.find({}).select('-password -__v -orders');
};

const getSingleUserFromDB = async (userId: number) => {
  return await User.findOne({ userId }).select('-password -__v -orders');
};

const createUser = async (user: TUser) => {
  return await User.create(user);
};

const deleteUser = async (userId: number) => {
  return await User.deleteOne({ userId });
};

const updateUser = async (userId: number, data: TUser) => {
  return await User.updateOne({ userId }, data);
};

const createOrderOfUser = async (userId: number, order: TOrder) => {
  return User.updateOne({ userId }, { $push: { orders: order } });
};

const calculatedTotalPrice = async (userId: number) => {
  return await User.aggregate([
    { $match: { userId } },
    {
      $unwind: "$orders"
    },
    {
      $group: {
        _id: "$_id",
        totalPrice: {
          $sum: {
            $multiply: ["$orders.price", "$orders.quantity"]
          }
        }
      }
    },
    { $project: { _id: 0, totalPrice: 1 } }
  ])
}

const userServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  createUser,
  deleteUser,
  updateUser,
  createOrderOfUser, calculatedTotalPrice
};

export default userServices;
