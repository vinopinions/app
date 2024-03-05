import * as React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { PlusIcon } from '../utils/icons';

// TODO: Remove this ugly button
const AddButton = (props: TouchableOpacityProps) => {
  return (
    <TouchableOpacity {...props}>
      <PlusIcon size={75} />
    </TouchableOpacity>
  );
};

export default AddButton;
