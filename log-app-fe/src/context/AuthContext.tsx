import { createContext } from 'react';
import { UserType } from '@shared/interfaces/Interfaces';

export const AuthContext = createContext<{
  currentUser: UserType | null;
  setCurrentUser: (user: UserType | null) => void;
}>({
  currentUser: null,
  setCurrentUser: () => {},
});
