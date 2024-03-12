import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { WINES_STACK_NAMES } from '../../constants/RouteNames';
import Wine from '../../models/Wine';
import CreateRatingScreen from '../ratings/CreateRatingScreen';
import AddWineScreen from './AddWineScreen';
import WineDetailsScreen from './WineDetailsScreen';
import WinesScreen from './WinesScreen';

const WinesStackNavigator = createStackNavigator<WinesStackParamList>();

export type WinesStackParamList = {
  [WINES_STACK_NAMES.WINES_SCREEN]: undefined;
  [WINES_STACK_NAMES.WINE_DETAILS_SCREEN]: { wineId: string };
  [WINES_STACK_NAMES.WINE_ADD_SCREEN]: undefined;
  [WINES_STACK_NAMES.RATING_CREATE_SCREEN]: { wine: Wine };
};

const WinesStack = () => {
  return (
    <WinesStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <WinesStackNavigator.Screen
        name={WINES_STACK_NAMES.WINES_SCREEN}
        component={WinesScreen}
      />
      <WinesStackNavigator.Screen
        name={WINES_STACK_NAMES.WINE_DETAILS_SCREEN}
        component={WineDetailsScreen}
      />
      <WinesStackNavigator.Screen
        name={WINES_STACK_NAMES.WINE_ADD_SCREEN}
        component={AddWineScreen}
      />
      <WinesStackNavigator.Screen
        name={WINES_STACK_NAMES.RATING_CREATE_SCREEN}
        component={CreateRatingScreen}
      />
    </WinesStackNavigator.Navigator>
  );
};

export default WinesStack;
