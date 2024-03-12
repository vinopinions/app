import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text, View } from 'react-native-ui-lib';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import SearchBar from '../../components/SearchBar';
import User from '../../models/User';
import {
  fetchUsersAsync,
  selectUserPage,
} from '../../features/users/usersSlice';

const AddFriendScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const userPage: Page<User> = useSelector(selectUserPage);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  // implement search

  return (
    <View>
      <SearchBar handleSearch={null} searchQuery={null} />
      {userPage.data.map((user: User) => (
        <View>
          <View row spread>
            <Text style={styles.friendName}>{user.username}</Text>
            <Button style={styles.button} label="Add" />
          </View>
          <View style={styles.separator} />
        </View>
      ))}
    </View>
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
