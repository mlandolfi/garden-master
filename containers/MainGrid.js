import React from 'react';
import { connect } from 'react-redux';
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

// action imports for dispatch
import {
	resizeMainGrid,
	RESIZE_MAIN_GRID_WIDTH,
	RESIZE_MAIN_GRID_HEIGHT,
} from '../actions/MainGridActions';

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

class MainGrid extends React.Component {

	constructor(props) {
		super(props);
		let boxSize = this.calculateBoxSize(Layout.window.width,
			Layout.window.height, props.numRows, props.numColumns);
		let pixelLimits = {
			width: boxSize * props.numColumns,
			height: boxSize * props.numRows
		};
		this.state = {
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

	calculateBoxSize = (windowWidth, windowHeight, numRows, numColumns) => {
		return (windowWidth / numColumns) < (windowHeight / numRows)
			? Math.trunc(windowWidth / numColumns) : Math.trunc(windowHeight / numRows);
	}

	increaseGridSize = (value) => {
		this.setState({
			boxSize: this.calculateBoxSize(Layout.window.width,
						Layout.window.height, value, value),
		});
	}

	render() {
		let { editMode, possibleShape } = this.state;
		let { numRows, numColumns } = this.props;
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
							height: this.state.boxSize*numRows,
							width: this.state.boxSize*numColumns,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<GridVisual
							block={getDefaultShape().block}
							boxSize={this.state.boxSize}
							numRows={numRows}
							numColumns={numColumns}
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
				          value={numRows}
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

const mapStateToProps = ({ mainGrid }, ownProps) => {
	return {
		numColumns: mainGrid.numColumns,
		numRows: mainGrid.numRows,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainGrid)

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