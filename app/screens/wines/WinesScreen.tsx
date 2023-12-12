import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
// import WineCardList from '../../components/WineCardList';
import AddButton from '../../components/PlusButton';
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
        <View>
            <>
                {/* <WineCardList
                    style={styles.wineCardList}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    wines={wines}
                /> */}
                <AddButton onPress={() => onAddButtonPress()} style={styles.plusButton} />
            </>
        </View>
    );
};

export default WinesScreen;

const styles = StyleSheet.create({
    wineCardList: {
        height: '100%'
    },
    plusButton: {
        position: 'absolute',
        bottom: 50,
        right: 20
    }
});
