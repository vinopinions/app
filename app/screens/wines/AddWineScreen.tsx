import { useEffect, useState } from 'react';
import { Button, TextField, View, Wizard, WizardStepStates } from 'react-native-ui-lib';
import WineCard from '../../components/WineCard';
import useGetWinemakers from '../../hooks/winemakers/useGetWinemakers';
import Winemaker from '../../models/Winemaker';
// import useGetWinemakers from '../../hooks/winemakers/useGetWinemakers';
// import useCreateWine from '../../hooks/wines/useCreateWine';
// import Winemaker from '../../models/Winemaker';

const AddWineScreen = () => {
    // const { createWine } = useCreateWine();
    const { getWinemakers, winemakers } = useGetWinemakers();

    const [name, setName] = useState('');
    const [year, setYear] = useState<number>();
    const [grapeVariety, setGrapeVariety] = useState('');
    const [heritage, setHeritage] = useState('');
    const [winemakerId, setWinemakerId] = useState('');
    const [winemaker, setWinemaker] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        getWinemakers();
    }, []);

    useEffect(() => {
        if (!winemakers) return;

        const wm: Winemaker | null = winemakers.find(e => e.id == winemakerId);

        if (wm) setWinemaker(wm);
    }, [winemakerId]);

    return (
        <View>
            <Wizard activeIndex={activeIndex} onActiveIndexChanged={idx => console.log('f' + idx)}>
                <Wizard.Step state={WizardStepStates.DISABLED} label="Choose Name" />
                <Wizard.Step state={WizardStepStates.ENABLED} label="Choose Year" />
                <Wizard.Step state={WizardStepStates.ENABLED} label="Choose Grape Variety" />
                <Wizard.Step state={WizardStepStates.ENABLED} label="Choose Heritage" />
                <Wizard.Step state={WizardStepStates.ENABLED} label="Choose Winemaker" />
                <Wizard.Step state={WizardStepStates.ENABLED} label="Overview" />
            </Wizard>

            {
                {
                    0: <TextField placeholder="Name" value={name} onChangeText={name => setName(name)} />,
                    1: <TextField placeholder="Year" value={'' + year} onChangeText={year => setYear(+year)} maxLength={4} inputMode="decimal" />,
                    2: <TextField placeholder="GrapeVariety" value={grapeVariety} onChangeText={variety => setGrapeVariety(variety)} />,
                    3: <TextField placeholder="Heritage" value={heritage} onChangeText={heritage => setHeritage(heritage)} />,
                    4: <TextField placeholder="WinemakerID" value={winemakerId} onChangeText={winemakerId => setWinemakerId(winemakerId)} />,
                    5: (
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

            <Button label="Next" onPress={() => setActiveIndex(idx => idx + 1)} />
            <Button label="Pervious" onPress={() => setActiveIndex(idx => idx - 1)} />
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
