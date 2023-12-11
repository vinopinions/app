import { Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import { PlusIcon } from '../utils/icons';

const AddButton = () => {
    return (
        <Button style={styles.button}>
            <PlusIcon />
        </Button>
    );
};

export default AddButton;

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        alignSelf: 'center',
        height: 60,
        width: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
