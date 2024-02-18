import { Card, CardProps, View, Text, TouchableOpacity } from 'react-native-ui-lib';
import Rating from '../../models/Rating';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Alert, StyleSheet } from 'react-native';
import User from '../../models/User';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { deleteRatingAsync } from '../../features/ratings/ratingsSlice';
import { fetchWinesAsync } from '../../features/wines/winesSlice';

type RatingCardProps = CardProps & {
    rating: Rating;
    currentUser: User | undefined;
};

const RatingCard = (props: RatingCardProps): React.ReactElement => {
    const dispatch: AppDispatch = useDispatch();

    const handleDelete = () => {
        Alert.alert('Confirm Deletion', 'Are you sure you want to delete this rating?', [
            {
                text: 'Cancel',
                onPress: handleCancelDelete,
                style: 'cancel'
            },
            {
                text: 'OK',
                onPress: handleConfirmDelete
            }
        ]);
    };

    const handleCancelDelete = () => {
        console.log('dismissing alert');
    };

    const handleConfirmDelete = async () => {
        await dispatch(deleteRatingAsync(props.rating.id));
        await dispatch(fetchWinesAsync());
    };

    return (
        <Card {...props} style={styles.card}>
            <View padding-20>
                <View row spread>
                    <Text text50 $textDefault>
                        {props.rating.user.username}
                    </Text>
                    <Text marginT-5>{new Date(props.rating.createdAt).toLocaleDateString()}</Text>
                </View>
                <View>
                    <StarRatingDisplay
                        rating={props.rating.stars}
                        style={{ height: 25, width: 15, marginLeft: -8 }}
                        starSize={20}
                        starStyle={{ height: 5, width: 5 }}
                    />
                </View>
                <View row spread>
                    <Text text70 $textDefault>
                        {props.rating.text}
                    </Text>
                    {props.currentUser && props.rating.user.id == props.currentUser.id && (
                        <View>
                            <TouchableOpacity onPress={() => handleDelete()}>
                                <Text red30 text40>
                                    x
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Card>
    );
};

export default RatingCard;

const styles = StyleSheet.create({
    card: { marginBottom: 15 },
    modalContainer: {
        justifyContent: 'flex-end',
        margin: 0
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    modalOption: {
        paddingVertical: 15
    },
    modalOptionText: {
        fontSize: 18
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
        marginVertical: 10
    }
});