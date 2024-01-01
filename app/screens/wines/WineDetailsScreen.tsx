import Wine from '../../models/Wine';
import { Text, View } from 'react-native-ui-lib';
import { StyleSheet } from 'react-native';
import { WineDetailsScreenRouteProp } from './WinesStackScreen';
import StoreCardList from '../../components/stores/StoreCardList';

const WineDetailsScreen: React.FC<{ route: WineDetailsScreenRouteProp }> = ({ route }): React.ReactElement => {
    const wine: Wine = route.params.wine;

    // TODO: add winemaker name

    return (
        <View>
            <Text text40 style={styles.text}>
                {wine.name}
            </Text>
            <Text text70 style={styles.text}>
                {wine.grapeVariety}
            </Text>
            <Text text70 style={styles.text}>
                {wine.heritage}
            </Text>
            <Text text70 style={styles.text}>
                {wine.year}
            </Text>
            <View>
                <StoreCardList stores={wine.stores} />
            </View>
        </View>
    );
};

export default WineDetailsScreen;

const styles = StyleSheet.create({
    text: {
        marginTop: 5,
        marginLeft: 10
    }
});
