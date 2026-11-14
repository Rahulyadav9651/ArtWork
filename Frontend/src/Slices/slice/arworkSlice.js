import { createSlice } from "@reduxjs/toolkit"


const inititalState={
artwork:[],
selectedArtwork:null,
loading:false,

}

const artSlice= createSlice({
name:"art",
initialState:inititalState,
reducers:{
    setArtwork(state, action){
        state.artwork= action.payload
    },
    setSelectedArtwork(state, action){
        state.selectedArtwork= action.payload
    }


}

})

export const {setArtwork, setSelectedArtwork} = artSlice.actions

export default artSlice.reducer