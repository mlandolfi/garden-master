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
// import { Container, Card, CardItem, Body, Text } from 'native-base';
import PropTypes from 'prop-types';

import GridVisual from '../components/GridVisual';
import Shape from '../components/Shape';

import Layout from '../constants/Layout';
import ConstantStyles from '../constants/ConstantStyles';
import Palette from '../constants/palette';

// action imports for dispatch
import {
	resizeMainGridWidth,
	resizeMainGridHeight,
	addShape,
} from '../actions/MainGridActions';

planterBoxVisual = require('../assets/images/transparent3d.png');

class MainGrid extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			scrollEnabled: true,
			editMode: false,
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
		let possibleShape = Object.assign({}, this.props.defaultShape);
		possibleShape.block.color = '#7c5e42';
		possibleShape.block.visual = planterBoxVisual;
		possibleShape.block.offsetMultiplier = 1/3;
		this.setState({ possibleShape });
	}

	/**	adds the current possible shape to list of permanent shapes
	*	@requires there must be a current possible shape
	*	@modifies this.state.shapes
	*	@effects adds this.state.posisbleShape to this.state.shapes
	*/
	confirmShape = () => {
		let newShapeID = Math.random().toString(36).substr(2, 9);
		this.props.addShape(this.state.possibleShape, newShapeID);
		this.setState({
			possibleShape: null,
		});
	}

	/**	cancels the current shape being edited
	*	@modifies this.state.[ possibleShape, shapes]
	*	@effects resets this.state.possibleShape
	*/
	cancelShape = () => {
		this.setState({
			possibleShape: null,
		});
	}

	calculateBoxSize = (windowWidth, windowHeight, numRows, numColumns) => {
		return (windowWidth / numColumns) < (windowHeight / numRows)
			? Math.trunc(windowWidth / numColumns) : Math.trunc(windowHeight / numRows);
	}

	render() {
		let { editMode, possibleShape } = this.state;
		let { numRows, numColumns } = this.props;
		let boxSize = this.calculateBoxSize(Layout.window.width,
			Layout.window.height, numRows, numColumns);
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
						width: boxSize * numColumns,
			        }}
			        scrollEnabled={this.state.scrollEnabled}
				>
					<View
						style={{
							height: boxSize*numRows,
							width: boxSize*numColumns,
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<GridVisual
							block={this.props.mainBlock}
							boxSize={boxSize}
							numRows={numRows}
							numColumns={numColumns}
							keyString={"MainGrid"}
						/>
						{Object.keys(this.props.shapes).map((key, index) => {
							let shape = this.props.shapes[key];
							return (
								<View
									key={key}
									style={{
										position: 'absolute',
										left: shape.x,
										top: shape.y,
									}}
								>
									<Shape
										boxSize={boxSize}
										width={shape.width}
										height={shape.height}
										block={shape.block}
										splitBlocks={shape.splitBlocks}
										keyString={key}
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
									boxSize={boxSize}
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
				          onValueChange={() => console.log("SLIDING")}
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
		mainBlock: mainGrid.mainBlock,
		numColumns: mainGrid.numColumns,
		numRows: mainGrid.numRows,
		shapes: mainGrid.shapes,
		defaultShape: mainGrid.defaultShape,
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		addShape: (shape, shapeID) => dispatch(addShape(shape, shapeID))
	}
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