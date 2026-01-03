import { Router} from 'express'
import { verifyToken } from '../utils/token-manager';
import { chatcompletionValidator, validate } from '../utils/validators';
import { generatechatCompletion } from '../controllers/chat-controllers';

const chatRouter = Router();

// PROTECTED API
chatRouter.post("/new", validate(chatcompletionValidator), verifyToken, generatechatCompletion)

export default chatRouter;