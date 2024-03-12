import * as React from 'react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-ui-lib';
import { useAuth } from '../../auth/AuthContext';

const SettingsScreen = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  const onSignOutButtonPress = useCallback(() => {
    logout();
  }, [logout]);

  return (
    <SafeAreaView>
      <Text>Settings</Text>
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
