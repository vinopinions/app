import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ACCOUNT_STACK_NAMES } from '../../constants/RouteNames';
import AccountScreen from './AccountScreen';

const AccountStackNavigator = createStackNavigator<AccountStackParamList>();

export type AccountStackParamList = {
  [ACCOUNT_STACK_NAMES.ACCOUNT_SCREEN]: undefined;
};

const AccountStack = () => {
  return (
    <AccountStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <AccountStackNavigator.Screen
        name={ACCOUNT_STACK_NAMES.ACCOUNT_SCREEN}
        component={AccountScreen}
      />
    </AccountStackNavigator.Navigator>
  );
};

export default AccountStack;
