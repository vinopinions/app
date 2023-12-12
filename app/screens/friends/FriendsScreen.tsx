import { StyleSheet, Text, View } from 'react-native';

const FriendsScreen = () => {
    return (
        <View style={[styles.container]}>
            <Text>This is the friends screen</Text>
        </View>
    );
};

export default FriendsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
