import { Card, CardProps, Text, View } from 'react-native-ui-lib';
import Store from '../../models/Store';
import React from 'react';
import { StyleSheet } from 'react-native';
import { getWinesForStore } from '../../screens/stores/utils/StoreUtils';
import Wine from '../../models/Wine';

type StoreCardProps = CardProps & { store: Store };

const StoreCard = (props: StoreCardProps): React.ReactElement => {
    const wines: Wine[] = getWinesForStore(props.store);
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
                        {wines == null || wines === undefined || wines.length == 0
                            ? 'No ratings yet'
                            : wines.length == 1
                              ? wines.length + ' wine rating'
                              : wines.length + ' wine ratings'}
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
