import { Button } from '@ui-kitten/components';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import AddButton from '../../components/PlusButton';
import WineCardList from '../../components/WineCardList';
import useGetWines from '../../hooks/wines/useGetWines';
const WinesScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { wines, getWines, loading } = useGetWines();

    const updateWines = useCallback(async () => {
        await getWines();
    }, []);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await updateWines();
        setRefreshing(false);
    }, []);

    useEffect(() => {
        updateWines();
    }, []);

    return (
        <View>
            {loading ? (
                <Button>Test</Button>
            ) : (
                <>
                    <WineCardList
                        style={styles.wineCardList}
                        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        wines={wines}
                    />
                    <AddButton />
                </>
            )}
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
        top: '90%',
        left: '80%'
    }
});
