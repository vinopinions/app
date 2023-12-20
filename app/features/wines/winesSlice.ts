import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createWine, fetchWines } from '../../api/api';
import Wine from '../../models/Wine';

export const fetchWinesAsync = createAsyncThunk<Wine[]>('wines/fetchWines', async () => {
    const response = await fetchWines();
    return response.data;
});

export const createWineAsync = createAsyncThunk('wines/createWine', async (wine: Wine) => {
    const response = await createWine(wine);
    return response.data;
});

const winesSlice = createSlice({
    name: 'wines',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchWinesAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchWinesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchWinesAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createWineAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            });
    }
});

export default winesSlice.reducer;
