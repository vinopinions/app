import { createStore, fetchStores } from '../../api/api';
import Store from '../../models/Store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface StoresState {
    items: Store[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export const fetchStoresAsync = createAsyncThunk<Store[]>('stores/fetchStores', async () => {
    const response = await fetchStores();
    return response.data;
});

export const createStoreAsync = createAsyncThunk('stores/createStore', async (store: Store) => {
    console.log(store);
    const response = await createStore(store);
    return response.data;
});

const storesSlice = createSlice({
    name: 'stores',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    } as StoresState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchStoresAsync.pending, state => {
                state.status = 'loading';
            })
            .addCase(fetchStoresAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchStoresAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createStoreAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(createStoreAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.log('Error: ' + action.error);
            });
    }
});

export default storesSlice.reducer;
