import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Palette from '../constants/palette';


export default ShadowButton = (props) => (
	<TouchableOpacity
		activeOpacity={1}
		onPress={props.onPress}
		style={{
			shadowColor: props.color == "secondary" ? Palette.primary.main : Palette.secondary.main,
			shadowRadius: 0,
			shadowOffset: { width: -3, height: 3 },
			shadowOpacity: props.active ? 0 : 1,
			transform: props.active ? [] : [{ translateX: 4 }, { translateY: -4 }],
			backgroundColor: props.color == "secondary" ? Palette.secondary.main : Palette.primary.main,
			borderColor: props.color == "secondary" ? Palette.primary.main : Palette.secondary.main,
			borderRadius: 10,
			borderBottomWidth: props.active ? 2 : 2,
			borderLeftWidth: props.active ? 2 : 2,
			borderTopWidth: props.active ? 2 : 0,
			borderRightWidth: props.active ? 2 : 0,
			padding: 10,
			...props.style,
		}}
	>
		{props.children}
	</TouchableOpacity>
	);
ShadowButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	active: PropTypes.bool,
	bordered: PropTypes.bool,
	color: PropTypes.string,
	style: PropTypes.object,
}