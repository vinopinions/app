import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { STORES_STACK_NAMES } from '../../constants/RouteNames';
import AddStoreScreen from './AddStoreScreen';
import StoreDetailsScreen from './StoreDetailsScreen';
import StoresScreen from './StoresScreen';

const StoresStackNavigator = createStackNavigator<StoresStackParamList>();

export type StoresStackParamList = {
  [STORES_STACK_NAMES.STORES_SCREEN]: undefined;
  [STORES_STACK_NAMES.STORE_DETAILS_SCREEN]: { storeId: string };
  [STORES_STACK_NAMES.STORE_ADD_SCREEN]: undefined;
};

const StoresStack = () => {
  return (
    <StoresStackNavigator.Navigator screenOptions={{ headerShown: false }}>
      <StoresStackNavigator.Screen
        name={STORES_STACK_NAMES.STORES_SCREEN}
        component={StoresScreen}
      />
      <StoresStackNavigator.Screen
        name={STORES_STACK_NAMES.STORE_DETAILS_SCREEN}
        component={StoreDetailsScreen}
      />
      <StoresStackNavigator.Screen
        name={STORES_STACK_NAMES.STORE_ADD_SCREEN}
        component={AddStoreScreen}
      />
    </StoresStackNavigator.Navigator>
  );
};

export default StoresStack;
