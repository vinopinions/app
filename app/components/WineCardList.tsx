import React from 'react';
import { RefreshControlProps, ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Wine from '../models/Wine';
import WineCard from './WineCard';
import { useNavigation } from '@react-navigation/native';
import { WinesScreenNavigationProp } from '../screens/wines/WinesStackScreen';

interface WineCardListProps {
    wines: Wine[];
    style?: StyleProp<ViewStyle>;
    refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

const WineCardList = ({ wines, style }: WineCardListProps): React.ReactElement => {
    const navigation = useNavigation<WinesScreenNavigationProp>();

    const onCardSelection = (wine: Wine) => {
        navigation.navigate('WineDetailsScreen', { wine: wine });
    };

    return (
        <ScrollView style={[styles.contentContainer, style]}>
            {wines.map((wine, index) => (
                <WineCard wine={wine} key={index} onPress={() => onCardSelection(wine)} />
            ))}
        </ScrollView>
    );
};

export default WineCardList;

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4
    }
});
