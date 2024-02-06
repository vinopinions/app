import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import Rating from '../../models/Rating';
import RatingCard from './RatingCard';

interface RatingCardListProps {
    ratings: Rating[];
    style?: StyleProp<ViewStyle>;
    refreshing?: boolean;
    onRefresh?: () => void;
}

const RatingCardList = ({ ratings, style }: RatingCardListProps): React.ReactElement => {
    return (
        <ScrollView style={style}>
            {ratings.map((rating, index) => (
                <RatingCard rating={rating} key={index} />
            ))}
        </ScrollView>
    );
};

export default RatingCardList;
