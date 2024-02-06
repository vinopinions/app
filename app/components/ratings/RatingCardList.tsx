import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import Rating from '../../models/Rating';
import { RefreshControl } from 'react-native-gesture-handler';
import RatingCard from './RatingCard';

interface RatingCardListProps {
    ratings: Rating[];
    style?: StyleProp<ViewStyle>;
    refreshing?: boolean;
    onRefresh?: () => void;
}

const RatingCardList = ({ ratings, style, refreshing, onRefresh }: RatingCardListProps): React.ReactElement => {
    return (
        <ScrollView style={style} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {ratings.map((rating, index) => (
                <RatingCard rating={rating} key={index} />
            ))}
        </ScrollView>
    );
};

export default RatingCardList;
