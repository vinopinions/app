import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native-ui-lib';
// import WineCardList from '../../components/WineCardList';
import { RefreshControl, StyleSheet } from 'react-native';
import AddButton from '../../components/PlusButton';
import WineCardList from '../../components/WineCardList';
import useGetWines from '../../hooks/wines/useGetWines';

const WinesScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { wines, getWines } = useGetWines();

    useEffect(() => {
        updateWines();
    }, []);

    const updateWines = useCallback(async () => {
        await getWines();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await updateWines();
        setRefreshing(false);
    }, []);

    const onAddButtonPress = useCallback(() => {
        navigation.navigate('AddWine');
    }, []);
    return (
        <View style={styles.screen}>
            <WineCardList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} wines={wines ?? []} />
            <AddButton onPress={() => onAddButtonPress()} style={styles.plusButton} />
        </View>
    );
};

export default WinesScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    wineListContainer: {},
    plusButton: {
        position: 'absolute',
        right: 50,
        bottom: 50
    }
});
