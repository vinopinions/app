import { RouteProp } from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import Wine from '../../models/Wine';
import AddWineScreen from './AddWineScreen';
import WineDetailsScreen from './WineDetailsScreen';
import CreateRatingScreen from '../rating/CreateRatingScreen';
import WinesScreen from './WinesScreen';

const WinesStack = createStackNavigator();

export type WinesStackParamList = {
    WinesScreen: undefined;
    AddWineScreen: undefined;
    WineDetailsScreen: { wine: Wine };
    CreateRatingScreen: { wine: Wine };
};

export type WinesScreenNavigationProp = StackNavigationProp<WinesStackParamList, 'WinesScreen'>;
export type WineDetailsScreenRouteProp = RouteProp<WinesStackParamList, 'WineDetailsScreen'>;
export type CreateRatingScreenRouteProp = RouteProp<WinesStackParamList, 'CreateRatingScreen'>;
export type CreateRatingScreenNavigationProp = StackNavigationProp<WinesStackParamList, 'CreateRatingScreen'>;

const WinesStackScreen = () => {
    return (
        <WinesStack.Navigator>
            <WinesStack.Screen options={{ headerShown: false }} name="WinesScreen" component={WinesScreen} />
            <WinesStack.Screen options={{ headerShown: false }} name="WineDetailsScreen" component={WineDetailsScreen} />
            <WinesStack.Screen name="AddWineScreen" options={{ title: 'New Wine' }} component={AddWineScreen} />
            <WinesStack.Screen name="CreateRatingScreen" options={{ title: 'New Rating' }} component={CreateRatingScreen} />
        </WinesStack.Navigator>
    );
};

export default WinesStackScreen;
