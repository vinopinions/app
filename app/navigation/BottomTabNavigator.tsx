import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { BOTTOM_TAB_STACK_NAMES } from '../constants/RouteNames';
import AccountStack, {
  AccountStackParamList,
} from '../screens/account/AccountStack';
import FriendsStack, {
  FriendsStackParamList,
} from '../screens/friends/FriendsStack';
import HomeStack, { HomeStackParamList } from '../screens/home/HomeStack';
import StoresStack, {
  StoresStackParamList,
} from '../screens/stores/StoresStack';
import WinesStack, { WinesStackParamList } from '../screens/wines/WinesStack';
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
  [BOTTOM_TAB_STACK_NAMES.HOME_STACK]: NavigatorScreenParams<HomeStackParamList>;
  [BOTTOM_TAB_STACK_NAMES.WINES_STACK]: NavigatorScreenParams<WinesStackParamList>;
  [BOTTOM_TAB_STACK_NAMES.STORES_STACK]: NavigatorScreenParams<StoresStackParamList>;
  [BOTTOM_TAB_STACK_NAMES.FRIENDS_STACK]: NavigatorScreenParams<FriendsStackParamList>;
  [BOTTOM_TAB_STACK_NAMES.ACCOUNT_STACK]: NavigatorScreenParams<AccountStackParamList>;
};

const BottomTabNavigator = () => {
  const { t } = useTranslation();
  return (
    <BottomTab.Navigator
      initialRouteName={BOTTOM_TAB_STACK_NAMES.HOME_STACK}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ size, color, focused }) => {
          return getIconForScreen(route.name, size, color, focused);
        },
      })}
    >
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_NAMES.HOME_STACK}
        component={HomeStack}
        options={{
          title: t('homeStack.title'),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_NAMES.WINES_STACK}
        component={WinesStack}
        options={{
          title: t('winesStack.title'),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_NAMES.STORES_STACK}
        component={StoresStack}
        options={{
          title: t('storesStack.title'),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_NAMES.FRIENDS_STACK}
        component={FriendsStack}
        options={{
          title: t('friendsStack.title'),
        }}
      />
      <BottomTab.Screen
        name={BOTTOM_TAB_STACK_NAMES.ACCOUNT_STACK}
        component={AccountStack}
        options={{
          title: t('accountStack.title'),
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
    case BOTTOM_TAB_STACK_NAMES.HOME_STACK:
      return focused ? (
        <HomeIcon size={size} color={color} />
      ) : (
        <HomeIconOutline size={size} color={color} />
      );
    case BOTTOM_TAB_STACK_NAMES.WINES_STACK:
      return focused ? (
        <WineIcon size={size} color={color} />
      ) : (
        <WineIconOutline size={size} color={color} />
      );
    case BOTTOM_TAB_STACK_NAMES.STORES_STACK:
      return focused ? (
        <StoreIcon size={size} color={color} />
      ) : (
        <StoreIconOutline size={size} color={color} />
      );
    case BOTTOM_TAB_STACK_NAMES.FRIENDS_STACK:
      return focused ? (
        <FriendsIcon size={size} color={color} />
      ) : (
        <FriendsIconOutline size={size} color={color} />
      );
    case BOTTOM_TAB_STACK_NAMES.ACCOUNT_STACK:
      return focused ? (
        <AccountIcon size={size} color={color} />
      ) : (
        <AccountIconOutline size={size} color={color} />
      );
  }
};
