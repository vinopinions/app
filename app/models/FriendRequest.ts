import User from './User';

type FriendRequest = {
  id: string;
  receiver: User;
  sender: User;
  createdAt: string;
};

export default FriendRequest;
