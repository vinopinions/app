import { View, Text } from 'react-native';
import { Image } from 'expo-image';
import accountStyles from './styles/account-styles';
import React from 'react';

const AccountScreen = () => {
    return (
        <View style={accountStyles.container}>
            <Image source="https://picsum.photos/seed/696/3000/2000" style={accountStyles.coverPhoto} />
            <View style={accountStyles.profileContainer}>
                <Image source="https://picsum.photos/seed/696/3000/2000" style={accountStyles.profilePicture} />
                <Text style={accountStyles.userName}>User Name</Text>
            </View>
        </View>
    );
};

export default AccountScreen;
