import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import Store from '../../api/pagination/Store';
import { InternIconOutline, LocationIconOutline } from '../../utils/icons';

export type StoreDetailsScreenHeaderProps = {
  store: Store;
};

const StoreDetailsScreenHeader = ({ store }: StoreDetailsScreenHeaderProps) => {
  return (
    <>
      <View marginB-5>
        <View style={styles.container}>
          <Image source={{ uri: store.image }} style={styles.coverPhoto} />
        </View>
        <Text text40 style={styles.heading}>
          {store.name}
        </Text>
      </View>
      <View marginB-10>
        {store.address ? (
          <View style={styles.iconTextContainer}>
            <LocationIconOutline size={20} />
            <Text style={styles.text}>{store.address}</Text>
          </View>
        ) : (
          <></>
        )}
        {store.url ? (
          <View style={styles.iconTextContainer}>
            <InternIconOutline size={20} />
            <Text style={styles.text}>{store.url}</Text>
          </View>
        ) : (
          <></>
        )}
      </View>
    </>
  );
};

export default StoreDetailsScreenHeader;

const styles = StyleSheet.create({
  heading: {
    marginTop: 5,
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
  },
  iconTextContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  coverPhoto: {
    width: '100%',
    height: 250,
  },
});
