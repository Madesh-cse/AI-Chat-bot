import { Router} from 'express'
import userRouter from './user-router';
import chatRouter from './chat-route';

const appRouter = Router();

appRouter.use('/user', userRouter);
appRouter.use('/chats', chatRouter);

export default appRouter