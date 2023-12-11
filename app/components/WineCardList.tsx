import { List } from '@ui-kitten/components';
import { ListRenderItemInfo, RefreshControlProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Wine from '../models/Wine';
import WineCard from './WineCard';

interface WineCardListProps {
    wines: Wine[];
    style?: StyleProp<ViewStyle>;
    refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

const WineCardList = ({ wines, refreshControl, style }: WineCardListProps): React.ReactElement => {
    const renderItem = (info: ListRenderItemInfo<Wine>): React.ReactElement => {
        return <WineCard wine={info.item} />;
    };

    return (
        <List refreshControl={refreshControl} contentContainerStyle={styles.contentContainer} style={style} data={wines} renderItem={renderItem} />
    );
};

export default WineCardList;

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4
    }
});
