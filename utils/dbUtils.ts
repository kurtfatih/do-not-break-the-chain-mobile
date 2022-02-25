import {Timestamp} from 'firebase/firestore';
import {auth} from '../firebase/index';
import {GoalDataI} from '../firebase/types';

export const getDefaultGoalData = (docId: string): GoalDataI => {
  return {
    user: auth.currentUser?.uid,
    createdAt: Timestamp.now(),
    goalId: docId,
    goalTexts: null,
    selectedDays: null,
  };
};
