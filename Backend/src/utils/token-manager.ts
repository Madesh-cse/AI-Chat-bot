import  jwt from 'jsonwebtoken'
import { SignOptions } from 'jsonwebtoken';

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