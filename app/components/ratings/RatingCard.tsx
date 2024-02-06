import { Card, CardProps, View, Text } from 'react-native-ui-lib';
import Rating from '../../models/Rating';

type RatingCardProps = CardProps & {
    rating: Rating;
};

const RatingCard = (props: RatingCardProps): React.ReactElement => {
    return (
        <Card {...props}>
            <View padding-20>
                <Text text40 $textDefault>
                    {props.rating.user.name}
                </Text>
                <Text text70 $textDefault>
                    {props.rating.stars}
                </Text>
                <Text text70 $textDefault>
                    {props.rating.text}
                </Text>
            </View>
        </Card>
    );
};

export default RatingCard;
