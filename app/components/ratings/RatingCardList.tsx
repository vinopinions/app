import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import Rating from '../../models/Rating';
import RatingCard from './RatingCard';
import User from '../../models/User';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react';
import { fetchCurrentUserAsync } from '../../features/users/currentUserSlice';
import { useDispatch, useSelector } from 'react-redux';

interface RatingCardListProps {
  ratings: Rating[];
  style?: StyleProp<ViewStyle>;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const RatingCardList = ({
  ratings,
  style,
}: RatingCardListProps): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const currentUser: User | undefined = useSelector((state: RootState) =>
    state.currentUser.status !== 'failed' ? state.currentUser.data : undefined,
  );

  useEffect(() => {
    dispatch(fetchCurrentUserAsync());
  }, [dispatch]);

  return (
    <ScrollView style={style}>
      {currentUser &&
        ratings.map((rating, index) => (
          <RatingCard rating={rating} key={index} currentUser={currentUser} />
        ))}
    </ScrollView>
  );
};

export default RatingCardList;
