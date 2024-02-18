import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import Store from '../../models/Store';
import { StoresScreenNavigationProp } from '../../screens/stores/StoresStackScreen';
import StoreCard from './StoreCard';

interface StoreCardListProps {
  stores: Store[];
  style?: StyleProp<ViewStyle>;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const StoreCardList = ({
  stores,
  style,
  refreshing,
  onRefresh,
}: StoreCardListProps) => {
  const navigation = useNavigation<StoresScreenNavigationProp>();

  const onCardSelection = (store: Store) => {
    navigation.navigate('StoreDetailsScreen', { store: store });
  };

  return (
    <>
      <ScrollView
        style={style}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {stores &&
          stores.map((store, index) => (
            <StoreCard
              store={store}
              key={index}
              onPress={() => onCardSelection(store)}
            />
          ))}
      </ScrollView>
    </>
  );
};

export default StoreCardList;
