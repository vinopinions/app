import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import { TFunction } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ButtonProps } from 'react-native-ui-lib';
import { useAuth } from '../auth/AuthContext';
import { BOTTOM_TAB_STACK_SCREEN_NAMES } from '../constants/RouteNames';
import AccountDrawer from '../screens/account/AccountDrawerScreen';
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

const createSignOutButton = (
  props: ButtonProps,
  t: TFunction<'translation', undefined>,
) => <Button {...props} label={t('common.signOut')} />;

const BottomTabNavigator = () => {
  const { t } = useTranslation();
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
        options={{
          title: t('homeScreen.name'),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_SCREEN_NAMES.WINES_STACK_SCREEN}
        component={WinesStackScreen}
        options={{
          title: t('winesScreen.name'),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_SCREEN_NAMES.STORES_STACK_SCREEN}
        component={StoresStackScreen}
        options={{
          title: t('storesScreen.name'),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_SCREEN_NAMES.FRIENDS_SCREEN}
        component={FriendsScreen}
        options={{
          title: t('friendsScreen.name'),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_SCREEN_NAMES.ACCOUNT_SCREEN}
        component={AccountDrawer}
        options={{
          title: t('accountScreen.name'),
          headerRight: () => createSignOutButton({ onPress: logout }, t),
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
