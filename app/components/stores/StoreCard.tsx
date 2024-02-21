import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardProps, Text, View } from 'react-native-ui-lib';
import Store from '../../models/Store';

type StoreCardProps = CardProps & { store: Store };

const StoreCard = ({ store, ...props }: StoreCardProps): React.ReactElement => {
  return (
    <Card {...props} style={styles.card}>
      <View padding-20>
        <Text text40 $textDefault>
          {store.name}
        </Text>
        <Text text70 $textDefault>
          {store.address}
        </Text>
        <View style={styles.container}>
          <Text text60 $textDefault style={styles.text}>
            {store.wines === undefined || store.wines.length === 0
              ? 'No ratings yet'
              : store.wines.length === 1
                ? store.wines.length + ' wine rating'
                : store.wines.length + ' wine ratings'}
          </Text>
        </View>
      </View>
    </Card>
  );
};

export default StoreCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'right',
  },
  card: { marginBottom: 15 },
});
