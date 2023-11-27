import { useTheme } from '@ui-kitten/components';
import { View, Text } from 'react-native';

const EditProfileScreen = () => {
    const theme = useTheme();
    return (
        <View style={{ backgroundColor: theme['background-basic-color-1'] }}>
            <Text>This is the edit profile screen</Text>
        </View>
    );
};

export default EditProfileScreen;
