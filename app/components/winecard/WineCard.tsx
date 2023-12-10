import { Card, Text } from '@ui-kitten/components';
import { View } from 'react-native';
import Wine from '../../models/Wine';
import styles from './styles';

interface WineCardProps {
    wine: Wine;
}

const WineCard = ({ wine }: WineCardProps): React.ReactElement => {
    const renderItemHeader = (headerProps): React.ReactElement => (
        <View {...headerProps}>
            <Text category="h6">{wine.name}</Text>
        </View>
    );

    const renderItemFooter = (footerProps): React.ReactElement => <Text {...footerProps}>By {wine.winemaker}</Text>;

    return (
        <Card
            style={styles.item}
            status="basic"
            header={headerProps => renderItemHeader(headerProps)}
            footer={footerProps => renderItemFooter(footerProps)}
        >
            <Text>{wine.year}</Text>
            <Text>{wine.grapeVariety}</Text>
            <Text>{wine.heritage}</Text>
            <Text>{wine.id}</Text>
        </Card>
    );
};

export default WineCard;
