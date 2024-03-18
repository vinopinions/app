import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import RatingCard from '../../components/ratings/RatingCard';
import { FRIENDS_STACK_NAMES } from '../../constants/RouteNames';
import { fetchCurrentUserAsync } from '../../features/users/currentUserSlice';
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
} from '../account/AccountScreenHeader';
import { FriendsStackParamList } from './FriendsStack';

const renderHeader = (props: AccountScreenHeaderProps) => {
  return <AccountScreenHeader {...props} />;
};

const renderTitle = (username: string) => {
  return <Text style={styles.heading}>{username}</Text>;
};

const FriendAccountScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<
  FriendsStackParamList,
  FRIENDS_STACK_NAMES.FRIEND_ACCOUNT_SCREEN
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

  useEffect(() => {
    if (route.params.user) {
      navigation.setOptions({
        headerShown: true,
        headerTitleAlign: 'left',
        headerTitle: () => {
          return renderTitle(route.params.user.username);
        },
      });
    }
  }, [navigation, route.params.user]);

  if (route.params.user === undefined) {
    return <Text>loading</Text>;
  }

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() =>
          renderHeader({
            friendAmount: friendsPage.meta.itemCount,
            ratingAmount: ratingsPage.meta.itemCount,
          })
        }
        data={ratingsPage.data}
        renderItem={({ item }: { item: Rating }) => {
          return <RatingCard rating={item} />;
        }}
      />
    </SafeAreaView>
  );
};

export default FriendAccountScreen;

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 32,
  },
});
