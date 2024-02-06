import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import Rating from '../../models/Rating';
import { createWineRating, fetchWineRatings } from '../../api/api';

type RatigsState = ApiResponseState<Rating[]>;

interface createWineRatingParams {
    wineId: string;
    rating: Rating;
}

export const fetchRatingsAsync = createAsyncThunk<Rating[], string>('ratings/fetchWineRatings', async (wineId: string) => {
    const response = await fetchWineRatings(wineId);
    return response.data;
});

export const createWineRatingAsync = createAsyncThunk('ratings/createWineRating', async (params: createWineRatingParams) => {
    const response = await createWineRating(params.wineId, params.rating);
    return response.data;
});

const initialState: RatigsState = {
    data: [],
    status: 'idle'
};

const ratingsSlice = createSlice({
    name: 'ratings',
    initialState: initialState as RatigsState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchRatingsAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchRatingsAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (state.status == 'succeeded') state.data = action.payload;
            })
            .addCase(fetchRatingsAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (state.status == 'failed') state.error = action.error.message;
            })
            .addCase(createWineRatingAsync.fulfilled, (state, action) => {
                if (state.status == 'succeeded') state.data.push(action.payload);
            })
            .addCase(createWineRatingAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (state.status == 'failed') state.error = action.error.message;
            });
    }
});

export default ratingsSlice.reducer;
