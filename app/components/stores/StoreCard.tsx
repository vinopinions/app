import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardProps, Text, View } from 'react-native-ui-lib';
import Store from '../../api/pagination/Store';
import {
  InternIconOutline,
  LocationIconOutline,
  StoreIconOutline,
} from '../../utils/icons';

type StoreCardProps = CardProps & { store: Store };

const StoreCard = ({ store, ...props }: StoreCardProps): React.ReactElement => {
  return (
    <Card {...props} style={styles.card}>
      <View padding-20>
        <View style={styles.iconTextContainer}>
          <StoreIconOutline size={20} />
          <Text text50 $textDefault>
            {store.name}
          </Text>
        </View>
        {store.address ? (
          <View style={styles.iconTextContainer}>
            <LocationIconOutline size={15} />
            <Text $textDefault>{store.address}</Text>
          </View>
        ) : (
          <></>
        )}
        {store.url ? (
          <View style={styles.iconTextContainer}>
            <InternIconOutline size={15} />
            <Text $textDefault>{store.url}</Text>
          </View>
        ) : (
          <></>
        )}
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
  iconTextContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});
