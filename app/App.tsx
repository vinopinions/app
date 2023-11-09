import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/home/home-screen';
import WineScreen from './screens/wine/wine-screen';
import StoreScreen from './screens/store/store-screen';
import { FontAwesome5 } from '@expo/vector-icons';
import FriendsScreen from './screens/friends/friends-screen';
import { registerRootComponent } from 'expo';
import AccountDrawer from './screens/account/account-drawer';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
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
                    name="Friends"
                    component={FriendsScreen}
                    options={{
                        tabBarLabel: 'Friends',
                        tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-friends" color={color} size={size} />
                    }}
                />
                <Tab.Screen
                    name="Account"
                    component={AccountDrawer}
                    options={{
                        tabBarLabel: 'Account',
                        tabBarIcon: ({ color, size }) => <FontAwesome5 name="user-alt" color={color} size={size} />
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

registerRootComponent(App);
