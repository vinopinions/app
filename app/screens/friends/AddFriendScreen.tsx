import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View } from 'react-native-ui-lib';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import UserView from '../../components/users/UserView';
import { FRIENDS_STACK_NAMES } from '../../constants/RouteNames';
import {
  fetchUsersAsync,
  selectUserPage,
} from '../../features/users/usersSlice';
import Page from '../../models/Page';
import User from '../../models/User';
import { AppDispatch } from '../../store/store';
import { FriendsStackParamList } from './FriendsStack';

const AddFriendScreen = ({
  navigation,
}: NativeStackScreenProps<
  FriendsStackParamList,
  FRIENDS_STACK_NAMES.FRIEND_ADD_SCREEN
>) => {
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

  const onUserSelect = useCallback(
    (user: User) => {
      navigation.push(FRIENDS_STACK_NAMES.FRIEND_ACCOUNT_SCREEN, { user });
    },
    [navigation],
  );

  return (
    <SafeAreaView>
      <SearchBar searchQuery={searchDisplayText} handleSearch={onSearch} />
      <FlatList
        data={userPage.data}
        renderItem={({ item }: { item: User }) => (
          <>
            <TouchableOpacity onPress={() => onUserSelect(item)}>
              <UserView user={item} />
            </TouchableOpacity>
            <View style={styles.separator} />
          </>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
  },
});
