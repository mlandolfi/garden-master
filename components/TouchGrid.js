import React from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import DisplayGrid from './DisplayGrid';
import PressGrid from './PressGrid';

import { palette } from '../constants/palette';
import { constantStyles } from '../constants/constantStyles';



export default class TouchGrid extends React.Component {

	_handleBoxPress = () => {

	}

	render() {
		let { boxesArray, boxEdgeLength, edit } = this.props;
		return (
			<ScrollView
	          maximumZoomScale={4}  // zooming in
	          contentContainerStyle={{
	          	flexGrow: 1,
	            justifyContent : 'center',
	            flexWrap: 'wrap',
	            width: boxesArray[0].length * boxEdgeLength + 10,	// the 10 accounts for the border
	          }}
	          centerContent
	        >
	        	<DisplayGrid
	        		boxesArray={boxesArray}
	        		boxEdgeLength={boxEdgeLength}
	        	/>
	        	{edit &&
	        		<PressGrid
		        		boxesArray={boxesArray}
		        		boxEdgeLength={boxEdgeLength}
		        		onPress={this._handleBoxPress}
	        		/>
	        	}
            </ScrollView>
		);
	}
}
TouchGrid.propTypes = {
	boxesArray: PropTypes.array.isRequired,
	boxEdgeLength: PropTypes.number.isRequired,
	edit: PropTypes.bool,
}