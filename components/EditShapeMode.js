import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';


import Layout from '../constants/Layout';
import ConstantStyles from '../constants/ConstantStyles';

export default class EditShapeMode extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			originalShape: props.shape,
			shape: props.shape ? props.shape : null,
			grabLocation: -1,
		};
	}

	componentDidUpdate(prevProps) {
		if (!prevProps.shape && this.props.shape) {
			this.setState({ shape: this.props.shape });
		}
	}

	determineGrabLocation = (x, y) => {
		let mc = 20;
		let pc = 0.2;
		let { shape } = this.state;
		let loc = -1;
		if (x > shape.x && x < shape.x+shape.width && y > shape.y && y < shape.y+shape.height)
			loc = 0;
		// upper left corner
		if (x > shape.x-mc && x < Math.min(shape.x+mc, shape.x+(pc*shape.width))
			&& y > shape.y-mc && y < Math.min(shape.y+mc, shape.y+(pc*shape.height)))
			loc = 1
		// upper right corner
		else if (x > Math.max(shape.x+shape.width-mc, shape.x+shape.width-(pc*shape.width))
			&& x < shape.x+shape.width+mc && y > shape.y-mc && y < Math.min(shape.y+mc, shape.y+(pc*shape.height)))
			loc = 3
		// lower right corner
		else if (x > Math.max(shape.x+shape.width-mc, shape.x+shape.width-(pc*shape.width))
			&& x < shape.x+shape.width+mc
			&& y > Math.max(shape.y+shape.height-mc, shape.y+shape.height-(pc*shape.height))
			&& y < shape.y+shape.height+mc)
			loc = 5
		// lower left corner
		else if (x > shape.x && x < shape.x+shape.width
			&& y > Math.max(shape.y+shape.height-mc, shape.y+shape.height-(pc*shape.height))
			&& y < shape.y+shape.height+mc)
			loc = 7
		return loc;
	}

	roundDifference = (diff) => {
		let { boxSize } = this.props;
		if (diff < 0) {
			return diff + Math.abs(diff % boxSize);
		} else {
			return diff - Math.abs(diff % boxSize);
		}
	}

	_handleRelease = () => {
		this.props.unfreezeScroll();
		this.props.updatePossibleShape(this.state.shape);
	}

	_handleStart = (event) => {
		let clickX = event.nativeEvent.locationX;
		let clickY = event.nativeEvent.locationY;
		let grabLocation = this.determineGrabLocation(clickX, clickY);
		console.log("Grabbed: " + grabLocation.toString());
		console.log(clickX + ", " + clickY);
		this.setState({
			grabLocation,
			startX: clickX,
			startY: clickY,
		})
		if (grabLocation != -1)
			this.props.freezeScroll();
	}

	_handleMove = (event) => {
		let clickX = event.nativeEvent.locationX;
		let clickY = event.nativeEvent.locationY;
		// console.log(this.state.shape.x + clickX - this.state.startX);
		let shape = this.state.shape;
		let xDiff = this.roundDifference(clickX - this.state.startX);
		let yDiff = this.roundDifference(clickY - this.state.startY);
		if (this.state.grabLocation == 0) {
			shape = {
				x: shape.x + xDiff,
				y: shape.y + yDiff,
				width: shape.width,
				height: shape.height,
			};
		} else if (this.state.grabLocation == 1) {
			shape = {
				x: shape.x + xDiff,
				y: shape.y + yDiff,
				width: shape.width - xDiff,
				height: shape.height  - yDiff,
			};
		} else if (this.state.grabLocation == 3) {	// upper right corner
			shape = {
				x: shape.x,
				y: shape.y + yDiff,
				width: shape.width + xDiff,
				height: shape.height - yDiff,
			};
		} else if (this.state.grabLocation == 5) {	// lower right corner
			shape = {
				x: shape.x,
				y: shape.y,
				width: shape.width + xDiff,
				height: shape.height + yDiff,
			};
		} else if (this.state.grabLocation == 7) {	//lower left corner
			shape = {
				x: shape.x + xDiff,
				y: shape.y,
				width: shape.width - xDiff,
				height: shape.height  + yDiff,
			};
		}
		this.setState({
			shape,
			startX: this.state.startX + xDiff,
			startY: this.state.startY + yDiff,
		});
	}

	render() {
		let { shape } = this.state;
		return (
			<View
				style={styles.backing}
			>
				{shape &&
					<View
						onStartShouldSetResponder={(event) => false}
						style={{
							position: 'absolute',
							left: shape.x,
							top: shape.y,
							width: shape.width,
							height: shape.height,
							backgroundColor: 'blue',
							padding: 18,
							borderWidth: 20,
							borderColor: 'black',
						}}
					/>
				}
				<View
					style={styles.overlay}
					onStartShouldSetResponder={(event) => true}
					onMoveShouldSetResponder={(event) => true}
					onResponderGrant={(event) => this._handleStart(event)}
					onResponderMove={(event) => this._handleMove(event)}
					onResponderRelease={(event) => this._handleRelease()}
				/>
			</View>
		);
	}
}
EditShapeMode.propTypes = {
	shape: PropTypes.object,
	unfreezeScroll: PropTypes.func.isRequired,
	freezeScroll: PropTypes.func.isRequired,
	boxSize: PropTypes.number.isRequired,
	updatePossibleShape: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
	backing: {
		flex: 1,
	},
	overlay: {
		flex: 1,
		backgroundColor: 'black',
		opacity: 0.2,
	},
});