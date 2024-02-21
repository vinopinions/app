import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, TouchableOpacity } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { Button, Text, TextField, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import { createWineRatingAsync } from '../../features/ratings/ratingsSlice';
import { fetchWinesAsync } from '../../features/wines/winesSlice';
import Rating from '../../models/Rating';
import Wine from '../../models/Wine';
import { AppDispatch } from '../../store/store';
import {
  CreateRatingScreenNavigationProp,
  CreateRatingScreenRouteProp,
} from '../wines/WinesStackScreen';

const CreateRatingScreen: React.FC<{
  route: CreateRatingScreenRouteProp;
  navigation: CreateRatingScreenNavigationProp;
}> = ({ route, navigation }): React.ReactElement => {
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
      style={{ flex: 1 }}
      activeOpacity={1}
    >
      <View flex>
        <View>
          <Text
            text40
            style={{ paddingBottom: 10, paddingTop: 20, paddingLeft: 10 }}
          >
            {wine.name}
          </Text>
        </View>
        <Text text50 style={{ marginTop: 15, marginLeft: 10 }}>
          Rating:
        </Text>
        <View>
          <StarRating
            style={{ paddingLeft: 5 }}
            rating={stars}
            maxStars={5}
            onChange={setStars}
            enableHalfStar={false}
          />
        </View>
        <View>
          <TextField
            multiline={true}
            style={{
              borderWidth: 0.5,
              height: 100,
              fontSize: 20,
              margin: 10,
              marginTop: 5,
            }}
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
            style={{ margin: 10 }}
            onPress={onSubmitButtonPress}
            disabled={submitButtonDisabled}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CreateRatingScreen;
