import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { createWinemaker, fetchWinemakers } from '../../api/api';
import EmptyPaginationState from '../../api/pagination/EmptyPaginationState';
import FilterFetchPageParams from '../../api/pagination/FilterFetchPageParams';
import PaginationState from '../../api/pagination/PaginationState';
import ApiResponseState from '../../api/utils/ApiResponseState';
import Page from '../../models/Page';
import Winemaker from '../../models/Winemaker';
import { RootState } from '../../store/store';

type WinemakersState = ApiResponseState<PaginationState<Winemaker>>;

const _fetchWinemakersAsync = createAsyncThunk<
  Page<Winemaker>,
  FilterFetchPageParams
>(
  'winemakers/fetchWinemakers',
  async ({ page, take, order, filter }: FilterFetchPageParams) => {
    const response = await fetchWinemakers(page, take, order, filter);
    return response.data;
  },
);

export const fetchWinemakersAsync = (params: FilterFetchPageParams = {}) =>
  _fetchWinemakersAsync(params);

export const createWinemakerAsync = createAsyncThunk(
  'winemaker/createWinemaker',
  async (winemaker: Winemaker) => {
    const response = await createWinemaker(winemaker);
    return response.data;
  },
);

const initialState: WinemakersState = {
  data: EmptyPaginationState,
  status: 'idle',
};

const winemakersSlice = createSlice({
  name: 'winemakers',
  initialState: initialState as WinemakersState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(_fetchWinemakersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(_fetchWinemakersAsync.fulfilled, (state, action) => {
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
      .addCase(_fetchWinemakersAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      })
      .addCase(createWinemakerAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createWinemakerAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = EmptyPaginationState;
        state.data.data = [action.payload];
      })
      .addCase(createWinemakerAsync.rejected, (state, action) => {
        state.status = 'failed';
        if (state.status === 'failed') {
          state.error = action.error.message;
        }
      });
  },
});

export default winemakersSlice.reducer;

const _selectWinemakerPage = (state: RootState) => state.winemakers.data;
const selectWinemakers = (state: RootState) => state.winemakers.data.data;

export const selectWinemakerPage = createSelector(
  [_selectWinemakerPage],
  (winemakerPage: Page<Winemaker>) => winemakerPage,
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);

export const selectAllWinemakers = createSelector(
  [selectWinemakers],
  (winemakers: Winemaker[]) => winemakers,
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);
