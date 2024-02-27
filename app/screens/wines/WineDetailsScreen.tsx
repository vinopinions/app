import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Button, Picker, PickerModes, Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import RatingCardList from '../../components/ratings/RatingCardList';
import StoreCardList from '../../components/stores/StoreCardList';
import {
  fetchStoresAsync,
  selectAllStores,
} from '../../features/stores/storesSlice';
import {
  fetchWinesAsync,
  selectWineById,
  updateStoresForWineAsync,
} from '../../features/wines/winesSlice';
import Store from '../../models/Store';
import Wine from '../../models/Wine';
import { AppDispatch, RootState } from '../../store/store';
import {
  WineDetailsScreenRouteProp,
  WinesScreenNavigationProp,
} from './WinesStackScreen';

const WineDetailsScreen: React.FC<{ route: WineDetailsScreenRouteProp }> = ({
  route,
}): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const stores: Store[] = useSelector(selectAllStores);
  const wine: Wine = useSelector<RootState, Wine>((state) =>
    selectWineById(state, route.params.wineId),
  );

  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation<WinesScreenNavigationProp>();

  useEffect(() => {
    dispatch(fetchStoresAsync());
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchStoresAsync());
      await dispatch(fetchWinesAsync());
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  return (
    <ScrollView
      style={styles.scrollView}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View marginB-5>
        <Text text40 style={styles.text}>
          {wine && wine.name} von{' '}
          {wine && wine.winemaker && wine.winemaker.name}
        </Text>
      </View>
      <View marginB-10>
        <Text text70 style={styles.text}>
          {wine.grapeVariety}
        </Text>
        <Text text70 style={styles.text}>
          {wine && wine.heritage}
        </Text>
        <Text text70 style={styles.text}>
          {wine && wine.year}
        </Text>
      </View>
      <View row>
        <Button
          marginR-10
          marginB-10
          label="Rate wine"
          onPress={() =>
            navigation.navigate('CreateRatingScreen', { wine: wine })
          }
        />
        <Picker
          label="Add Store"
          mode={PickerModes.MULTI}
          useSafeArea
          value={wine.stores.map((s) => s.id)}
          onChange={(items) => {
            dispatch(
              updateStoresForWineAsync({
                wineId: wine.id,
                storeIds: items as string[],
              }),
            );
          }}
          renderPicker={() => {
            return (
              <SafeAreaView>
                <Button label="Add Store" />
              </SafeAreaView>
            );
          }}
        >
          {stores.map((s) => (
            <Picker.Item key={s.id} value={s.id} label={s.name} />
          ))}
        </Picker>
      </View>
      <View>
        <View marginB-5>
          <Text text60>Ratings:</Text>
        </View>
        <RatingCardList ratings={wine.ratings} />
      </View>
      <View>
        <View marginB-5>
          <Text text60>Stores:</Text>
          <StoreCardList stores={wine.stores || []} />
        </View>
      </View>
    </ScrollView>
  );
};

export default WineDetailsScreen;

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    marginLeft: 10,
  },
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 8,
  },
  scrollView: {
    padding: 10,
  },
});
