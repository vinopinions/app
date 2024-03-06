import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
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
  const [searchResults, setSearchResults] = useState<Store[]>(storePage.data);

  const performSearch = useCallback(() => {
    if (searchQuery === '') {
      setSearchResults(storePage.data);
    } else {
      const results = storePage.data.filter((w) =>
        w.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(results);
    }
  }, [searchQuery, storePage.data]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    performSearch();
  }, [searchQuery, performSearch, storePage.data]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchStoresAsync());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchStoresAsync());
  }, [dispatch]);

  const onEndReached = useCallback(async () => {
    if (storePage.meta.hasNextPage) {
      dispatch(fetchStoresAsync({ page: storePage.meta.page + 1 }));
    }
  }, [dispatch, storePage.meta.hasNextPage, storePage.meta.page]);

  const onAddButtonPress = useCallback(() => {
    navigation.push(STORES_STACK_SCREEN_NAMES.STORE_ADD_SCREEN);
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <FlatList
        data={searchResults}
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
        <Button label={'Add Store'} onPress={() => onAddButtonPress()} />
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
  },
});
