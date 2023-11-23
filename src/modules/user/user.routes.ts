import { Router } from 'express';
import userController from './user.controller';

const userRoutes = Router();

userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:userId', userController.getSingleUser);
userRoutes.put('/:userId', userController.updateExistingUser);
userRoutes.delete('/:userId', userController.deleteExistingUser);
userRoutes.post('/', userController.createNewUser);
userRoutes.put('/:userId/orders', userController.createOrder);

export default userRoutes;
