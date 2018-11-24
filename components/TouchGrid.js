import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import GridBox from '../components/GridBox';

export default class TouchGrid extends React.PureComponent {

	buildKeysArray = (numRows, numColumns) => {
		var arrayToReturn = [];
		for (let i=0; i<numRows; i++) {
			arrayToReturn.push([])
			for (let j=0; j<numColumns; j++)
				arrayToReturn[i].push(i.toString() + j.toString());
		}
		return arrayToReturn;
	}

	render() {
		let { numRows, numColumns, boxEdgeLength, edit } = this.props;
		let keysArray = this.buildKeysArray(numRows, numColumns);
		return (
			<ScrollView
	          maximumZoomScale={4}  // zooming in
	          contentContainerStyle={{
	          	flexGrow: 1,
	            justifyContent : 'center',
	            minWidth: numColumns * boxEdgeLength + 10,	// the 10 accounts for the border
	          }}
	          centerContent
	        >		
				<View
	              style={{
	                display: 'flex',
	                flexDirection: 'row',
	                flexWrap: 'wrap',
	                justifyContent: 'center',
	              }}
	            >
	            {keysArray.map((row) => {
	            	return row.map((index) => {
	            		return (
	            			<GridBox
	            				selectable={edit}
	            				key={index}
	            				keyName={index}
	            				edgeLength={boxEdgeLength}
	            			/>
	            		);
	            	})
	            })}
	            </View>
            </ScrollView>
		);
	}
}
TouchGrid.propTypes = {
	numRows: PropTypes.number.isRequired,
	numColumns: PropTypes.number.isRequired,
	boxEdgeLength: PropTypes.number.isRequired,
	edit: PropTypes.bool,
}