import { RefreshControlProps, ScrollView, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import Store from '../../models/Store';
import StoreCard from './StoreCard';
import { useNavigation } from '@react-navigation/native';
import { StoresScreenNavigationProp } from '../../screens/stores/StoresStackScreen';

interface StoreCardListProps {
    stores: Store[];
    style?: StyleProp<ViewStyle>;
    refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

const StoreCardList = ({ stores, style }: StoreCardListProps) => {
    const navigation = useNavigation<StoresScreenNavigationProp>();

    const onCardSelection = (store: Store) => {
        navigation.navigate('StoreDetailsScreen', { store: store });
    };

    return (
        <ScrollView style={[styles.contentContainer, style]}>
            {stores.map((store, index) => (
                <StoreCard store={store} key={index} onPress={() => onCardSelection(store)} />
            ))}
        </ScrollView>
    );
};

export default StoreCardList;

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4
    }
});
