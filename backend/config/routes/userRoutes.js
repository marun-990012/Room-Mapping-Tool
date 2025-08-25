import express from 'express';
import userController from '../../app/controllers/userController.js';
import authentication from '../../app/middlewares/authentication.js';

const userRoute = express.Router();

userRoute.post('/user/signup',userController.register);
userRoute.post('/user/signin',userController.login);
userRoute.get('/user/account',authentication,userController.account);

export default userRoute;