import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
} from 'react-native';
import { TextField, TextFieldProps, View } from 'react-native-ui-lib';

import { EyeIcon, EyeSlashIcon } from '../utils/icons';

type PasswordFieldProps = {
  value: string;
  onChangeText: (value: string) => void;
  style?: StyleProp<TextStyle>;
} & TextFieldProps;

const PasswordField = (props: PasswordFieldProps): React.ReactElement => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  return (
    <TextField
      id="password"
      secureTextEntry={secureTextEntry}
      {...props}
      trailingAccessory={
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
          <View style={styles.toggleSecureButton}>
            {secureTextEntry ? (
              <EyeIcon size={25} />
            ) : (
              <EyeSlashIcon size={25} />
            )}
          </View>
        </TouchableWithoutFeedback>
      }
    />
  );
};

export default PasswordField;

const styles = StyleSheet.create({
  toggleSecureButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
