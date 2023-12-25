import { RefreshControlProps, ScrollView, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import Store from '../../models/Store';
import StoreCard from './StoreCard';

interface StoreCardListProps {
    stores: Store[];
    style?: StyleProp<ViewStyle>;
    refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

const StoreCardList = ({ stores, style }: StoreCardListProps): React.ReactElement => {
    return (
        <ScrollView style={[styles.contentContainer, style]}>
            {stores.map((store, index) => (
                <StoreCard store={store} key={index} />
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
