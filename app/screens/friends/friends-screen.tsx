import { View, Text } from 'react-native';
import friendsScreenStyle from './styles/friends-screen-style';
import { useTheme } from '@ui-kitten/components';

const FriendsScreen = () => {
    const theme = useTheme();
    return (
        <View style={[friendsScreenStyle.container, { backgroundColor: theme['background-basic-color-1'] }]}>
            <Text>This is the friends screen</Text>
        </View>
    );
};

export default FriendsScreen;
