import { createSlice,PayloadAction } from '@reduxjs/toolkit';

interface favsState{
    value:string[]
}
const initialState:favsState={
    value:[]
}
export const favsSlice = createSlice({
    name:"favoritos",
    initialState,
    reducers:{
        alternarFavoritos:(state,action:PayloadAction<string>)=>{
            const id=action.payload
            const index=state.value.indexOf(id)
            if (index>=0){
                state.value.splice(index,1)
            }else{
                state.value.push(id)
            }
        }
    }
})
export const { alternarFavoritos } = favsSlice.actions;
export default favsSlice.reducer;