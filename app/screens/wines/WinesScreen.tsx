import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet } from 'react-native';
import { Button, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
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
  const [searchDisplayText, setSearchDisplayText] = useState<string>('');
  const { t } = useTranslation();

  // load wines with current filter
  const loadWines = useCallback(() => {
    dispatch(fetchWinesAsync({ filter: searchQuery }));
  }, [dispatch, searchQuery]);

  // debounce the setting of the current search query
  // Why useMemo instead of useCallback?
  // https://github.com/facebook/react/issues/19240#issuecomment-652945246
  const debouncedUpdateQuery = useMemo(() => {
    return debounce((query: string) => {
      setSearchQuery(query);
    }, 200);
  }, []);

  // update display text of SearchField and call debounce function to update search query
  const onSearch = useCallback(
    (query: string) => {
      setSearchDisplayText(query);
      debouncedUpdateQuery(query);
    },
    [debouncedUpdateQuery],
  );

  // load wines on refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    loadWines();
    setRefreshing(false);
  }, [loadWines]);

  // initial load of wines
  useEffect(() => {
    onRefresh();
  }, [dispatch, onRefresh]);

  const onEndReached = useCallback(async () => {
    if (winePage.meta.hasNextPage) {
      dispatch(
        fetchWinesAsync({ page: winePage.meta.page + 1, filter: searchQuery }),
      );
    }
  }, [dispatch, winePage.meta.hasNextPage, winePage.meta.page, searchQuery]);

  const onAddButtonPress = useCallback(() => {
    navigation.push(WINES_STACK_SCREEN_NAMES.WINE_ADD_SCREEN);
  }, [navigation]);

  return (
    <View style={styles.screen}>
      <SearchBar searchQuery={searchDisplayText} handleSearch={onSearch} />
      <FlatList
        data={winePage.data}
        renderItem={({ item }: { item: Wine }) => (
          <WineCard
            wine={item}
            onPress={() =>
              navigation.push(WINES_STACK_SCREEN_NAMES.WINE_DETAILS_SCREEN, {
                wineId: item.id,
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
          label={t('winesScreen.createWine')}
          onPress={() => onAddButtonPress()}
        />
      </View>
    </View>
  );
};

export default WinesScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  wineListContainer: {},
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
