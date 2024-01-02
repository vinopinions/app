import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import AddButton from '../../components/PlusButton';
import WineCardList from '../../components/WineCardList';
import { fetchWinesAsync } from '../../features/wines/winesSlice';
import { AppDispatch, RootState } from '../../store/store';

const WinesScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const wines = useSelector((state: RootState) => (state.wines.status !== 'failed' ? state.wines.data : []));

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        dispatch(fetchWinesAsync());
        setRefreshing(false);
    }, []);

    useEffect(() => {
        dispatch(fetchWinesAsync());
    }, []);

    const onAddButtonPress = useCallback(() => {
        navigation.navigate('AddWine');
    }, []);
    return (
        <View style={styles.screen}>
            <WineCardList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} wines={wines} />
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
