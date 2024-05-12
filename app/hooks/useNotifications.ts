import * as Notifications from 'expo-notifications';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotificationTokenAsync } from '../features/notifications/notificationSlice';
import { AppDispatch } from '../store/store';

export const useNotification = () => {
  const [pushToken, setPushToken] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if (pushToken) {
      dispatch(addNotificationTokenAsync(pushToken));
    }
  }, [dispatch, pushToken]);

  useEffect(() => {
    checkPermission();
  }, []);

  const checkPermission = async () => {
    setPermissionGranted(
      (await Notifications.getPermissionsAsync()).status === 'granted',
    );
  };

  const requestPermission = async () => {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      setPermissionGranted(false);
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    setPushToken(token);
    setPermissionGranted(true);
  };

  return {
    pushToken,
    permissionGranted,
    requestPermission,
  };
};
