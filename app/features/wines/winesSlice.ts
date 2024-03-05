import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import ApiResponseState from '../../api/ApiResponseState';
import {
  createWine,
  fetchWineById,
  fetchWines,
  updateStoresForWine,
} from '../../api/api';
import Page from '../../models/Page';
import Wine from '../../models/Wine';
import FetchPageParams from '../../models/dtos/FetchPageParams';
import WineDto from '../../models/dtos/Wine.dto';
import { RootState } from '../../store/store';

type WinesState = ApiResponseState<Page<Wine>>;

export const _fetchWinesAsync = createAsyncThunk<Page<Wine>, FetchPageParams>(
  'wines/fetchWines',
  async ({ page, take, order }: FetchPageParams) => {
    const response = await fetchWines(page, take, order);
    return response.data;
  },
);

// workaround since optional parameters don't seem to be working with `createAsyncThunk`
// even though it is described here: https://github.com/reduxjs/redux-toolkit/issues/489
export const fetchWinesAsync = (params: FetchPageParams = {}) =>
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

export const updateStoresForWineAsync = createAsyncThunk<
  Wine,
  { wineId: string; storeIds: string[] }
>('wines/updateStoresForWine', async ({ wineId, storeIds }) => {
  const response = await updateStoresForWine(wineId, storeIds);
  return response.data;
});

const initialState: WinesState = {
  data: {
    data: [],
    meta: {
      page: 0,
      take: 0,
      itemCount: 0,
      pageCount: 0,
      hasPreviousPage: false,
      hasNextPage: false,
    },
  },
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

        // initialize wines with empty relations
        action.payload.data = action.payload.data.map((wine) => {
          return { ...wine, ratings: [], stores: [] };
        });

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

        // initialize wine with empty relations
        action.payload = { ...action.payload, ratings: [], stores: [] };

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
      .addCase(updateStoresForWineAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStoresForWineAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.data.data.findIndex(
          (wine) => wine.id === action.payload.id,
        );
        if (index !== -1) {
          state.data.data[index].stores = action.payload.stores;
        }
      })
      .addCase(updateStoresForWineAsync.rejected, (state, action) => {
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
  {
    devModeChecks: { identityFunctionCheck: 'never' },
  },
);

export const selectWineById = createSelector(
  [selectWines, (state: RootState, wineId: string) => wineId],
  (wines: Wine[], wineId: string): Wine =>
    wines.find((wine) => wine.id === wineId),
);

export const selectWinesByStoreId = createSelector(
  [selectWines, (state: RootState, storeId: string) => storeId],
  (wines: Wine[], storeId: string): Wine[] =>
    wines.filter((wine: Wine) =>
      wine.stores.some((store) => store.id === storeId),
    ),
);
