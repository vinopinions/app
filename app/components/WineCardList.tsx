import React from 'react';
import { RefreshControlProps, ScrollView, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Wine from '../models/Wine';
import WineCard from './WineCard';

interface WineCardListProps {
    wines: Wine[];
    style?: StyleProp<ViewStyle>;
    refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

const WineCardList = ({ wines, style }: WineCardListProps): React.ReactElement => {
    return (
        <ScrollView style={[styles.contentContainer, style]}>
            {wines.map((wine, index) => (
                <WineCard wine={wine} key={index} />
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
