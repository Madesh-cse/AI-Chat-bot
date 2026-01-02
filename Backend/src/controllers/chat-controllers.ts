import { NextFunction, Request, Response } from "express";

export const generatechatCompletion = async(req: Request, res: Response, next: NextFunction)=>{
    const {message} = req.body;
}