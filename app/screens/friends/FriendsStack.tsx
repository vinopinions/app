import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { FRIENDS_STACK_NAMES } from '../../constants/RouteNames';
import FriendsScreen from './FriendsScreen';

const FriendsStackNavigator = createStackNavigator<FriendsStackParamList>();

export type FriendsStackParamList = {
  [FRIENDS_STACK_NAMES.FRIENDS_SCREEN]: undefined;
};

const FriendsStack = () => {
  return (
    <FriendsStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <FriendsStackNavigator.Screen
        name={FRIENDS_STACK_NAMES.FRIENDS_SCREEN}
        component={FriendsScreen}
      />
    </FriendsStackNavigator.Navigator>
  );
};

export default FriendsStack;
