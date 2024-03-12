import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ACCOUNT_STACK_NAMES } from '../../constants/RouteNames';
import AccountScreen from './AccountScreen';
import SettingsScreen from './SettingsScreen';

const AccountStackNavigator = createStackNavigator<AccountStackParamList>();

export type AccountStackParamList = {
  [ACCOUNT_STACK_NAMES.ACCOUNT_SCREEN]: undefined;
  [ACCOUNT_STACK_NAMES.SETTINGS_SCREEN]: undefined;
};

const AccountStack = () => {
  return (
    <AccountStackNavigator.Navigator>
      <AccountStackNavigator.Screen
        name={ACCOUNT_STACK_NAMES.ACCOUNT_SCREEN}
        component={AccountScreen}
      />
      <AccountStackNavigator.Screen
        name={ACCOUNT_STACK_NAMES.SETTINGS_SCREEN}
        component={SettingsScreen}
      />
    </AccountStackNavigator.Navigator>
  );
};

export default AccountStack;
