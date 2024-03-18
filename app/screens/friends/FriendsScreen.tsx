import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import { FRIENDS_STACK_NAMES } from '../../constants/RouteNames';
import {
  fetchCurrentUserAsync,
  selectCurrentUser,
} from '../../features/users/currentUserSlice';
import {
  fetchFriendsForUserAsync,
  selectFriendRelationsByUserUsername,
} from '../../features/users/userFriendsSlice';
import Page from '../../models/Page';
import User from '../../models/User';
import { AppDispatch, RootState } from '../../store/store';
import { FriendsStackParamList } from './FriendsStack';

const FriendsScreen = ({
  navigation,
}: NativeStackScreenProps<
  FriendsStackParamList,
  FRIENDS_STACK_NAMES.FRIENDS_SCREEN
>) => {
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const currentUser: User = useSelector<RootState, User>((state) =>
    selectCurrentUser(state),
  );
  const friendsPage: Page<User> = useSelector<RootState, Page<User>>((state) =>
    selectFriendRelationsByUserUsername(state, currentUser?.username),
  );

  useEffect(() => {
    dispatch(fetchCurrentUserAsync());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(
        fetchFriendsForUserAsync({ username: currentUser.username, take: 25 }),
      );
    }
  }, [dispatch, currentUser]);

  const onEndReached = useCallback(async () => {
    if (friendsPage.meta.hasNextPage) {
      dispatch(
        fetchFriendsForUserAsync({
          username: currentUser.username,
          take: 25,
          page: friendsPage.meta.page + 1,
        }),
      );
    }
  }, [
    dispatch,
    friendsPage.meta.hasNextPage,
    friendsPage.meta.page,
    currentUser,
  ]);

  // load users on refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(
      fetchFriendsForUserAsync({ username: currentUser.username, take: 25 }),
    );

    setRefreshing(false);
  }, [dispatch, currentUser]);

  if (!currentUser) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          label={t('friendsStack.friendsScreen.addFriend')}
          onPress={() => navigation.push(FRIENDS_STACK_NAMES.FRIEND_ADD_SCREEN)}
        />
        <Button
          style={styles.button}
          label={t('friendsStack.friendsScreen.incoming')}
          onPress={() =>
            navigation.push(FRIENDS_STACK_NAMES.FRIEND_REQUESTS_INCOMING_SCREEN)
          }
        />
        <Button
          style={styles.button}
          label={t('friendsStack.friendsScreen.outgoing')}
          onPress={() =>
            navigation.push(FRIENDS_STACK_NAMES.FRIEND_REQUESTS_OUTGOING_SCREEN)
          }
        />
      </View>
      <FlatList
        data={friendsPage.data}
        renderItem={({ item }: { item: User }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.push(FRIENDS_STACK_NAMES.FRIEND_ACCOUNT_SCREEN, {
                user: item,
              })
            }
          >
            <View>
              <Text style={styles.friendName}>{item.username}</Text>
              <View style={styles.separator} />
            </View>
          </TouchableOpacity>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.4}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '100%',
    marginVertical: 5,
  },
  friendName: {
    padding: 5,
    fontSize: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  },
});
