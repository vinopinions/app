import { List } from '@ui-kitten/components';
import { ListRenderItemInfo, RefreshControlProps } from 'react-native';
import Wine from '../../models/Wine';
import WineCard from '../winecard/WineCard';
import styles from './styles';

interface WineCardListProps {
    wines: Wine[];
    refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

const WineCardList = ({ wines, refreshControl }: WineCardListProps): React.ReactElement => {
    const renderItem = (info: ListRenderItemInfo<Wine>): React.ReactElement => {
        return <WineCard wine={info.item} />;
    };

    return (
        <List
            refreshControl={refreshControl}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            data={wines}
            renderItem={renderItem}
        />
    );
};

export default WineCardList;
