import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Text } from 'react-native-ui-lib';
import { FriendsStackParamList } from './FriendsStackScreen';
import {
  BOTTOM_TAB_STACK_SCREEN_NAMES,
  FRIENDS_STACK_SCREEN_NAMES,
} from '../../constants/RouteNames';
import { BottomTabStackParamList } from '../../navigation/BottomTabNavigator';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import AccountScreenHeader, {
  AccountScreenHeaderProps,
} from '../account/AccountScreenHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import User from '../../models/User';
import Page from '../../models/Page';
import Rating from '../../models/Rating';
import {
  fetchRatingsForUserAsync,
  selectRatingRelationsByUserUsername,
} from '../../features/users/userRatingsSlice';
import {
  fetchFriendsForUserAsync,
  selectFriendRelationsByUserUsername,
} from '../../features/users/userFriendsSlice';
import { fetchCurrentUserAsync } from '../../features/users/currentUserSlice';
import RatingCard from '../../components/ratings/RatingCard';

const renderHeader = (props: AccountScreenHeaderProps) => {
  return <AccountScreenHeader {...props} />;
};

const FriendAccountScreen = ({
  route,
}: CompositeScreenProps<
  NativeStackScreenProps<
    FriendsStackParamList,
    FRIENDS_STACK_SCREEN_NAMES.FRIEND_ACCOUNT_SCREEN
  >,
  BottomTabScreenProps<
    BottomTabStackParamList,
    BOTTOM_TAB_STACK_SCREEN_NAMES.FRIENDS_SCREEN
  >
>) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const ratingsPage: Page<Rating> = useSelector<RootState, Page<Rating>>(
    (state) =>
      selectRatingRelationsByUserUsername(state, route.params.user?.username),
  );
  const friendsPage: Page<User> = useSelector<RootState, Page<User>>((state) =>
    selectFriendRelationsByUserUsername(state, route.params.user?.username),
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchCurrentUserAsync());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    if (route.params.user) {
      dispatch(
        fetchRatingsForUserAsync({ username: route.params.user.username }),
      );
      dispatch(
        fetchFriendsForUserAsync({ username: route.params.user.username }),
      );
    }
  }, [dispatch, route.params.user]);

  useEffect(() => {
    onRefresh();
  }, [dispatch, onRefresh]);

  if (route.params.user === undefined) {
    return <Text>loading</Text>;
  }

  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={() =>
        renderHeader({
          username: route.params.user.username,
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

export default FriendAccountScreen;
