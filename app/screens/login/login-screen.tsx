import { Button, Input, Text } from '@ui-kitten/components';
import { useContext, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import PasswordField from '../../auth/components/password-field';
import { AuthContext } from '../../App';
import loginStyles from './styles/login-styles';

interface LoginProps {
    switchToSignUp: () => void;
}

const LoginScreen = ({ switchToSignUp }: LoginProps) => {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const { signIn } = useContext(AuthContext);

    return (
        <SafeAreaView style={loginStyles.container}>
            <Text style={loginStyles.title}>Login</Text>
            <View style={loginStyles.inputView}>
                <Input
                    value={state.username}
                    style={loginStyles.inputText}
                    placeholder="username"
                    id="username"
                    onChangeText={username => setState({ ...state, username })}
                />
            </View>
            <View style={loginStyles.inputView}>
                <PasswordField style={loginStyles.inputText} value={state.password} onChangeText={password => setState({ ...state, password })} />
            </View>
            <Button
                onPress={() => {
                    signIn(state.username, state.password);
                }}
            >
                Login
            </Button>
            <Button onPress={() => switchToSignUp()}>Sign up</Button>
        </SafeAreaView>
    );
};

export default LoginScreen;
