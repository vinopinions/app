import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import useWines from '../../hooks/useWines';
import Wine from '../../models/Wine';

const WinesScreen = () => {
    const { getAll } = useWines();
    const [wines, setWines] = useState<Wine[]>([]);

    useEffect(() => {
        const getAllWines = async () => {
            setWines(await getAll());
        };
        getAllWines();
    }, []);

    console.log(wines);
    return (
        <View>
            <Text>This is the the wine screen</Text>
        </View>
    );
};

export default WinesScreen;
