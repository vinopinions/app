import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';
import { Button, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import Store from '../../api/pagination/Store';
import SearchBar from '../../components/SearchBar';
import StoreCard from '../../components/stores/StoreCard';
import { STORES_STACK_SCREEN_NAMES } from '../../constants/RouteNames';
import {
  fetchStoresAsync,
  selectStorePage,
} from '../../features/stores/storesSlice';
import Page from '../../models/Page';
import { AppDispatch } from '../../store/store';
import { StoresStackParamList } from './StoresStackScreen';

const StoresScreen = ({
  navigation,
}: NativeStackScreenProps<
  StoresStackParamList,
  STORES_STACK_SCREEN_NAMES.STORES_SCREEN
>) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const storePage: Page<Store> = useSelector(selectStorePage);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { t } = useTranslation();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchStoresAsync({ filter: searchQuery }));
    setRefreshing(false);
  }, [dispatch, searchQuery]);

  useEffect(() => {
    onRefresh();
  }, [dispatch, onRefresh]);

  const onEndReached = useCallback(async () => {
    if (storePage.meta.hasNextPage) {
      dispatch(
        fetchStoresAsync({
          page: storePage.meta.page + 1,
          filter: searchQuery,
        }),
      );
    }
  }, [dispatch, storePage.meta.hasNextPage, storePage.meta.page, searchQuery]);

  const onAddButtonPress = useCallback(() => {
    navigation.push(STORES_STACK_SCREEN_NAMES.STORE_ADD_SCREEN);
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={(query) => setSearchQuery(query)}
      />
      <FlatList
        data={storePage.data}
        renderItem={({ item }: { item: Store }) => (
          <StoreCard
            store={item}
            onPress={() =>
              navigation.push(STORES_STACK_SCREEN_NAMES.STORE_DETAILS_SCREEN, {
                storeId: item.id,
              })
            }
          />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.4}
        onEndReached={onEndReached}
      />
      <View style={styles.buttonContainer}>
        <Button
          labelStyle={styles.buttonLabel}
          style={styles.button}
          label={t('storesScreen.createStore')}
          onPress={() => onAddButtonPress()}
        />
      </View>
    </View>
  );
};

export default StoresScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  buttonContainer: {
    padding: 10,
    position: 'absolute',
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    width: '50%',
    height: 50,
  },
  buttonLabel: {
    fontSize: 20,
  },
});
