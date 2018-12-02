import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import DisplayGridBox from './DisplayGridBox';

// Grid that displays the boxes and what they look like
export default class DisplayGrid extends React.PureComponent {

	render() {
		let { boxesArray, boxEdgeLength } = this.props;
		return (
			<View
				key="DisplayGrid" 
	            style={{
	              	position: 'absolute',
	                display: 'flex',
	                flexDirection: 'row',
	                flexWrap: 'wrap',
	                justifyContent: 'center',
	            }}
	        >
	            {boxesArray.map((row) => {
	            	return row.map((box) => {
	            		return (
	            			<DisplayGridBox
	            				key={"display"+box.index}
	            				edgeLength={boxEdgeLength}
	            				foreground={box.foreground}
	            				background={box.background}
	            			/>
	            		);
	            	})
	            })}
	        </View>
		);
	}
}
DisplayGrid.propTypes = {
	boxesArray: PropTypes.array.isRequired,
	boxEdgeLength: PropTypes.number.isRequired,
}