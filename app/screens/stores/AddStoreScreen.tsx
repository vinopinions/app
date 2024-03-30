import { faker } from '@faker-js/faker';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerAsset } from 'expo-image-picker';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import {
  Button,
  TextField,
  View,
  Wizard,
  WizardStepStates,
} from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import StoreCard from '../../components/stores/StoreCard';
import { createStoreAsync } from '../../features/stores/storesSlice';
import CreateStoreDto from '../../models/dtos/Store.dto';
import { AppDispatch } from '../../store/store';

const AddStoreScreen = ({ navigation }) => {
  const dispatch: AppDispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const [name, setName] = useState<string>();
  const [address, setAddress] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [image, setImage] = useState<ImagePickerAsset>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const onFinishButtonPress = React.useCallback(() => {
    const onFinishButtonPressAsync = async () => {
      const store: CreateStoreDto = { name, address, url, imageUri: image.uri };
      await dispatch(createStoreAsync(store));

      navigation.goBack();
    };
    onFinishButtonPressAsync();
  }, [dispatch, navigation, name, address, url, image]);

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
                floatingPlaceholder
                style={styles.textInput}
                placeholder="Address"
                value={address}
                onChangeText={(value) => setAddress(value)}
              />
              <TextField
                floatingPlaceholder
                style={styles.textInput}
                placeholder="Url"
                value={url}
                onChangeText={(value) => setUrl(value)}
              />
              <Button label="Pick Image" onPress={pickImage} />
              <Button
                style={styles.navigationButton}
                label="Next"
                onPress={() => setActiveIndex((idx) => idx + 1)}
              />
            </View>
          ),
          1: (
            <View style={styles.container}>
              <StoreCard
                store={{
                  id: faker.string.uuid(),
                  name,
                  address,
                  url,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
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

export default AddStoreScreen;

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
