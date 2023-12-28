import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import Store from '../../../models/Store';
import { useEffect } from 'react';
import { fetchWinesAsync } from '../../../features/wines/winesSlice';
import Wine from '../../../models/Wine';

export const getWinesForStore = (store: Store): Wine[] => {
    const dispatch: AppDispatch = useDispatch();
    const wines = useSelector((state: RootState) => state.wines.items);
    useEffect(() => {
        dispatch(fetchWinesAsync());
    }, []);
    return wines.filter(w => {
        return w.stores.some(s => s.id === store.id);
    });
};
