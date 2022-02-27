import {Dimensions} from 'react-native';

const screenDimensions = Dimensions.get('screen');
const screenHeight = screenDimensions.height;
const screenWidth = screenDimensions.width;

export {screenDimensions, screenHeight, screenWidth};
