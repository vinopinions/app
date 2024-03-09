import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import RatingCard from '../../components/ratings/RatingCard';
import {
  fetchCurrentUserAsync,
  selectCurrentUser,
} from '../../features/users/currentUserSlice';
import {
  fetchRatingsForUserAsync,
  selectRatingRelationsByUserUsername,
} from '../../features/users/userRatingsSlice';
import Page from '../../models/Page';
import Rating from '../../models/Rating';
import User from '../../models/User';
import { AppDispatch, RootState } from '../../store/store';

const AccountScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const user: User = useSelector(selectCurrentUser);
  const ratingsPage: Page<Rating> = useSelector<RootState, Page<Rating>>(
    (state) => selectRatingRelationsByUserUsername(state, user?.username),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchCurrentUserAsync());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchRatingsForUserAsync({ username: user.username }));
    }
  });

  useEffect(() => {
    onRefresh();
  }, [dispatch, onRefresh]);

  return (
    <View style={styles.screen}>
      <Text>{user?.username}</Text>
      {ratingsPage.data.map((rating) => {
        return <RatingCard rating={rating} />;
      })}
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
