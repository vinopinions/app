import React, { useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';
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

  const onSubmitButtonPress = React.useCallback(() => {
    const onSubmitButtonPressAsync = async () => {
      const rating: Rating = { stars, text };
      await dispatch(
        createWineRatingAsync({ wineId: wine.id, rating: rating }),
      );
      await dispatch(fetchWinesAsync());
      navigation.goBack();
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
          />
        </View>
        <View>
          <Button
            label="Submit rating"
            style={{ margin: 10 }}
            onPress={onSubmitButtonPress}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CreateRatingScreen;
