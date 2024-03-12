import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

export type AccountScreenHeaderProps = {
  ratingAmount: number;
  friendAmount: number;
};

const AccountScreenHeader = ({
  ratingAmount,
  friendAmount,
}: AccountScreenHeaderProps) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.infoBoxContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoBoxContent}>{ratingAmount}</Text>
          <Text>{t('common.ratings')}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoBoxContent}>{friendAmount}</Text>
          <Text>{t('common.friends')}</Text>
        </View>
      </View>
      <Text style={styles.ratingsText}>{t('common.ratings')}</Text>
    </View>
  );
};

export default AccountScreenHeader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  headingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
  },
  infoBoxContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: { alignItems: 'center' },
  infoBoxContent: { fontWeight: 'bold', fontSize: 24 },
  infoBoxName: {},
  ratingsText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
