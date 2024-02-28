import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import StoreCardList from '../../components/stores/StoreCardList';
import { STORES_STACK_SCREEN_NAMES } from '../../constants/RouteNames';
import { fetchStoresAsync } from '../../features/stores/storesSlice';
import Store from '../../models/Store';
import { AppDispatch, RootState } from '../../store/store';
import { StoresStackParamList } from './StoresStackScreen';

const StoresScreen = ({
  navigation,
}: NativeStackScreenProps<
  StoresStackParamList,
  STORES_STACK_SCREEN_NAMES.STORES_SCREEN
>) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const stores = useSelector((state: RootState) =>
    state.stores.status !== 'failed' ? state.stores.data : [],
  );
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Store[]>(stores);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const performSearch = () => {
      if (searchQuery === '') {
        setSearchResults(stores);
      } else {
        const results = stores.filter((s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setSearchResults(results);
      }
    };
    performSearch();
  }, [searchQuery, stores]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchStoresAsync());
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setRefreshing(false);
  }, [stores]);

  useEffect(() => {
    dispatch(fetchStoresAsync());
  }, [dispatch]);

  const onAddButtonPress = () => {
    navigation.push(STORES_STACK_SCREEN_NAMES.STORE_ADD_SCREEN);
  };

  return (
    <View style={styles.screen}>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <StoreCardList
        refreshing={refreshing}
        onRefresh={onRefresh}
        stores={searchResults}
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
