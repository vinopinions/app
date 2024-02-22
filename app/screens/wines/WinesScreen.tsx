import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import AddButton from '../../components/PlusButton';
import SearchBar from '../../components/SearchBar';
import WineCardList from '../../components/WineCardList';
import { fetchWinesAsync } from '../../features/wines/winesSlice';
import Wine from '../../models/Wine';
import { AppDispatch, RootState } from '../../store/store';

const WinesScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const wines = useSelector((state: RootState) =>
    state.wines.status !== 'failed' ? state.wines.data : [],
  );
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
    navigation.navigate('AddWineScreen');
  }, [navigation]);
  return (
    <View style={styles.screen}>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <WineCardList
        refreshing={refreshing}
        onRefresh={onRefresh}
        wines={searchResults}
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
