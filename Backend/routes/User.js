import express from "express";

const router=  express.Router();
import { auth } from "../middlewere.js/auth.js";
import { Signup,login,sendOtp,changePassword } from "../controllers/Auth.js";

import { resetPasswordToken,resetPassword } from "../controllers/ResetPassword.js";


router.post('/signup',Signup);
router.post('/login',login);
router.post('/sendotp',sendOtp);
router.post('/changepassword',auth,changePassword);


// Reset Password
router.post('/reset-password-token',resetPasswordToken);
router.post('/reset-password',resetPassword);

export default router;

