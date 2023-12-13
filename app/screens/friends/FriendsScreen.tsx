import { StyleSheet, Text, View } from 'react-native';

const FriendsScreen = () => {
    return (
        <View style={[styles.screen]}>
            <Text>This is the friends screen</Text>
        </View>
    );
};

export default FriendsScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
