import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import AccountScreen from './account-screen';
import EditProfileScreen from './edit-profile-screen';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => (
    // TODO:
    // <Drawer
    //     selectedIndex={new IndexPath(state.index)}
    //     onSelect={index => navigation.navigate(state.routeNames[index.row])}
    //     contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}
    // >
    //     <DrawerItem title="Profile" />
    //     <DrawerItem title="Edit Profile" />
    // </Drawer>
    <></>
);

export const AccountDrawer = () => (
    <Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{ drawerPosition: 'right' }}>
        <Screen name="Profile" component={AccountScreen} options={{ headerShown: false }} />
        <Screen name="Edit Profile" component={EditProfileScreen} options={{ headerShown: false }} />
    </Navigator>
);
