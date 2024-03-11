import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import AccountScreen from './AccountScreen';

const { Navigator, Screen } = createDrawerNavigator();

const createDrawerContent = () => <></>;

const AccountDrawerScreen = () => (
  <Navigator
    drawerContent={createDrawerContent}
    screenOptions={{ drawerPosition: 'right' }}
  >
    <Screen
      name="Profile"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
  </Navigator>
);

export default AccountDrawerScreen;
