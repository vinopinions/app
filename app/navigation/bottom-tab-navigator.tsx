import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import React from 'react';
import { AccountDrawer } from '../screens/account/account-drawer';
import FriendsScreen from '../screens/friends/friends-screen';
import HomeScreen from '../screens/home/home-screen';
import StoreScreen from '../screens/store/store-screen';
import WinesScreen from '../screens/wines/wines-screen';
import { AccountIcon, FriendsIcon, HomeIcon, StoreIcon, WineIcon } from '../utils/icons';

const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab icon={HomeIcon} />
        <BottomNavigationTab icon={WineIcon} />
        <BottomNavigationTab icon={StoreIcon} />
        <BottomNavigationTab icon={FriendsIcon} />
        <BottomNavigationTab icon={AccountIcon} />
    </BottomNavigation>
);

const TabNavigator = () => (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', headerShown: false }} />
        <Tab.Screen
            name="Wines"
            component={WinesScreen}
            options={{
                headerShown: false
            }}
        />
        <Tab.Screen
            name="Stores"
            component={StoreScreen}
            options={{
                headerShown: false
            }}
        />
        <Tab.Screen
            name="Friends"
            component={FriendsScreen}
            options={{
                headerShown: false
            }}
        />
        <Tab.Screen
            name="Account"
            component={AccountDrawer}
            options={{
                headerShown: false
            }}
        />
    </Tab.Navigator>
);

export const AppNavigator = () => {
    return <TabNavigator />;
};
