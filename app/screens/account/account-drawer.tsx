import { createDrawerNavigator } from '@react-navigation/drawer';
import { Drawer, DrawerItem, IndexPath } from '@ui-kitten/components';
import AccountScreen from './account-screen';
import EditProfileScreen from './edit-profile-screen';
import React from 'react';

const { Navigator, Screen } = createDrawerNavigator();

const DrawerContent = ({ navigation, state }) => (
    <Drawer selectedIndex={new IndexPath(state.index)} onSelect={index => navigation.navigate(state.routeNames[index.row])}>
        <DrawerItem title="Profile" />
        <DrawerItem title="Edit Profile" />
    </Drawer>
);

export const AccountDrawer = () => (
    <Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Screen name="Profile" component={AccountScreen} />
        <Screen name="Edit Profile" component={EditProfileScreen} />
    </Navigator>
);
