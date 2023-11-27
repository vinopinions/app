import { View, Text } from 'react-native';
import wineScreenStyle from './styles/wine-screen-style';
import { useTheme } from '@ui-kitten/components';

const WineScreen = () => {
    const theme = useTheme();
    return (
        <View style={[wineScreenStyle.container, { backgroundColor: theme['background-basic-color-1'] }]}>
            <Text>This is the the wine screen</Text>
        </View>
    );
};

export default WineScreen;
