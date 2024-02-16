import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWinesAsync } from '../../../features/wines/winesSlice';
import Store from '../../../models/Store';
import Wine from '../../../models/Wine';
import { AppDispatch, RootState } from '../../../store/store';

export const getWinesForStore = (store: Store): Wine[] => {
  const dispatch: AppDispatch = useDispatch();
  const wines = useSelector((state: RootState) =>
    state.wines.status !== 'failed' ? state.wines.data : [],
  );
  useEffect(() => {
    dispatch(fetchWinesAsync());
  }, []);
  return wines.filter((w) => w.stores.some((s) => s.id === store.id));
};
