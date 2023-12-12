import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddWineScreen from './AddWineScreen';
import WinesScreen from './WinesScreen';

const WinesStack = createNativeStackNavigator();

const WinesStackScreen = () => {
    return (
        <WinesStack.Navigator>
            <WinesStack.Screen options={{ headerShown: false }} name="Wines" component={WinesScreen} />
            <WinesStack.Screen name="AddWine" options={{ title: 'New Wine' }} component={AddWineScreen} />
        </WinesStack.Navigator>
    );
};

export default WinesStackScreen;
