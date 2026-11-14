import { artWorkendPoints } from "../apis";
import {toast} from "react-hot-toast"
import { ImSpinner9 } from "react-icons/im";
import { setLoading } from "../../Slices/slice/Auth";
import { apiConnector } from "../apiconnector";



const {CREATE_ART, LATEST_ART,CATEGORY_ART, EDIT_ART,GETMY_ART,DELETE_ART,GETARTBYID}= artWorkendPoints



export function myArt(userId, token) {
  //const toastId = toast.loading(<ImSpinner9/>);
  return async (dispatch) => {
    const toastId = toast.loading(<ImSpinner9/>);
    dispatch(setLoading(true));

    try {




      const response = await apiConnector(
        "GET",
        GETMY_ART,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );




        if (!response.data.success) {
        throw new Error(response.data.message || "API request failed");
      }

      const artworks = response.data.data;

      return artworks; // Important: return data to useEffect

    } catch (error) {
  console.error("API ERROR:", error);
      console.error("ERROR RESPONSE:", error.response?.data);
      console.error("ERROR STATUS:", error.response?.status);

      console.error("FETCH ART ERROR:", error);

      toast.error(
        error.response?.data?.message || "Could not fetch your artworks"
      );

      throw error;

    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}   


export function addArtDetails(data, token){

  return async (dispatch)=>{
const toastId= toast.loading(<ImSpinner9/>)
dispatch(setLoading(true))

try{
  const response= await apiConnector("POST",CREATE_ART, data,
    {Authorization :`Bearer ${token}`}
  )
  console.log("Add ART Details api response...", response)

  if(!response.data.success){
    throw new Error("Could not upload art details")
  }
  
toast.success("Data uploaded successfull.")


}
catch(error){

   console.log("CREATE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  
}

  }


  // export function DeleteMyArt(userId, token){

  //   return async(dispatch)=>{
  //     const toastId= toast.loading(<ImSpinner9/>)
  //     dispatch(setLoading(true))

  //     try{
  //       const response = await apiConnector("DELETE",DELETE_ART,userId)

  //       console.log("Delete API RESPINSE ....", response)

  //       if(!response.data.success){
  //         throw new Error("Artwork not deleted")
  //       }
  //       toast.success("Art is Dalated successfully")


  //     }
  //     catch(error){
  //        console.log("Delete API ERROR............", error)
  //   toast.error(error.message)
  // }
  // toast.dismiss(toastId)


  //     }

  //   }
  





export function DeleteMyArt(artworkId, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Deleting artwork...");
    dispatch(setLoading(true));

  //  console.log("art", artworkId)
    try {
      const response = await apiConnector(
        "DELETE",
        DELETE_ART,
        { id: artworkId },
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("DELETE API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Artwork not deleted"
        );
      }

      toast.success("Artwork deleted successfully!");

      // Return success so ArtworkContent can update its UI
      return response.data;
    } catch (error) {
      console.error("DELETE API ERROR:", error);

      toast.error(
        error.response?.data?.message || "Artwork deletion failed"
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}


export function fetchArtById(id) {
  return async (dispatch) => {
    const toastId = toast.loading(<ImSpinner9/>);
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "GET",
        `${GETARTBYID}/${id}`
      );

      console.log("FETCH ART API RESPONSE:", response);

      if (!response.data.success) {
        throw new Error(response.data.message || "Cannot fetch artwork");
      }

      toast.success("Artwork fetched successfully!");

      return response.data.data;
    } catch (error) {
      console.error("FETCH ART API ERROR:", error);

      toast.error(
        error.response?.data?.message || error.message || "Cannot fetch artwork"
      );

      throw error;
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}




export function updateArt(id, data, token) {
  return async (dispatch) => {
    const toastId = toast.loading("Updating artwork...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "PATCH",
        `${EDIT_ART}/${id}`,
        data,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log("UPDATED ART API RESPONSE:", response.data);

      if (!response.data.success) {
        throw new Error(
          response.data.message || "Artwork cannot be updated"
        );
      }

     // toast.success("Artwork updated successfully!");

      return response.data;

    } catch (error) {
      console.error(
        "UPDATE ART API ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Artwork update failed"
      );

      throw error;

    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}



