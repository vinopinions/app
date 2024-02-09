import { Ionicons } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
// https://icons.expo.fyi/ filter for Ionicons

export const HomeIcon = (props: Partial<IconProps<'home'>>) => (
  <Ionicons {...props} name="home" />
);
export const HomeIconOutline = (props: Partial<IconProps<'home-outline'>>) => (
  <Ionicons {...props} name="home-outline" />
);

export const WineIcon = (props: Partial<IconProps<'wine'>>) => (
  <Ionicons {...props} name="wine" />
);
export const WineIconOutline = (props: Partial<IconProps<'wine-outline'>>) => (
  <Ionicons {...props} name="wine-outline" />
);

export const StoreIcon = (props: Partial<IconProps<'cart'>>) => (
  <Ionicons {...props} name="cart" />
);
export const StoreIconOutline = (props: Partial<IconProps<'cart-outline'>>) => (
  <Ionicons {...props} name="cart-outline" />
);

export const FriendsIcon = (props: Partial<IconProps<'rocket'>>) => (
  <Ionicons {...props} name="rocket" />
);
export const FriendsIconOutline = (
  props: Partial<IconProps<'rocket-outline'>>,
) => <Ionicons {...props} name="rocket-outline" />;

export const AccountIcon = (props: Partial<IconProps<'person-circle'>>) => (
  <Ionicons {...props} name="person-circle" />
);
export const AccountIconOutline = (
  props: Partial<IconProps<'person-circle-outline'>>,
) => <Ionicons {...props} name="person-circle-outline" />;

export const EyeIcon = (props: Partial<IconProps<'eye-outline'>>) => (
  <Ionicons {...props} name="eye-outline" />
);
export const EyeSlashIcon = (props: Partial<IconProps<'eye-off-outline'>>) => (
  <Ionicons {...props} name="eye-off-outline" />
);

export const PlusIcon = (props: Partial<IconProps<'add-circle-outline'>>) => (
  <Ionicons {...props} name="add-circle-outline" />
);
