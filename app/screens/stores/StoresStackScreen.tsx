import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import AddStoreScreen from './AddStoreScreen';
import StoreDetailsScreen from './StoreDetailsScreen';
import StoresScreen from './StoresScreen';

const StoresStack = createStackNavigator();

export type StoresStackParamList = {
  StoresScreen: undefined;
  StoreDetailsScreen: { storeId: string };
};

export type StoresScreenNavigationProp = StackNavigationProp<
  StoresStackParamList,
  'StoresScreen'
>;
export type StoreDetailsScreenRouteProp = RouteProp<
  StoresStackParamList,
  'StoreDetailsScreen'
>;

const StoresStackScreen = () => {
  return (
    <StoresStack.Navigator>
      <StoresStack.Screen
        options={{ headerShown: false }}
        name="StoresScreen"
        component={StoresScreen}
      />
      <StoresStack.Screen
        options={{ headerShown: false }}
        name="StoreDetailsScreen"
        component={StoreDetailsScreen}
      />
      <StoresStack.Screen
        options={{ headerShown: false }}
        name="AddStoreScreen"
        component={AddStoreScreen}
      />
    </StoresStack.Navigator>
  );
};

export default StoresStackScreen;
