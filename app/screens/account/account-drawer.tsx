import { createDrawerNavigator } from '@react-navigation/drawer';
import AccountScreen from './account-screen';
import EditProfileScreen from './edit-profile-screen';

const Drawer = createDrawerNavigator();

const AccountDrawer = () => (
    <Drawer.Navigator
        initialRouteName="Profile"
        screenOptions={{
            drawerPosition: 'right',
            headerShown: false
        }}
    >
        <Drawer.Screen name="Profile" component={AccountScreen} />
        <Drawer.Screen name="Edit Profile" component={EditProfileScreen} />
    </Drawer.Navigator>
);

export default AccountDrawer;
