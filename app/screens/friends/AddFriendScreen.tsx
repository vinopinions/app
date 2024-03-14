import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import { sendFriendRequestAsync } from '../../features/friend-requests/friendRequestsSlice';
import {
  fetchUsersAsync,
  selectUserPage,
} from '../../features/users/usersSlice';
import Page from '../../models/Page';
import User from '../../models/User';
import { AppDispatch } from '../../store/store';

const AddFriendScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const userPage: Page<User> = useSelector(selectUserPage);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchDisplayText, setSearchDisplayText] = useState<string>('');

  // load users with current filter
  const loadUsers = useCallback(() => {
    dispatch(fetchUsersAsync({ filter: searchQuery, take: 25 }));
  }, [dispatch, searchQuery]);

  // debounce the setting of the current search query
  // Why useMemo instead of useCallback?
  // https://github.com/facebook/react/issues/19240#issuecomment-652945246
  const debouncedUpdateQuery = useMemo(() => {
    return debounce((query: string) => {
      setSearchQuery(query);
    }, 200);
  }, []);

  // update display text of SearchField and call debounce function to update search query
  const onSearch = useCallback(
    (query: string) => {
      setSearchDisplayText(query);
      debouncedUpdateQuery(query);
    },
    [debouncedUpdateQuery],
  );

  // load users on refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    loadUsers();
    setRefreshing(false);
  }, [loadUsers]);

  // initial load of users
  useEffect(() => {
    onRefresh();
  }, [onRefresh]);

  const onEndReached = useCallback(async () => {
    if (userPage.meta.hasNextPage) {
      dispatch(
        fetchUsersAsync({
          page: userPage.meta.page + 1,
          filter: searchQuery,
        }),
      );
    }
  }, [dispatch, userPage.meta.hasNextPage, userPage.meta.page, searchQuery]);

  const onAddButtonClick = useCallback(
    (username: string) => {
      dispatch(sendFriendRequestAsync(username));
    },
    [dispatch],
  );

  return (
    <SafeAreaView>
      <SearchBar searchQuery={searchDisplayText} handleSearch={onSearch} />
      <FlatList
        data={userPage.data}
        renderItem={({ item }: { item: User }) => (
          <View>
            <View row spread>
              <Text style={styles.friendName}>{item.username}</Text>
              <Button
                style={styles.button}
                label="Add"
                onPress={() => onAddButtonClick(item.username)}
              />
            </View>
            <View style={styles.separator} />
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReachedThreshold={0.4}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
};

export default AddFriendScreen;

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
