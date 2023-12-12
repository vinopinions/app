import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { AccountDrawer } from '../screens/account/account-drawer';
import FriendsScreen from '../screens/friends/FriendsScreen';
import HomeScreen from '../screens/home/HomeScreen';
import StoreScreen from '../screens/store/store-screen';
import WinesStackScreen from '../screens/wines/WinesStackScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
        <BottomTab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home', headerShown: false }} />
        <BottomTab.Screen
            name="WinesStack"
            component={WinesStackScreen}
            options={{
                headerShown: false,
                title: 'Wines'
            }}
        />
        <BottomTab.Screen
            name="Stores"
            component={StoreScreen}
            options={{
                headerShown: false
            }}
        />
        <BottomTab.Screen
            name="Friends"
            component={FriendsScreen}
            options={{
                headerShown: false
            }}
        />
        <BottomTab.Screen
            name="Account"
            component={AccountDrawer}
            options={{
                headerShown: false
            }}
        />
    </BottomTab.Navigator>
);

export default BottomTabNavigator;
