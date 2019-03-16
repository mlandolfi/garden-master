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

	isGlowing = (index) => {
		let { glowingBlocks } = this.props;
		if (glowingBlocks) {
			if (glowingBlocks.includes(index)) {
				return true;
			}
		}
		return false;
	}

	hasPlant = (index) => {
		let { plants } = this.props;
		if (plants) {
			for (let i=0; i<plants.length; i++) {
				if (parseInt(plants[i].plantID) == index)
					return plants[i];
			}
		}
		return false;
	}

	renderInnerSquare = (index) => {
		let { boxSize, clickable, block, plants } = this.props;
		return (
			<Block
				glow={this.isGlowing(index)}
				boxSize={boxSize}
				color={block.color}
				clickable={clickable}
				keyString={`${this.props.keyString}#${index.toString()}`}
				onPress={(keyString) => this.props.onBlockPress(keyString)}
				plant={this.hasPlant(index)}
			/>
		);
	}

	calcTotalIndex = (rowIndex, columnIndex) => {
		return rowIndex * this.props.numColumns + columnIndex;
	}


	render() {
		let { boxSize, numRows, numColumns, block, clickable } = this.props;
		let containerWidth = boxSize * numColumns;
		let containerHeight = boxSize * numRows;
		let offset = boxSize * block.offsetMultiplier;
		return (
			<View
				style={{
					width: containerWidth,
					height: containerHeight,
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				{Array.from(Array(numRows)).map((empty, rowIndex) => {
					return (
						<View key={`row${rowIndex.toString()}`} style={{ display: 'flex', flex: 1, width: '100%', flexDirection: 'row' }}>
							{Array.from(Array(numColumns)).map((empty, columnIndex) => {
								return (
								<View
									key={`row${rowIndex}column${columnIndex.toString()}`}
									style={{
										position: 'absolute',
										right: (columnIndex % numColumns) * boxSize - offset,
										top: Math.floor(columnIndex / numColumns) * boxSize - offset,
										flex: 1,
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
										{this.renderInnerSquare(this.calcTotalIndex(rowIndex, columnIndex), false)}
									</View>
								</View>
								);
							})}
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
	glowingBlocks: PropTypes.array,
	onBlockPress: PropTypes.func,	// must be clickable
}