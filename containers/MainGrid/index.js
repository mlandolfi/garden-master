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
import {
	Container,
	Header,
	Footer,
	Content,
	Button,
	Icon,
	Fab,
} from 'native-base';
import PropTypes from 'prop-types';
import { roundToMultiple } from '../../utils.js';

import GridVisual from '../../components/GridVisual';
import Shape from '../../components/Shape';
import PopupWrapper from '../../components/PopupWrapper';
import GridResize from '../../components/GridResize';
import AddShape from '../../components/AddShape';

import Layout from '../../constants/Layout';
import ConstantStyles from '../../constants/ConstantStyles';
import Palette from '../../constants/palette';

// action imports for dispatch
import { resizeMainGridWidth, resizeMainGridHeight, addShape } from './actions';
// selector imports
import { getNumRows, getNumColumns, getBlock, getShapes, getBoxSize } from './selectors';

planterBoxVisual = require('../../assets/images/transparent3d.png');
const defaultShape = {
		x: 0, y: 0,
		width: 1, height: 1,
		plants: [],
		block: { color: '#fff', visual: null, offsetMultiplier: 0 },
	}

class MainGrid extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			scrollEnabled: true,
			editMode: false,
			adjustingGrid: false,
			addingShape: false,
			draggable: {},
		};
	}

	toggleEditMode = () => this.setState({ editMode: !this.state.editMode });

	adjustGridSize = () => this.setState({ adjustingGrid: true });

	freezeScroll = () => this.setState({ scrollEnabled: false });

	unfreezeScroll = () => this.setState({ scrollEnabled: true });

	addShape = () => this.setState({ addingShape: true });

	notAddingShape = () => this.setState({ addingShape: false });


	placeNewShape = (newShape) => {
		let possibleShape = Object.assign({}, defaultShape, newShape);
		this.setState({ possibleShape, addingShape: false });
	}

	confirmShape = () => {
		let newShapeID = Math.random().toString(36).substr(2, 9);
		let tempShape = Object.assign({}, this.state.possibleShape, { id: newShapeID });
		this.props.addShape(tempShape);
		this.setState({
			possibleShape: null,
		});
	}

	cancelShape = () => this.setState({ possibleShape: null, });

	resizeMainGrid = (numColumns, numRows) => {
		this.props.resizeMainGridWidth(numColumns);
		this.props.resizeMainGridHeight(numRows);
		this.setState({ adjustingGrid: false });
	}

	_handleDraggablePress = ({ nativeEvent }) => {
		this.setState({
			scrollEnabled: false,
			draggable: {
				referenceX: nativeEvent.locationX,
				referenceY: nativeEvent.locationY,
			}
		});
	}

	_handleDraggableMove = ({ nativeEvent }) => {
		let { possibleShape, draggable } = this.state;
		let { boxSize } = this.props;
		let xDiff = roundToMultiple(nativeEvent.locationX - draggable.referenceX, this.props.boxSize);
		let yDiff = roundToMultiple(nativeEvent.locationY - draggable.referenceY, this.props.boxSize);
		if (xDiff != 0 || yDiff != 0) {
			this.setState({
				possibleShape: Object.assign({},
						possibleShape,
						{ x: possibleShape.x + xDiff/boxSize, y: possibleShape.y + yDiff/boxSize },
					),
				draggable: { referenceX: draggable.referenceX+xDiff, referenceY: draggable.referenceY+yDiff },
			})
		}
	}

	_handleDraggableRelease = ({ nativeEvent }) => {
		this.unfreezeScroll();
	}

	render() {
		let { editMode, possibleShape, adjustingGrid, addingShape } = this.state;
		let { numRows, numColumns, boxSize } = this.props;
		return (
			<Container style={styles.outerContainer} >
				<View style={styles.contentContainer} >
					<ScrollView
						maximumZoomScale={4}  // zooming in
						minimumZoomScale={1}
				        contentOffset={{x: 0, y: 0}}
				        contentContainerStyle={{
				        	flexGrow: 1,
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-around',
							width: Layout.window.width,
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
											left: shape.x*boxSize,
											top: shape.y*boxSize,
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
										left: possibleShape.x*boxSize,
										top: possibleShape.y*boxSize,
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
							{possibleShape &&
								<View
										style={{
											position: 'absolute',
											width: numColumns*boxSize,
											height: numRows*boxSize,
										}}
										onStartShouldSetResponder={(event) => true}
										onMoveShouldSetResponder={(event) => true}
										onResponderGrant={this._handleDraggablePress}
										onResponderMove={this._handleDraggableMove}
										onResponderRelease={this._handleDraggableRelease}
									/>
								}
						</View>
					</ScrollView>
				</View>
				
				{adjustingGrid &&
					<PopupWrapper width={300} height={180}>
						<GridResize
							numRows={numRows}
							numColumns={numColumns}
							onExit={this.resizeMainGrid}
						/>
					</PopupWrapper>
				}
				{addingShape &&
					<PopupWrapper width={350} height={200}>
						<AddShape
							mainBlock={this.props.mainBlock}
							width={350}
							height={200}
							onSubmit={this.placeNewShape}
							onCancel={this.notAddingShape}
						/>
					</PopupWrapper>
				}
				<Fab
					active={this.state.editMode}
					direction="up"
					position="bottomRight"
					onPress={this.toggleEditMode}
				>
					<Icon name="create" />
					<Button
						onPress={this.adjustGridSize}
					>
						<Icon name="expand" />
					</Button>
					<Button
						onPress={this.addShape}
					>
						<Icon name="add-circle" />
					</Button>
				</Fab>
			    	{this.state.possibleShape &&
			    		<TouchableOpacity
			        		style={styles.confirmButton}
			        		onPress={this.confirmShape}
			      		/>
			    	}
			    	{this.state.possibleShape &&
			    		<TouchableOpacity
			    			style={styles.cancelButton}
			    			onPress={this.cancelShape}
			    		/>
			    	}
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		mainBlock: getBlock(state),
		numColumns: getNumColumns(state),
		numRows: getNumRows(state),
		boxSize: getBoxSize(state),
		shapes: getShapes(state),
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		addShape: (shape) => dispatch(addShape(shape)),
		resizeMainGridWidth: (width) => dispatch(resizeMainGridWidth(width)),
		resizeMainGridHeight: (height) => dispatch(resizeMainGridHeight(height)),
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainGrid)

const styles = StyleSheet.create({
	outerContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		height: '100%',
	},
	contentContainer: {
		height: '100%',
		justifyContent: 'center',
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