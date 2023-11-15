import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigationTab, BottomNavigation } from '@ui-kitten/components';
import HomeScreen from '../screens/home/home-screen';
import WineScreen from '../screens/wine/wine-screen';
import StoreScreen from '../screens/store/store-screen';
import FriendsScreen from '../screens/friends/friends-screen';
import { NavigationContainer } from '@react-navigation/native';
import AccountDrawer from '../screens/account/account-drawer';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {
    return (
        <BottomNavigation selectedIndex={state.index} onSelect={index => navigation.navigate(state.routeNames[index])}>
            <BottomNavigationTab title="Home" />
            <BottomNavigationTab title="Wines" />
            <BottomNavigationTab title="Stores" />
            <BottomNavigationTab title="Friends" />
            <BottomNavigationTab title="Account" />
        </BottomNavigation>
    );
};

const TabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
        <Screen name="Home" component={HomeScreen} />
        <Screen name="Wines" component={WineScreen} />
        <Screen name="Stores" component={StoreScreen} />
        <Screen name="Friends" component={FriendsScreen} />
        <Screen name="Account" component={AccountDrawer} />
    </Navigator>
);

export const AppNavigator = () => {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
};
