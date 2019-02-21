import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {
	Container,
	Button,
	Icon,
	Item,
	Input,
	Label,
	Text,
} from 'native-base';
import PropTypes from 'prop-types';

import GridVisual from './GridVisual';
import Shape from './Shape';

planterBoxVisual = require('../assets/images/transparent3d.png');
const defaultBlock = {
		color: '#7c5e42',
		visual: planterBoxVisual,
		offsetMultiplier: 1/3,
	}

const MAX_SHAPE_WIDTH = 10;
const MAX_SHAPE_HEIGHT = 10;

InputSection = (props) => (
	<View style={styles.inputContainer}>
		<Item floatingLabel style={styles.textContainer}>
			<Label>{props.type}</Label>
			<Input
				value={props.value > 0 ? props.value.toString() : ""}
				onChangeText={(text) => props.setValue(parseInt(text) || 0)}
			/>
		</Item>
		<View style={styles.buttonsContainer}>
			<Button small onPress={() => props.setValue(parseInt(props.value)+1)}>
				<Icon active name="arrow-dropup" />
			</Button>
			<Button small onPress={() => props.setValue(parseInt(props.value)-1)}>
				<Icon active name="arrow-dropdown" />
			</Button>
		</View>
	</View>
	);
InputSection.propTypes = {
	type: PropTypes.string.isRequired,
	setValue: PropTypes.func.isRequired,
	value: PropTypes.number.isRequired,
}

class AddShape extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			numColumns: 5,
			numRows: 5,
			boxSize: this.calculateBoxSize(5, 5),
		}
	}

	calculateBoxSize = (numColumns, numRows) => {
		maxWidth = Math.floor((this.props.width / 2) / (numColumns+2)) - 1;
		maxHeight = Math.floor((this.props.height) / (numRows+2)) - 1;
		return Math.min(maxWidth, maxHeight);
	}

	setWidth = (numColumns) => {
		newNumColumns = numColumns <= MAX_SHAPE_WIDTH ? numColumns : this.state.numColumns;
		this.setState({
			numColumns: newNumColumns,
			boxSize: this.calculateBoxSize(newNumColumns, this.state.numRows),
		});
	}

	setHeight = (numRows) => {
		newNumRows = numRows <= MAX_SHAPE_WIDTH ? numRows : this.state.numRows;
		this.setState({
			numRows: newNumRows,
			boxSize: this.calculateBoxSize(this.state.numColumns, newNumRows),
		});
	}

	submitShape = () => {
		let newShape = {
			width: this.state.numColumns,
			height: this.state.numRows,
			block: defaultBlock,
		}
		this.props.onSubmit(newShape);
	}

	render() {
		let { numRows, numColumns, boxSize } = this.state;
		return (
			<View style={styles.root}>
				<View style={styles.sideContainer}>
					<View style={styles.inputsContainer}>
						<InputSection
							type="Width"
							setValue={this.setWidth}
							value={numColumns}
						/>
						<InputSection
							type="Height"
							setValue={this.setHeight}
							value={numRows}
						/>
						<View style={{ flexDirection: 'row', padding: 2 }}>
							<Button onPress={this.submitShape}>
								<Text>Create</Text>
							</Button>
							<Button onPress={this.props.onCancel}>
								<Text>Cancel</Text>
							</Button>
						</View>
					</View>
				</View>
				<View style={styles.sideContainer}>
					<GridVisual
						keyString={"AddShape"}
						numRows={numRows+2}
						numColumns={numColumns+2}
						block={this.props.mainBlock}
						boxSize={boxSize}
					/>
					<View
						style={{
							position: 'absolute',
							left: boxSize,
						}}
					>
						<Shape
							boxSize={boxSize}
							width={numColumns}
							height={numRows}
							block={defaultBlock}
							keyString={"AddingShape"}
						/>
					</View>
				</View>
			</View>
			);
	}
}
AddShape.propTypes = {
	mainBlock: PropTypes.object.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
	onSubmit: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
	root: {
		height: '100%',
		borderRadius: 10,
		backgroundColor: '#fff',
		display: 'flex',
		flexDirection: 'row',

	},
	sideContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	inputsContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
	},
	inputContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonsContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	},
	textContainer: {
		flex: 2,
	},
	shapeContainer: {
		position: 'absolute',
	},
})

export default AddShape;