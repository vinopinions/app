import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { HOME_STACK_NAMES } from '../../constants/RouteNames';
import HomeScreen from './HomeScreen';

const HomeStackNavigator = createStackNavigator<HomeStackParamList>();

export type HomeStackParamList = {
  [HOME_STACK_NAMES.HOME_SCREEN]: undefined;
};

const HomeStack = () => {
  const { t } = useTranslation();

  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name={HOME_STACK_NAMES.HOME_SCREEN}
        component={HomeScreen}
        options={{
          title: t('common.appName'),
        }}
      />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeStack;
