import { Card, CardProps, View, Text, TouchableOpacity, Incubator, PanningProvider } from 'react-native-ui-lib';
import Rating from '../../models/Rating';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { Alert, StyleSheet } from 'react-native';
import User from '../../models/User';
import { useState } from 'react';
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
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleDelete = (rating: Rating) => {
        Alert.alert('Deleting Rating', 'Are you sure you want to delete your rating?', [
            {
                text: 'Cancel',
                onPress: () => toggleModal()
            },
            {
                text: 'OK',
                onPress: () => {
                    dispatch(deleteRatingAsync(rating.id));
                    dispatch(fetchWinesAsync());
                    toggleModal();
                }
            }
        ]);
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
                            <TouchableOpacity onPress={toggleModal}>
                                <Text text40>...</Text>
                            </TouchableOpacity>
                            <Incubator.Dialog
                                visible={showModal}
                                onDismiss={() => toggleModal}
                                width="100%"
                                height="20%"
                                bottom
                                direction={PanningProvider.Directions.DOWN}
                            >
                                <View style={styles.modalContainer}>
                                    <View style={styles.modalContent}>
                                        <TouchableOpacity style={styles.modalOption}>
                                            <Text style={styles.modalOptionText}>Edit</Text>
                                        </TouchableOpacity>
                                        <View style={styles.separator} />
                                        <TouchableOpacity
                                            style={styles.modalOption}
                                            onPress={() => handleDelete(props.rating)}
                                        >
                                            <Text red10 style={styles.modalOptionText}>
                                                Delete
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Incubator.Dialog>
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
