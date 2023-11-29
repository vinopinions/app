import { SafeAreaView, View } from 'react-native';
import { Text, Input, Button } from '@ui-kitten/components';
import { useContext, useState } from 'react';
import PasswordField from '../../auth/components/password-field';
import { AuthContext } from '../../App';
import signupStyles from './styles/signup-styles';

interface SignupProps {
    switchToLogin: () => void;
}

const SignUpScreen = ({ switchToLogin }: SignupProps) => {
    const [state, setState] = useState({
        username: '',
        password: ''
    });

    const { signUp } = useContext(AuthContext);

    return (
        <SafeAreaView style={signupStyles.container}>
            <Text style={signupStyles.title}>Sign up</Text>
            <View style={signupStyles.inputView}>
                <Input
                    style={signupStyles.inputText}
                    value={state.username}
                    placeholder="Username"
                    id="username"
                    onChangeText={username => setState({ ...state, username })}
                />
            </View>
            <View style={signupStyles.inputView}>
                <PasswordField style={signupStyles.inputText} value={state.password} onChangeText={password => setState({ ...state, password })} />
            </View>
            <Button onPress={() => signUp(state.username, state.password)}>Sign up</Button>
            <Button onPress={() => switchToLogin()}>Login</Button>
        </SafeAreaView>
    );
};

export default SignUpScreen;
