import { Button, Input } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import PasswordField from '../../auth/components/password-field';
import { useState } from 'react';
import React from 'react';
import { AuthContext } from '../../App';

const SignUpScreen = () => {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const { signUp } = React.useContext(AuthContext);

    return (
        <SafeAreaView>
            <Input placeholder="username" />
            <PasswordField value={state.password} onChangeText={password => setState({ ...state, password })} />
            <Button onPress={() => signUp(state.username, state.password)}>Sign Up</Button>
        </SafeAreaView>
    );
};

export default SignUpScreen;
