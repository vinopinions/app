import { Card, CardProps, Text, View } from 'react-native-ui-lib';
import Store from '../../models/Store';
import React from 'react';
import { StyleSheet } from 'react-native';

type StoreCardProps = CardProps & { store: Store };

const StoreCard = (props: StoreCardProps): React.ReactElement => {
    return (
        <Card {...props} style={styles.card}>
            <View padding-20>
                <Text text40 $textDefault>
                    {props.store.name}
                </Text>
                <Text text70 $textDefault>
                    {props.store.address}
                </Text>
                <View style={{ flex: 1 }}>
                    <Text text60 $textDefault style={{ textAlign: 'right' }}>
                        {props.store.wines === undefined ? 'No ratings yet' : props.store.wines.length}
                    </Text>
                </View>
            </View>
        </Card>
    );
};

export default StoreCard;

const styles = StyleSheet.create({
    card: { marginBottom: 15 }
});
