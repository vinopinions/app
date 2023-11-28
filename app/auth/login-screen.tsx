import { Button, Input } from '@ui-kitten/components';
import { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native';
import PasswordField from './password-masking/password-field';
import { AuthContext } from '../App';

const LoginScreen = () => {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const { signIn } = useContext(AuthContext);

    return (
        <SafeAreaView>
            <Input placeholder="username" id="username" onChangeText={username => setState({ ...state, username })} />
            <PasswordField value={state.password} onChangeText={password => setState({ ...state, password })} />
            <Button onPress={() => signIn(state.username, state.password)}>Login</Button>
        </SafeAreaView>
    );
};

export default LoginScreen;
