import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { HOME_STACK_NAMES } from '../../constants/RouteNames';
import HomeScreen from './HomeScreen';

const HomeStackNavigator = createStackNavigator<HomeStackParamList>();

export type HomeStackParamList = {
  [HOME_STACK_NAMES.HOME_SCREEN]: undefined;
};

const HomeStack = () => {
  return (
    <HomeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <HomeStackNavigator.Screen
        name={HOME_STACK_NAMES.HOME_SCREEN}
        component={HomeScreen}
      />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeStack;
