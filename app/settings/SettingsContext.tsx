import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  SettingsState,
  setNotificationsEnabled,
  updateLanguage,
} from '../features/settings/settingsSlice';
import { AppDispatch, RootState } from '../store/store';

interface SettingsProps {
  settings: SettingsState;
  updateLanguageSettings: (language: string) => void;
  setNotificationsEnabledSettings: (notificationsEnabled: boolean) => void;
}

// Create the settings context
const SettingsContext = createContext<SettingsProps>(null);

// Custom hook to use the settings context
export const useSettings = () => useContext(SettingsContext);

// Settings provider component
export const SettingsProvider = ({ children }) => {
  const dispatch: AppDispatch = useDispatch();
  const [loadedFromStorage, setLoadedFromStorage] = useState(false);
  const settings = useSelector<RootState, SettingsState>(
    (state) => state.settings,
  );
  const { i18n } = useTranslation();

  // update i18n configuration when language in settings changes
  useEffect(() => {
    if (settings.language) {
      i18n.changeLanguage(settings.language);
    }
  }, [i18n, settings.language]);

  // saving and loading settings
  const saveSettings = useCallback(async (currentSettings: SettingsState) => {
    try {
      console.log(`Saving: ${JSON.stringify(currentSettings, null, 2)}`);
      await AsyncStorage.setItem('settings', JSON.stringify(currentSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, []);

  const loadSettings = useCallback(async () => {
    try {
      const savedSettings = await AsyncStorage.getItem('settings');
      if (savedSettings !== null) {
        const parsedSettings = JSON.parse(savedSettings);
        console.log(`Loading: ${JSON.stringify(savedSettings, null, 2)}`);
        dispatch(updateLanguage(parsedSettings.language));
        dispatch(setNotificationsEnabled(parsedSettings.notificationsEnabled));
      }
      setLoadedFromStorage(true);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  }, [dispatch]);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  useEffect(() => {
    // Save settings whenever they change, but only after they have been loaded from storage
    if (loadedFromStorage) {
      saveSettings(settings);
    }
  }, [saveSettings, settings, loadedFromStorage]);

  const updateLanguageSettings = (language: string) => {
    dispatch(updateLanguage(language));
  };
  const setNotificationsEnabledSettings = (notificationsEnabled: boolean) => {
    dispatch(setNotificationsEnabled(notificationsEnabled));
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateLanguageSettings,
        setNotificationsEnabledSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
