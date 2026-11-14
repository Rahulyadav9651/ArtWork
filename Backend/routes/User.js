import express from "express";

const router=  express.Router();
import { auth } from "../middlewere.js/auth.js";
import { Signup,login,sendOtp,changePassword,editProfile ,deleteUser} from "../controllers/Auth.js";

import { resetPasswordToken,resetPassword } from "../controllers/ResetPassword.js";


router.post('/signup',Signup);
router.post('/login',login);
router.post('/sendotp',sendOtp);
router.post('/changepassword',auth,changePassword);
router.put("/edit-profile", auth, editProfile);
router.delete("/delete-account", auth, deleteUser);



// Reset Password
router.post('/reset-password-token',resetPasswordToken);
router.post('/reset-password',resetPassword);

export default router;

