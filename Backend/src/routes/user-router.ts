import { Router} from 'express'
import { getAllusers, getlogin, getSignUp } from '../controllers/user-controller';
import { LoginValidator, signupValidator, validate } from '../utils/validators';

const userRouter = Router();

userRouter.get("/", getAllusers);
userRouter.post("/signup",validate(signupValidator),getSignUp);
userRouter.post("/login",validate(LoginValidator),getlogin);

export default userRouter