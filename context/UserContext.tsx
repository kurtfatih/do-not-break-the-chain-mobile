import {FirebaseError} from 'firebase/app';
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import React, {createContext, useContext} from 'react';
import {auth} from '../firebase/index';
import {UserRequiredInput} from '../firebase/types';
import {useErrorContext} from './ErrorContext';

interface UserContextI {
  currentUser: User | null;
  isUserLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutCurrentAuth: () => Promise<void>;
  isUserLoggedIn: () => boolean;
  signInWithPasswordAndEmail: (
    emailAndPassword: UserRequiredInput,
  ) => Promise<void>;
  createUserWithEmailPasswordAndDisplayName: (
    emailAndPassword: UserRequiredInput & {
      displayName: string;
    },
  ) => Promise<void>;
}

const UserContext = createContext<UserContextI | null>(null);

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      'use UserContext provider must be used within the UserContext.Provider',
    );
  }
  return context;
}

export const UserContextProvider: React.FC = ({children}) => {
  const {handleFirebaseError} = useErrorContext();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = React.useState<boolean>(true);
  const isUserLoggedIn = () => (currentUser ? true : false);

  const signOutCurrentAuth = async () => {
    await signOut(auth)
      .then(res => {
        return res;
      })
      .catch(error => {
        console.error(error);
        // An error happened.
      });
  };

  const signInWithGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithPasswordAndEmail = async ({
    email,
    password,
  }: UserRequiredInput) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: unknown) {
      handleFirebaseError(error);
    }
  };

  const createUserWithEmailPasswordAndDisplayName = async ({
    email,
    password,
    displayName,
  }: UserRequiredInput & {displayName: string}) => {
    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(user, {displayName});
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  // listen for any changes on auth
  React.useEffect(() => {
    const unlisten = auth.onAuthStateChanged(authUser => {
      console.log('heyyo', authUser);
      setCurrentUser(authUser);
      setIsUserLoading(false);
    });
    return () => {
      unlisten();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        signInWithGoogle,
        currentUser,
        signOutCurrentAuth,
        isUserLoggedIn: isUserLoggedIn,
        isUserLoading,
        signInWithPasswordAndEmail,
        createUserWithEmailPasswordAndDisplayName,
      }}>
      {children}
    </UserContext.Provider>
  );
};
