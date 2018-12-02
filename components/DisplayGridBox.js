import React from 'react';	// always import react!!
import { View, Image } from 'react-native';	// importing components to use
import PropTypes from 'prop-types';

export default class DisplayGridBox extends React.PureComponent {	// class always looks like this

	constructor(props) {
		super(props);
	}

	render() {
		let sizeStyle = {
			width: this.props.edgeLength,
			height: this.props.edgeLength,
		}
		return (
			<View
				style={sizeStyle}
			>
				{this.props.background &&
					<Image
						style={{
							...sizeStyle,
							position: 'absolute',
						}}
						source={this.props.background}
					/>
				}
				{this.props.foreground &&
					<Image
						style={sizeStyle}
						source={this.props.foreground}
					/>
				}
			</View>
		);
	}
}
DisplayGridBox.propTypes = {
	edgeLength: PropTypes.number.isRequired,
	foreground: PropTypes.number,	// var that is a loaded image
	background: PropTypes.number,	// var that is a loaded image
}