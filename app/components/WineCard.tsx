import { StyleSheet } from 'react-native';
import { Card, CardProps, Text, View } from 'react-native-ui-lib';
import Wine from '../models/Wine';

type WineCardProps = CardProps & {
    wine: Wine;
};

const WineCard = ({ wine }, props: WineCardProps): React.ReactElement => {
    return (
        <Card {...props} style={styles.card} onPress={() => console.log('press on a card')}>
            <View padding-20>
                <Text text40 $textDefault>
                    {wine.name}
                </Text>

                <Text text70 $textDefault>
                    {`${wine.grapeVariety} aus ${wine.heritage} aus dem Jahr ${wine.year} von ${wine.winemaker}`}
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
    card: { marginBottom: 15 }
});
