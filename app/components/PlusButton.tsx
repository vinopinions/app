import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { PlusIcon } from '../utils/icons';

const AddButton = (props: TouchableOpacityProps) => {
    return (
        <TouchableOpacity style={styles.button} {...props}>
            <PlusIcon />
        </TouchableOpacity>
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
