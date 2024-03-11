import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, CardProps, Text, View } from 'react-native-ui-lib';
import Wine from '../../models/Wine';
import {
  CalendarIconOutline,
  GrapeIconOutline,
  LocationIconOutline,
  WineIconOutline,
  WinemakerIconOutline,
} from '../../utils/icons';

type WineCardProps = CardProps & {
  wine: Wine;
};

const WineCard = (props: WineCardProps): React.ReactElement => {
  return (
    <Card {...props} style={styles.card}>
      <View padding-20>
        <View style={styles.iconTextContainer}>
          <WineIconOutline size={20} />
          <Text text50 $textDefault>
            {props.wine.name}
          </Text>
        </View>
        <View>
          <View style={styles.iconTextContainer}>
            <WinemakerIconOutline size={15} />
            <Text $textDefault>{props.wine.winemaker.name}</Text>
          </View>

          <View style={styles.iconTextContainer}>
            <GrapeIconOutline size={15} />
            <Text $textDefault>{props.wine.grapeVariety}</Text>
          </View>
          <View style={styles.iconTextContainer}>
            <LocationIconOutline size={15} />
            <Text $textDefault>{props.wine.heritage}</Text>
          </View>
          <View style={styles.iconTextContainer}>
            <CalendarIconOutline size={15} />
            <Text $textDefault>{props.wine.year}</Text>
          </View>
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
  iconTextContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
});
