import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import React from 'react';

import {
  ContactDataSetType,
  GoalDataI,
  GoalsDataType,
  GoalTypeUpdatableFieldType,
} from '../firebase/types';
import {db} from '../firebase/index';
import {useUserContext} from './UserContext';
import {getDefaultGoalData} from '../utils/dbUtils';
import {useErrorContext} from './ErrorContext';

interface DbContextI {
  goalsData: GoalsDataType | null;
  createNewGoalOnDb: () => Promise<void>;
  deleteGoalOnDb: (id: string) => void;
  updateGoalOnDb: (
    goalId: string,
    fieldsToUpdate: GoalTypeUpdatableFieldType,
  ) => Promise<void>;
  createNewContactOnDb: ({
    email,
    name,
    message,
  }: ContactDataSetType) => Promise<void>;
}

const collectionName = 'goals-dev';

console.log(process.env.NODE_ENV);

const contactCollectionRef = collection(db, 'contact');

export const DbContextProvider: React.FC = ({children}) => {
  const {currentUser} = useUserContext();
  const {handleFirebaseError} = useErrorContext();
  const [goalsData, setGoalsData] = React.useState<GoalsDataType | null>(null);
  //ref that collections document ref query by user id

  // listen user's goals collection datas.
  React.useEffect(() => {
    const collectionDocumentRefBasedOnUserId = query(
      collection(db, collectionName),
      where('user', '==', currentUser ? currentUser.uid : ''),
      orderBy('createdAt', 'asc'),
    );
    const unsub = onSnapshot(
      collectionDocumentRefBasedOnUserId,
      querySnapshot => {
        const goalsArr: GoalsDataType = [];
        querySnapshot.forEach(snapshot => {
          const docdata = snapshot.data() as GoalDataI;
          goalsArr.push(docdata);
        });
        setGoalsData(goalsArr);
      },
    );
    return () => {
      unsub();
    };
  }, [currentUser]);

  const createNewGoalOnDb = async () => {
    try {
      const collectionRef = collection(db, collectionName);
      const docRef = doc(collectionRef);
      const defaultGoalData = getDefaultGoalData(docRef.id);
      const newGoalData = defaultGoalData;
      await setDoc(docRef, newGoalData);
    } catch (err) {
      handleFirebaseError(err);
    }
  };

  const deleteGoalOnDb = async (id: string) => {
    const newDocRef = doc(db, collectionName, id);
    try {
      await deleteDoc(newDocRef);
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  const updateGoalOnDb = async (
    goalId: string,
    fieldsToUpdate: GoalTypeUpdatableFieldType,
  ) => {
    const newDocRef = doc(db, collectionName, goalId);
    const newObj = {...fieldsToUpdate};
    try {
      await setDoc(newDocRef, newObj, {merge: true});
    } catch (e) {
      handleFirebaseError(e);
    }
  };
  const createNewContactOnDb = async ({
    email,
    name,
    message,
  }: ContactDataSetType) => {
    try {
      const docRef = doc(contactCollectionRef);
      const newData: ContactDataSetType = {
        email,
        name,
        message,
      };
      await setDoc(docRef, newData);
    } catch (err) {
      handleFirebaseError(err);
    }
  };
  // update data
  return (
    <DbContext.Provider
      value={{
        goalsData,
        createNewGoalOnDb,
        deleteGoalOnDb,
        updateGoalOnDb,
        createNewContactOnDb,
      }}>
      {children}
    </DbContext.Provider>
  );
};

export const DbContext = React.createContext<DbContextI | null>(null);

export function useDbContext() {
  const context = React.useContext(DbContext);
  if (!context) {
    throw new Error(
      'use DbContext provider must be used within the DbContext.Provider',
    );
  }
  return context;
}
