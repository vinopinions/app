import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import * as React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Picker selectedValue={i18n.language} onValueChange={onLanguageChange}>
          {Object.keys(i18n.options.resources).map((languageCode) => (
            <Picker.Item
              key={languageCode}
              value={languageCode}
              label={t(`languages.${languageCode}`)}
            />
          ))}
        </Picker>
        <Button label={t('common.signOut')} onPress={onSignOutButtonPress} />
      </View>
      <View style={styles.footer}>
        <Text>version: {Constants.expoConfig.version}</Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  titleWrapper: {},
  inputWrapper: {},
  content: {
    flex: 1, // pushes the footer to the end of the screen
  },
  footer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
