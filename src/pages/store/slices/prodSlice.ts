import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const fetchProductos = createAsyncThunk(
    'productos/fetchAll',
    async () => {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error('Error ');
    return await response.json(); 
    }
);

interface ProductoState {
    items: any[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: ProductoState = {
    items: [],
    status: 'idle',
    error: null,
};

export const productoSlice = createSlice({
    name: 'productos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
    builder
        .addCase(fetchProductos.pending, (state) => {
        state.status = 'loading';
        })
        .addCase(fetchProductos.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload; 
        })
        .addCase(fetchProductos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Algo salió mal';
        });
    },
});
export const selectProductoByUrl = (state: RootState, url: any) => {
    if (!url)  return null; 
    return state.products.items.find((m: any) => m.url === url);
};
export default productoSlice.reducer;