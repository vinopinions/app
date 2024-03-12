import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import { createWine, fetchWineById, fetchWines } from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import FilterFetchPageParams from '../../api/pagination/FilterFetchPageParams';
import PaginationState from '../../api/pagination/PaginationState';
import Page from '../../models/Page';
import Wine from '../../models/Wine';
import WineDto from '../../models/dtos/Wine.dto';
import { RootState } from '../../store/store';

type WinesState = ApiResponseState<PaginationState<Wine>>;

export const _fetchWinesAsync = createAsyncThunk<
  Page<Wine>,
  FilterFetchPageParams
>(
  'wines/fetchWines',
  async ({ page, take, order, filter }: FilterFetchPageParams) => {
    const response = await fetchWines(page, take, order, filter);
    return response.data;
  },
);

// workaround since optional parameters don't seem to be working with `createAsyncThunk`
// even though it is described here: https://github.com/reduxjs/redux-toolkit/issues/489
export const fetchWinesAsync = (params: FilterFetchPageParams = {}) =>
  _fetchWinesAsync(params);

export const fetchWineByIdAsync = createAsyncThunk<Wine, string>(
  'wines/fetchWineById',
  async (wineId: string) => {
    const response = await fetchWineById(wineId);
    return response.data;
  },
);

export const createWineAsync = createAsyncThunk(
  'wines/createWine',
  async (wine: WineDto) => {
    const response = await createWine(wine);
    return response.data;
  },
);

const initialState: WinesState = {
  data: EmptyPaginationState,
  status: 'idle',
};

const winesSlice = createSlice({
  name: 'wines',
  initialState: initialState as WinesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_fetchWinesAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(_fetchWinesAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        // if we get the first page, we reset the state completely, else we just update the state and keep the data from the previous pages
        if (action.payload.meta.page === 1) {
          state.data = action.payload;
        } else {
          state.data = {
            ...action.payload,
            data: [...state.data.data, ...action.payload.data],
          };
        }
      })
      .addCase(_fetchWinesAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(fetchWineByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWineByIdAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const index = state.data.data.findIndex(
          (wine) => wine.id === action.payload.id,
        );
        if (index !== -1) {
          state.data.data[index] = action.payload;
        } else {
          state.data.data.push(action.payload);
        }
      })
      .addCase(fetchWineByIdAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(createWineAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.data.push(action.payload);
      })
      .addCase(createWineAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default winesSlice.reducer;

const _selectWinePage = (state: RootState) => state.wines.data;
const selectWines = (state: RootState) => state.wines.data.data;

export const selectWinePage = createSelector(
  [_selectWinePage],
  (winePage: Page<Wine>) => winePage,
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);

export const selectAllWines = createSelector(
  [selectWines],
  (wines: Wine[]) => wines,
  // https://github.com/reduxjs/reselect/discussions/662
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);

export const selectWineById = createSelector(
  [selectWines, (state: RootState, wineId: string) => wineId],
  (wines: Wine[], wineId: string): Wine =>
    wines.find((wine) => wine.id === wineId),
);
