import { Router} from 'express'
import { verifyToken } from '../utils/token-manager';
import { chatcompletionValidator, validate } from '../utils/validators';

const chatRouter = Router();

// PROTECTED API
chatRouter.post("/new", validate(chatcompletionValidator), verifyToken)

export default chatRouter;