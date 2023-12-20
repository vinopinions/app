import React, { useState } from 'react';
import { StyleProp, TextStyle, TouchableWithoutFeedback } from 'react-native';
import { TextField, View } from 'react-native-ui-lib';

import { EyeIcon, EyeSlashIcon } from '../utils/icons';

interface PasswordFieldProps {
    value: string;
    onChangeText: (value: string) => void;
    style?: StyleProp<TextStyle>;
}

const PasswordField = (props: PasswordFieldProps): React.ReactElement => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <TextField
            value={props.value}
            placeholder="password"
            id="password"
            onChangeText={props.onChangeText}
            secureTextEntry={secureTextEntry}
            trailingAccessory={
                <TouchableWithoutFeedback onPress={toggleSecureEntry}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {secureTextEntry ? <EyeIcon size={25} {...props} /> : <EyeSlashIcon size={25} {...props} />}
                    </View>
                </TouchableWithoutFeedback>
            }
        />
    );
};

export default PasswordField;
