import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import Rating from '../../models/Rating';
import { createWineRating, deleteRating } from '../../api/api';

type RatigsState = ApiResponseState<Rating[]>;

interface createWineRatingParams {
    wineId: string;
    rating: Rating;
}

export const createWineRatingAsync = createAsyncThunk(
    'ratings/createWineRating',
    async (params: createWineRatingParams) => {
        const response = await createWineRating(params.wineId, params.rating);
        return response.data;
    }
);

export const deleteRatingAsync = createAsyncThunk('ratings/deleteRating', async (ratingId: string) => {
    await deleteRating(ratingId);
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
            .addCase(createWineRatingAsync.fulfilled, (state, action) => {
                if (state.status == 'succeeded') state.data.push(action.payload);
            })
            .addCase(createWineRatingAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (state.status == 'failed') state.error = action.error.message;
            })
            .addCase(deleteRatingAsync.fulfilled, (state, action) => {
                if (state.status == 'succeeded') state.data.filter(d => d.id !== action.payload[0].id);
            })
            .addCase(deleteRatingAsync.rejected, (state, action) => {
                state.status = 'failed';
                if (state.status == 'failed') state.error = action.error.message;
            });
    }
});

export default ratingsSlice.reducer;
