import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text, TouchableOpacity } from 'react-native-ui-lib';
import { TouchableOpacityProps } from 'react-native-ui-lib/src/incubator';
import { useDispatch, useSelector } from 'react-redux';
import RatingCard from '../../components/ratings/RatingCard';
import { ACCOUNT_STACK_NAMES } from '../../constants/RouteNames';
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
import { SettingsIconOutline } from '../../utils/icons';
import AccountScreenHeader, {
  AccountScreenHeaderProps,
} from './AccountScreenHeader';
import { AccountStackParamList } from './AccountStack';

const renderHeader = (props: AccountScreenHeaderProps) => {
  return <AccountScreenHeader {...props} />;
};

const renderTitle = (username: string) => {
  return <Text style={styles.heading}>{username}</Text>;
};

const renderTitleRight = (props?: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props}>
      <SettingsIconOutline size={30} />
    </TouchableOpacity>
  );
};

const AccountScreen = ({
  navigation,
}: NativeStackScreenProps<
  AccountStackParamList,
  ACCOUNT_STACK_NAMES.ACCOUNT_SCREEN
>) => {
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

  useEffect(() => {
    if (user) {
      navigation.setOptions({
        headerShown: true,
        headerTitleAlign: 'left',
        headerTitle: () => {
          return renderTitle(user.username);
        },
        headerRight: () => {
          return renderTitleRight({
            style: styles.settingsButton,
            onPress: () => {
              navigation.push(ACCOUNT_STACK_NAMES.SETTINGS_SCREEN);
            },
          });
        },
      });
    }
  }, [navigation, user]);

  if (user === undefined) {
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

export default AccountScreen;

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  settingsButton: {
    paddingRight: 10,
  },
});
