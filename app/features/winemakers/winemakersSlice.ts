import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createWinemaker, fetchWinemakers } from '../../api/api';
import Winemaker from '../../models/Winemaker';

export const fetchWinemakersAsync = createAsyncThunk<Winemaker[]>('winemakers/fetchWinemakers', async () => {
    const response = await fetchWinemakers();
    return response.data;
});

export const createWinemakerAsync = createAsyncThunk('winemaker/createWinemaker', async (winemaker: Winemaker) => {
    const response = await createWinemaker(winemaker);
    return response.data;
});

const winemakersSlice = createSlice({
    name: 'winemakers',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchWinemakersAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchWinemakersAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchWinemakersAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createWinemakerAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(createWinemakerAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(createWinemakerAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default winemakersSlice.reducer;
