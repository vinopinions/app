import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Image, TouchableOpacity } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import UserView from '../../components/users/UserView';
import {
  BOTTOM_TAB_STACK_NAMES,
  FRIENDS_STACK_NAMES,
  WINES_STACK_NAMES,
} from '../../constants/RouteNames';
import { fetchCurrentUserAsync } from '../../features/users/currentUserSlice';
import {
  fetchFriendsForUserAsync,
  selectFriendRelationsByUserUsername,
} from '../../features/users/userFriendsSlice';
import {
  fetchRatingsForUserAsync,
  selectRatingRelationsByUserUsername,
} from '../../features/users/userRatingsSlice';
import {
  fetchShelfForUserAsync,
  selectUserShelfPage,
} from '../../features/users/userShelfSlice';
import Page from '../../models/Page';
import Rating from '../../models/Rating';
import User from '../../models/User';
import Wine from '../../models/Wine';
import { BottomTabStackParamList } from '../../navigation/BottomTabNavigator';
import { AppDispatch, RootState } from '../../store/store';
import AccountScreenHeader, {
  AccountScreenHeaderProps,
} from '../account/AccountScreenHeader';
import { FriendsStackParamList } from './FriendsStack';

const renderHeader = (props: AccountScreenHeaderProps) => {
  return <AccountScreenHeader {...props} />;
};

const renderTitle = (user: User) => {
  return <UserView user={user} />;
};

const AccountScreen = ({
  navigation,
  route,
}: CompositeScreenProps<
  NativeStackScreenProps<
    FriendsStackParamList,
    FRIENDS_STACK_NAMES.FRIEND_ACCOUNT_SCREEN
  >,
  BottomTabScreenProps<
    BottomTabStackParamList,
    BOTTOM_TAB_STACK_NAMES.ACCOUNT_STACK
  >
>) => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const ratingsPage: Page<Rating> = useSelector<RootState, Page<Rating>>(
    (state) =>
      selectRatingRelationsByUserUsername(state, route.params.user.username),
  );
  const friendsPage: Page<User> = useSelector<RootState, Page<User>>((state) =>
    selectFriendRelationsByUserUsername(state, route.params.user.username),
  );
  const shelfPage: Page<Wine> = useSelector<RootState, Page<Wine>>(
    selectUserShelfPage,
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchCurrentUserAsync());
    setRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      fetchRatingsForUserAsync({ username: route.params.user.username }),
    );
    dispatch(
      fetchFriendsForUserAsync({ username: route.params.user.username }),
    );
    dispatch(fetchShelfForUserAsync({ username: route.params.user.username }));
  }, [dispatch, route.params.user]);

  useEffect(() => {
    onRefresh();
  }, [dispatch, onRefresh]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTitle: () => {
        return renderTitle(route.params.user);
      },
    });
  }, [navigation, route.params.user]);

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
        horizontal={false}
        numColumns={3}
        keyExtractor={(item) => item.id}
        data={shelfPage.data}
        renderItem={({ item }: { item: Wine }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(BOTTOM_TAB_STACK_NAMES.WINES_STACK, {
                  screen: WINES_STACK_NAMES.WINE_DETAILS_SCREEN,
                  params: { wineId: item.id },
                })
              }
              style={styles.listItem}
            >
              <Image
                style={styles.listItemImage}
                source={{ uri: item.image }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  listItemImage: {
    flex: 1,
  },
  listItem: {
    width: '33%',
    aspectRatio: 1,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  settingsButton: {
    paddingRight: 10,
  },
});
