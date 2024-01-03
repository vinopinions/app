import { Button, TextField, View, Wizard, WizardStepStates } from 'react-native-ui-lib';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import StoreCard from '../../components/stores/StoreCard';
import React from 'react';
import { AppDispatch, RootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { createStoreAsync } from '../../features/stores/storesSlice';
import Store from '../../models/Store';

const AddStoreScreen = ({ navigation }) => {
    const dispatch: AppDispatch = useDispatch();
    const [activeIndex, setActiveIndex] = useState(0);
    const allStores = useSelector((state: RootState) => (state.stores.status !== 'failed' ? state.stores.data : []));

    const [name, setName] = useState<string>();
    const [address, setAddress] = useState<string>();
    const [url, setUrl] = useState<string>();

    const onFinishButtonPress = React.useCallback(() => {
        const onFinishButtonPressAsync = async () => {
            /*
            if (allStores.map(s => s.name.toLowerCase() === name.toLowerCase() || s.address.toLowerCase() == address.toLowerCase())) {
                alert('Store already exists!');
                return navigation.goBack();
            }
            */
            const store: Store = { name, address, url, wines: [] };
            await dispatch(createStoreAsync(store));
            navigation.goBack();
        };
        onFinishButtonPressAsync();
    }, [name, address, url]);

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
                                floatingPlaceholder
                                style={styles.textInput}
                                placeholder="Address"
                                value={address}
                                onChangeText={address => setAddress(address)}
                            />
                            <TextField floatingPlaceholder style={styles.textInput} placeholder="Url" value={url} onChangeText={url => setUrl(url)} />
                            <Button style={styles.navigationButton} label="Next" onPress={() => setActiveIndex(idx => idx + 1)} />
                        </View>
                    ),
                    1: (
                        <View style={{ flex: 1 }}>
                            <StoreCard
                                store={{
                                    name,
                                    address,
                                    url,
                                    wines: []
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

export default AddStoreScreen;

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
