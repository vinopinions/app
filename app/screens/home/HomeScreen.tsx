import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={[styles.container]}>
                <Text>This is the the Home screen</Text>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
