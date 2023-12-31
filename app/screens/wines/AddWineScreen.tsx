import { useCallback, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Picker, TextField, View, Wizard, WizardStepStates } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import WineCard from '../../components/WineCard';
import { fetchWinemakersAsync } from '../../features/winemakers/winemakersSlice';
import { createWineAsync } from '../../features/wines/winesSlice';
import Wine from '../../models/Wine';
import Winemaker from '../../models/Winemaker';
import { AppDispatch, RootState } from '../../store/store';
import Store from '../../models/Store';
import { fetchStoresAsync } from '../../features/stores/storesSlice';

const AddWineScreen = ({ navigation }) => {
    const dispatch: AppDispatch = useDispatch();
    const winemakers = useSelector((state: RootState) => state.winemakers.items);
    const allStores = useSelector((state: RootState) => state.stores.items);

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
    }, []);

    const onFinishButtonPress = useCallback(() => {
        const onFinishButtonPressAsync = async () => {
            const wine: Wine = { winemaker, grapeVariety, heritage, name, year, stores };
            console.log;
            await dispatch(createWineAsync(wine));
            console.log(wine.stores);
            navigation.goBack(null);
        };
        onFinishButtonPressAsync();
    }, [name, year, grapeVariety, heritage, winemaker, stores]);

    const updateSelectedStores = (ids: string[]) => {
        const updatedStores = ids.map(id => allStores.find(store => store.id === id) as Store);
        setStores(updatedStores);
    };

    return (
        <View style={styles.screen}>
            <Wizard activeIndex={activeIndex}>
                <Wizard.Step state={WizardStepStates.ENABLED} label="General Information" />
                <Wizard.Step state={WizardStepStates.ENABLED} label="Overview" />
            </Wizard>

            {
                {
                    0: (
                        <View style={{ flex: 1 }}>
                            <TextField
                                autoFocus
                                floatingPlaceholder
                                style={styles.textInput}
                                placeholder="Name"
                                value={name}
                                onChangeText={name => setName(name)}
                            />

                            <TextField
                                style={styles.textInput}
                                floatingPlaceholder
                                placeholder="Year"
                                value={'' + (year ?? '')}
                                onChangeText={year => setYear(+year)}
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
                                onChangeText={variety => setGrapeVariety(variety)}
                            />
                            <TextField
                                floatingPlaceholder
                                style={styles.textInput}
                                placeholder="Heritage"
                                value={heritage}
                                onChangeText={heritage => setHeritage(heritage)}
                            />
                            <Picker
                                placeholder="Winemaker"
                                floatingPlaceholder
                                useSafeArea
                                value={winemaker?.id}
                                enableModalBlur={false}
                                onChange={id => setWinemaker(winemakers.find(wm => wm.id == id))}
                                topBarProps={{ title: 'Winemakers' }}
                                showSearch
                                searchPlaceholder={'Search a winemaker'}
                            >
                                {winemakers.map(winemaker => (
                                    <Picker.Item key={winemaker.id} value={winemaker.id} label={winemaker.name} />
                                ))}
                            </Picker>
                            <Picker
                                placeholder="Stores"
                                floatingPlaceholder
                                useSafeArea
                                mode={Picker.modes.MULTI}
                                enableModalBlur={false}
                                value={stores.map(store => store.id)}
                                onChange={itemValue => updateSelectedStores(itemValue as string[])}
                            >
                                {allStores.map(store => (
                                    <Picker.Item key={store.id} value={store.id} label={store.name} />
                                ))}
                            </Picker>
                            <Button style={styles.navigationButton} label="Next" onPress={() => setActiveIndex(idx => idx + 1)} />
                        </View>
                    ),
                    1: (
                        <View style={{ flex: 1 }}>
                            <WineCard
                                wine={{
                                    name,
                                    year,
                                    grapeVariety,
                                    heritage,
                                    winemaker
                                }}
                            />
                            <Button style={styles.navigationButton} label="Back" onPress={() => setActiveIndex(idx => idx - 1)} />
                            <Button style={styles.finishButton} label="Finish" onPress={onFinishButtonPress} />
                        </View>
                    )
                }[activeIndex]
            }
        </View>
    );
};

export default AddWineScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    textInput: {
        fontSize: 30
    },
    navigationButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center'
    },
    finishButton: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center'
    }
});
