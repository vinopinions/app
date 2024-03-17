import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Colors, Drawer, Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOutgoingFriendRequestsAsync,
  revokeFriendRequestAsync,
  selectOutgoingFriendRequestsPage,
} from '../../features/friend-requests/friendRequestsSlice';
import { fetchUsersAsync } from '../../features/users/usersSlice';
import FriendRequest from '../../models/FriendRequest';
import Page from '../../models/Page';
import { AppDispatch } from '../../store/store';

const OutgoingFriendRequestsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const outgoingFriendRequestsPage: Page<FriendRequest> = useSelector(
    selectOutgoingFriendRequestsPage,
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(fetchOutgoingFriendRequestsAsync());
    setRefreshing(false);
  }, [dispatch]);

  // initial load of friend requests
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const onEndReached = useCallback(async () => {
    if (outgoingFriendRequestsPage.meta.hasNextPage) {
      dispatch(
        fetchUsersAsync({
          page: outgoingFriendRequestsPage.meta.page + 1,
        }),
      );
    }
  }, [
    dispatch,
    outgoingFriendRequestsPage.meta.hasNextPage,
    outgoingFriendRequestsPage.meta.page,
  ]);

  const onRevokeButtonClick = useCallback(
    (id: string) => {
      dispatch(revokeFriendRequestAsync(id));
    },
    [dispatch],
  );

  return (
    <SafeAreaView>
      <FlatList
        data={outgoingFriendRequestsPage.data}
        renderItem={({ item }: { item: FriendRequest }) => (
          <Drawer
            onFullSwipeLeft={() => onRevokeButtonClick(item.id)}
            leftItem={{
              text: 'Revoke',
              background: Colors.red30,
              onPress: () => onRevokeButtonClick(item.id),
            }}
          >
            <View centerV padding-s4 bg-white style={{ height: 60 }}>
              <Text text70>{item.receiver.username}</Text>
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

export default OutgoingFriendRequestsScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    width: '100%',
    marginVertical: 5,
  },
  friendName: {
    padding: 5,
    fontSize: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
  },
});
