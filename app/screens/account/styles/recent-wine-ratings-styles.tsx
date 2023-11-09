import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'left'
    },
    wineItemContainer: {
        marginVertical: 8,
        borderRadius: 10
    },
    wineItemImage: {
        width: 80,
        height: 80,
        borderRadius: 8
    },
    wineItemContent: {
        marginLeft: 10
    },
    wineItemTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    wineItemSubtitle: {
        fontSize: 14
    }
});
