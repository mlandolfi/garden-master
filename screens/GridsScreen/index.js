import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Slider,
  Animated,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import { roundToMultiple } from '../../utils.js';

import PlantCard from '../../containers/PlantCard';

import GridVisual from '../../components/GridVisual';
import Shape from '../../components/Shape';
import PopupWrapper from '../../components/PopupWrapper';
import GridResize from '../../components/GridResize';
import AddShape from '../../components/AddShape';
import Location from '../../components/Location';
import PlantCreator from '../../components/PlantCreator';
import FloatingButton from '../../components/FloatingButton';

import Layout from '../../constants/Layout';
import ConstantStyles from '../../constants/ConstantStyles';
import Palette from '../../constants/palette';

// action imports for dispatch
import {
	resizeLocationWidth,
	resizeLocationHeight,
	addShapeToLocation,
	addPlantsToLocation,
} from './actions';
// selector imports
import { getLocation, getPlants } from './selectors';

planterBoxVisual = require('../../assets/images/transparent3d.png');
const defaultShape = {
		x: 0, y: 0,
		width: 1, height: 1,
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
			editPlants: false,
			addingPlant: false,
			selectedBlocks: [],
			trackSelectedBlocks: false,
			draggable: {},
			showPlantCard: false,
			selectedPlant: '',
		};
	}

	toggleEditMode = () => this.setState({ editMode: !this.state.editMode });

	toggleTrackSelectedBlocks = () => this.setState({
		trackSelectedBlocks: !this.state.trackSelectedBlocks,
		selectedBlocks: []
	})

	toggleEditPlants = () => this.setState({ editPlants: !this.state.editPlants });
	toggleAddPlants = () => {
		this.setState({ addingPlant: true });
	}

	addPlants = (plants) => {
		this.setState({ addingPlant: false, trackSelectedBlocks: false, selectedBlocks: [] });
		this.props.addPlants(this.state.selectedBlocks.map((block) => {
			return Object.assign({},
				plants,
				{
					shapeID: block.substr(0, block.indexOf('#')),
					plantID: block.substr(block.indexOf('#')+1, block.length),
				});
		}))
	}

	closePlantCard = () => this.setState({ showPlantCard: false, selectedPlant: '' });

	blockHasPlant = (id) => {
		let { plants } = this.props;
		let shapeID =  id.substr(0, id.indexOf('#'));
		let plantID = id.substr(id.indexOf('#')+1, id.length);
		for (let i=0; i<plants[shapeID].length; i++) {
			if (`${plants[shapeID][i].shapeID}#${plants[shapeID][i].plantID}` == id)
				return true;
		}
		return false;
	}

	_handleBlockPress = (id) => {
		if (this.state.trackSelectedBlocks) {
			if (!this.state.selectedBlocks.includes(id))
				this.setState({ selectedBlocks: this.state.selectedBlocks.concat(id) });
			else {
				let temp = this.state.selectedBlocks.slice(0);
				temp.splice(temp.indexOf(id), 1);
				this.setState({ selectedBlocks: temp });
			}
		} else {
			if (this.blockHasPlant(id)) {
				this.setState({ showPlantCard: true, selectedPlant: id });
			}
		}

	}

	adjustGridSize = () => this.setState({ adjustingGrid: true });

	freezeScroll = () => this.setState({ scrollEnabled: false });
	unfreezeScroll = () => this.setState({ scrollEnabled: true });

	addShape = () => this.setState({ addingShape: true });
	notAddingShape = () => this.setState({ addingShape: false });

	placeNewShape = (newShape) => {
		let possibleShape = Object.assign({}, defaultShape, newShape);
		this.setState({ possibleShape, addingShape: false });
	}

	_handleAddPlantsPress = () => {
		if (this.state.trackSelectedBlocks && this.state.selectedBlocks.length > 0) {
			this.setState({ addingPlant: true });
		} else {
			this.setState({
				trackSelectedBlocks: this.props.location.shapes.length > 0 ? !this.state.trackSelectedBlocks : this.state.trackSelectedBlocks,
				selectedBlocks: []
			});
		}
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
		this.props.resizeLocationWidth(numColumns);
		this.props.resizeLocationHeight(numRows);
		this.setState({ adjustingGrid: false });
	}

	getGlowingBlocks = (blocks) => {
		return blocks.map((id) => parseInt(id.substr(id.indexOf('#')+1, id.length)));
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
		let { numColumns, numRows, boxSize } = this.props.location;
		let xDiff = roundToMultiple(nativeEvent.locationX - draggable.referenceX, boxSize);
		let yDiff = roundToMultiple(nativeEvent.locationY - draggable.referenceY, boxSize);
		let newX = possibleShape.x + xDiff/boxSize;
		let newY = possibleShape.y + yDiff/boxSize;
		if (xDiff != 0 || yDiff != 0) {
			this.setState({
				possibleShape: Object.assign({},
						possibleShape,
						{
							x: newX >= 0 && newX <= numColumns-possibleShape.width ? newX : possibleShape.x,
							y: newY >= 0 && newY <= numColumns-possibleShape.height ? newY : possibleShape.y
						},
					),
				draggable: { referenceX: draggable.referenceX+xDiff, referenceY: draggable.referenceY+yDiff },
			})
		}
	}

	_handleDraggableRelease = ({ nativeEvent }) => {
		this.unfreezeScroll();
	}

	setPossiblePlant = (plant) => this.setState({ possiblePlant: plant });

	render() {
		let { editMode, possibleShape, adjustingGrid, addingShape, addingPlant, trackSelectedBlocks } = this.state;
		let { numRows, numColumns, boxSize, block, shapes } = this.props.location;
		return (
			<View style={styles.outerContainer} >
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
						<Location
							glowingBlocks={this.getGlowingBlocks(this.state.selectedBlocks)}
							boxSize={boxSize}
							backgroundBlock={block}
							numRows={numRows}
							numColumns={numColumns}
							shapes={shapes}
							plants={this.props.plants}
							possibleShape={possibleShape}
							pressBlock={this._handleBlockPress}
						/>
						
					</ScrollView>
				</View>
				{possibleShape &&
					<View
						style={{
							position: 'absolute',
							width: Layout.window.width,
							height: Layout.window.height,
							backgroundColor: Palette.overlay.main,
							opacity: 0.25,
						}}
						onStartShouldSetResponder={(event) => true}
						onMoveShouldSetResponder={(event) => true}
						onResponderGrant={this._handleDraggablePress}
						onResponderMove={this._handleDraggableMove}
						onResponderRelease={this._handleDraggableRelease}
					/>
				}
				{this.state.showPlantCard &&
					<PopupWrapper width={350} height={500} bordered>
						<PlantCard
							closeCard={this.closePlantCard}
							plantKey={this.state.selectedPlant}
							backgroundBlock={block}
						/>
					</PopupWrapper>

				}
				{adjustingGrid &&
					<PopupWrapper width={300} height={180} bordered>
						<GridResize
							numRows={numRows}
							numColumns={numColumns}
							onExit={this.resizeMainGrid}
						/>
					</PopupWrapper>
				}
				{addingShape &&
					<PopupWrapper width={350} height={200} bordered>
						<AddShape
							mainBlock={block}
							width={350}
							height={200}
							onSubmit={this.placeNewShape}
							onCancel={this.notAddingShape}
						/>
					</PopupWrapper>
				}
				{trackSelectedBlocks &&
					<View
						style={styles.selectingBlocksOverlay}
						pointerEvents="none"
					/>
				}
				<FloatingButton
					bottom
					right
					active={this.state.editMode}
					onPress={this.toggleEditMode}
					icon={<Icon name="create" color="#fff" />}
					leftBranchButtons={[{
								iconName: 'expand',
								iconType: 'font-awesome',
								color: Palette.primary.dark,
								onPress: this.adjustGridSize
							}]}
					topBranchButtons={[{
						iconName: 'plus-square',
						iconType: 'font-awesome',
						color: Palette.primary.dark,
						onPress: this.addShape,
					}]}
				/>
				<FloatingButton
					top
					right
					style={styles.upperFabContainer}
					active={this.state.editPlants}
					onPress={this.toggleEditPlants}
					icon={<Icon type="font-awesome" name="leaf" color="#fff" />}
					bottomBranchButtons={[{
						iconName: trackSelectedBlocks ? 'check-circle' : 'add-circle',
						iconType: 'material',
						color: Palette.primary.dark,
						onPress: this._handleAddPlantsPress,
					}]}
				/>
				{addingPlant &&
					<PopupWrapper width={"100%"} height={Layout.window.height}>
						<PlantCreator
							onSubmit={this.addPlants}
						/>
					</PopupWrapper>
				}
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
			</View>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
		location: getLocation(state, ownProps.location),
		plants: getPlants(state, ownProps.location),
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		// addShape: (shape) => dispatch(addShapeToLocation(ownProps.location, shape)),
		// resizeLocationWidth: (width) => dispatch(resizeLocationWidth(ownProps.location, width)),
		// resizeLocationHeight: (height) => dispatch(resizeLocationHeight(ownProps.location, height)),
		// addPlants: (plants) => dispatch(addPlantsToLocation(ownProps.location, plants)),
		addShape: (shape) => dispatch(addShapeToLocation(0, shape)),
		resizeLocationWidth: (width) => dispatch(resizeLocationWidth(0, width)),
		resizeLocationHeight: (height) => dispatch(resizeLocationHeight(0, height)),
		addPlants: (plants) => dispatch(addPlantsToLocation(0, plants)),
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
		backgroundColor: Palette.secondary.light,
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
	selectingBlocksOverlay: {
		position: 'absolute',
		width: '100%',
		height: '100%',
		backgroundColor: '#aaa',
		opacity: 0.4,
	},
	upperFabContainer: {
		top: Layout.window.height - Layout.window.squareHeight,
	}
});