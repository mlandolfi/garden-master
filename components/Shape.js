import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import GridVisual from './GridVisual';

import Layout from '../constants/Layout';
import Palette from '../constants/palette';


const blockDefault = {
	visual: null,
	color: 'blue',
}

export default class Shape extends React.PureComponent {

	_handleBlockPress = (keyString) => {
		console.log(keyString);
	}

	render() {
		let { boxSize, width, height, block, splitBlocks, plants, keyString } = this.props;
		return (
			<View
				style={{
					width: boxSize * width,
					height: boxSize * height,
				}}
			>
				<GridVisual
					block={block ? block : blockDefault}
					boxSize={boxSize}
					numRows={height}
					numColumns={width}
					keyString={keyString}
					clickable
					splitBlocks={splitBlocks}
					onBlockPress={this._handleBlockPress}
					plants={plants}
				/>
			</View>
		);
	}
}
Shape.propTypes = {
	boxSize: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,		// in number of boxes
	height: PropTypes.number.isRequired,	// in number of boxes
	block: PropTypes.object,				// { color: string, visual: image/number, offset: number }
	splitBlocks: PropTypes.array,
	plants: PropTypes.array,
	keyString: PropTypes.string.isRequired,		// unique key to track which shape it is
}