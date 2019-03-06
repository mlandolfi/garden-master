import { Dimensions } from 'react-native';

const HEADER_SPACE = 32;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
	window: {
		width,
		height,
		squareHeight: height - HEADER_SPACE,
	},
	isSmallDevice: width < 375,
};
