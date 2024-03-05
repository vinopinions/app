import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import WineCard from '../../components/wines/WineCard';
import {
  BOTTOM_TAB_STACK_SCREEN_NAMES,
  STORES_STACK_SCREEN_NAMES,
} from '../../constants/RouteNames';
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
import { BottomTabStackParamList } from '../../navigation/BottomTabNavigator';
import { AppDispatch, RootState } from '../../store/store';
import { StoresStackParamList } from './StoresStackScreen';

const StoreDetailsScreen = ({
  route,
}: CompositeScreenProps<
  NativeStackScreenProps<
    StoresStackParamList,
    STORES_STACK_SCREEN_NAMES.STORE_DETAILS_SCREEN
  >,
  BottomTabScreenProps<
    BottomTabStackParamList,
    BOTTOM_TAB_STACK_SCREEN_NAMES.STORES_STACK_SCREEN
  >
>) => {
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
        <ScrollView>
          {wines.map((wine, index) => (
            <WineCard wine={wine} key={index} />
          ))}
        </ScrollView>
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
