import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {
	Container,
	Button,
	Icon,
	Item,
	Input,
	Label,
	Form,
} from 'native-base';
import PropTypes from 'prop-types';

const Section = (props) => (
	<View style={styles.sectionRoot}>
		<View style={styles.sideContainer}>
			<View style={styles.inputContainer}>
				<Form>
				<Item fixedLabel>
					<Label>{props.type == "width" ? "Width: " : "Height: "}</Label>
					<Input
						type="number"
						value={props.value > 0 ? props.value.toString() : "" }
						onChangeText={(text) => props.setValue(parseInt(text) || 0)}
					/>
				</Item>
				</Form>
			</View>
			<View style={styles.buttonsContainer}>
				<Button small onPress={() => props.setValue(parseInt(props.value)+1)}>
					<Icon active name="arrow-dropup" />
				</Button>
				<Button small onPress={() => props.setValue(parseInt(props.value)-1)}>
					<Icon active name="arrow-dropdown" />
				</Button>
			</View>
		</View>
	</View>
	);
Section.propTypes = {
	type: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	setValue: PropTypes.func.isRequired,
}

class GridResize extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			numColumns: props.numColumns,
			numRows: props.numRows,
		}
	}

	setRows = (rows) =>	this.setState({ numRows: rows });
	
	setColumns = (columns) => this.setState({ numColumns: columns });

	render() {
		let { numRows, numColumns } = this.state;
		return (
			<View style={styles.root}>
				<Container>
					<Section
						type={'width'}
						setValue={this.setColumns}
						value={numColumns}
					/>
					<Section
						type={'height'}
						setValue={this.setRows}
						value={numRows}
					/>
					<Button onPress={() => this.props.onExit(numColumns, numRows)}>
						<Icon rounded active name="checkmark-circle" />
					</Button>
				</Container>
			</View>
			);
	}
}
GridResize.propTypes = {
	numRows: PropTypes.number.isRequired,
	numColumns: PropTypes.number.isRequired,
	onExit: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
	root: {
		width: '100%',
		height: '100%',
		backgroundColor: '#fff',
		borderRadius: 10,
		padding: 10,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	sectionRoot: {
		flex: 1,
	},
	sideContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	inputContainer: {
		flex: 3,
	},
	buttonsContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end',
	}
})

export default GridResize;