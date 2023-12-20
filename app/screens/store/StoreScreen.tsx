import { StyleSheet, Text, View } from 'react-native';

const StoreScreen = () => {
    return (
        <View style={[styles.screen]}>
            <Text>This is the the store screen</Text>
        </View>
    );
};

export default StoreScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
