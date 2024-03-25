import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Image, Text, View } from 'react-native-ui-lib';
import Wine from '../../models/Wine';
import {
  CalendarIconOutline,
  GrapeIconOutline,
  LocationIconOutline,
  WinemakerIconOutline,
} from '../../utils/icons';

export type WineDetailsScreenHeaderProps = {
  wine: Wine;
};

const WineDetailsScreenHeader = ({ wine }: WineDetailsScreenHeaderProps) => {
  const { t } = useTranslation();

  return (
    <>
      <View marginB-5>
        <View style={styles.container}>
          <Image source={{ uri: wine.image }} style={styles.coverPhoto} />
        </View>
        <Text text40 style={styles.heading}>
          {t('winesStack.wineDetailsScreen.wineFrom', {
            wineName: wine.name,
            winemakerName: wine.winemaker.name,
          })}
        </Text>
      </View>
      <View marginB-10>
        <View style={styles.iconTextContainer}>
          <WinemakerIconOutline size={20} />
          <Text style={styles.text}>{wine.winemaker.name}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <GrapeIconOutline size={20} />
          <Text style={styles.text}>{wine.grapeVariety}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <LocationIconOutline size={20} />
          <Text style={styles.text}>{wine.heritage}</Text>
        </View>
        <View style={styles.iconTextContainer}>
          <CalendarIconOutline size={20} />
          <Text style={styles.text}>{wine.year}</Text>
        </View>
      </View>
    </>
  );
};

export default WineDetailsScreenHeader;

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
