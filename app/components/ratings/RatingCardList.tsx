import * as React from 'react';
import { useEffect } from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserAsync } from '../../features/users/currentUserSlice';
import Rating from '../../models/Rating';
import User from '../../models/User';
import { AppDispatch, RootState } from '../../store/store';
import RatingCard from './RatingCard';

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
