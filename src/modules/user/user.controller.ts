import { Request, Response } from 'express';
import userServices from './user.services';
import User from './user.modal';
import userValidator from './user.validator';
import { TUserPartial } from './user.interface';

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
        message: 'All Users fetched Successfully',
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

const userController = {
  getAllUsers,
  getSingleUser,
  createNewUser,
  deleteExistingUser,
};

export default userController;
