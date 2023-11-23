import { Router } from 'express';
import userController from './user.controller';

const userRoutes = Router();

userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:userId', userController.getSingleUser);

export default userRoutes;
