import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import Store from '../../api/pagination/Store';

export type StoreDetailsScreenHeaderProps = {
  store: Store;
};

const StoreDetailsScreenHeader = ({ store }: StoreDetailsScreenHeaderProps) => {
  return (
    <>
      <View marginB-5>
        <Text text40 style={styles.text}>
          {store.name}
        </Text>
      </View>
      <View marginB-10>
        <Text text70 style={styles.text}>
          {`Adresse: ${store.address}`}
        </Text>
        <Text text70 style={styles.text}>
          {`Website: ${store.url}`}
        </Text>
      </View>
    </>
  );
};

export default StoreDetailsScreenHeader;

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    marginLeft: 10,
  },
  listHeader: {
    padding: 10,
  },
});
