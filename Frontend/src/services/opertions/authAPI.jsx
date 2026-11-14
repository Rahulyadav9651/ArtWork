import { endPoints } from "../apis"
import { apiConnector } from "../apiconnector";
import {toast} from "react-hot-toast"
import { ImSpinner9 } from "react-icons/im";
import { setLoading, setToken } from "../../Slices/slice/Auth";
import { setUser } from "../../Slices/slice/profileSlice";

const {SEND_OTP_API,SIGNUP_API,LOGIN_API,RESET_TOKEN_API,RESETPASSWORD_API, EDITP_PROFILE,
    DELETE_USER
}= endPoints;


export function sendOtp(email,navigate){

return async (dispatch)=>{
    const toastId= toast.loading(<ImSpinner9/>)
    dispatch(setLoading(true))
    try{
        const response= await apiConnector("POST",SEND_OTP_API,{
            email,
            checkUserPresent:true,
        })
        console.log("SEND otp response.....",response);
        console.log(response.data.success);

        if(!response.data.success){
            throw new Error(response.data.message)
        }

        toast.success("OTP Send successfully")
        navigate('/verify-email');

    }
    catch(error){
console.log("SENDOTP API ERROR............", error)
      toast.error("Could Not Send OTP")
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);

}

}




export function Signup(firstName, lastName, email, password, confirmPassword, otp, navigate){

    return async(dispatch)=>{
const toastId= toast.loading(<ImSpinner9/>)
dispatch(setLoading(false));

try{
    const response = await apiConnector("POST", SIGNUP_API,{
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
    })
    console.log("SIGNUP API RESPONSE .....", response)
     if(!response.data.success){
        throw new Error(response.data.message)
     }
      toast.success("Signup successful")
      navigate('/login')

}
catch(error){
console.log("SIGNUP API ERROR....", error);
toast.error("Signup Failed");
navigate('/signup')

}

dispatch(setLoading(false));
toast.dismiss(toastId);

    }


}








export function login(email, password, navigate){

    return async(dispatch)=>{
        const toastId= toast.loading(<ImSpinner9/>)
        dispatch(setLoading(true));
          try{
            const response= await apiConnector("POST",LOGIN_API,{
                email,
                password
            })
            console.log("LOGIN API RESPONSE.....", response);
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login successful"),
            dispatch(setToken(response.data.token))
            const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
      dispatch(setUser({ ...response.data.user, image: userImage }))

localStorage.setItem("token", JSON.stringify(response.data.token))
      localStorage.setItem("user",JSON.stringify(response.data.user))
            navigate('/')

          }
          catch(error){
console.log("LOGIN API ERROR............", error)
      toast.error("Login Failed")

          }
           dispatch(setLoading(false))
    toast.dismiss(toastId)

    }

}


 


export function logout(navigate){

    return async(dispatch)=>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    localStorage.removeItem("token")
    localStorage.removeItem("user");
    toast.success("Loggout success")
navigate('/')

    }

}




export function getPasswordResetToken(email,setEmailSend){

    return async(dispatch)=>{
const toastId= toast.loading(<ImSpinner9/>)
   dispatch(setLoading(false));

   try{
    const response = await apiConnector("POST", RESET_TOKEN_API,{email})
    console.log("RESET TOKEN API RESPONSE",response)
    if(!response.data.success){
        throw new Error(response.data.message)
    }
    toast.success("Reset email send")
    setEmailSend:true


   }
   catch(error){
    console.log("Reset Password token error")
    console.error(error)

   }
   toast.dismiss(toastId)
   dispatch(setLoading(false));

    }

}







export function resetPassword(password, confirmPassword, token){

    return async(dispatch)=>{
const toastId= toast.loading(<ImSpinner9/>)
dispatch(setLoading(false));

try{
    const response = await apiConnector("POST", RESETPASSWORD_API,{
        password,
        confirmPassword, token
    })
    console.log("RESET PASSWORD API RESPONSE....", response)

    if(!response.data.success){
        throw new Error(response.data.message)
    }
    toast.success("Password has been reset successfully")

}
catch(error){
console.log("Unable to reset token");
}
dispatch(setLoading(false));


    }

}



export function updateProfile(data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating profile...");

    try {
      const response = await apiConnector(
        "PUT",
        EDITP_PROFILE,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Profile updated successfully!");

      // Update Redux profile state here using your profile slice action.
      // Example: dispatch(setUser(response.data.user));

      return true;

    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);

      toast.error(
        error.response?.data?.message || "Profile update failed"
      );

      return false;

    } finally {
      toast.dismiss(toastId);
    }
  };
}



export function deleteAccount(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting account...");

    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_USER,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Account deleted successfully!");

      // Clear authentication and profile Redux state here.
      // Dispatch your logout action and clear persisted credentials.
dispatch(setToken(null))
dispatch(setUser(null))
localStorage.removeItem("token")
localStorage.removeItem("user")
      navigate("/");

      return true;

    } catch (error) {
      console.error("DELETE ACCOUNT ERROR:", error);

      toast.error(
        error.response?.data?.message || "Account deletion failed"
      );

      return false;

    } finally {
      toast.dismiss(toastId);
    }
  };
}