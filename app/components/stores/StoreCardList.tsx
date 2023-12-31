import { RefreshControlProps, ScrollView, StyleProp, ViewStyle, StyleSheet } from 'react-native';
import Store from '../../models/Store';
import StoreCard from './StoreCard';
import { useNavigation } from '@react-navigation/native';
import { StoresScreenNavigationProp } from '../../screens/stores/StoresStackScreen';
import React from 'react';
import { TextField } from 'react-native-ui-lib';

interface StoreCardListProps {
    stores: Store[];
    style?: StyleProp<ViewStyle>;
    refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
}

const StoreCardList = ({ stores, style }: StoreCardListProps) => {
    const navigation = useNavigation<StoresScreenNavigationProp>();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [searchResults, setSearchResults] = React.useState(stores);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const performSearch = () => {
        if (searchQuery === '') {
            setSearchResults(stores);
        } else {
            const results = stores.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setSearchResults(results);
        }
    };

    React.useEffect(() => {
        performSearch();
    }, [searchQuery, stores]);

    const onCardSelection = (store: Store) => {
        navigation.navigate('StoreDetailsScreen', { store: store });
    };

    return (
        <>
            <TextField
                placeholder="Search..."
                placeholderTextColor="grey"
                onChangeText={handleSearch}
                value={searchQuery}
                containerStyle={styles.searchBarContainer}
                style={{ fontSize: 20, alignContent: 'flex-start' }}
            />
            <ScrollView style={[styles.contentContainer, style]}>
                {searchResults.map((store, index) => (
                    <StoreCard store={store} key={index} onPress={() => onCardSelection(store)} />
                ))}
            </ScrollView>
        </>
    );
};

export default StoreCardList;

const styles = StyleSheet.create({
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    searchBarContainer: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        height: 25,
        paddingTop: 1.5,
        paddingBottom: 0
    }
});
