import { StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={[styles.screen]}>
            <Text>This is the the Home screen</Text>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
