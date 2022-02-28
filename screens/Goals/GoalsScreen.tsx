import * as React from 'react';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import AddIcon from '../../assets/add.svg';
import {SmallText} from '../../components/Typography';
import {
  backgroundColor,
  darkColor,
  greenColor,
  orangeColor,
} from '../../constants/stylesConstants';
import {useGoalContext} from '../../context/GoalContext';
import TrashIcon from '../../assets/trash.svg';
import {useNavigationHook} from '../../hooks/useNavigationHook';
import {screenHeight} from '../../utils/screenUtils';
import moment from 'moment';

const MainBody = styled.View`
  flex: 4;
  background-color: ${darkColor};
  flex-direction: row;
  align-items: flex-start;
`;
const Icon = styled(AddIcon)`
  fill: ${greenColor};
  width: 45px;
  height: 45px;
`;
const IconContainer = styled.View`
  top: 0;
  right: 0;
  padding: 10px;
  position: absolute;
`;
const GoalsContainerScrollView = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    marginHorizontal: 2,
    marginVertical: 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
}))`
  height: 90%;
`;
const GoalCard = styled.View`
  width: 100%;
  height: ${screenHeight / 2}px;
  background-color: ${backgroundColor};
  border-radius: 10px;
  margin-horizontal: 2px;
  margin-vertical: 2px;
  padding: 20px;
  justify-content: space-between;
`;
const GoalCardBody = styled.TouchableOpacity`
  height: 70%;
  justify-content: space-between;
`;
const DeleteButton = styled.TouchableOpacity`
  background-color: ${orangeColor};
  border-radius: 10px;
  height: 15%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const GoalsScreen = () => {
  const {addNewGoal, deleteGoal, getGoals, getTheMissedDay} = useGoalContext();
  const navigate = useNavigationHook();
  const goalsLength = getGoals?.length ?? 0;
  const goalPressHandle = (id: string) => {
    navigate.navigate('Goal', {id});
  };

  return (
    <MainBody>
      <GoalsContainerScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={'always'}
        keyboardDismissMode="on-drag">
        {goalsLength > 0 ? (
          getGoals?.map(({goalId, goalTexts, createdAt, selectedDays}) => (
            <GoalCard key={goalId}>
              <GoalCardBody onPress={() => goalPressHandle(goalId)}>
                <SmallText>
                  Goal Name : {goalTexts ? goalTexts[0].text : ''}
                </SmallText>

                <SmallText>
                  Goal Created At :{' '}
                  {moment(createdAt.toDate()).format('MM/DD/YYYY')}
                </SmallText>
                <SmallText>
                  Selected Days : {!selectedDays ? 0 : selectedDays.length}
                </SmallText>
                <SmallText>
                  Missed Days : {getTheMissedDay(createdAt, selectedDays)}
                </SmallText>
              </GoalCardBody>
              <DeleteButton
                onPress={async () => {
                  deleteGoal(goalId);
                }}>
                <SmallText>Delete</SmallText>
                <TrashIcon fill="#fff" width="18px" height="18px" />
              </DeleteButton>
            </GoalCard>
          ))
        ) : (
          <SmallText>Add your goal here...</SmallText>
        )}
      </GoalsContainerScrollView>
      <IconContainer>
        <TouchableOpacity onPress={async () => await addNewGoal()}>
          <Icon />
        </TouchableOpacity>
      </IconContainer>
    </MainBody>
  );
};
