import { Picker } from '@react-native-picker/picker';
import * as React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button } from 'react-native-ui-lib';
import { useAuth } from '../../auth/AuthContext';

const SettingsScreen = () => {
  const { logout } = useAuth();
  const { t, i18n } = useTranslation();

  const onSignOutButtonPress = useCallback(() => {
    logout();
  }, [logout]);

  const onLanguageChange = useCallback(
    (language: string) => {
      i18n.changeLanguage(language);
    },
    [i18n],
  );
  return (
    <SafeAreaView>
      <Picker selectedValue={i18n.language} onValueChange={onLanguageChange}>
        {Object.keys(i18n.options.resources).map((languageCode) => (
          <Picker.Item
            value={languageCode}
            label={t(`languages.${languageCode}`)}
          />
        ))}
      </Picker>
      <Button
        style={styles.signOutButton}
        label={t('common.signOut')}
        onPress={onSignOutButtonPress}
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  signOutButton: {},
});
