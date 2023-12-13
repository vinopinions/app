import { StyleSheet, Text, View } from 'react-native';

const WineScreen = () => {
    return (
        <View style={styles.screen}>
            <Text>This is the the wine screen</Text>
        </View>
    );
};

export default WineScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
