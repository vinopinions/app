// import React from 'react';
// import { ListRenderItemInfo, RefreshControlProps, SectionList, StyleProp, StyleSheet, Text, ViewStyle } from 'react-native';
// import Wine from '../models/Wine';

// interface WineCardListProps {
//     wines: Wine[];
//     style?: StyleProp<ViewStyle>;
//     refreshControl?: React.ReactElement<RefreshControlProps> | undefined;
// }

// const WineCardList = ({ wines, refreshControl, style }: WineCardListProps): React.ReactElement => {
//     const renderItem = (info: ListRenderItemInfo<Wine>): React.ReactElement => {
//         return <Text>{info.item.name}</Text>;
//     };

//     return (
//         <SectionList
//             refreshControl={refreshControl}
//             contentContainerStyle={styles.contentContainer}
//             style={style}
//             data={wines}
//             renderItem={renderItem}
//         />
//     );
// };

// export default WineCardList;

// const styles = StyleSheet.create({
//     contentContainer: {
//         paddingHorizontal: 8,
//         paddingVertical: 4
//     }
// });
