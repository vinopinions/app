import { Card, CardProps, View, Text } from 'react-native-ui-lib';
import Rating from '../../models/Rating';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { StyleSheet } from 'react-native';

type RatingCardProps = CardProps & {
    rating: Rating;
};

const RatingCard = (props: RatingCardProps): React.ReactElement => {
    return (
        <Card {...props} style={styles.card}>
            <View padding-20>
                <Text text40 $textDefault>
                    {props.rating.user.username}
                </Text>
                <StarRatingDisplay rating={props.rating.stars} style={{ height: 25, width: 15 }} starSize={20} starStyle={{ height: 5, width: 5 }} />
                <Text text70 $textDefault>
                    {props.rating.text}
                </Text>
            </View>
        </Card>
    );
};

export default RatingCard;

const styles = StyleSheet.create({
    card: { marginBottom: 15 }
});
