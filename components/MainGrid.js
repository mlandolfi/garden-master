import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import GridVisual from './GridVisual';

import Layout from '../constants/Layout';
import ConstantStyles from '../constants/ConstantStyles';

export default class MainGrid extends React.Component {

	constructor(props) {
		super(props);
		let numRows = 10;
		let numColumns = 10;
		this.state = {
			numRows,
			numColumns,
			boxSize: (Layout.window.width / numColumns) - 2,
			shapes: [],
			scrollEnabled: true,
			editMode: false,
		};
	}

	toggleEditMode = () => {
		this.cancelShapeEdit();
		this.setState({ editMode: !this.state.editMode });
	}

	freezeScroll = () => this.setState({ scrollEnabled: false });
	unfreezeScroll = () => this.setState({ scrollEnabled: true });

	addNewShape = () => {
		let possibleShape = {
			x: 0, y: 0,
			width: this.state.boxSize * 2,
			height: this.state.boxSize * 2,
		};
		this.setState({ possibleShape })
	}

	confirmShape = () => {
		let { shapes } = this.state;
		shapes.push(this.state.possibleShape);
		this.setState({
			shapes,
			possibleShape: null,
			originalShape: null,
		});
	}

	cancelShapeEdit = () => {
		let { shapes } = this.state;
		if (this.state.originalShape)
			shapes.push(this.state.originalShape)
		this.setState({
			originalShape: null,
			possibleShape: null,
			shapes,
		});
	}

	roundDifference = (diff) => {
		let { boxSize } = this.state;
		if (diff < 0) {
			return diff + Math.abs(diff % boxSize);
		} else {
			return diff - Math.abs(diff % boxSize);
		}
	}

	determineShapePressed = (x, y) => {
		// function should set the shape that the click is inside to 
		// the state's possibleShape
		console.log("LOOKING");
		console.log(x, y);
		let { shapes } = this.state;
		for (let i=0; i<shapes.length; i++) {
			if (x >= shapes[i].x && x <= shapes[i].x+shapes[i].width
				&& y >= shapes[i].y && y <= shapes[i].y+shapes[i].height) {
				let shapePressed = shapes[i];
				shapes.splice(i, 1);
				this.setState({
					shapes,
					possibleShape: shapePressed,
					originalShape: shapePressed,
				});
				return;
			}
		}
	}

	determineGrabLocation = (x, y) => {
		let mc = 20;
		let pc = 0.2;
		let shape = this.state.possibleShape;
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

	_handleOverlayPress = (event) => {
		let clickX = event.nativeEvent.locationX;
		let clickY = event.nativeEvent.locationY;
		if (!this.state.possibleShape)	// if there isn't a shape selected	
			return;
		// this is if a shape is already selected
		let grabLocation = this.determineGrabLocation(clickX, clickY);
		if (grabLocation != -1) {
			this.setState({
				grabLocation,
				currentInitialPress: { x: clickX, y: clickY },
			})
			this.freezeScroll();
		}
	}

	_handleOverlayMove = (event) => {
		// basically if there's not selected shape or not clicking the shape
		if (!this.state.possibleShape || this.state.grabLocation == -1)	return;
		let clickX = event.nativeEvent.locationX;
		let clickY = event.nativeEvent.locationY;
		let { possibleShape, boxSize } = this.state;
		let xDiff = this.roundDifference(clickX - this.state.currentInitialPress.x);
		let yDiff = this.roundDifference(clickY - this.state.currentInitialPress.y);
		if (this.state.grabLocation == 0) {
			newShape = {
				x: possibleShape.x + xDiff,
				y: possibleShape.y + yDiff,
				width: possibleShape.width,
				height: possibleShape.height,
			};
		} else if (this.state.grabLocation == 1) {
			newShape = {
				x: possibleShape.x + xDiff,
				y: possibleShape.y + yDiff,
				width: possibleShape.width - xDiff,
				height: possibleShape.height  - yDiff,
			};
		} else if (this.state.grabLocation == 3) {	// upper right corner
			newShape = {
				x: possibleShape.x,
				y: possibleShape.y + yDiff,
				width: possibleShape.width + xDiff,
				height: possibleShape.height - yDiff,
			};
		} else if (this.state.grabLocation == 5) {	// lower right corner
			newShape = {
				x: possibleShape.x,
				y: possibleShape.y,
				width: possibleShape.width + xDiff,
				height: possibleShape.height + yDiff,
			};
		} else if (this.state.grabLocation == 7) {	//lower left corner
			newShape = {
				x: possibleShape.x + xDiff,
				y: possibleShape.y,
				width: possibleShape.width - xDiff,
				height: possibleShape.height  + yDiff,
			};
		}
		let currentInitialPress =  {
				x: this.state.currentInitialPress.x + xDiff,
				y: this.state.currentInitialPress.y + yDiff,
		};
		// conditionals to keep the shape from becoming too small or out of bounds
		if (newShape.x < 0 || newShape.x+newShape.width > boxSize*this.state.numColumns) {
			newShape.x = possibleShape.x;
			newShape.width = possibleShape.width;
			currentInitialPress.x = this.state.currentInitialPress.x;
		}
		if (newShape.y < 0 || newShape.y+newShape.height > boxSize*this.state.numRows) {
			newShape.y = possibleShape.y;
			newShape.height = possibleShape.height;
			currentInitialPress.y = this.state.currentInitialPress.y;
		}
		newShape.width = (newShape.width < boxSize) ? possibleShape.width : newShape.width;
		newShape.height = (newShape.height < boxSize) ? possibleShape.height : newShape.height;
		this.setState({
			possibleShape: newShape,
			currentInitialPress,
		});
	}

	_handleOverlayRelease = (event) => {
		this.setState({ grabLocation: -1 });
		if (!this.state.possibleShape)
			this.determineShapePressed(event.nativeEvent.locationX, event.nativeEvent.locationY);
		this.unfreezeScroll();
	}

	render() {
		let { editMode, possibleShape } = this.state;
		return (
			<View style={styles.outerContainer} >
				<ScrollView
					maximumZoomScale={4}  // zooming in
			        contentOffset={{x: 0, y: 0}}
			        contentContainerStyle={{
			        	flexGrow: 1,
						flexDirection: 'row',
						alignItems: 'center',
			        }}
			        scrollEnabled={this.state.scrollEnabled}
				>
					<View
						style={{
							height: this.state.boxSize*this.state.numColumns,
							width: this.state.boxSize*this.state.numRows,
						}}
					>
						<GridVisual
							boxSize={this.state.boxSize}
							numRows={this.state.numRows}
							numColumns={this.state.numColumns}
						/>
						{this.state.shapes.map((shape, index) => {
							return (
								<View
									onStartShouldSetResponder={(event) => true}
									key={index.toString()}
									style={{
										position: 'absolute',
										left: shape.x,
										top: shape.y,
										width: shape.width,
										height: shape.height,
										backgroundColor: editMode ? 'blue' : 'brown',
									}}
								/>
							);
						})}
						{possibleShape &&
							<View
								onStartShouldSetResponder={(event) => false}
								style={{
									position: 'absolute',
									left: possibleShape.x,
									top: possibleShape.y,
									width: possibleShape.width,
									height: possibleShape.height,
									backgroundColor: 'green',
									borderWidth: 4,
									borderColor: 'black',
								}}
							/>
						}
						{editMode &&
							<View
								style={styles.editModeOverlay}
								onStartShouldSetResponder={(event) => true}
								onMoveShouldSetResponder={(event) => true}
								onResponderGrant={(event) => this._handleOverlayPress(event)}
								onResponderMove={(event) => this._handleOverlayMove(event)}
								onResponderRelease={(event) => this._handleOverlayRelease(event)}
							/>
						}
					</View>
				</ScrollView>
				<TouchableOpacity
					style={styles.editModeButton}
					onPress={this.toggleEditMode}
				/>
				{editMode &&
					<TouchableOpacity
		            	style={styles.addShapeButton}
		            	onPress={this.addNewShape}
		        	/>
		    	}
		    	{editMode && this.state.possibleShape &&
		    		<TouchableOpacity
		        		style={styles.confirmButton}
		        		onPress={this.confirmShape}
		      		/>
		    	}
		    	{editMode && this.state.possibleShape &&
		    		<TouchableOpacity
		    			style={styles.cancelButton}
		    			onPress={this.cancelShapeEdit}
		    		/>
		    	}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	outerContainer: {
		width: Layout.window.width,
		height: Layout.window.height,
	},
	editModeButton: {
	    position: 'absolute',
	    right: 40,
	    bottom: 50,
	    width: 50,
	    height: 50,
	    borderRadius: 10,
	    borderWidth: 2,
	    borderColor: 'black',
	    ...ConstantStyles.shadow,
	    backgroundColor: 'grey',
	  },
  	addShapeButton: {
	    position: 'absolute',
	    left: 10,
	    top: 10,
	    width: 50,
	    height: 50,
	    borderRadius: 10,
	    borderWidth: 2,
	    borderColor: 'black',
	    ...ConstantStyles.shadow,
	  },
	  confirmButton: {
		position: 'absolute',
		left: 20,
		bottom: 50,
		width: 40,
		height: 40,
		backgroundColor: 'green',
		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 10,
		...ConstantStyles.shadow,
	},
	cancelButton: {
		position: 'absolute',
		left: 80,
		bottom: 50,
		width: 40,
		height: 40,
		backgroundColor: 'red',
		borderWidth: 2,
		borderColor: 'black',
		borderRadius: 10,
		...ConstantStyles.shadow,
	},
	editModeOverlay: {
		flex: 1,
		backgroundColor: 'black',
		opacity: 0.2,
	},
});