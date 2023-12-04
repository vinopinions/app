import { Icon, IconElement } from '@ui-kitten/components';

export const Fa5Icon = (...props): IconElement => {
    return <Icon {...props} pack="FontAwesome5" />;
};

export const HomeIcon = (props): IconElement => <Fa5Icon {...props} name="home" />;

export const WineIcon = (props): IconElement => <Fa5Icon {...props} name="wine-glass-alt" />;

export const StoreIcon = (props): IconElement => <Fa5Icon {...props} name="store-alt" />;

export const FriendsIcon = (props): IconElement => <Fa5Icon {...props} name="user-friends" />;

export const AccountIcon = (props): IconElement => <Fa5Icon {...props} name="person-outline" />;
