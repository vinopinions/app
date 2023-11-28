import { Button, Input, IconElement, Icon } from '@ui-kitten/components';
import { useState } from 'react';
import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';

const AlterIcon = (props): IconElement => <Icon {...props} name="alert-circle-outline" />;

const LoginScreen = () => {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    const renderIcon = (props): React.ReactElement => (
        <TouchableWithoutFeedback onPress={toggleSecureEntry}>
            <Icon {...props} name={secureTextEntry ? 'eye-off-outline' : 'eye-outline'} />
        </TouchableWithoutFeedback>
    );

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
            <Input
                value={state.password}
                placeholder="password"
                id="password"
                onChangeText={password => setState({ ...state, password })}
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
            />
            <Button onPress={login}>Login</Button>
        </SafeAreaView>
    );
};

export default LoginScreen;
