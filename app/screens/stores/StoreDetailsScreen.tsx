import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import WineCardList from '../../components/WineCardList';
import Store from '../../models/Store';
import Wine from '../../models/Wine';
import { StoreDetailsScreenRouteProp } from './StoresStackScreen';
import { getWinesForStore } from './utils/StoreUtils';

const StoreDetailsScreen: React.FC<{ route: StoreDetailsScreenRouteProp }> = ({ route }): React.ReactElement => {
    const store: Store = route.params.store;
    const winesAtStore: Wine[] = getWinesForStore(store);
    return (
        <View>
            <Text text40 style={styles.text}>
                {store.name}
            </Text>
            <Text text70 style={styles.text}>
                Addresse: {store.address}
            </Text>
            <Text text70 style={styles.text}>
                Website: {store.url}
            </Text>
            <View>
                <WineCardList wines={winesAtStore} />
            </View>
        </View>
    );
};

export default StoreDetailsScreen;

const styles = StyleSheet.create({
    text: {
        marginTop: 5,
        marginLeft: 10
    }
});
