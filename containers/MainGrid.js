import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Slider,
} from 'react-native';
import PropTypes from 'prop-types';

import GridVisual from '../components/GridVisual';
import Shape from '../components/Shape';

import Layout from '../constants/Layout';
import ConstantStyles from '../constants/ConstantStyles';
import Palette from '../constants/palette';

// will ultimately be handled in the Redux store but saving here for now
function getDefaultShape() {
	return {
		x: 0,
		y: 0,
		width: 2,
		height: 2,
		block: { color: 'green', visual: null, offsetMultiplier: 0 },
		splitBlocks: [],	// keep in mind indecies go RIGHT ==> left and top ==> down
		plants: [],
	};
}
defaultVisual = require('../assets/images/transparent3d.png');

export default class MainGrid extends React.Component {

	constructor(props) {
		super(props);
		let numRows = 15, numColumns = 15;
		let boxSize = this.calculateBoxSize(Layout.window.width,
			Layout.window.height, numRows, numColumns);
		let pixelLimits = {
			width: boxSize * numColumns,
			height: boxSize * numRows
		};
		this.state = {
			numRows,
			numColumns,
			boxSize,
			pixelLimits,
			shapes: [],
			scrollEnabled: true,
			editMode: false,
			grabLocation: -1,
		};
	}

	/**	toggles editing mode
	*	@modifies this.state.editMode
	*	@effects switches this.state.editMode to the opposite of what it was 
	*/
	toggleEditMode = () => this.setState({ editMode: !this.state.editMode });

	/**	freezes the ability to scroll around the grid
	*	@modifies this.state.scrollEnabled
	*	@effects sets this.state.scrollEnabled to false
	*/
	freezeScroll = () => this.setState({ scrollEnabled: false });

	/**	gives the ability to scroll around the grid
	*	@modifies this.state.scrollEnabled
	*	@effects sets this.state.scrollEnabled to true
	*/
	unfreezeScroll = () => this.setState({ scrollEnabled: true });

	/**	adds a new possible shape to the editing grid
	*	@requires the grid must be in editing mode
	*	@modifies this.state.possibleShape
	*	@effects sets this.state.possibleShape to a new generic shape
	*/
	addNewPossibleShape = () => {
		let possibleShape = getDefaultShape();
		possibleShape.block.color = '#7c5e42';
		possibleShape.block.visual = defaultVisual;
		possibleShape.block.offsetMultiplier = 1/3;
		this.buildDraggables(possibleShape, 30);
		this.setState({ possibleShape });
	}

	/**	adds the current possible shape to list of permanent shapes
	*	@requires there must be a current possible shape
	*	@modifies this.state.shapes
	*	@effects adds this.state.posisbleShape to this.state.shapes
	*/
	confirmShape = () => {
		let { shapes } = this.state;
		shapes.push(this.state.possibleShape);
		this.setState({
			shapes,
			possibleShape: null,
		});
	}

	/**	cancels the current shape being edited
	*	@modifies this.state.[ possibleShape, shapes]
	*	@effects resets this.state.possibleShape
	*/
	cancelShape = () => {
		let { shapes } = this.state;
		this.setState({
			possibleShape: null,
			shapes,
		});
	}

	/**	rounds diff to the closest multiple of boxSize
	*	@requires	boxSize must be set and diff != null
	*	@returns	the multiple of boxSize closest to diff
	*/
	roundDifference = (diff) => {
		let { boxSize } = this.state;
		if (diff < 0) {
			return Math.round(diff + Math.abs(diff % boxSize));
		} else {
			return Math.round(diff - Math.abs(diff % boxSize));
		}
		// return Math.abs(diff % boxSize) > boxSize / 2
		// 	? diff + (boxSize - Math.abs(diff % boxSize)) : diff - (diff % boxSize);
	}

	buildDraggables = (shape, size) => {
		let pixelWidth = shape.width * this.state.boxSize;
		let pixelHeight = shape.height * this.state.boxSize;
		let leftX = shape.x-(size/2), middleX = shape.x+(pixelWidth/2)-size/2,
			rightX = shape.x+pixelWidth-size/2, topY = shape.y-size/2,
			middleY = shape.y+(pixelHeight/2)-(size/2), bottomY = shape.y+pixelHeight-size/2;
		let draggables = [
			{ x: middleX, y: middleY },	// center
			{ x: leftX, y: topY },		// top left
			{ x: middleX, y: topY },	// top
			{ x: rightX, y: topY },		// top right
			{ x: rightX, y: middleY },	// right
			{ x: rightX, y: bottomY },	// bottom right
			{ x: middleX, y: bottomY },	// bottom
			{ x: leftX, y: bottomY },	// bottom left
			{ x: leftX, y: middleY },	// left
		];
		this.setState({ draggables })
	}

	_handledraggablePress = (event, index) => {
		this.setState({
			currentDraggable: index,
			currentInitialPress: {x: event.nativeEvent.locationX, y: event.nativeEvent.locationY},
		});
		this.freezeScroll();
	}

	adjustDraggables = (indexes, xDiff, yDiff, draggables) => {
		return draggables.map((draggable, index) => ({
				x: indexes.includes(index) ? draggable.x + xDiff : draggable.x,
				y: indexes.includes(index) ? draggable.y + yDiff : draggable.y,
			}))
	}

	/**	_____________________
		|_1_|_____2_____|_3_|
		|	|			|	|
		| 8 |	  0 	| 4 |
		|___|___________|___|
		|_7_|_____6_____|_5_|
	*/
	_handleDraggableMove = (event, index) => {
		let { boxSize, currentInitialPress, pixelLimits, possibleShape, draggables } = this.state,
		xDiff = this.roundDifference(event.nativeEvent.locationX - currentInitialPress.x),
		yDiff = this.roundDifference(event.nativeEvent.locationY - currentInitialPress.y);
		let movedX = possibleShape.x + xDiff, movedY = possibleShape.y + yDiff;
		let pixelWidth = possibleShape.width * this.state.boxSize;
		let pixelHeight = possibleShape.height * this.state.boxSize;
		if (index == 0 && movedX >= 0 && movedX + pixelWidth <= pixelLimits.width
				&& movedY >= 0 && movedY + pixelHeight <= pixelLimits.height) {
			possibleShape.x = movedX;
			possibleShape.y = movedY;
			draggables = this.adjustDraggables([0,1,2,3,4,5,6,7,8], xDiff, yDiff, draggables);
		} else {
			if ((index == 1 || index == 2 || index == 3) && movedY >= 0) {	// top
				possibleShape.y = movedY;
				possibleShape.height += -1 * Math.round(yDiff / boxSize);
				draggables = this.adjustDraggables([1,2,3], 0, yDiff, draggables);
			}
			if ((index == 1 || index == 8 || index == 7) && movedX >= 0) {	// left
				possibleShape.x = movedX;
				possibleShape.width += -1 * Math.round(xDiff / boxSize);
				draggables = this.adjustDraggables([1,8,7], xDiff, 0, draggables);
			}
			if ((index == 3 || index == 4 || index == 5)
					&& event.nativeEvent.locationX <= pixelLimits.width) {	// right
				possibleShape.width += Math.round(xDiff / boxSize);
				draggables = this.adjustDraggables([3,4,5], xDiff, 0, draggables)
			}
			if ((index == 5 || index == 6 || index == 7)
					&& event.nativeEvent.locationY <= pixelLimits.height) {	// bottom
				possibleShape.height += Math.round(yDiff / boxSize);
				draggables = this.adjustDraggables([7,6,5], 0, yDiff, draggables);
			}
			// adjust the draggables efficiently
			if (((index == 1 || index == 2 || index == 3) && movedY >= 0)
				|| ((index == 5 || index == 6 || index == 7) && event.nativeEvent.locationY <= pixelLimits.height))
				draggables = this.adjustDraggables([8,0,4], 0, yDiff/2, draggables);
			if (((index == 1 || index == 8 || index == 7) && movedX >= 0)
				|| ((index == 3 || index == 4 || index == 5) && event.nativeEvent.locationX <= pixelLimits.width))
				draggables = this.adjustDraggables([2,0,6], xDiff/2, 0, draggables);
		}
		// final check on sizes
		if (possibleShape.width < 0)
			possibleShape.width = 0;
		if (possibleShape.height < 0)
			possibleShape.height = 0;
		this.setState({ possibleShape, draggables });
	}

	_handleDraggableRelease = (event, index) => {
		this.setState({ currentDraggable: null, currentInitialPress: null });
		this.unfreezeScroll();
	}

	calculateBoxSize = (windowWidth, windowHeight, numRows, numColumns) => {
		return (windowWidth / numColumns) < (windowHeight / numRows)
			? Math.trunc(windowWidth / numColumns) : Math.trunc(windowHeight / numRows);
	}

	increaseGridSize = (value) => {
		this.setState({
			numRows: value,
			numColumns: value,
			boxSize: this.calculateBoxSize(Layout.window.width,
						Layout.window.height, value, value),
		});
	}

	render() {
		let { editMode, possibleShape } = this.state;
		return (
			<View
				style={styles.outerContainer}
				onLayout={this.onLayout}
			>
				<ScrollView
					maximumZoomScale={4}  // zooming in
					// minimumZoomScale={0.5}
			        contentOffset={{x: 0, y: 0}}
			        contentContainerStyle={{
			        	flexGrow: 1,
						flexDirection: 'row',
						alignItems: 'center',
						width: this.state.pixelLimits.width,
			        }}
			        scrollEnabled={this.state.scrollEnabled}
				>
					<View
						style={{
							height: this.state.boxSize*this.state.numRows,
							width: this.state.boxSize*this.state.numColumns,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<GridVisual
							block={getDefaultShape().block}
							boxSize={this.state.boxSize}
							numRows={this.state.numRows}
							numColumns={this.state.numColumns}
							keyString={"MainGrid"}
						/>
						{this.state.shapes.map((shape, index) => {
							return (
								<View
									key={index.toString()}
									style={{
										position: 'absolute',
										left: shape.x,
										top: shape.y,
									}}
								>
									<Shape
										boxSize={this.state.boxSize}
										width={shape.width}
										height={shape.height}
										block={shape.block}
										splitBlocks={shape.splitBlocks}
										keyString={index.toString()}
										plants={shape.plants}
									/>
								</View>
							);
						})}
						{possibleShape &&
							<View
								style={{
									position: 'absolute',
									left: possibleShape.x,
									top: possibleShape.y,
								}}
							>
								<Shape
									boxSize={this.state.boxSize}
									width={possibleShape.width}
									height={possibleShape.height}
									block={possibleShape.block}
									splitBlocks={possibleShape.splitBlocks}
									keyString={'possibleShape'}
								/>
							</View>
						}
						{editMode && possibleShape &&
							this.state.draggables.map((draggable, index) => {
								return (
									<View
										key={`draggable${index.toString()}`}
										style={{
											position: 'absolute',
											width: this.state.possibleShape.width < 4 ?
												1/3 * this.state.possibleShape.width * this.state.boxSize : 40,
											height: this.state.possibleShape.height < 4 ?
												1/3 * this.state.possibleShape.height * this.state.boxSize : 40,
											left: draggable.x,
											top: draggable.y,
											backgroundColor: 'blue',
											borderRadius: 5,
											opacity: index == this.state.currentDraggable ? 0.5 : 1,
											borderColor: 'black',
											borderWidth: index == this.state.currentDraggable ? 4 : 0,
										}}
										onStartShouldSetResponder={(event) => true}
										onMoveShouldSetResponder={(event) => true}
										onResponderGrant={(event) => this._handledraggablePress(event, index)}
										onResponderMove={(event) => this._handleDraggableMove(event, index)}
										onResponderRelease={(event) => this._handleDraggableRelease(event, index)}
									/>
								);
							})
						}
					</View>
				</ScrollView>
				{false &&
					<View
						style={{
							position: 'absolute',
							top: 150,
							right: -50,
							width: 200,	// width because it's rotated
							height: 50,
							transform: [{ rotate: '90deg'}],
						    backgroundColor: Palette.secondary.main,
						    borderRadius: 10,
						    padding: 5,
						    ...ConstantStyles.shadow,
						}}
					>
						<Slider
				          step={1}
				          minimumValue={4}
				          maximumValue={30}
				          onValueChange={this.increaseGridSize}
				          value={this.state.numRows}
				        />
			        </View>
				}
				<TouchableOpacity
					style={styles.editModeButton}
					onPress={this.toggleEditMode}
				/>
				{editMode &&
					<TouchableOpacity
		            	style={styles.addShapeButton}
		            	onPress={this.addNewPossibleShape}
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
		    			onPress={this.cancelShape}
		    		/>
		    	}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	outerContainer: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
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
	    top: 50,
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
});