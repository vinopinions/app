import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SettingsState = {
  language: string | undefined;
  notificationsEnabled: boolean;
};

const initialState: SettingsState = {
  language: undefined,
  notificationsEnabled: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
      state.notificationsEnabled = action.payload;
    },
    toggleNotifications: (state) => {
      state.notificationsEnabled = !state.notificationsEnabled;
    },
  },
});

export const { updateLanguage, toggleNotifications, setNotificationsEnabled } =
  settingsSlice.actions;
export default settingsSlice.reducer;
