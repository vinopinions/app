import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import useWines from '../../hooks/useWines';
import Wine from '../../models/Wine';

const WinesScreen = () => {
    const { getAll } = useWines();
    const [wines, setWines] = useState<Wine[]>(null);

    useEffect(() => {
        const getAllWines = async () => {
            setWines(await getAll());
        };
        getAllWines();
    }, []);

    console.log(wines);
    return <View>{wines == null ? <Text>This is the the wine screen</Text> : <Text>{JSON.stringify(wines, null, 2)}</Text>}</View>;
};

export default WinesScreen;
