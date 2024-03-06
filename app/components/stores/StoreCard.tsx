import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardProps, Text, View } from 'react-native-ui-lib';
import Store from '../../api/pagination/Store';

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
