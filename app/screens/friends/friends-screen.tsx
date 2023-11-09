import { View, Text } from 'react-native';
import friendsScreenStyle from './styles/friends-screen-style';

const FriendsScreen = () => {
    return (
        <View style={friendsScreenStyle.container}>
            <Text>This is the friends screen</Text>
        </View>
    );
};

export default FriendsScreen;
