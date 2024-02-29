import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import AddButton from '../../components/PlusButton';
import SearchBar from '../../components/SearchBar';
import WineCard from '../../components/wines/WineCard';
import { WINES_STACK_SCREEN_NAMES } from '../../constants/RouteNames';
import { fetchWinesAsync } from '../../features/wines/winesSlice';
import Wine from '../../models/Wine';
import { AppDispatch, RootState } from '../../store/store';
import { WinesStackParamList } from './WinesStackScreen';

const WinesScreen = ({
  navigation,
}: NativeStackScreenProps<
  WinesStackParamList,
  WINES_STACK_SCREEN_NAMES.WINES_SCREEN
>) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const wines = useSelector((state: RootState) => state.wines.data);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Wine[]>(wines);

  const performSearch = useCallback(() => {
    if (searchQuery === '') {
      setSearchResults(wines);
    } else {
      const results = wines.filter((w) =>
        w.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setSearchResults(results);
    }
  }, [searchQuery, wines]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    performSearch();
  }, [searchQuery, performSearch, wines]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchWinesAsync());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWinesAsync());
  }, [dispatch]);

  const onAddButtonPress = useCallback(() => {
    navigation.push(WINES_STACK_SCREEN_NAMES.WINE_ADD_SCREEN);
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {searchResults.map((wine, index) => (
          <WineCard wine={wine} key={index} />
        ))}
      </ScrollView>
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
