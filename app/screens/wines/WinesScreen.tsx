import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import WineCardList from '../../components/WineCardList';
import { RefreshControl } from 'react-native';
import AddButton from '../../components/PlusButton';
import useGetWines from '../../hooks/wines/useGetWines';

const WinesScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { wines, getWines } = useGetWines();
    const [wineElements, setWineElements] = useState([]);

    useEffect(() => {
        updateWines();
    }, []);

    const updateWines = useCallback(async () => {
        await getWines();
    }, []);

    useEffect(() => {
        if (wines)
            setWineElements(wines.map(wine => <Text>{`${wine.name} aus ${wine.heritage} aus dem Jahr ${wine.year} von ${wine.winemaker}`}</Text>));
    }, [wines]);

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
            <ScrollView style={styles.wineListContainer} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {wineElements}
            </ScrollView>
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
