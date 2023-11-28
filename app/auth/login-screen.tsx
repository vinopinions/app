import { Button, Input } from '@ui-kitten/components';
import { useState } from 'react';
import { SafeAreaView } from 'react-native';

const LoginScreen = () => {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const login = () => {
        fetch('https://api.vinopinions.spots.host/v0/auth/login', {
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
            <Input placeholder="username" id="username" onChangeText={username => setState({ ...state, username })} />
            <Input placeholder="password" id="password" onChangeText={password => setState({ ...state, password })} />
            <Button onPress={login}>Login</Button>
        </SafeAreaView>
    );
};

export default LoginScreen;
