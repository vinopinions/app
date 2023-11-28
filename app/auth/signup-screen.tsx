import { Input } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native';

const SignUpScreen = () => {
    return (
        <SafeAreaView>
            <Input placeholder="username" />
            <Input placeholder="email" />
            <Input placeholder="password" />
        </SafeAreaView>
    );
};

export default SignUpScreen;
