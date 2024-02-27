import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { WINES_STACK_SCREEN_NAMES } from '../../constants/RouteNames';
import Wine from '../../models/Wine';
import CreateRatingScreen from '../rating/CreateRatingScreen';
import AddWineScreen from './AddWineScreen';
import WineDetailsScreen from './WineDetailsScreen';
import WinesScreen from './WinesScreen';

const WinesStack = createStackNavigator<WinesStackParamList>();

export type WinesStackParamList = {
  [WINES_STACK_SCREEN_NAMES.WINES_SCREEN]: undefined;
  [WINES_STACK_SCREEN_NAMES.WINE_DETAILS_SCREEN]: { wineId: string };
  [WINES_STACK_SCREEN_NAMES.WINE_ADD_SCREEN]: undefined;
  [WINES_STACK_SCREEN_NAMES.RATING_CREATE_SCREEN]: { wine: Wine };
};

const WinesStackScreen = () => {
  return (
    <WinesStack.Navigator>
      <WinesStack.Screen
        name={WINES_STACK_SCREEN_NAMES.WINES_SCREEN}
        component={WinesScreen}
        options={{ headerShown: false }}
      />
      <WinesStack.Screen
        name={WINES_STACK_SCREEN_NAMES.WINE_DETAILS_SCREEN}
        component={WineDetailsScreen}
      />
      <WinesStack.Screen
        name={WINES_STACK_SCREEN_NAMES.WINE_ADD_SCREEN}
        options={{ title: 'New Wine' }}
        component={AddWineScreen}
      />
      <WinesStack.Screen
        name={WINES_STACK_SCREEN_NAMES.RATING_CREATE_SCREEN}
        options={{ title: 'New Rating' }}
        component={CreateRatingScreen}
      />
    </WinesStack.Navigator>
  );
};

export default WinesStackScreen;
