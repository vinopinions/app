import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import AccountScreen from './account-screen';
import EditProfileScreen from './edit-profile-screen';

const { Navigator, Screen } = createDrawerNavigator();

const createDrawerContent = () => <></>;

export const AccountDrawer = () => (
  <Navigator
    drawerContent={createDrawerContent}
    screenOptions={{ drawerPosition: 'right' }}
  >
    <Screen
      name="Profile"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Screen
      name="Edit Profile"
      component={EditProfileScreen}
      options={{ headerShown: false }}
    />
  </Navigator>
);
