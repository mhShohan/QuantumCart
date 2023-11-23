import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import userRoutes from '../modules/user/user.routes';

const app: Application = express();

//parsers middleware
app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ success: true, message: 'Server is running Successfully!' });
});

// routes
app.use('/api/users', userRoutes);

// not found
app.all('*', (_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: '404! Route Not found.',
  });
});

export default app;
