import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { STORES_STACK_SCREEN_NAMES } from '../../constants/RouteNames';
import AddStoreScreen from './AddStoreScreen';
import StoreDetailsScreen from './StoreDetailsScreen';
import StoresScreen from './StoresScreen';

const StoresStack = createStackNavigator<StoresStackParamList>();

export type StoresStackParamList = {
  [STORES_STACK_SCREEN_NAMES.STORES_SCREEN]: undefined;
  // pass down the bottom tab props so we can pass them down to the wine card list so we can navigate to screens from the bottom tab navigator
  [STORES_STACK_SCREEN_NAMES.STORE_DETAILS_SCREEN]: { storeId: string };
  [STORES_STACK_SCREEN_NAMES.STORE_ADD_SCREEN]: undefined;
};

const StoresStackScreen = () => {
  return (
    <StoresStack.Navigator screenOptions={{ headerShown: false }}>
      <StoresStack.Screen
        name={STORES_STACK_SCREEN_NAMES.STORES_SCREEN}
        component={StoresScreen}
      />
      <StoresStack.Screen
        name={STORES_STACK_SCREEN_NAMES.STORE_DETAILS_SCREEN}
        component={StoreDetailsScreen}
      />
      <StoresStack.Screen
        name={STORES_STACK_SCREEN_NAMES.STORE_ADD_SCREEN}
        component={AddStoreScreen}
      />
    </StoresStack.Navigator>
  );
};

export default StoresStackScreen;
