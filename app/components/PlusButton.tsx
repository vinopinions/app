import { Button } from '@ui-kitten/components';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { PlusIcon } from '../utils/icons';

type AddButtonProps = {
    style?: StyleProp<ViewStyle>;
};

const AddButton = ({ style = {} }: AddButtonProps) => {
    return (
        <Button style={[styles.button, style]}>
            <PlusIcon />
        </Button>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
