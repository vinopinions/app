import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Colors, Drawer, Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import {
  acceptFriendRequestAsync,
  declineFriendRequestAsync,
  fetchIncomingFriendRequestsAsync,
  selectIncomingFriendRequestsPage,
} from '../../features/friend-requests/friendRequestsSlice';
import { fetchUsersAsync } from '../../features/users/usersSlice';
import FriendRequest from '../../models/FriendRequest';
import Page from '../../models/Page';
import { AppDispatch } from '../../store/store';

const IncomingFriendRequestsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const incomingFriendRequestsPage: Page<FriendRequest> = useSelector(
    selectIncomingFriendRequestsPage,
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchIncomingFriendRequestsAsync());
    setRefreshing(false);
  }, [dispatch]);

  // initial load of friend requests
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const onEndReached = useCallback(async () => {
    if (incomingFriendRequestsPage.meta.hasNextPage) {
      dispatch(
        fetchUsersAsync({
          page: incomingFriendRequestsPage.meta.page + 1,
        }),
      );
    }
  }, [
    dispatch,
    incomingFriendRequestsPage.meta.hasNextPage,
    incomingFriendRequestsPage.meta.page,
  ]);

  const onAcceptButtonClick = useCallback(
    (id: string) => {
      dispatch(acceptFriendRequestAsync(id));
    },
    [dispatch],
  );

  const onDeclineButtonClick = useCallback(
    (id: string) => {
      dispatch(declineFriendRequestAsync(id));
    },
    [dispatch],
  );

  return (
    <SafeAreaView>
      <FlatList
        data={incomingFriendRequestsPage.data}
        renderItem={({ item }: { item: FriendRequest }) => (
          <Drawer
            onFullSwipeRight={() => onAcceptButtonClick(item.id)}
            onFullSwipeLeft={() => onDeclineButtonClick(item.id)}
            rightItems={[
              {
                text: 'Accept',
                background: Colors.blue30,
                onPress: () => onAcceptButtonClick(item.id),
              },
            ]}
            leftItem={{
              text: 'Decline',
              background: Colors.red30,
              onPress: () => onDeclineButtonClick(item.id),
            }}
          >
            <View centerV padding-s4 bg-white style={styles.itemContainer}>
              <Text text70>{item.sender.username}</Text>
            </View>
          </Drawer>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.4}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

export default IncomingFriendRequestsScreen;

const styles = StyleSheet.create({
  itemContainer: {
    height: 60,
  },
});
