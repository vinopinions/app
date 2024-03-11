import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import RatingCard from '../../components/ratings/RatingCard';
import {
  fetchCurrentUserAsync,
  selectCurrentUser,
} from '../../features/users/currentUserSlice';
import {
  fetchFriendsForUserAsync,
  selectFriendRelationsByUserUsername,
} from '../../features/users/userFriendsSlice';
import {
  fetchRatingsForUserAsync,
  selectRatingRelationsByUserUsername,
} from '../../features/users/userRatingsSlice';
import Page from '../../models/Page';
import Rating from '../../models/Rating';
import User from '../../models/User';
import { AppDispatch, RootState } from '../../store/store';
import AccountScreenHeader, {
  AccountScreenHeaderProps,
} from './AccountScreenHeader';

const renderHeader = (props: AccountScreenHeaderProps) => {
  return <AccountScreenHeader {...props} />;
};

const AccountScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const user: User = useSelector(selectCurrentUser);
  const ratingsPage: Page<Rating> = useSelector<RootState, Page<Rating>>(
    (state) => selectRatingRelationsByUserUsername(state, user?.username),
  );
  const friendsPage: Page<User> = useSelector<RootState, Page<User>>((state) =>
    selectFriendRelationsByUserUsername(state, user?.username),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchCurrentUserAsync());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchRatingsForUserAsync({ username: user.username }));
      dispatch(fetchFriendsForUserAsync({ username: user.username }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    onRefresh();
  }, [dispatch, onRefresh]);

  if (user === undefined) {
    return <Text>loading</Text>;
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={() =>
        renderHeader({
          username: user.username,
          friendAmount: friendsPage.meta.itemCount,
          ratingAmount: ratingsPage.meta.itemCount,
        })
      }
      data={ratingsPage.data}
      renderItem={({ item }: { item: Rating }) => {
        return <RatingCard rating={item} />;
      }}
    />
  );
};

export default AccountScreen;

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//   },
// });
