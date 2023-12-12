import React, { useState } from 'react';
import { StyleProp, TextInput, TextStyle, TouchableWithoutFeedback } from 'react-native';
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

    const maskingIcon = (props): React.ReactElement => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            {secureTextEntry ? <EyeIcon {...props} /> : <EyeSlashIcon {...props} />}
        </TouchableWithoutFeedback>
    );

    return (
        <>
            <TextInput value={props.value} placeholder="password" id="password" onChangeText={props.onChangeText} secureTextEntry={secureTextEntry} />
            {maskingIcon}
        </>
    );
};

export default PasswordField;
