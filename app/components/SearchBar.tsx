import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { TextField } from 'react-native-ui-lib';

interface SearchBarProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearch }) => {
  const { t } = useTranslation();

  return (
    <TextField
      placeholder={`${t('common.search')}...`}
      placeholderTextColor="grey"
      onChangeText={handleSearch}
      value={searchQuery}
      containerStyle={styles.container}
      style={styles.textField}
    />
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 5,
    height: 25,
    paddingTop: 1.5,
    margin: 8,
  },
  textField: { fontSize: 20, alignContent: 'flex-start' },
});
