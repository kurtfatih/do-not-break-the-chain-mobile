import {FirebaseError} from 'firebase/app';
import React, {createContext, useContext} from 'react';

interface ErrorContextI {
  errorMsg: string;
  handleFirebaseError: (e: unknown) => void;
}

const ErrorContext = createContext<ErrorContextI | null>(null);

export function useErrorContext() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error(
      'use Error Context provider must be used within the ErrorContext.Provider',
    );
  }
  return context;
}

export const ErrorContextProvider: React.FC = ({children}) => {
  const [errorMsg, setErrorMsg] = React.useState('');
  const cleanErrMsg = () => {
    setTimeout(() => {
      setErrorMsg('');
    }, 5000);
  };
  const handleFirebaseError = (e: unknown) => {
    if (e instanceof FirebaseError) {
      const errMsg = e.code
        .split('/')
        [e.code.split('/').length - 1].split('-')
        .join(' ')
        .toUpperCase();
      setErrorMsg(errMsg);
      cleanErrMsg();
    }
  };
  return (
    <ErrorContext.Provider
      value={{
        errorMsg,
        handleFirebaseError,
      }}>
      {children}
    </ErrorContext.Provider>
  );
};
