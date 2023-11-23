import { Request, Response } from 'express';
import userServices from './user.services';
import User from './user.modal';
import userValidator from './user.validator';
import { TUserPartial } from './user.interface';
import hash from '../../utils/hash';
import orderValidator from './order.validator';

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsersFromDB();

    res.status(200).json({
      success: true,
      message: 'All Users fetched Successfully',
      data: users,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (await User.findByUserId(userId)) {
      const users = await userServices.getSingleUserFromDB(userId);

      return res.status(200).json({
        success: true,
        message: 'User fetched Successfully',
        data: users,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};

const createNewUser = async (req: Request, res: Response) => {
  try {
    const validatedUser = userValidator.parse(req.body);

    const user = await userServices.createUser(validatedUser);

    const tempUser: TUserPartial = JSON.parse(JSON.stringify(user));
    delete tempUser.password;
    delete tempUser.orders;

    res.status(201).json({
      success: true,
      message: 'New user created Successfully',
      data: tempUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Failed to create new user!', error });
  }
};

const deleteExistingUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (await User.findByUserId(userId)) {
      await userServices.deleteUser(userId);

      return res.status(200).json({
        success: true,
        message: 'User deleted Successfully',
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};

const updateExistingUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const validatedUser = userValidator.parse(req.body);

    validatedUser.password = await hash(validatedUser.password);

    if (await User.findByUserId(userId)) {
      await userServices.updateUser(userId, validatedUser);

      const user = await User.findByUserId(userId);

      const tempUser: TUserPartial = JSON.parse(JSON.stringify(user));
      delete tempUser.password;

      return res.status(200).json({
        success: true,
        message: 'User updated Successfully',
        data: tempUser,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const validatedOrder = orderValidator.parse(req.body);

    if (await User.findByUserId(userId)) {
      await userServices.createOrderOfUser(userId, validatedOrder);

      return res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};

const getOrders = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const user = await User.findByUserId(userId)

    if (user) {
      return res.status(201).json({
        success: true,
        message: 'Order fetched successfully!',
        data: user.orders,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};

const totalPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (await User.findByUserId(userId)) {
      const result = await userServices.calculatedTotalPrice(userId)

      return res.status(200).json({
        success: true,
        message: 'Total price calculated successfully!',
        data: result.length > 0 ? result[0] : { totalPrice: 0 },
      });
    } else {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error Occurred!', error });
  }
};

const userController = {
  getAllUsers,
  getSingleUser,
  createNewUser,
  deleteExistingUser,
  updateExistingUser,
  createOrder, getOrders, totalPrice
};

export default userController;
