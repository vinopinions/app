import { Autocomplete, AutocompleteItem, AutocompleteProps } from '@ui-kitten/components';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

type AutocompleteFieldProps<T> = AutocompleteProps & {
    items: T[];
    identify: (value: T) => string;
    onItemSelect: (value: T) => void;
};

const AutocompleteField = <T,>(props: AutocompleteFieldProps<T>) => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState<T[]>(props.items ?? []);

    const [autoCompleteItems, setAutoCompleteItems] = useState<React.JSX.Element[]>([]);

    // update autoCompleteItems when data changes
    useEffect(() => {
        setAutoCompleteItems(data.map((item, index) => <AutocompleteItem key={index} title={props.identify(item)} />));
    }, [data]);

    // update data to match query
    useEffect(() => {
        setData((props.items ?? []).filter(item => props.identify(item).includes(query)));
    }, [query]);

    const onSelect = useCallback((index: number): void => {
        props.onItemSelect(props.items[index]);
        setQuery(props.identify(props.items[index]));
    }, []);

    return (
        <Autocomplete onSelect={onSelect} style={styles.autocomplete} {...props} onChangeText={text => setQuery(text)} value={query}>
            {autoCompleteItems}
        </Autocomplete>
    );
};

export default AutocompleteField;

const styles = StyleSheet.create({
    autocomplete: {
        width: '100%'
    }
});
