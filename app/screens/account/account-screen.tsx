import { useTheme } from '@ui-kitten/components';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import accountStyles from './styles/account-styles';

const AccountScreen = () => {
    const theme = useTheme();
    return (
        <ScrollView style={{ flex: 1, backgroundColor: theme['background-basic-color-1'] }}>
            <View style={accountStyles.container}>
                <Image source="https://picsum.photos/seed/696/3000/2000" style={accountStyles.coverPhoto} />
                <View style={accountStyles.profileContainer}>
                    <Image source="https://picsum.photos/seed/696/3000/2000" style={accountStyles.profilePicture} />
                    <Text style={accountStyles.userName}>User Name</Text>
                </View>
            </View>
        </ScrollView>
    );
};

export default AccountScreen;
