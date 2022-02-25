import {Timestamp} from '@firebase/firestore';

export type SelectedDayType = {date: Timestamp; note: string};

export type GoalText = {
  date: Timestamp;
  text: string;
};

export type SelectedDaysType = SelectedDayType[] | null;
export type GoalTextsType = GoalText[] | null;

export interface GoalDataI {
  user?: string;
  createdAt: Timestamp;
  goalId: string;
  goalTexts: GoalTextsType;
  selectedDays: SelectedDaysType;
}
export type GoalsDataType = GoalDataI[];

export type GoalTypeUpdatableFieldType = Partial<
  Omit<GoalDataI, 'user' | 'goalId'>
>;

export type ContactDataSetType = {
  email: string;
  name?: string | null;
  message: string;
};
export type UserRequiredInput = {
  email: string;
  password: string;
};
