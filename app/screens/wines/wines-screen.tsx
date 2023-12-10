import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, Text, View } from 'react-native';
import WineCardList from '../../components/winecardlist/WineCardList';
import useWines from '../../hooks/useWines';
import Wine from '../../models/Wine';
const WinesScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const { getAll } = useWines();
    const [wines, setWines] = useState<Wine[]>(null);

    const updateWines = useCallback(async () => {
        setWines(await getAll());
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
            {wines == null ? (
                <Text>This is the the wine screen</Text>
            ) : (
                <>
                    <WineCardList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} wines={wines} />
                    {/* {wines.map(wine => (
                        <WineCard wine={wine} />
                    ))} */}
                </>
            )}
        </View>
    );
};

export default WinesScreen;
