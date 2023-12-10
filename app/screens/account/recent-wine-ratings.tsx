// import React from 'react';
// import { Text, View } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
// import recentWineRatingsStyles from './styles/recent-wine-ratings-styles';

// const testWineItems = [
//     {
//         id: '1',
//         name: 'Wine 1',
//         store: 'Wine Store 1',
//         rating: 4.5
//     },
//     {
//         id: '2',
//         name: 'Wine 2',
//         store: 'Wine Store 2',
//         rating: 3
//     },
//     {
//         id: '3',
//         name: 'Wine 3',
//         store: 'Wine Store 3',
//         rating: 5
//     }
// ];

// const RecentWineRatings = () => {
//     const renderWineItem = ({ item }) => (
//         <ListItem containerStyle={recentWineRatingsStyles.container}>
//             <ListItem.Content style={recentWineRatingsStyles.wineItemContainer}>
//                 <ListItem.Title style={recentWineRatingsStyles.wineItemTitle}>{item.name}</ListItem.Title>
//                 <ListItem.Subtitle style={recentWineRatingsStyles.wineItemSubtitle}>{item.store}</ListItem.Subtitle>
//                 <ListItem.Subtitle style={recentWineRatingsStyles.wineItemSubtitle}>{item.rating}</ListItem.Subtitle>
//             </ListItem.Content>
//         </ListItem>
//     );

//     return (
//         <View style={[recentWineRatingsStyles.container]}>
//             <Text style={recentWineRatingsStyles.heading}>Recent Wine Ratings</Text>
//             <FlatList data={testWineItems} keyExtractor={item => item.id.toString()} renderItem={renderWineItem} />
//         </View>
//     );
// };

// export default RecentWineRatings;
