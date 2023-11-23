import { Router } from 'express';
import userController from './user.controller';

const userRoutes = Router();

userRoutes.post('/', userController.createNewUser);
userRoutes.get('/', userController.getAllUsers);
userRoutes.get('/:userId', userController.getSingleUser);
userRoutes.put('/:userId', userController.updateExistingUser);
userRoutes.delete('/:userId', userController.deleteExistingUser);
userRoutes.put('/:userId/orders', userController.createOrder);
userRoutes.get('/:userId/orders', userController.getOrders);
userRoutes.get('/:userId/orders/total-price', userController.totalPrice);

export default userRoutes;
