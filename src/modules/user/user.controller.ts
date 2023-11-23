import { Request, Response } from 'express';
import userServices from './user.services';
import User from './user.modal';

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

const userController = { getAllUsers, getSingleUser };

export default userController;
