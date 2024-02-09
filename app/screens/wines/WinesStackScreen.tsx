import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import Wine from '../../models/Wine';
import AddWineScreen from './AddWineScreen';
import WineDetailsScreen from './WineDetailsScreen';
import WinesScreen from './WinesScreen';

const WinesStack = createStackNavigator();

export type WinesStackParamList = {
  WinesScreen: undefined;
  WineDetailsScreen: { wine: Wine };
};

export type WinesScreenNavigationProp = StackNavigationProp<
  WinesStackParamList,
  'WinesScreen'
>;
export type WineDetailsScreenRouteProp = RouteProp<
  WinesStackParamList,
  'WineDetailsScreen'
>;

const WinesStackScreen = () => {
  return (
    <WinesStack.Navigator>
      <WinesStack.Screen
        options={{ headerShown: false }}
        name="WinesScreen"
        component={WinesScreen}
      />
      <WinesStack.Screen
        options={{ headerShown: false }}
        name="WineDetailsScreen"
        component={WineDetailsScreen}
      />
      <WinesStack.Screen
        name="AddWine"
        options={{ title: 'New Wine' }}
        component={AddWineScreen}
      />
    </WinesStack.Navigator>
  );
};

export default WinesStackScreen;
