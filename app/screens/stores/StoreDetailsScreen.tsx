import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import Store from '../../api/pagination/Store';
import StoreDetailsScreenHeader, {
  StoreDetailsScreenHeaderProps,
} from '../../components/stores/StoreDetailsScreenHeader';
import WineCard from '../../components/wines/WineCard';
import {
  BOTTOM_TAB_STACK_SCREEN_NAMES,
  STORES_STACK_SCREEN_NAMES,
  WINES_STACK_SCREEN_NAMES,
} from '../../constants/RouteNames';
import {
  fetchWinesForStoreAsync,
  selectWineRelationsByStoreId,
} from '../../features/stores/storeWinesSlice';
import {
  fetchStoreByIdAsync,
  selectStoreById,
} from '../../features/stores/storesSlice';
import Page from '../../models/Page';
import Wine from '../../models/Wine';
import { BottomTabStackParamList } from '../../navigation/BottomTabNavigator';
import { AppDispatch, RootState } from '../../store/store';
import { StoresStackParamList } from './StoresStackScreen';

const renderHeader = (props: StoreDetailsScreenHeaderProps) => {
  return <StoreDetailsScreenHeader {...props} />;
};

const StoreDetailsScreen = ({
  route,
  navigation,
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
  const store: Store = useSelector<RootState, Store>((state) =>
    selectStoreById(state, route.params.storeId),
  );

  const winesPage: Page<Wine> = useSelector<RootState, Page<Wine>>((state) =>
    selectWineRelationsByStoreId(state, route.params.storeId),
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      dispatch(fetchStoreByIdAsync(route.params.storeId));
      dispatch(fetchWinesForStoreAsync({ storeId: route.params.storeId }));
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, route.params.storeId]);

  useEffect(() => {
    onRefresh();
  }, [dispatch, onRefresh, route.params.storeId]);

  const onWinesEndReached = useCallback(async () => {
    if (winesPage.meta.hasNextPage) {
      dispatch(
        fetchWinesForStoreAsync({
          storeId: route.params.storeId,
          page: winesPage.meta.page + 1,
        }),
      );
    }
  }, [
    dispatch,
    winesPage.meta.hasNextPage,
    winesPage.meta.page,
    route.params.storeId,
  ]);

  if (store === undefined) {
    // TODO: insert skeleton
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponentStyle={styles.listHeader}
      ListHeaderComponent={() => renderHeader({ store })}
      data={winesPage.data}
      renderItem={({ item }: { item: Wine }) => (
        <WineCard
          onPress={() =>
            navigation.navigate(
              BOTTOM_TAB_STACK_SCREEN_NAMES.WINES_STACK_SCREEN,
              {
                screen: WINES_STACK_SCREEN_NAMES.WINE_DETAILS_SCREEN,
                params: { wineId: item.id },
              },
            )
          }
          wine={item}
        />
      )}
      onEndReachedThreshold={0.4}
      onEndReached={onWinesEndReached}
    />
  );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({
  listHeader: {
    padding: 10,
  },
});
