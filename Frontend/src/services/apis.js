const BASE_URL= import.meta.env.VITE_BASE_URL


export const endPoints={
    SEND_OTP_API:BASE_URL+"/sendotp",
    SIGNUP_API:BASE_URL+"/signup",
    LOGIN_API:BASE_URL+"/login",
    CHANGE_PASSWORD:BASE_URL+"/changepassword",
    RESET_TOKEN_API:BASE_URL+"/reset-password-token",
    RESETPASSWORD_API:BASE_URL+"/reset-password"

}

export const artWorkendPoints={
CREATE_ART:BASE_URL+"/create",
LATEST_ART:BASE_URL+"/latest",
CATEGORY_ART:BASE_URL+"/category",
EDIT_ART:BASE_URL+"/artwork/:artworkId",
GETMY_ART:BASE_URL+"/my-artworks",
DELETE_ART:BASE_URL+"/delete-art"

}

export const commentEndPoints={
    ADDCOMMENT_API:BASE_URL+"/add/:artwork",
    GETCOMMENT_API:BASE_URL+"/comments/:artworkId",
    UPDATECOMMENT_API:BASE_URL+"/:commentId",
    DELETECOMMENT_API:BASE_URL+"/delete/:commentID"
}

export const LikeEndPoints={
TOOGLE_API:BASE_URL+"/:id/like",
LIKECOUNT_API:BASE_URL+"/:id/likes"

}