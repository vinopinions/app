import { Icon, Input } from '@ui-kitten/components';
import { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

interface PasswordFieldProps {
    value: string;
    onChangeText: (value: string) => void;
}

const PasswordField = (props: PasswordFieldProps): React.ReactElement => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const maskingIcon = (props): React.ReactElement => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} />
        </TouchableWithoutFeedback>
    );

    return (
        <Input
            value={props.value}
            placeholder="password"
            id="password"
            onChangeText={props.onChangeText}
            accessoryRight={maskingIcon}
            secureTextEntry={secureTextEntry}
        />
    );
};

export default PasswordField;
