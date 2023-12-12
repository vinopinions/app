import { useCallback, useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import useGetWinemakers from '../../hooks/winemakers/useGetWinemakers';
import useCreateWine from '../../hooks/wines/useCreateWine';
import Winemaker from '../../models/Winemaker';

const AddWineScreen = () => {
    const { createWine } = useCreateWine();
    const { getWinemakers, winemakers } = useGetWinemakers();

    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [grapeVariety, setGrapeVariety] = useState('');
    const [heritage, setHeritage] = useState('');
    const [winemaker] = useState<Winemaker>(null);

    const updateWinemakers = useCallback(() => {
        const loadWinemakers = async () => {
            await getWinemakers();
        };
        loadWinemakers();
    }, []);

    useEffect(() => {
        updateWinemakers();
    }, []);

    useEffect(() => {}, [winemakers]);

    const onSubmit = useCallback(() => {
        createWine(name, +year, grapeVariety, heritage, winemaker.id);
    }, []);

    // const onAutocompleteSelect = useCallback((value: Winemaker) => {
    //     setWinemaker(value);
    // }, []);

    return (
        <View>
            <TextInput placeholder="Name" value={name} onChangeText={t => setName(t)} />
            <TextInput placeholder="Year" value={year} onChangeText={t => setYear(t)} maxLength={4} inputMode="decimal" />
            <TextInput placeholder="GrapeVariety" value={grapeVariety} onChangeText={t => setGrapeVariety(t)} />
            <TextInput placeholder="heritage" value={heritage} onChangeText={t => setHeritage(t)} />
            {/* <AutocompleteField<Winemaker>
                onItemSelect={onAutocompleteSelect}
                placeholder="Winemaker"
                identify={winemaker => winemaker.name}
                items={winemakers}
                onPressIn={updateWinemakers}
            /> */}
            <Button title="Save" onPress={() => onSubmit()} />
        </View>
    );
};

export default AddWineScreen;
