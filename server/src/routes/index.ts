import { Router } from "express";
import userRoutes from "./user.routes";

const rootRoutes = Router()

rootRoutes.use('/users', userRoutes)

export default rootRoutes