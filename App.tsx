import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './app/screens/home-screen';
import AccountScreen from './app/screens/account-screen';
import WineScreen from './app/screens/wine-screen';
import StoreScreen from './app/screens/store-screen';
import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home">
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color, size }) => <FontAwesome5 name="home" color={color} size={size} />
                    }}
                />
                <Tab.Screen
                    name="Wines"
                    component={WineScreen}
                    options={{
                        tabBarLabel: 'Wines',
                        tabBarIcon: ({ color, size }) => <FontAwesome5 name="wine-glass-alt" color={color} size={size} />
                    }}
                />
                <Tab.Screen
                    name="Stores"
                    component={StoreScreen}
                    options={{
                        tabBarLabel: 'Stores',
                        tabBarIcon: ({ color, size }) => <FontAwesome5 name="store-alt" color={color} size={size} />
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={AccountScreen}
                    options={{
                        tabBarLabel: 'Account',
                        tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" color={color} size={size} />
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
