import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import React from 'react';
import { AccountDrawer } from '../screens/account/account-drawer';
import FriendsScreen from '../screens/friends/friends-screen';
import HomeScreen from '../screens/home/home-screen';
import StoreScreen from '../screens/store/store-screen';
import WineScreen from '../screens/wine/wine-screen';

const { Navigator, Screen } = createBottomTabNavigator();

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
    <Navigator tabBar={props => <BottomTabBar {...props} />} screenOptions={{ headerShown: false }}>
        <Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarLabel: 'Home', tabBarIcon: ({ color, size }) => <Icon name={'home'} color={color} size={size} />, headerShown: false }}
        />
        <Screen
            name="Wines"
            component={WineScreen}
            options={{
                tabBarLabel: 'Wines',
                tabBarIcon: ({ color, size }) => <Icon name={'wine-glass-alt'} color={color} size={size} />,
                headerShown: false
            }}
        />
        <Screen
            name="Stores"
            component={StoreScreen}
            options={{
                tabBarLabel: 'Stores',
                tabBarIcon: ({ color, size }) => <Icon name={'store-alt'} pack="FontAwesome5" color={color} size={size} />,
                headerShown: false
            }}
        />
        <Screen
            name="Friends"
            component={FriendsScreen}
            options={{
                tabBarLabel: 'Friends',
                tabBarIcon: ({ color, size }) => <Icon name={'user-friends'} color={color} size={size} />,
                headerShown: false
            }}
        />
        <Screen
            name="Account"
            component={AccountDrawer}
            options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ color, size }) => <FontAwesome5 name={'user-alt'} color={color} size={size} />,
                headerShown: false
            }}
        />
    </Navigator>
);

export const AppNavigator = () => {
    return <TabNavigator />;
};
