import { createSlice,PayloadAction } from '@reduxjs/toolkit';

interface carritoState{
    value:string[]
}
const initialState:carritoState={
    value:[]
}
export const carritoSlice = createSlice({
    name:"carrito",
    initialState,
    reducers:{
        alternarCarrito:(state,action:PayloadAction<string>)=>{
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
export const { alternarCarrito } = carritoSlice.actions;
export default carritoSlice.reducer;