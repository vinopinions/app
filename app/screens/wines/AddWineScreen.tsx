import { Button, Input } from '@ui-kitten/components';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import AutocompleteField from '../../components/AutocompleteField';
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
    const [winemaker, setWinemaker] = useState<Winemaker>(null);

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

    const onAutocompleteSelect = useCallback((value: Winemaker) => {
        setWinemaker(value);
    }, []);

    return (
        <View>
            <Input placeholder="Name" value={name} onChangeText={t => setName(t)} />
            <Input placeholder="Year" value={year} onChangeText={t => setYear(t)} maxLength={4} inputMode="decimal" />
            <Input placeholder="GrapeVariety" value={grapeVariety} onChangeText={t => setGrapeVariety(t)} />
            <Input placeholder="heritage" value={heritage} onChangeText={t => setHeritage(t)} />
            <AutocompleteField<Winemaker>
                onItemSelect={onAutocompleteSelect}
                placeholder="Winemaker"
                identify={winemaker => winemaker.name}
                items={winemakers}
                onPressIn={updateWinemakers}
            />
            <Button onPress={() => onSubmit()}>Save</Button>
        </View>
    );
};

export default AddWineScreen;
