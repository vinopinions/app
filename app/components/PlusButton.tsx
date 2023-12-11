import { Button, ButtonProps } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { PlusIcon } from '../utils/icons';

const AddButton = (props: ButtonProps) => {
    return (
        <Button style={styles.button} {...props}>
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
