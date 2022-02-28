import {Timestamp} from 'firebase/firestore';
import * as React from 'react';
import {View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {ModalWrapper} from '../../components/ModalWrapper';
import {Spacer} from '../../components/Spacer';
import {SmallText} from '../../components/Typography';
import {now} from '../../constants/dateConstants';
import {MultilineInput} from './MultilineInput';
import {TakeNote} from './TakeNote';

interface TakeNoteModalPropsI {
  isModalShow: boolean;
  onModalClose: (note: string, timestamp: Timestamp) => void;
  note: string;
  dayTimestamp: Timestamp;
}
export const TakeNoteModal: React.FC<TakeNoteModalPropsI> = ({
  isModalShow,
  onModalClose,
  note,
  dayTimestamp,
}) => {
  const [currentNote, setCurrentNote] = React.useState<string>(note);
  const [timestamp, setTimestamp] = React.useState<Timestamp>(dayTimestamp);
  const handleOnChange = (e: string) => {
    setCurrentNote(e);
  };

  React.useEffect(() => {
    setCurrentNote(note);
    setTimestamp(dayTimestamp);
  }, [dayTimestamp, note]);

  console.log('brom', note, dayTimestamp.toDate());
  return (
    <ModalWrapper
      isTransparent={true}
      isVisible={isModalShow}
      onClose={() => {
        onModalClose(currentNote, timestamp);
      }}
      modalAnimation="fade">
      <View
        style={{
          backgroundColor: 'rgba(41, 50, 65, 0.9)',
          height: '100%',
        }}>
        <TouchableOpacity
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            onModalClose(currentNote, timestamp);
          }}>
          <TouchableWithoutFeedback>
            <View style={{width: '80%', alignItems: 'center'}}>
              <SmallText>Take your note about day...</SmallText>
              <Spacer space={5} />

              <MultilineInput
                onChange={handleOnChange}
                placeholder="Message..."
                value={currentNote}
              />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </View>
    </ModalWrapper>
  );
};
