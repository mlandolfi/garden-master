import React from 'react';
import { View, PanResponder } from 'react-native';
import PropTypes from 'prop-types';

import PressGridBox from './PressGridBox';

// Grid that lets you click different boxes
export default class PressGrid extends React.PureComponent {

	_handlePress = (index) => {
		this.props.onPress(index);
		// this.locationsVisited = [];
	}

	// componentWillMount() {
	// 	this.panResponder = PanResponder.create({
	// 		onPanResponderGrant: () => this.locationsVisited = [],
	// 		onPanResponderMove: 
	// 	});
	// }

	render() {
		let { boxesArray, boxEdgeLength } = this.props;
		return (
			<View
				key="PressGrid"
	            style={{
	              	position: 'absolute',
	                display: 'flex',
	                flexDirection: 'row',
	                flexWrap: 'wrap',
	                justifyContent: 'center',
	                backgroundColor: 'transparent',
	            }}
	        >
	            {boxesArray.map((row) => {
	            	return row.map((box) => {
	            		return (
	            			<PressGridBox
	            				key={"press"+box.index}
	            				edgeLength={boxEdgeLength}
	            				index={box.index}
	            				onPress={this._handlePress}
	            			/>
	            		);
	            	})
	            })}
	        </View>
		);
	}
}
PressGrid.propTypes = {
	boxesArray: PropTypes.array.isRequired,
	boxEdgeLength: PropTypes.number.isRequired,
	onPress: PropTypes.func.isRequired,
}