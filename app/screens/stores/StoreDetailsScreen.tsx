import { Text, View } from 'react-native-ui-lib';
import { StoreDetailsScreenRouteProp } from './StoresStackScreen';
import Store from '../../models/Store';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Wine from '../../models/Wine';
import WineCardList from '../../components/WineCardList';
import { fetchStoreByIdAsync } from '../../features/stores/storesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

const StoreDetailsScreen: React.FC<{ route: StoreDetailsScreenRouteProp }> = ({ route }): React.ReactElement => {
    const dispatch: AppDispatch = useDispatch();
    const stores = useSelector((state: RootState) => (state.stores.status !== 'failed' ? state.stores.data : []));

    useEffect(() => {
        dispatch(fetchStoreByIdAsync(route.params.store.id));
    }, []);

    const store: Store = stores[0];
    const winesAtStore: Wine[] = store.wines;

    return (
        <View>
            <Text text40 style={styles.text}>
                {store.name}
            </Text>
            <Text text70 style={styles.text}>
                Addresse: {store.address}
            </Text>
            <Text text70 style={styles.text}>
                Website: {store.url}
            </Text>
            <View>
                <WineCardList wines={winesAtStore} />
            </View>
        </View>
    );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({
    text: {
        marginTop: 5,
        marginLeft: 10
    }
});
