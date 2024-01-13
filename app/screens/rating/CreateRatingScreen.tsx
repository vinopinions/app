import { Button, Text, TextField, View } from 'react-native-ui-lib';
import { CreateRatingScreenRouteProp } from '../wines/WinesStackScreen';
import Wine from '../../models/Wine';
import StarRating from 'react-native-star-rating-widget';
import { useState } from 'react';
import { Keyboard, TouchableOpacity } from 'react-native';

const CreateRatingScreen: React.FC<{ route: CreateRatingScreenRouteProp }> = ({ route }): React.ReactElement => {
    const wine: Wine = route.params.wine;
    const [rating, setRating] = useState(0);

    return (
        <TouchableOpacity onPress={Keyboard.dismiss} style={{ flex: 1 }} activeOpacity={1}>
            <View flex>
                <View>
                    <Text text40 style={{ paddingBottom: 10, paddingTop: 20, paddingLeft: 10 }}>
                        {wine.name}
                    </Text>
                </View>
                <Text text50 style={{ marginTop: 15, marginLeft: 10 }}>
                    Rating:
                </Text>
                <View>
                    <StarRating style={{ paddingLeft: 5 }} rating={rating} maxStars={5} onChange={setRating} />
                </View>
                <View>
                    <TextField multiline={true} style={{ borderWidth: 0.5, height: 100, fontSize: 20, margin: 10, marginTop: 5 }} />
                </View>
                <View>
                    <Button label="Submit rating" style={{ margin: 10 }} />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default CreateRatingScreen;
