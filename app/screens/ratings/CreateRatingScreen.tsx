import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { Button, Text, TextField, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { WINES_STACK_NAMES } from '../../constants/RouteNames';
import { createWineRatingAsync } from '../../features/ratings/ratingsSlice';
import { fetchWinesAsync } from '../../features/wines/winesSlice';
import Wine from '../../models/Wine';
import RatingDto from '../../models/dtos/Rating.dto';
import { AppDispatch } from '../../store/store';
import { WinesStackParamList } from '../wines/WinesStack';

const CreateRatingScreen = ({
  route,
  navigation,
}: NativeStackScreenProps<
  WinesStackParamList,
  WINES_STACK_NAMES.RATING_CREATE_SCREEN
>): React.ReactElement => {
  const dispatch: AppDispatch = useDispatch();
  const wine: Wine = route.params.wine;
  const [stars, setStars] = useState(0);
  const [text, setText] = useState<string>();
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(true);

  useEffect(() => {
    setSubmitButtonDisabled(stars === 0 || !text || text.trim() === '');
  }, [stars, text]);

  const onSubmitButtonPress = React.useCallback(() => {
    const onSubmitButtonPressAsync = async () => {
      if (!stars || stars === 0) {
        Alert.alert('No stars submitted', 'Please add stars to your rating', [
          {
            text: 'OK',
            onPress: () => console.log('OK'),
          },
        ]);
      } else {
        const rating: RatingDto = { stars, text };
        await dispatch(
          createWineRatingAsync({ wineId: wine.id, rating: rating }),
        );
        await dispatch(fetchWinesAsync());
        navigation.goBack();
      }
    };
    onSubmitButtonPressAsync();
  }, [stars, text, wine, dispatch, navigation]);

  return (
    <TouchableOpacity
      onPress={Keyboard.dismiss}
      style={styles.container}
      activeOpacity={1}
    >
      <View flex>
        <View>
          <Text text40 style={styles.wineNameText}>
            {wine.name}
          </Text>
        </View>
        <Text text50 style={styles.ratingText}>
          Rating:
        </Text>
        <View>
          <StarRating
            style={styles.starRating}
            rating={stars}
            maxStars={5}
            onChange={setStars}
            enableHalfStar={false}
          />
        </View>
        <View>
          <TextField
            multiline={true}
            style={styles.inputTextField}
            value={text}
            onChangeText={setText}
            enableErrors
            validationMessage={'Field is required'}
            validate={'required'}
            validateOnChange
            validateOnStart
            validateOnBlur
          />
        </View>
        <View>
          <Button
            label="Submit rating"
            style={styles.submitButton}
            onPress={onSubmitButtonPress}
            disabled={submitButtonDisabled}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CreateRatingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitButton: {
    margin: 10,
  },
  starRating: {
    paddingLeft: 5,
  },
  ratingText: {
    marginTop: 15,
    marginLeft: 10,
  },
  wineNameText: { paddingBottom: 10, paddingTop: 20, paddingLeft: 10 },
  inputTextField: {
    borderWidth: 0.5,
    height: 100,
    fontSize: 20,
    margin: 10,
    marginTop: 5,
  },
});
