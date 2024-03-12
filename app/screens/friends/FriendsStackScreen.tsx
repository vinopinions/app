import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FRIENDS_STACK_SCREEN_NAMES } from '../../constants/RouteNames';
import User from '../../models/User';
import FriendsScreen from './FriendsScreen';
import FriendAccountScreen from './FriendAccountPage';
import AddFriendScreen from './AddFriendScreen';

const FriendsStack = createStackNavigator<FriendsStackParamList>();

export type FriendsStackParamList = {
  [FRIENDS_STACK_SCREEN_NAMES.FRIENDS_SCREEN]: undefined;
  [FRIENDS_STACK_SCREEN_NAMES.FRIEND_ACCOUNT_SCREEN]: { user: User };
  [FRIENDS_STACK_SCREEN_NAMES.ADD_FRIEND_SCREEN]: undefined;
};

const FriendsStackScreen = () => {
  return (
    <FriendsStack.Navigator screenOptions={{ headerShown: false }}>
      <FriendsStack.Screen
        name={FRIENDS_STACK_SCREEN_NAMES.FRIENDS_SCREEN}
        component={FriendsScreen}
      />
      <FriendsStack.Screen
        name={FRIENDS_STACK_SCREEN_NAMES.FRIEND_ACCOUNT_SCREEN}
        component={FriendAccountScreen}
      />
      <FriendsStack.Screen
        name={FRIENDS_STACK_SCREEN_NAMES.ADD_FRIEND_SCREEN}
        component={AddFriendScreen}
      />
    </FriendsStack.Navigator>
  );
};

export default FriendsStackScreen;
