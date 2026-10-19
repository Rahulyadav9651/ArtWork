import express from "express"
import User from "../models/user.js"
import OTP from "../models/OTP.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


exports.Signup= async (req, res)=>{

try{
// Destructure fields from the request body
const {firstName, lastName, email, password,confirmPassword, otp}= req.body;
//check all the request are their or not
if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
    return res.status(401).json({
        success:false,
        message:"All the field are required"
    })
}
//check password match or not
if(password!==confirmPassword){

    return res.status(401).json({
        success:false,
        message:"Paassword Does not match. Please try again."
    })

}

//check user already  existing or not
const existUser= await User.findOne({email});
if(existUser){
    return res.status(401).json({
        success:false,
        message:"You are a register User.Please Login"
    })
}


//find most recent otp
const  response= await OTP.find({email}).sort({createdAt:-1}).limit(1)
console.log(response);
if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid",
			});
		}
//hashpassword
const hashPassword= await bcrypt.hash(password,10)

//create Entry
const user= await User.create({
    firstName,
    lastName,
    email,
    password:hashPassword,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`

})

return res.status(200).json({
    success:true,
    message:"User registered Successfully"

})

}
catch(error){
console.error(error)
return res.status(501).json({
    success:false,
    message:"User can not be register.Please try again."
})

}



};



exports.login= async (req, res)=>{

    try{
        //Destructure all the details
const {email, password}= req.body;

//validation of details
if(!email || !password){
    return res.status(401).json({
        success:false,
        message:"All the field are required."
    })
}
//find user provided user
const user= await User.findOne({email})
if(!user){
    return res.status(401).json({
        success:false,
        message:"User is not Found.Please Signup"
    })
}

//password validation
if(bcrypt.compare(password, user.password)){

    //generate JWT Token
const token= jwt.sign(
    {email:user.email, id:user._id},
    process.env.JWT_SECRET,
    {
        expiresIn:"24h"
    }

)

//save token in db
user.token= token
user.password= undefined

//set cookies
const options = {
				expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};

            res.cookie("token",token,options,).status(200).json({
                success:true,
                message:"User Login Succes",
                token,
                user
            })

}
else{
return res.status(401).json({
				success: false,
				message: `Password is incorrect`,
			});

}



    }
    catch(error){
console.error(error);
		// Return 500 Internal Server Error status code with error message
		return res.status(500).json({
			success: false,
			message: `Login Failure Please Try Again`,
		});

    }


}





