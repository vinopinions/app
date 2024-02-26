import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import WineCardList from '../../components/WineCardList';
import {
  fetchStoresAsync,
  selectStoreById,
} from '../../features/stores/storesSlice';
import {
  fetchWinesAsync,
  selectWinesByStoreId,
} from '../../features/wines/winesSlice';
import Store from '../../models/Store';
import Wine from '../../models/Wine';
import { AppDispatch, RootState } from '../../store/store';
import { StoreDetailsScreenRouteProp } from './StoresStackScreen';

const StoreDetailsScreen: React.FC<{ route: StoreDetailsScreenRouteProp }> = ({
  route,
}): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();

  const store: Store | undefined = useSelector<RootState, Store>((state) =>
    selectStoreById(state, route.params.storeId),
  );

  const wines: Wine[] = useSelector<RootState, Wine[]>((state) =>
    selectWinesByStoreId(state, route.params.storeId),
  );

  useEffect(() => {
    dispatch(fetchStoresAsync());
    dispatch(fetchWinesAsync());
  }, [dispatch]);

  if (store === undefined) {
    // TODO: insert skeleton
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

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
        <WineCardList wines={wines} />
      </View>
    </View>
  );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    marginLeft: 10,
  },
});
