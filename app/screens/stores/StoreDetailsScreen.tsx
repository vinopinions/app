import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import WineCardList from '../../components/WineCardList';
import { fetchWinesAsync } from '../../features/wines/winesSlice';
import Store from '../../models/Store';
import Wine from '../../models/Wine';
import { AppDispatch, RootState } from '../../store/store';
import { StoreDetailsScreenRouteProp } from './StoresStackScreen';

const StoreDetailsScreen: React.FC<{ route: StoreDetailsScreenRouteProp }> = ({
  route,
}): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const store: Store = route.params.store;
  const [wines, setWines] = useState<Wine[]>([]);
  const allWines = useSelector((state: RootState) =>
    state.wines.status !== 'failed' ? state.wines.data : [],
  );

  useEffect(() => {
    dispatch(fetchWinesAsync());
  }, [dispatch, store.id, store.wines]);

  useEffect(() => {
    setWines(
      allWines.filter((wine) =>
        wine.stores.some((wineStore) => wineStore.id === store.id),
      ),
    );
  }, [store.id, allWines]);

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
