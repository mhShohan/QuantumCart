import User from './user.modal';
import { TOrder, TUser } from './user.interface';

// fetch all users from database
const getAllUsersFromDB = async () => {
  return await User.find({}).select(
    '-password -__v -orders -hobbies -isActive -_id -fullName._id -address._id',
  );
};

// fetch single users from database
const getSingleUserFromDB = async (userId: number) => {
  return await User.findOne({ userId }).select(
    '-password -__v -orders -_id -fullName._id -address._id',
  );
};

// create new user and save in database
const createUser = async (user: TUser) => {
  return await User.create(user);
};

//delete an existing user
const deleteUser = async (userId: number) => {
  return await User.deleteOne({ userId });
};

//update an existing user
const updateUser = async (userId: number, data: TUser) => {
  return await User.updateOne({ userId }, data);
};

// create new order and save in user collection
const createOrderOfUser = async (userId: number, order: TOrder) => {
  return User.updateOne({ userId }, { $push: { orders: order } });
};

//get all orders
const getAllOrdersOfUser = async (userId: number) => {
  const res = await User.findOne({ userId }).select('orders -_id');

  if (res?.orders?.length && res.orders.length > 0) {
    return res;
  } else {
    return { description: 'No orders found!' };
  }
};

// calculate the total price of orders
const calculatedTotalPrice = async (userId: number) => {
  return await User.aggregate([
    { $match: { userId } }, // match the document with user id
    {
      $unwind: '$orders', // Deconstruct the order array
    },
    {
      // group documents and calculate total price
      $group: {
        _id: '$_id',
        totalPrice: {
          $sum: {
            $multiply: ['$orders.price', '$orders.quantity'], //  multiply price and quantity
          },
        },
      },
    },
    { $project: { _id: 0, totalPrice: 1 } }, // remove all other fields except totalPrice
  ]);
};

const userServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  createUser,
  deleteUser,
  updateUser,
  createOrderOfUser,
  calculatedTotalPrice,
  getAllOrdersOfUser,
};

export default userServices;
