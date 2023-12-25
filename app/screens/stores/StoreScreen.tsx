import { SafeAreaView, StyleSheet } from 'react-native';
import StoreCardList from '../../components/stores/StoreCardList';
import { RefreshControl } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoresAsync } from '../../features/stores/storesSlice';

const StoreScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const stores = useSelector((state: RootState) => state.stores.items);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        dispatch(fetchStoresAsync());
        setRefreshing(false);
    }, []);

    useEffect(() => {
        dispatch(fetchStoresAsync());
    }, []);

    return (
        <SafeAreaView style={styles.screen}>
            <StoreCardList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} stores={stores} />
        </SafeAreaView>
    );
};

export default StoreScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
