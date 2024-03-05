import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import AddButton from '../../components/PlusButton';
import SearchBar from '../../components/SearchBar';
import WineCard from '../../components/wines/WineCard';
import { WINES_STACK_SCREEN_NAMES } from '../../constants/RouteNames';
import {
  fetchWinesAsync,
  selectWinePage,
} from '../../features/wines/winesSlice';
import Page from '../../models/Page';
import Wine from '../../models/Wine';
import { AppDispatch } from '../../store/store';
import { WinesStackParamList } from './WinesStackScreen';

const WinesScreen = ({
  navigation,
}: NativeStackScreenProps<
  WinesStackParamList,
  WINES_STACK_SCREEN_NAMES.WINES_SCREEN
>) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const winePage: Page<Wine> = useSelector(selectWinePage);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Wine[]>(winePage.data);

  const performSearch = useCallback(() => {
    if (searchQuery === '') {
      setSearchResults(winePage.data);
    } else {
      const results = winePage.data.filter((w) =>
        w.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(results);
    }
  }, [searchQuery, winePage.data]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    performSearch();
  }, [searchQuery, performSearch, winePage.data]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchWinesAsync());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWinesAsync());
  }, [dispatch]);

  const onEndReached = useCallback(async () => {
    console.log('Trying to reload');
    if (winePage.meta.hasNextPage) {
      console.log('reloading');
      dispatch(fetchWinesAsync({ page: winePage.meta.page + 1 }));
    }
  }, [dispatch, winePage.meta.hasNextPage, winePage.meta.page]);

  const onAddButtonPress = useCallback(() => {
    navigation.push(WINES_STACK_SCREEN_NAMES.WINE_ADD_SCREEN);
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <FlatList
        data={searchResults}
        renderItem={({ item }: { item: Wine }) => <WineCard wine={item} />}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.4}
        onEndReached={onEndReached}
      />
      <AddButton onPress={() => onAddButtonPress()} style={styles.plusButton} />
    </View>
  );
};

export default WinesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  wineListContainer: {},
  plusButton: {
    position: 'absolute',
    right: 50,
    bottom: 50,
  },
});
