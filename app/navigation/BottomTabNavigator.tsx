import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import { Button, ButtonProps } from 'react-native-ui-lib';
import { useAuth } from '../auth/AuthContext';
import { BOTTOM_TAB_STACK_SCREEN_NAMES } from '../constants/RouteNames';
import { AccountDrawer } from '../screens/account/account-drawer';
import FriendsScreen from '../screens/friends/FriendsScreen';
import HomeScreen from '../screens/home/HomeScreen';
import StoresStackScreen, {
  StoresStackParamList,
} from '../screens/stores/StoresStackScreen';
import WinesStackScreen, {
  WinesStackParamList,
} from '../screens/wines/WinesStackScreen';
import {
  AccountIcon,
  AccountIconOutline,
  FriendsIcon,
  FriendsIconOutline,
  HomeIcon,
  HomeIconOutline,
  StoreIcon,
  StoreIconOutline,
  WineIcon,
  WineIconOutline,
} from '../utils/icons';

const BottomTab = createBottomTabNavigator<BottomTabStackParamList>();

export type BottomTabStackParamList = {
  [BOTTOM_TAB_STACK_SCREEN_NAMES.HOME_SCREEN]: undefined;
  [BOTTOM_TAB_STACK_SCREEN_NAMES.WINES_STACK_SCREEN]: NavigatorScreenParams<WinesStackParamList>;
  [BOTTOM_TAB_STACK_SCREEN_NAMES.STORES_STACK_SCREEN]: NavigatorScreenParams<StoresStackParamList>;
  [BOTTOM_TAB_STACK_SCREEN_NAMES.FRIENDS_SCREEN]: undefined;
  [BOTTOM_TAB_STACK_SCREEN_NAMES.ACCOUNT_SCREEN]: undefined;
};

const createSignOutButton = (props: ButtonProps) => (
  <Button {...props} label="Sign Out" />
);

const BottomTabNavigator = () => {
  const { logout } = useAuth();
  return (
    <BottomTab.Navigator
      initialRouteName={BOTTOM_TAB_STACK_SCREEN_NAMES.HOME_SCREEN}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, color, focused }) => {
          return getIconForScreen(route.name, size, color, focused);
        },
      })}
    >
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_SCREEN_NAMES.HOME_SCREEN}
        component={HomeScreen}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_SCREEN_NAMES.WINES_STACK_SCREEN}
        component={WinesStackScreen}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_SCREEN_NAMES.STORES_STACK_SCREEN}
        component={StoresStackScreen}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_SCREEN_NAMES.FRIENDS_SCREEN}
        component={FriendsScreen}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_SCREEN_NAMES.ACCOUNT_SCREEN}
        component={AccountDrawer}
        options={{
          headerRight: () => createSignOutButton({ onPress: logout }),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;

const getIconForScreen = (
  routeName: string,
  size: number,
  color: string,
  focused: boolean,
): React.JSX.Element => {
  switch (routeName) {
    case BOTTOM_TAB_STACK_SCREEN_NAMES.HOME_SCREEN:
      return focused ? (
        <HomeIcon size={size} color={color} />
      ) : (
        <HomeIconOutline size={size} color={color} />
      );
    case BOTTOM_TAB_STACK_SCREEN_NAMES.WINES_STACK_SCREEN:
      return focused ? (
        <WineIcon size={size} color={color} />
      ) : (
        <WineIconOutline size={size} color={color} />
      );
    case BOTTOM_TAB_STACK_SCREEN_NAMES.STORES_STACK_SCREEN:
      return focused ? (
        <StoreIcon size={size} color={color} />
      ) : (
        <StoreIconOutline size={size} color={color} />
      );
    case BOTTOM_TAB_STACK_SCREEN_NAMES.FRIENDS_SCREEN:
      return focused ? (
        <FriendsIcon size={size} color={color} />
      ) : (
        <FriendsIconOutline size={size} color={color} />
      );
    case BOTTOM_TAB_STACK_SCREEN_NAMES.ACCOUNT_SCREEN:
      return focused ? (
        <AccountIcon size={size} color={color} />
      ) : (
        <AccountIconOutline size={size} color={color} />
      );
  }
};
