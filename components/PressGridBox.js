import React from 'react';	// always import react!!
import { TouchableOpacity } from 'react-native';	// importing components to use
import PropTypes from 'prop-types';

export default class PressGridBox extends React.PureComponent {	// class always looks like this

	constructor(props) {
		super(props);
		this.sizeStyle = { width: props.edgeLength, height: props.edgeLength }
	}

	_handlePress = () => {
		this.props.onPress(this.props.index);
	}

	render() {
		return (
			<TouchableOpacity
				style={{
					backgroundColor: 'transparent',
					opacity: 0.6,
					borderWidth: 1,
					borderColor: 'red',
					width: this.props.edgeLength,
					height: this.props.edgeLength,
				}}
				onPress={this._handlePress}
			/>
		);
	}
}
PressGridBox.propTypes = {
	edgeLength: PropTypes.number.isRequired,
	index: PropTypes.string.isRequired,
	onPress: PropTypes.func.isRequired,
}