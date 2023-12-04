import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import React from 'react';
import { AccountDrawer } from '../screens/account/account-drawer';
import FriendsScreen from '../screens/friends/friends-screen';
import HomeScreen from '../screens/home/home-screen';
import StoreScreen from '../screens/store/store-screen';
import WinesScreen from '../screens/wines/wines-screen';
import { HomeIcon, WineIcon } from '../utils/icons';

const Tab = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
        <BottomNavigationTab title="Home" />
        <BottomNavigationTab title="Wines" />
        <BottomNavigationTab title="Stores" />
        <BottomNavigationTab title="Friends" />
        <BottomNavigationTab title="Account" />
    </BottomNavigation>
);

const TabNavigator = () => (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <HomeIcon color={color} size={size} />, headerShown: false }}
        />
        <Tab.Screen
            name="Wines"
            component={WinesScreen}
            options={{
                tabBarLabel: 'Test',
                tabBarIcon: ({ color, size }) => <WineIcon color={color} size={size} />,
                headerShown: false
            }}
        />
        <Tab.Screen
            name="Stores"
            component={StoreScreen}
            options={{
                tabBarLabel: 'Stores',
                tabBarIcon: ({ color, size }) => <Icon name={'store-alt'} pack="FontAwesome5" color={color} size={size} />,
                headerShown: false
            }}
        />
        <Tab.Screen
            name="Friends"
            component={FriendsScreen}
            options={{
                tabBarLabel: 'Friends',
                tabBarIcon: ({ color, size }) => <Icon name={'user-friends'} color={color} size={size} />,
                headerShown: false
            }}
        />
        <Tab.Screen
            name="Account"
            component={AccountDrawer}
            options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ color, size }) => <FontAwesome5 name={'user-alt'} color={color} size={size} />,
                headerShown: false
            }}
        />
    </Tab.Navigator>
);

export const AppNavigator = () => {
    return <TabNavigator />;
};
