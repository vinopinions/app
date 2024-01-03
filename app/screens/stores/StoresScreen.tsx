import { useCallback, useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStoresAsync } from '../../features/stores/storesSlice';
import { Button, View } from 'react-native-ui-lib';
import { RefreshControl, StyleSheet } from 'react-native';
import StoreCardList from '../../components/stores/StoreCardList';
import Store from '../../models/Store';
import SearchBar from '../utils/SearchBar';

const StoresScreen = ({ navigation }) => {
    const [refreshing, setRefreshing] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const stores = useSelector((state: RootState) => (state.stores.status !== 'failed' ? state.stores.data : []));
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchResults, setSearchResults] = useState<Store[]>(stores);

    const performSearch = () => {
        if (searchQuery === '') setSearchResults(stores);
        else {
            const results = stores.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
            setSearchResults(results);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    useEffect(() => {
        performSearch();
    }, [searchQuery, stores]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        dispatch(fetchStoresAsync());
        setRefreshing(false);
    }, []);

    useEffect(() => {
        dispatch(fetchStoresAsync());
    }, []);

    const onAddButtonPress = () => {
        navigation.navigate('AddStoreScreen');
    };

    return (
        <View style={styles.screen}>
            <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
            <StoreCardList refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} stores={searchResults} />
            <View style={styles.buttonContainer}>
                <Button label={'Add Store'} onPress={() => onAddButtonPress()} />
            </View>
        </View>
    );
};

export default StoresScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    buttonContainer: {
        padding: 10
    }
});
