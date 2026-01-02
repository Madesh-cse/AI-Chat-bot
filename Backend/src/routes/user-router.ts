import { Router} from 'express'
import { getAllusers, getlogin, getSignUp, verifyUser } from '../controllers/user-controller';
import { LoginValidator, signupValidator, validate } from '../utils/validators';
import { verifyToken } from '../utils/token-manager';

const userRouter = Router();

userRouter.get("/", getAllusers);
userRouter.post("/signup",validate(signupValidator),getSignUp);
userRouter.post("/login",validate(LoginValidator),getlogin);
userRouter.get("/auth-status", verifyToken,verifyUser);

export default userRouter