import { Input, Button } from '@ui-kitten/components';
import React, { useState } from 'react';
import { View } from 'react-native';
import { AuthContext } from '../../App';
import PasswordField from '../../auth/password-masking/password-field';

const LoginScreen = () => {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const { signIn } = React.useContext(AuthContext);

    return (
        <View>
            <Input placeholder="username" />
            <PasswordField onChangeText={password => setState({ ...state, password })} value={state.password} />
            <Button onPress={() => signIn(state.username, state.password)} />
        </View>
    );
};

export default LoginScreen;
