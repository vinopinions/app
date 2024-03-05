import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardProps, Text, View } from 'react-native-ui-lib';
import Wine from '../../models/Wine';

type WineCardProps = CardProps & {
  wine: Wine;
};

const WineCard = (props: WineCardProps): React.ReactElement => {
  return (
    <Card {...props} style={styles.card}>
      <View padding-20>
        <Text text50 $textDefault>
          {props.wine.name}
        </Text>
        <View row spread>
          <Text text70 $textDefault>
            {props.wine.winemaker.name}
          </Text>
        </View>
      </View>
    </Card>
  );
};
export default WineCard;

const styles = StyleSheet.create({
  card: { marginBottom: 15 },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative',
    alignItems: 'center',
    marginTop: 10,
  },
  ratingText: {
    margin: -5,
  },
});
