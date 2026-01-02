import { NextFunction,Request,Response } from "express"
import User from "../models/User"
import { hash, compare} from 'bcrypt'
import { createToken } from "../utils/token-manager";
import { cookie_name } from "../utils/constant";

export const getAllusers =  async(req:Request, res: Response, next: NextFunction): Promise<Response | void>=>{
    try{
        const users = await User.find();
        return res.status(200).json({message: "Ok", users})
    }
    catch(error:any){
        console.log(error)
        return res.status(500).json({message:"ERROR OCCURED", cause: error.message})
    }
}

export const getSignUp = async(req: Request,res: Response, next: NextFunction): Promise<Response | void>=>{
    try{
        const {name, email, password} = req.body;
        const existigUser = await User.findOne({email})
        if(existigUser){
            return res.status(401).json({message:'Email is already existing'})
        }
        const hashed =  await hash(password, 12);
        const users = new User({
            name,
            email,
            password: hashed,
        })
        await users.save();

        // create token and store  ccokie

             res.clearCookie(cookie_name,{
            httpOnly: true,
            sameSite:"strict",
            signed: true,
            path: '/'
        })

        const token = createToken(users._id.toString(),users.email,"7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie(cookie_name, token,{
            // the cookie is stored in the root directory
            path:'/',
            // domain:'localhost',
            httpOnly: true,
            sameSite:"strict",
            expires,
            signed: true
        })

        return res.status(201).json({message: "Created Successfuly", name: users.name, email: users.email, password: users.password})
    }
    catch(error: any){
        return res.status(500).json({message: "Cannot Created ", cause: error.message})
    }
} 

export const getlogin = async(req:Request, res:Response, next: NextFunction): Promise<Response | void>=>{

    try{
        const{ email, password } = req.body;
        const user = await User.findOne({email})
        if(!user){
          return res.json({message:"Email is not Found"})
        }

        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect){
            return res.status(403).send("Incorrect password")
        }

        res.clearCookie(cookie_name,{
            httpOnly: true,
            sameSite:"strict",
            signed: true,
            path: '/'
        })

        const token = createToken(user._id.toString(),user.email,"7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7)
        res.cookie(cookie_name, token,{
            // the cookie is stored in the root directory
            path:'/',
            // domain:'localhost',
            httpOnly: true,
            sameSite:"strict",
            expires,
            signed: true
        })
        return res.status(200).json({message: "Login Successfuly", name: user.name, email: user.email})
    }
    catch(error:any){
         return res.status(500).json({message: "ERROR ", cause: error.message})
    }
    
}

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //user token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).send("User not registered OR Token malfunctioned");
    }
    // console.log(user._id.toString(),res.locals.jwtData.id);
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permissions didn't match");
    }
    return res
      .status(200)
      .json({ message: "OK", name: user.name, email: user.email });
  } catch (error:any) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};