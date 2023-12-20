import { Image } from 'expo-image';
import React from 'react';
import { ScrollView } from 'react-native';
import { Text, View } from 'react-native-ui-lib';

import accountStyles from './styles/account-styles';

const AccountScreen = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
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
