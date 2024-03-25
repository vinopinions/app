import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import RatingCard from '../../components/ratings/RatingCard';
import {
  BOTTOM_TAB_STACK_NAMES,
  WINES_STACK_NAMES,
} from '../../constants/RouteNames';
import {
  fetchRatingsForWineAsync,
  selectRatingsRelationsByWineId as selectRatingRelationsByWineId,
} from '../../features/wines/wineRatingsSlice';
import {
  fetchWineByIdAsync,
  selectWineById,
} from '../../features/wines/winesSlice';
import Page from '../../models/Page';
import Rating from '../../models/Rating';
import Wine from '../../models/Wine';
import { BottomTabStackParamList } from '../../navigation/BottomTabNavigator';
import { AppDispatch, RootState } from '../../store/store';
import WineDetailsScreenHeader, {
  WineDetailsScreenHeaderProps,
} from './WineDetailsScreenHeader';
import { WinesStackParamList } from './WinesStack';

//   return (
//     <>
//       <View marginB-5>
//         <Text text40 style={styles.text}>
//           {`${wine.name} von ${wine.winemaker.name}`}
//         </Text>
//       </View>
//       <View marginB-10>
//         <Text text70 style={styles.text}>
//           {wine.grapeVariety}
//         </Text>
//         <Text text70 style={styles.text}>
//           {wine && wine.heritage}
//         </Text>
//         <Text text70 style={styles.text}>
//           {wine && wine.year}
//         </Text>
//       </View>
//       {/* <View row>
//         <Button
//           marginR-10
//           marginB-10
//           label="Rate wine"
//           onPress={() =>
//             navigation.push(WINES_STACK_SCREEN_NAMES.RATING_CREATE_SCREEN, {
//               wine: wine,
//             })
//           }
//         />
//         <Picker
//           label="Add Store"
//           mode={PickerModes.MULTI}
//           useSafeArea
//           value={storesPage.data.map((s) => s.id)}
//           onChange={(items) => {
//             dispatch(
//               updateStoresForWineAsync({
//                 wineId: wine.id,
//                 storeIds: items as string[],
//               }),
//             );
//           }}
//           renderPicker={() => {
//             return (
//               <SafeAreaView>
//                 <Button label="Add Store" />
//               </SafeAreaView>
//             );
//           }}
//         >
//           {storesPage.data.map((s) => (
//             <Picker.Item key={s.id} value={s.id} label={s.name} />
//           ))}
//         </Picker>
//       </View> */}
//     </>
//   );
// };
const renderHeader = (props: WineDetailsScreenHeaderProps) => {
  return <WineDetailsScreenHeader {...props} />;
};

const WineDetailsScreen = ({
  route,
}: CompositeScreenProps<
  NativeStackScreenProps<
    WinesStackParamList,
    WINES_STACK_NAMES.WINE_DETAILS_SCREEN
  >,
  BottomTabScreenProps<
    BottomTabStackParamList,
    BOTTOM_TAB_STACK_NAMES.WINES_STACK
  >
>): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const wine: Wine = useSelector<RootState, Wine>((state) =>
    selectWineById(state, route.params.wineId),
  );
  const ratingsPage: Page<Rating> = useSelector<RootState, Page<Rating>>(
    (state) => selectRatingRelationsByWineId(state, route.params.wineId),
  );

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      dispatch(fetchWineByIdAsync(route.params.wineId));
      dispatch(fetchRatingsForWineAsync({ wineId: route.params.wineId }));
    } finally {
      setRefreshing(false);
    }
  }, [dispatch, route.params.wineId]);

  useEffect(() => {
    onRefresh();
  }, [dispatch, onRefresh, route.params.wineId]);

  const onRatingsEndReached = useCallback(async () => {
    if (ratingsPage.meta.hasNextPage) {
      dispatch(
        fetchRatingsForWineAsync({
          wineId: route.params.wineId,
          page: ratingsPage.meta.page + 1,
        }),
      );
    }
  }, [
    dispatch,
    ratingsPage.meta.hasNextPage,
    ratingsPage.meta.page,
    route.params.wineId,
  ]);

  if (wine === undefined) {
    // TODO: insert skeleton
    return (
      <View>
        <Text>loading</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => renderHeader({ wine })}
        data={ratingsPage.data}
        renderItem={({ item }: { item: Rating }) => (
          <RatingCard rating={item} />
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.4}
        onEndReached={onRatingsEndReached}
      />
    </SafeAreaView>
  );
};

export default WineDetailsScreen;
