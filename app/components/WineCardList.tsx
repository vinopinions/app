import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import {
  BOTTOM_TAB_STACK_SCREEN_NAMES,
  WINES_STACK_SCREEN_NAMES,
} from '../constants/RouteNames';
import Wine from '../models/Wine';
import { BottomTabStackParamList } from '../navigation/BottomTabNavigator';
import WineCard from './WineCard';

interface WineCardListProps {
  wines: Wine[];
  style?: StyleProp<ViewStyle>;
  refreshing?: boolean;
  onRefresh?: () => void;
}

const WineCardList = ({
  wines,
  style,
  refreshing,
  onRefresh,
}: WineCardListProps): React.ReactElement => {
  const navigation =
    useNavigation<BottomTabNavigationProp<BottomTabStackParamList>>();

  const onCardSelection = (wine: Wine) => {
    navigation.navigate(BOTTOM_TAB_STACK_SCREEN_NAMES.WINES_STACK_SCREEN, {
      screen: WINES_STACK_SCREEN_NAMES.WINE_DETAILS_SCREEN,
      params: { wineId: wine.id },
    });
  };

  return (
    <ScrollView
      style={[styles.contentContainer, style]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {wines.map((wine, index) => (
        <WineCard
          wine={wine}
          key={index}
          onPress={() => onCardSelection(wine)}
        />
      ))}
    </ScrollView>
  );
};

export default WineCardList;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
