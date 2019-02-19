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

import GridVisual from '../../components/GridVisual';
import Shape from '../../components/Shape';
import PopupWrapper from '../../components/PopupWrapper';
import GridResize from '../../components/GridResize';

import Layout from '../../constants/Layout';
import ConstantStyles from '../../constants/ConstantStyles';
import Palette from '../../constants/palette';

// action imports for dispatch
import { resizeMainGridWidth, resizeMainGridHeight, addShape } from './actions';
// selector imports
import { getNumRows, getNumColumns, getBlock, getShapes } from './selectors';

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
		};
	}

	toggleEditMode = () => this.setState({ editMode: !this.state.editMode });

	adjustGridSize = () => this.setState({ adjustingGrid: true });

	freezeScroll = () => this.setState({ scrollEnabled: false });

	unfreezeScroll = () => this.setState({ scrollEnabled: true });

	addNewPossibleShape = () => {
		let possibleShape = Object.assign({}, defaultShape);
		possibleShape.block.color = '#7c5e42';
		possibleShape.block.visual = planterBoxVisual;
		possibleShape.block.offsetMultiplier = 1/3;
		this.setState({ possibleShape });
	}

	confirmShape = () => {
		let newShapeID = Math.random().toString(36).substr(2, 9);
		let tempShape = Object.assign({}, this.state.possibleShape, { id: newShapeID });
		this.props.addShape(tempShape);
		this.setState({
			possibleShape: null,
		});
	}

	cancelShape = () => {
		this.setState({
			possibleShape: null,
		});
	}

	calculateBoxSize = (windowWidth, windowHeight, numRows, numColumns) => {
		return (windowWidth / numColumns) < (windowHeight / numRows)
			? Math.trunc(windowWidth / numColumns) : Math.trunc(windowHeight / numRows);
	}

	resizeMainGrid = (numColumns, numRows) => {
		this.props.resizeMainGridWidth(numColumns);
		this.props.resizeMainGridHeight(numRows);
		this.setState({ adjustingGrid: false });
	}

	render() {
		let { editMode, possibleShape, adjustingGrid } = this.state;
		let { numRows, numColumns } = this.props;
		let boxSize = this.calculateBoxSize(Layout.window.width,
			Layout.window.height, numRows, numColumns);
		return (
			<Container style={styles.outerContainer} >
				<Content contentContainerStyle={styles.contentContainer} >
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
				</Content>
				{adjustingGrid &&
					<PopupWrapper width={300} height={180}>
						<GridResize
							numRows={numRows}
							numColumns={numColumns}
							onExit={this.resizeMainGrid}
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
						onPress={this.addNewPossibleShape}
					>
						<Icon name="add-circle" />
					</Button>
				</Fab>
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
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		mainBlock: getBlock(state),
		numColumns: getNumColumns(state),
		numRows: getNumRows(state),
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