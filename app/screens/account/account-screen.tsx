import { View, Text, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import accountStyles from './styles/account-styles';
import React from 'react';
import RecentWineRatings from './recent-wine-ratings';

const AccountScreen = () => {
    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={accountStyles.container}>
                <Image source="https://picsum.photos/seed/696/3000/2000" style={accountStyles.coverPhoto} />
                <View style={accountStyles.profileContainer}>
                    <Image source="https://picsum.photos/seed/696/3000/2000" style={accountStyles.profilePicture} />
                    <Text style={accountStyles.userName}>User Name</Text>
                    <RecentWineRatings />
                </View>
            </View>
        </ScrollView>
    );
};

export default AccountScreen;
