import { useCallback, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoresAsync } from '../../features/stores/storesSlice';
import { View } from 'react-native-ui-lib';
import { RefreshControl, StyleSheet } from 'react-native';
import StoreCardList from '../../components/stores/StoreCardList';

const StoresScreen = ({ navigation }) => {
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
        <View style={styles.screen}>
            <StoreCardList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} stores={stores} />
        </View>
    );
};

export default StoresScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    }
});
