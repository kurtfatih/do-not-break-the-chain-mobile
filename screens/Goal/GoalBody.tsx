import {Timestamp} from '@firebase/firestore';
import * as React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {TouchableOpacity, View} from 'react-native';
import styled from 'styled-components/native';
import {DayItem, DayItemContainer} from '../../components/DayItem';
import {ModalWrapper} from '../../components/ModalWrapper';
import {Spacer} from '../../components/Spacer';
import {SmallText} from '../../components/Typography';
import {now} from '../../constants/dateConstants';
import {useGoalContext} from '../../context/GoalContext';
import {SelectedDayType} from '../../firebase/types';
import {replaceObjInsideArrayWithExistOneByYear} from '../../utils/arrUtils';
import {MultilineInput} from './MultilineInput';
import {TakeNote} from './TakeNote';
import {TakeNoteModal} from './TakeNoteModal';

interface GoalBodyPropsI {
  arrayOfTheDaysProps: {
    isSelected: boolean;
    isTheDateOnTheFuture: boolean;
    isTheDateOnThePast: boolean;
    isTheDatesAreExactSame: boolean;
    day: number;
    dayTimestamp: Timestamp;
    handleDayPress: () => void | (() => null);
    selectedDayNote: string | undefined;
  }[];
}
export const GoalBody: React.FC<GoalBodyPropsI> = ({arrayOfTheDaysProps}) => {
  const [isModalShow, setIsModalShow] = React.useState(false);
  const [takeNoteData, setTakeNoteData] =
    React.useState<null | SelectedDayType>(null);
  const {takeNotForTheDay} = useGoalContext();
  const handleLongDayItemPress = ({date, note}: SelectedDayType) => {
    setTakeNoteData({date, note});
    setIsModalShow(true);
  };
  const handleModalClose = (note: string, dayTimestamp: Timestamp) => {
    setIsModalShow(false);
    if (!note) {
      return;
    }
    return takeNotForTheDay(note, dayTimestamp);
  };
  return (
    <View style={{flex: 5}}>
      <DayItemContainer>
        {arrayOfTheDaysProps.map(
          (
            {
              day,
              handleDayPress,
              isSelected,
              isTheDateOnTheFuture,
              isTheDateOnThePast,
              isTheDatesAreExactSame,
              selectedDayNote,
              dayTimestamp,
            },
            index,
          ) => (
            <React.Fragment key={index}>
              <DayItem
                key={index}
                dayAsText={day.toString()}
                handleDayPress={handleDayPress}
                handleOnLongPress={() => {
                  handleLongDayItemPress({
                    date: dayTimestamp,
                    note: selectedDayNote ?? '',
                  });
                }}
                isTheDateOnTheFuture={isTheDateOnTheFuture}
                isTheDateOnThePast={isTheDateOnThePast}
                isTheDatesAreExactSame={isTheDatesAreExactSame}
                isSelected={isSelected}
              />
            </React.Fragment>
          ),
        )}
        <TakeNoteModal
          dayTimestamp={takeNoteData?.date ?? now}
          isModalShow={isModalShow}
          note={takeNoteData?.note ?? ''}
          onModalClose={handleModalClose}
        />
      </DayItemContainer>
    </View>
  );
};
