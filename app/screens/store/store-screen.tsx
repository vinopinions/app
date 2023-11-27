import { View, Text } from 'react-native';
import storeScreenStyle from './styles/store-screen-style';
import { useTheme } from '@ui-kitten/components';

const StoreScreen = () => {
    const theme = useTheme();
    return (
        <View style={[storeScreenStyle.container, { backgroundColor: theme['background-basic-color-1'] }]}>
            <Text>This is the the store screen</Text>
        </View>
    );
};

export default StoreScreen;
