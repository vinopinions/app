import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet } from 'react-native';

const createIconsMap = () => {
    return new Proxy(
        {},
        {
            get(target, name) {
                return IconProvider(name);
            }
        }
    );
};

export const FontAwesome5IconsPack = {
    name: 'FontAwesome5',
    icons: createIconsMap()
};

const IconProvider = name => ({
    toReactElement: props => FontAwesome5Icon({ name, ...props })
});

const FontAwesome5Icon = ({ name, style }) => {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return <FontAwesome5 name={name} size={height} color={tintColor} style={iconStyle} />;
};
