import { Text, View } from 'react-native-ui-lib';
import { StoreDetailsScreenRouteProp } from './StoresStackScreen';
import Store from '../../models/Store';

const StoreDetailsScreen: React.FC<{ route: StoreDetailsScreenRouteProp }> = ({ route }) => {
    const store: Store = route.params.store;

    return (
        <View>
            <Text>{store.name}</Text>
        </View>
    );
};

export default StoreDetailsScreen;
