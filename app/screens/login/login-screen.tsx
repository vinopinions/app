import { Button, Input, Text } from '@ui-kitten/components';
import { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Credentials, useAuth } from '../../auth/AuthContext';
import PasswordField from '../../components/PasswordField';
import loginStyles from './styles/login-styles';

const LoginScreen = () => {
    const [credentials, setCredentials] = useState<Credentials>({
        username: '',
        password: ''
    });

    const { login, register } = useAuth();
    return (
        <SafeAreaView style={loginStyles.container}>
            <Text style={loginStyles.title}>Login</Text>
            <View style={loginStyles.inputView}>
                <Input
                    value={credentials.username}
                    style={loginStyles.inputText}
                    placeholder="username"
                    id="username"
                    onChangeText={username => setCredentials({ ...credentials, username })}
                />
            </View>
            <View style={loginStyles.inputView}>
                <PasswordField
                    style={loginStyles.inputText}
                    value={credentials.password}
                    onChangeText={password => setCredentials({ ...credentials, password })}
                />
            </View>
            <Button onPress={() => login(credentials)}>Login</Button>
            <Button onPress={() => register(credentials)}>Sign up</Button>
        </SafeAreaView>
    );
};

export default LoginScreen;
