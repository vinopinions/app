import { Button } from '@ui-kitten/components';
import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import WineCardList from '../../components/winecardlist/WineCardList';
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
                    <WineCardList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} wines={wines} />
                </>
            )}
        </View>
    );
};

export default WinesScreen;
