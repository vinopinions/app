import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Picker, PickerModes, TextField, View, Wizard, WizardStepStates } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import WineCard from '../../components/WineCard';
import { fetchWinemakersAsync } from '../../features/winemakers/winemakersSlice';
import { AppDispatch, RootState } from '../../store/store';
// import useGetWinemakers from '../../hooks/winemakers/useGetWinemakers';
// import useCreateWine from '../../hooks/wines/useCreateWine';
// import Winemaker from '../../models/Winemaker';

const AddWineScreen = () => {
    const dispatch: AppDispatch = useDispatch();
    const winemakers = useSelector((state: RootState) => state.winemakers.items);

    const [name, setName] = useState<string>();
    const [year, setYear] = useState<number>();
    const [grapeVariety, setGrapeVariety] = useState<string>();
    const [heritage, setHeritage] = useState<string>();
    const [winemakerName, setWinemakerName] = useState<string>('');
    const [winemaker, setWinemaker] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        dispatch(fetchWinemakersAsync());
    }, []);

    useEffect(() => {
        console.log(winemakerName);
    }, [winemakerName]);

    return (
        <View style={styles.screen}>
            <Wizard activeIndex={activeIndex} onActiveIndexChanged={idx => console.log('f' + idx)}>
                <Wizard.Step state={WizardStepStates.ENABLED} label="General Information" />
                <Wizard.Step state={WizardStepStates.ENABLED} label="Overview" />
            </Wizard>

            {
                {
                    0: (
                        <View>
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
                                mode={PickerModes.SINGLE}
                                placeholder="Winemaker"
                                floatingPlaceholder
                                useSafeArea
                                value={winemaker}
                                onChange={item => setWinemaker(item)}
                                topBarProps={{ title: 'Winemakers' }}
                                showSearch
                                onSearchChange={text => setWinemakerName(text)}
                                searchPlaceholder={'Search a winemaker'}
                            >
                                {winemakers.map((winemaker, idx) => (
                                    <Picker.Item key={idx} value={winemaker.id} label={winemaker.name} />
                                ))}
                                <Picker.Item key="new" value="new" label="Create winemaker..." />
                            </Picker>
                        </View>
                    ),
                    2: (
                        <WineCard
                            wine={{
                                id: '123',
                                name,
                                year,
                                grapeVariety,
                                heritage,
                                winemaker
                            }}
                        />
                    )
                }[activeIndex]
            }

            <Button style={styles.nextButton} label="Next" onPress={() => setActiveIndex(idx => idx + 1)} />
            {/* <TextField placeholder="Name" value={name} onChangeText={t => setName(t)} />
            
            <TextField placeholder="heritage" value={heritage} onChangeText={t => setHeritage(t)} />
            <TextField placeholder="heritage" value={heritage} onChangeText={t => setHeritage(t)} />
            {/* <AutocompleteField<Winemaker>
                onItemSelect={onAutocompleteSelect}
                placeholder="Winemaker"
                identify={winemaker => winemaker.name}
                items={winemakers}
                onPressIn={updateWinemakers}
            /> */}
            {/* <Button title="Save" onPress={() => onSubmit()} /> */}
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
    nextButton: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center'
    }
});
