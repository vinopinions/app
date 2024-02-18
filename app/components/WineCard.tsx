import { StyleSheet } from 'react-native';
import { Card, CardProps, Text, View } from 'react-native-ui-lib';
import React from 'react';
import Wine from '../models/Wine';

type WineCardProps = CardProps & {
  wine: Wine;
};

const WineCard = (props: WineCardProps): React.ReactElement => {
  return (
    <Card {...props} style={styles.card}>
      <View padding-20>
        <Text text40 $textDefault>
          {props.wine.name}
        </Text>

        <Text text70 $textDefault>
          {`${props.wine.grapeVariety} aus ${props.wine.heritage} aus dem Jahr ${props.wine.year} von ${props.wine.winemaker?.name}`}
        </Text>

        {/* TODO: Implement for rating
      <View>
        <Text text90 $textDisabled>
          {wine.likes} Likes
        </Text>
        <View row right>
          <Button
            style={{marginRight: 10}}
            text90
            link
            iconSource={featureIcon}
            label="Feature"
          />
          <Button text90 link iconSource={shareIcon} label="Share"/>
        </View>
      </View> */}
      </View>
    </Card>
  );
};
export default WineCard;

const styles = StyleSheet.create({
  card: { marginBottom: 15 },
});
