import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';
import React from 'react';
// https://icons.expo.fyi/

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

export const RatingIcon = (props: Partial<IconProps<'star'>>) => (
  <AntDesign {...props} name="star" />
);

export const RatingIconOutline = (props: Partial<IconProps<'staro'>>) => (
  <AntDesign {...props} name="staro" />
);

export const LocationIcon = (props: Partial<IconProps<'location'>>) => (
  <Ionicons {...props} name="location" />
);

export const LocationIconOutline = (
  props: Partial<IconProps<'location-outline'>>,
) => <Ionicons {...props} name="location-outline" />;

export const InternetIcon = (props: Partial<IconProps<'globe'>>) => (
  <Ionicons {...props} name="globe" />
);

export const InternIconOutline = (
  props: Partial<IconProps<'globe-outline'>>,
) => <Ionicons {...props} name="globe-outline" />;

export const WinemakerIcon = (props: Partial<IconProps<'man'>>) => (
  <Ionicons {...props} name="man" />
);

export const WinemakerIconOutline = (
  props: Partial<IconProps<'man-outline'>>,
) => <Ionicons {...props} name="man-outline" />;

export const CalendarIcon = (props: Partial<IconProps<'calendar'>>) => (
  <Ionicons {...props} name="calendar" />
);

export const CalendarIconOutline = (
  props: Partial<IconProps<'calendar-outline'>>,
) => <Ionicons {...props} name="calendar-outline" />;

export const GrapeIcon = (props: Partial<IconProps<'fruit-grapes'>>) => (
  <MaterialCommunityIcons {...props} name="fruit-grapes" />
);

export const GrapeIconOutline = (
  props: Partial<IconProps<'fruit-grapes-outline'>>,
) => <MaterialCommunityIcons {...props} name="fruit-grapes-outline" />;

export const SettingsIcon = (props: Partial<IconProps<'settings'>>) => (
  <Ionicons {...props} name="settings" />
);

export const SettingsIconOutline = (
  props: Partial<IconProps<'settings-outline'>>,
) => <Ionicons {...props} name="settings-outline" />;
