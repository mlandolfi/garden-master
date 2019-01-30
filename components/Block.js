import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

var flower = require('../assets/images/flower.png');

export default class Block extends React.PureComponent {

	renderContent = () => {
		let { boxSize, color, plant } = this.props;
		return (
			<View
				style={{
					width: boxSize,
					height: boxSize,
					backgroundColor: color,
					borderWidth: 1,
					borderColor: 'grey',
				}}
			>
				{plant &&
					<Image
						source={flower}
						style={{
							position: 'absolute',
							top: -1 * (boxSize / 3),
							width: boxSize,
							height: boxSize,
						}}
					/>
				}
			</View>
		);
	}

	render() {
		if (this.props.clickable) {
			return (
				<TouchableOpacity
					onPress={() => this.props.onPress(this.props.keyString)}
					activeOpacity={0.5}
				>
					{this.renderContent()}
				</TouchableOpacity>
			);
		} else {
			return this.renderContent()
		}
		
	}

}
Block.propTypes = {
	boxSize: PropTypes.number.isRequired,
	color: PropTypes.string.isRequired,
	clickable: PropTypes.bool,
	onPress: PropTypes.func,	//clickable must be true
	keyString: PropTypes.string,	// onPress is required for this to be required
	plant: PropTypes.bool,
}