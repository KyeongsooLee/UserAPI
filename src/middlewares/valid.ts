import { Request, Response, NextFunction } from 'express';

export const validRegister = async (req: Request, res: Response, next: NextFunction) => {
    const { userName, password } = req.body
    const errors = [];

    if(!userName){
      errors.push("Please add your name.")
    }else if(userName.length > 20){
      errors.push("Your name is up to 20 chars long.")
    }

    if(password.length < 3){
      errors.push("Password must be at least 3 chars.")
    }

    if(errors.length > 0) return res.status(400).json({msg: errors})

    next();
  }