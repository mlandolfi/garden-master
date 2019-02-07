import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import Block from './Block';

import Layout from '../constants/Layout';
import Palette from '../constants/palette';

export default class GridVisual extends React.PureComponent {

	_handleBlockPress = (index) => {
		if (this.props.onBlockPress)
			this.props.onBlockPress(`grid#${this.props.keyString}#box#${index}`)
	}

	renderInnerSquare = (index, nested) => {
		let { boxSize, clickable, block, plants } = this.props;
		let numNested = 2;	// just temp, that's num of rows and num of columns
		if (nested) {
			return (
				<GridVisual
					keyString={"random"}
					boxSize={boxSize / numNested}
					numRows={numNested}
					numColumns={numNested}
					block={{ color: block.color, visual: null, offsetMultiplier: 0 }}
					clickable={clickable}
					onBlockPress={(keyString) => this.props.onBlockPress(keyString)}
					plants={plants}
				/>
			);
		} else {
			return (
				<Block
					boxSize={boxSize}
					color={block.color}
					clickable={clickable}
					keyString={`shape#${this.props.keyString}#block#${index.toString()}`}
					onPress={(keyString) => this.props.onBlockPress(keyString)}
					plant={plants && plants.includes(index)}
				/>
			);
		}
	}


	render() {
		let { boxSize, numRows, numColumns, block, clickable, splitBlocks } = this.props;
		let containerWidth = boxSize * numColumns;
		let containerHeight = boxSize * numRows;
		let offset = boxSize * block.offsetMultiplier;
		return (
			<View
				style={{
					width: containerWidth,
					height: containerHeight,
				}}
			>
				{Array.from(Array(numColumns*numRows)).map((empty, index) => {
					return (
						<View
							key={index.toString()}
							style={{
								position: 'absolute',
								right: (index % numColumns) * boxSize - offset,
								top: Math.floor(index / numColumns) * boxSize - offset,
								width: boxSize,
								height: boxSize,
							}}
						>
							{block.visual &&
								<Image
									source={block.visual}
									style={{
										position: 'absolute',
										left: -1 * offset,
										width: boxSize * (4/3),
										height: boxSize * (4/3),
									}}
								/>
							}
							<View>
								{this.renderInnerSquare(index, splitBlocks ? splitBlocks.includes(index) : false)}
							</View>
						</View>
					);
				})}
			</View>
		);
	}
}
GridVisual.propTypes = {
	block: PropTypes.object.isRequired,
	boxSize: PropTypes.number.isRequired,
	numRows: PropTypes.number.isRequired,
	numColumns: PropTypes.number.isRequired,
	keyString: PropTypes.string.isRequired,	// unique id for specific grid
	clickable: PropTypes.bool,
	plants: PropTypes.array,
	onBlockPress: PropTypes.func,	// must be clickable
}