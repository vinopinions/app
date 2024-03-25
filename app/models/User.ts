type User = {
  id: string;
  username: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
};

export function isUser(obj: unknown): obj is User {
  return (
    typeof obj === 'object' &&
    'id' in obj &&
    'username' in obj &&
    'createdAt' in obj &&
    'updatedAt' in obj
  );
}

export function isUserArray(obj: unknown): obj is User[] {
  return Array.isArray(obj) && obj.every((user: unknown) => isUser(user));
}
export default User;
