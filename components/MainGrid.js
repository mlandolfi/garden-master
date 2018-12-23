import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import GridVisual from './GridVisual';
import EditShapeMode from './EditShapeMode';

import Layout from '../constants/Layout';
import ConstantStyles from '../constants/ConstantStyles';

export default class MainGrid extends React.Component {

	constructor(props) {
		super(props);
		let numRows = 20;
		let numColumns = 20;
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
		this.setState({ editMode: !this.state.editMode });
	}

	updatePossibleShape = (shape) => {
		this.setState({ possibleShape: shape });
	}

	confirmShape = () => {
		let { shapes } = this.state;
		shapes.push(this.state.possibleShape);
		this.setState({ shapes, editMode: false });
	}

	cancelShapeEdit = () => {
		this.setState({ possibleShape: null, editMode: false });
	}

	unfreezeScroll = () => {
		// console.log("UNFREEZE");
		this.setState({ scrollEnabled: true });
	}

	freezeScroll = () => {
		// console.log("FREEZE");
		this.setState({ scrollEnabled: false });
	}

	_handleShapeClick = (index) => {
		console.log(this.state.shapes[index]);
	}

	render() {
		let { editMode } = this.state;
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
									onResponderGrant={(event) => this._handleShapeClick(index)}
									key={index.toString()}
									style={{
										position: 'absolute',
										left: shape.x,
										top: shape.y,
										width: shape.width,
										height: shape.height,
										backgroundColor: 'brown',
									}}
								/>
							);
						})}
						{editMode &&
							<EditShapeMode
								shape={{
									x: this.state.boxSize,
									y: this.state.boxSize,
									width: this.state.boxSize*2,
									height: this.state.boxSize*2,
								}}
								unfreezeScroll={this.unfreezeScroll}
								freezeScroll={this.freezeScroll}
								boxSize={this.state.boxSize}
								updatePossibleShape={this.updatePossibleShape}
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
		            	onPress={this.confirmShape}
		        	/>
		    	}
		    	{editMode &&
		    		<TouchableOpacity
		        		style={styles.confirmButton}
		        		onPress={this.confirmShape}
		      		/>
		    	}
		    	{editMode &&
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
});