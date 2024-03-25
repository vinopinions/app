import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatar,
  Text,
  TextFieldProps,
  View,
  ViewProps,
} from 'react-native-ui-lib';
import User from '../../models/User';

type UserViewProps = {
  user: User;
  props?: ViewProps;
} & TextFieldProps;

const UserView = (props: UserViewProps): React.ReactElement => {
  return (
    <View row {...props} style={styles.container}>
      <Avatar
        source={{
          uri: props.user.profilePicture,
        }}
      />
      <Text style={styles.username}>{props.user.username}</Text>
    </View>
  );
};

export default UserView;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  username: {
    fontSize: 26,
  },
});
