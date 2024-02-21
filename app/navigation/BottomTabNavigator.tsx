import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { AccountDrawer } from '../screens/account/account-drawer';
import FriendsScreen from '../screens/friends/FriendsScreen';
import HomeScreen from '../screens/home/HomeScreen';
import StoresStackScreen from '../screens/stores/StoresStackScreen';
import WinesStackScreen from '../screens/wines/WinesStackScreen';
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
import { useAuth } from '../auth/AuthContext';
import { Button } from 'react-native-ui-lib';

const HomeRouteName = 'Home';
const WinesStackRouteName = 'WinesStack';
const StoresRouteName = 'Stores';
const FriendsRouteName = 'Friends';
const AccountRouteName = 'Account';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { logout } = useAuth();
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ size, color, focused }) => {
          return getIconForScreen(route.name, size, color, focused);
        },
      })}
    >
      <BottomTab.Screen
        name={HomeRouteName}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name={WinesStackRouteName}
        component={WinesStackScreen}
        options={{
          headerShown: false,
          title: 'Wines',
        }}
      />
      <BottomTab.Screen
        name={StoresRouteName}
        component={StoresStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name={FriendsRouteName}
        component={FriendsScreen}
        options={{
          headerShown: false,
        }}
      />
      <BottomTab.Screen
        name={AccountRouteName}
        component={AccountDrawer}
        options={{
          headerShown: true,
          headerRight: () => <Button onPress={logout} label="Sign Out" />,
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
    case HomeRouteName:
      return focused ? (
        <HomeIcon size={size} color={color} />
      ) : (
        <HomeIconOutline size={size} color={color} />
      );
    case WinesStackRouteName:
      return focused ? (
        <WineIcon size={size} color={color} />
      ) : (
        <WineIconOutline size={size} color={color} />
      );
    case StoresRouteName:
      return focused ? (
        <StoreIcon size={size} color={color} />
      ) : (
        <StoreIconOutline size={size} color={color} />
      );
    case FriendsRouteName:
      return focused ? (
        <FriendsIcon size={size} color={color} />
      ) : (
        <FriendsIconOutline size={size} color={color} />
      );
    case AccountRouteName:
      return focused ? (
        <AccountIcon size={size} color={color} />
      ) : (
        <AccountIconOutline size={size} color={color} />
      );
  }
};
