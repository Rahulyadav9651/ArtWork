import User from "../models/user.js";

import mailSender from "../utils/mailSender.js";
import bcrypt from "bcrypt";

export const  resetPasswordToken= async(req , res)=>{

try{
    //  get emaail
const {email}= req.body;
    //validate

    const userDetails= await User.findOne({email});
if(!userDetails){
return res.status(402).json({
    success:false,
    message:"Your email is not registered with us."

})

}

    //reset token
    const token= crypto.randomUUID();
    //update user by adding token and expiration time

    const updateDetails= await User.findOneAndUpdate({email},{token:token, resetPasswordExpires:Date.now()+30*60*1000},{new:true})
    //link generete
//const url= `http://localhost:5173/update-password/${token}
const url= `http://localhost:5173/update-password/${token}`

await mailSender(email,"Password Reset Link",`Password Rest Link:${url} `);

    //send email

    return res.status(200).json({
        sucess:true,
        message:"Reset link send successfully"

    })

}

catch(error){
console.log(error);
return res.status(501).json({
    success:false,
    message:"something went wrong while reset password"
})

}



}



//Reset Password

export const resetPassword= async(req, res)=>{

    try{

const {password, confirmPassowrd}= req.body;


if(!password || !confirmPassowrd){

    return res.status(400).json({
        success:false,
        message:"All field are required",
    })

}

const userDetails= await User.findOne({token:token})

    //token time check
    if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"Token is not Valid"
        })
    }
    //token time check
    if(userDetails.resetPasswordExpires<Date.now()){
        return res.json({
            success:false,
            message:"Token is expired,please regenerate your token",
        });
    }

//hashPassord
const hashpassword= await bcrypt.hash(password,10);

const resetPass= await User.findOneAndDelete({token:token},{password:hashpassword},{new:true})

return res.status(200).json({
    success:true,
    message:"Password update successfully"
})
    }
    catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:"Something went wrong while reset Password.Please try again"
})


    }



}