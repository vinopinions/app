import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import RatingCard from '../../components/ratings/RatingCard';
import { fetchFeedAsync, selectFeed } from '../../features/feed/feedSlice';
import Page from '../../models/Page';
import Rating from '../../models/Rating';
import { AppDispatch } from '../../store/store';

const HomeScreen = () => {
  const feed: Page<Rating> = useSelector(selectFeed);
  const dispatch: AppDispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchFeedAsync());
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      dispatch(fetchFeedAsync());
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  const onEndReached = useCallback(async () => {
    if (feed.meta.hasNextPage) {
      dispatch(fetchFeedAsync({ page: feed.meta.page + 1 }));
    }
  }, [dispatch, feed.meta.hasNextPage, feed.meta.page]);

  return (
    <View style={styles.screen}>
      <FlatList
        data={feed.data}
        renderItem={({ item }: { item: Rating }) => (
          <RatingCard rating={item} />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.2}
        onEndReached={onEndReached}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
