import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

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
    justifyContent: 'center',
  },
});
