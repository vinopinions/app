import { Text, View } from 'react-native-ui-lib';
import { StoreDetailsScreenRouteProp } from './StoresStackScreen';
import Store from '../../models/Store';
import React from 'react';
import { StyleSheet } from 'react-native';

const StoreDetailsScreen: React.FC<{ route: StoreDetailsScreenRouteProp }> = ({ route }): React.ReactElement => {
    const store: Store = route.params.store;
    return (
        <View style={styles.text}>
            <Text text40>{store.name}</Text>
            <Text text70>Addresse: {store.address}</Text>
            <Text text70>Website: {store.url}</Text>
        </View>
    );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({
    text: {
        marginTop: 15,
        marginLeft: 10
    }
});
