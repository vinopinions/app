import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FRIENDS_STACK_NAMES } from '../../constants/RouteNames';
import User from '../../models/User';
import AddFriendScreen from './AddFriendScreen';
import FriendAccountScreen from './FriendAccountPage';
import FriendsScreen from './FriendsScreen';
import IncomingFriendRequestsScreen from './IncomingFriendRequestsScreen';
import OutgoingFriendRequestsScreen from './OutgoingFriendRequestsScreen';

const FriendsStackNavigator = createStackNavigator<FriendsStackParamList>();

export type FriendsStackParamList = {
  [FRIENDS_STACK_NAMES.FRIENDS_SCREEN]: undefined;
  [FRIENDS_STACK_NAMES.FRIEND_ACCOUNT_SCREEN]: { user: User };
  [FRIENDS_STACK_NAMES.FRIEND_ADD_SCREEN]: undefined;
  [FRIENDS_STACK_NAMES.FRIEND_REQUESTS_INCOMING_SCREEN]: undefined;
  [FRIENDS_STACK_NAMES.FRIEND_REQUESTS_OUTGOING_SCREEN]: undefined;
};

const FriendsStack = () => {
  const { t } = useTranslation();

  return (
    <FriendsStackNavigator.Navigator>
      <FriendsStackNavigator.Screen
        name={FRIENDS_STACK_NAMES.FRIENDS_SCREEN}
        component={FriendsScreen}
        options={{
          title: t('common.friends'),
        }}
      />
      <FriendsStackNavigator.Screen
        name={FRIENDS_STACK_NAMES.FRIEND_ACCOUNT_SCREEN}
        component={FriendAccountScreen}
      />
      <FriendsStackNavigator.Screen
        name={FRIENDS_STACK_NAMES.FRIEND_ADD_SCREEN}
        component={AddFriendScreen}
        options={{
          title: t('friendsStack.addFriendsScreen.title'),
          headerBackTitleVisible: false,
        }}
      />
      <FriendsStackNavigator.Screen
        name={FRIENDS_STACK_NAMES.FRIEND_REQUESTS_INCOMING_SCREEN}
        component={IncomingFriendRequestsScreen}
      />
      <FriendsStackNavigator.Screen
        name={FRIENDS_STACK_NAMES.FRIEND_REQUESTS_OUTGOING_SCREEN}
        component={OutgoingFriendRequestsScreen}
      />
    </FriendsStackNavigator.Navigator>
  );
};

export default FriendsStack;
