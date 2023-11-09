import { View, Text } from 'react-native';
import homeScreenStyle from './styles/home-screen-style';

const HomeScreen = () => {
    return (
        <View style={homeScreenStyle.container}>
            <Text>This is the the Home screen</Text>
        </View>
    );
};

export default HomeScreen;
