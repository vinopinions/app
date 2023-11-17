import { View, Text, SafeAreaView } from 'react-native';
import homeScreenStyle from './styles/home-screen-style';
import { useTheme } from '@ui-kitten/components';

const HomeScreen = () => {
    const theme = useTheme();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: theme['background-basic-color-1'] }}>
            <View style={[homeScreenStyle.container, { backgroundColor: theme['background-basic-color-1'] }]}>
                <Text>This is the the Home screen</Text>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
