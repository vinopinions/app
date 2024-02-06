import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import Store from '../../models/Store';
import StoreCard from './StoreCard';
import { useNavigation } from '@react-navigation/native';
import { StoresScreenNavigationProp } from '../../screens/stores/StoresStackScreen';
import React from 'react';
import { RefreshControl } from 'react-native-gesture-handler';

interface StoreCardListProps {
    stores: Store[];
    style?: StyleProp<ViewStyle>;
    refreshing?: boolean;
    onRefresh?: () => void;
}

const StoreCardList = ({ stores, style, refreshing, onRefresh }: StoreCardListProps) => {
    const navigation = useNavigation<StoresScreenNavigationProp>();

    const onCardSelection = (store: Store) => {
        navigation.navigate('StoreDetailsScreen', { store: store });
    };

    return (
        <>
            <ScrollView style={style} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {stores.map((store, index) => (
                    <StoreCard store={store} key={index} onPress={() => onCardSelection(store)} />
                ))}
            </ScrollView>
        </>
    );
};

export default StoreCardList;
