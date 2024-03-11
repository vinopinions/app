import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import React, { useEffect } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import User from '../../models/User';
import Page from '../../models/Page';
import {
  fetchFriendsForUserAsync,
  selectFriendsRelationsByUsername,
} from '../../features/users/userFriendsSlice';
import { fetchCurrentUserAsync, selectCurrentUser } from '../../features/users/currentUserSlice';

const FriendsScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser: User = useSelector<RootState, User>((state) =>
    selectCurrentUser(state),
  );
  const friendsPage: Page<User> = useSelector<RootState, Page<User>>((state) =>
    selectFriendsRelationsByUsername(state, currentUser?.username),
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
    <View style={[styles.screen]}>
      <Text>{friendsPage.data.map((f) => f.username)}</Text>
    </View>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
