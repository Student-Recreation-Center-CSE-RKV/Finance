import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import  userService  from '../services/user-service';

// Signup request expects only email, password, and name
interface SignupRequest extends Request {
  body: {
    email: string;
    password: string;
    name: string;
  };
}

// Login request expects only email and password
interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

const userController = {
  async signup(req: SignupRequest, res: Response) {
    try {
        
      const user = await userService.signup({
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
      });
      return res.status(201).json({
        success: true,
        data: user,
        message: 'Successfully created a new user',
        err: {},
      });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      return res.status(statusCode).json({
        success: false,
        data: {},
        message: error.message,
        err: error.name,
      });
    }
  },


  // User login controller
  async login(req: LoginRequest, res: Response) {
    try {
      const token = await userService.signin(req.body);
      const user = await userService.getUserByEmail(req.body.email);

      return res.status(200).json({
        success: true,
        data: {
          token,
          user,
        },
        message: 'Successfully logged in',
        err: {},
      });
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        data: {},
        message: 'Something went wrong',
        err: error.message,
      });
    }
  },
};

export default userController;
