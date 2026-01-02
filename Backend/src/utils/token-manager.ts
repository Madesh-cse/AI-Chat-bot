import { Request, Response, NextFunction } from 'express';
import  jwt from 'jsonwebtoken'
import { SignOptions } from 'jsonwebtoken';
import { cookie_name } from './constant';

const JWT_SECRET = process.env.JWT_SECRET_KEY;

console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

export const createToken = (id:string, email: string, expiresIn: SignOptions["expiresIn"])=>{
    const payload = {id , email};
    const token = jwt.sign(payload, JWT_SECRET,{
        expiresIn
    });

    return token
}

// verfied the cookies 

export const verifyToken = async(req: Request, res: Response, next: NextFunction)=>{
  const token = req.signedCookies[`${cookie_name}`];

    if (!token || token.trim() === "") {
    return res.status(401).json({ message: "Token Not Received" });
  }
  return new Promise<void>((resolve, reject) => {
    return jwt.verify(token, JWT_SECRET, (err:any, success:any) => {
      if (err) {
        reject(err.message);
        return res.status(401).json({ message: "Token Expired" });
      } else {
        resolve();
        res.locals.jwtData = success;
        return next();
      }
    });
  })
}