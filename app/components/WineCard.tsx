import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Card, CardProps, Text, View } from 'react-native-ui-lib';
import Wine from '../models/Wine';

type WineCardProps = CardProps & {
  wine: Wine;
};

const WineCard = (props: WineCardProps): React.ReactElement => {
  const [averageRating, setAverageRating] = useState<number>();

  useEffect(() => {
    if (!props.wine.ratings || props.wine.ratings.length === 0) {
      setAverageRating(0);
    }
    const sum = props.wine.ratings.reduce(
      (total, rating) => total + rating.stars,
      0,
    );

    setAverageRating(Math.round((sum / props.wine.ratings.length) * 10) / 10);
  }, [props.wine.ratings]);

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
          <View style={styles.ratingContainer}>
            <Text text60 $textDefault style={styles.ratingText}>
              {averageRating}
            </Text>
            <StarRatingDisplay rating={1} maxStars={1} />
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
});
