import { Button, Input } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';
import PasswordField from './password-masking/password-field';
import { useState } from 'react';

const SignUpScreen = () => {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const signUp = () => {
        console.log(state);
        fetch('https://api.vinopinions.spots.host/v0/auth/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: state.username,
                password: state.password
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            });
    };
    return (
        <SafeAreaView>
            <Input placeholder="username" />
            <PasswordField value={state.password} onChangeText={password => setState({ ...state, password })} />
            <Button onPress={signUp}>Sign Up</Button>
        </SafeAreaView>
    );
};

export default SignUpScreen;
