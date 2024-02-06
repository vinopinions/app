import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import { createWine, fetchWines } from '../../api/api';
import Wine from '../../models/Wine';

type WinesState = ApiResponseState<Wine[]>;

export const fetchWinesAsync = createAsyncThunk<Wine[]>('wines/fetchWines', async () => {
    const response = await fetchWines();
    return response.data;
});

export const createWineAsync = createAsyncThunk('wines/createWine', async (wine: Wine) => {
    const response = await createWine(wine);
    return response.data;
});

const initialState: WinesState = {
    data: [],
    status: 'idle'
};

const winesSlice = createSlice({
    name: 'wines',
    initialState: initialState as WinesState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchWinesAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchWinesAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.status == 'succeeded') state.data = action.payload;
            })
            .addCase(fetchWinesAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (state.status == 'failed') state.error = action.error.message;
            })
            .addCase(createWineAsync.fulfilled, (state, action) => {
                if (state.status == 'succeeded') state.data.push(action.payload);
            })
            .addCase(createWineAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (state.status == 'failed') state.error = action.error.message;
            });
    }
});

export default winesSlice.reducer;
