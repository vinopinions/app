import { Text, View } from 'react-native';
import storeScreenStyle from './styles/store-screen-style';

const StoreScreen = () => {
    return (
        <View style={[storeScreenStyle.container]}>
            <Text>This is the the store screen</Text>
        </View>
    );
};

export default StoreScreen;
