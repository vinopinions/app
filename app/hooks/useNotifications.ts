import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotificationTokenAsync } from '../features/notifications/notificationSlice';
import { AppDispatch } from '../store/store';

export const useNotification = () => {
  const [pushToken, setPushToken] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (pushToken) {
      dispatch(addNotificationTokenAsync(pushToken));
    }
  }, [dispatch, pushToken]);

  const register = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    setPushToken(token);
  };

  return {
    pushToken,
    register,
  };
};
