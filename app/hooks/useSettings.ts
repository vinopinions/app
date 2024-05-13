import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  SettingsState,
  setNotificationEnabled,
  toggleNotifications,
  updateLanguage,
} from '../features/settings/settingsSlice';
import { AppDispatch, RootState } from '../store/store';

export const useSettings = () => {
  const dispatch: AppDispatch = useDispatch();
  const settings = useSelector<RootState, SettingsState>(
    (state) => state.settings,
  );
  const { i18n } = useTranslation();

  // update i18n configuration when language in settings changes
  useEffect(() => {
    i18n.changeLanguage(settings.language);
  }, [i18n, settings.language]);

  // reducer wrapper
  const updateLanguageSettings = (language: string) => {
    dispatch(updateLanguage(language));
  };
  const setNotificationEnabledSettings = (notificationsEnabled: boolean) => {
    dispatch(setNotificationEnabled(notificationsEnabled));
  };
  const toggleNotificationsSettings = () => {
    dispatch(toggleNotifications());
  };

  return {
    settings,
    updateLanguageSettings,
    setNotificationEnabledSettings,
    toggleNotificationsSettings,
  };
};
