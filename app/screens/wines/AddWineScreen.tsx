import { faker } from '@faker-js/faker';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  Button,
  Picker,
  TextField,
  View,
  Wizard,
  WizardStepStates,
} from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import Store from '../../api/pagination/Store';
import WineCard from '../../components/wines/WineCard';
import {
  fetchStoresAsync,
  selectAllStores,
} from '../../features/stores/storesSlice';
import { fetchWinemakersAsync } from '../../features/winemakers/winemakersSlice';
import { createWineAsync } from '../../features/wines/winesSlice';
import Winemaker from '../../models/Winemaker';
import WineDto from '../../models/dtos/Wine.dto';
import { AppDispatch, RootState } from '../../store/store';

const AddWineScreen = ({ navigation }) => {
  const dispatch: AppDispatch = useDispatch();
  const winemakers = useSelector((state: RootState) => state.winemakers.data);
  const allStores = useSelector(selectAllStores);

  const [name, setName] = useState<string>();
  const [year, setYear] = useState<number>();
  const [grapeVariety, setGrapeVariety] = useState<string>();
  const [heritage, setHeritage] = useState<string>();
  const [winemaker, setWinemaker] = useState<Winemaker>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchWinemakersAsync());
    dispatch(fetchStoresAsync());
  }, [dispatch]);

  const onFinishButtonPress = useCallback(() => {
    const onFinishButtonPressAsync = async () => {
      const wine: WineDto = {
        winemaker,
        grapeVariety,
        heritage,
        name,
        year,
        stores,
      };
      await dispatch(createWineAsync(wine));
      navigation.goBack(null);
    };
    onFinishButtonPressAsync();
  }, [
    name,
    year,
    grapeVariety,
    heritage,
    winemaker,
    stores,
    dispatch,
    navigation,
  ]);

  const updateSelectedStores = (ids: string[]) => {
    const updatedStores = ids.map(
      (id) => allStores.find((store) => store.id === id) as Store,
    );
    setStores(updatedStores);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Wizard activeIndex={activeIndex}>
        <Wizard.Step
          state={WizardStepStates.ENABLED}
          label="General Information"
        />
        <Wizard.Step state={WizardStepStates.ENABLED} label="Overview" />
      </Wizard>

      {
        {
          0: (
            <View style={styles.container}>
              <TextField
                autoFocus
                floatingPlaceholder
                style={styles.textInput}
                placeholder="Name"
                value={name}
                onChangeText={(value) => setName(value)}
              />

              <TextField
                style={styles.textInput}
                floatingPlaceholder
                placeholder="Year"
                value={'' + (year ?? '')}
                onChangeText={(value) => setYear(+value)}
                maxLength={4}
                enableErrors
                validate={['number']}
                validationMessage={['A year can only consist of numbers']}
                inputMode="decimal"
              />

              <TextField
                floatingPlaceholder
                style={styles.textInput}
                placeholder="Grape variety"
                value={grapeVariety}
                onChangeText={(variety) => setGrapeVariety(variety)}
              />
              <TextField
                floatingPlaceholder
                style={styles.textInput}
                placeholder="Heritage"
                value={heritage}
                onChangeText={(value) => setHeritage(value)}
              />
              <Picker
                placeholder="Winemaker"
                floatingPlaceholder
                useSafeArea
                value={winemaker?.id}
                enableModalBlur={false}
                onChange={(id) =>
                  setWinemaker(winemakers.find((wm) => wm.id === id))
                }
                topBarProps={{ title: 'Winemakers' }}
                showSearch
                searchPlaceholder={'Search a winemaker'}
              >
                {winemakers.map((wm) => (
                  <Picker.Item key={wm.id} value={wm.id} label={wm.name} />
                ))}
              </Picker>
              <Picker
                placeholder="Stores"
                floatingPlaceholder
                useSafeArea
                mode={Picker.modes.MULTI}
                enableModalBlur={false}
                value={stores.map((store) => store.id)}
                onChange={(itemValue) =>
                  updateSelectedStores(itemValue as string[])
                }
              >
                {allStores.map((store) => (
                  <Picker.Item
                    key={store.id}
                    value={store.id}
                    label={store.name}
                  />
                ))}
              </Picker>
              <Button
                style={styles.navigationButton}
                label="Next"
                onPress={() => setActiveIndex((idx) => idx + 1)}
              />
            </View>
          ),
          1: (
            <View style={styles.container}>
              <WineCard
                wine={{
                  id: faker.string.uuid(),
                  name,
                  year,
                  grapeVariety,
                  heritage,
                  winemaker,
                  createdAt: faker.date.anytime().toISOString(),
                  updatedAt: faker.date.anytime().toISOString(),
                }}
              />
              <Button
                style={styles.navigationButton}
                label="Back"
                onPress={() => setActiveIndex((idx) => idx - 1)}
              />
              <Button
                style={styles.finishButton}
                label="Finish"
                onPress={onFinishButtonPress}
              />
            </View>
          ),
        }[activeIndex]
      }
    </SafeAreaView>
  );
};

export default AddWineScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  textInput: {
    fontSize: 30,
  },
  navigationButton: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
  },
  finishButton: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
});
