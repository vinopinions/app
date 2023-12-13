import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import WineCardList from '../../components/WineCardList';
import AddButton from '../../components/PlusButton';
import useGetWines from '../../hooks/wines/useGetWines';

const WinesScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { wines, getWines } = useGetWines();
    const [wineElements, setWineElements] = useState();

    useEffect(() => {
        updateWines();
    }, []);

    const updateWines = useCallback(async () => {
        await getWines();
    }, []);

    useEffect(() => {
        if (wines) setWineElements(wines.map(wine => <Text>{wine.name}</Text>));
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
            {wineElements}
            <AddButton onPress={() => onAddButtonPress()} style={styles.plusButton} />
        </View>
    );
};

export default WinesScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    wineCardList: {
        height: '100%'
    },
    plusButton: {
        position: 'absolute',
        right: 50,
        bottom: 50
    }
});
