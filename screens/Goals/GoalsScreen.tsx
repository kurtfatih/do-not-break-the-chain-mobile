import * as React from 'react';
import {Button, ScrollView, View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
import AddIcon from '../../assets/add.svg';
import {SmallText, XSmallText} from '../../components/Typography';
import {
  backgroundColor,
  darkColor,
  greenColor,
  orangeColor,
} from '../../constants/stylesConstants';
import {useGoalContext} from '../../context/GoalContext';
import TrashIcon from '../../assets/trash.svg';

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
const GoalsContainerScrollView = styled.ScrollView`
  flex: 3;
  height: 90%;
`;
const GoalCard = styled.View`
  width: 100%;
  height: 200px;
  background-color: ${backgroundColor};
  border-radius: 10px;
  margin-horizontal: 2px;
  margin-vertical: 2px;
  padding: 5px;
  justify-content: space-between;
`;
const DeleteButton = styled.TouchableOpacity`
  background-color: ${orangeColor};
  border-radius: 10px;
  height: 20%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const GoalsScreen = () => {
  const {addNewGoal, deleteGoal, getGoals} = useGoalContext();
  const goalsLength = getGoals?.length ?? 0;
  return (
    <MainBody>
      <GoalsContainerScrollView
        scrollEnabled={true}
        showsVerticalScrollIndicator={true}
        keyboardShouldPersistTaps={true}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginHorizontal: 2,
          marginVertical: 2,
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        {goalsLength > 0 ? (
          getGoals?.map(({goalId, goalTexts}) => (
            <GoalCard key={goalId}>
              <TouchableOpacity
                onPress={() => console.log('on press')}
                style={{height: '80%'}}>
                <XSmallText>{goalTexts ? goalTexts[0] : goalId}</XSmallText>
              </TouchableOpacity>
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
