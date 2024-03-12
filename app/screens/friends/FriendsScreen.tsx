import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Button, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import User from '../../models/User';
import Page from '../../models/Page';
import {
  fetchFriendsForUserAsync,
  selectFriendRelationsByUserUsername,
} from '../../features/users/userFriendsSlice';
import {
  fetchCurrentUserAsync,
  selectCurrentUser,
} from '../../features/users/currentUserSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FriendsStackParamList } from './FriendsStackScreen';
import { FRIENDS_STACK_SCREEN_NAMES } from '../../constants/RouteNames';

const FriendsScreen = ({
  navigation,
}: NativeStackScreenProps<
  FriendsStackParamList,
  FRIENDS_STACK_SCREEN_NAMES.FRIENDS_SCREEN
>) => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser: User = useSelector<RootState, User>((state) =>
    selectCurrentUser(state),
  );
  const friendsPage: Page<User> = useSelector<RootState, Page<User>>((state) =>
    selectFriendRelationsByUserUsername(state, currentUser?.username),
  );

  useEffect(() => {
    dispatch(fetchCurrentUserAsync());
    if (currentUser) {
      dispatch(fetchFriendsForUserAsync({ username: currentUser?.username }));
    }
  }, [currentUser?.username, dispatch]);

  if (!currentUser) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            label="Add Friend"
            onPress={() =>
              navigation.push(FRIENDS_STACK_SCREEN_NAMES.ADD_FRIEND_SCREEN)
            }
          />
          <Button style={styles.button} label="Incoming" />
          <Button style={styles.button} label="Outgoing" />
        </View>
        {friendsPage.data.map((friend) => (
          <TouchableOpacity
            key={friend.id}
            onPress={() =>
              navigation.push(
                FRIENDS_STACK_SCREEN_NAMES.FRIEND_ACCOUNT_SCREEN,
                {
                  user: friend,
                },
              )
            }
          >
            <View>
              <Text style={styles.friendName}>{friend.username}</Text>
              <View style={styles.separator} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
