import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import GridVisual from './GridVisual';
import Shape from './Shape';


class Location extends React.Component {

	_handleBoxPress = (value) => {
		if (this.props.pressBlock)
			this.props.pressBlock(value);
	}

	render() {
		let { boxSize, backgroundBlock, numRows, numColumns, shapes, possibleShape } = this.props;
		return (
			<View
				style={{
					height: boxSize*numRows,
					width: boxSize*numColumns,
					flexDirection: 'row',
					alignItems: 'center',
				}}
			>
				<GridVisual
					block={backgroundBlock}
					boxSize={boxSize}
					numRows={numRows}
					numColumns={numColumns}
					keyString={"MainGrid"}
				/>
				{shapes.map((shape, index) => {
					// console.log(this.props.plants)
					// console.log('keys', Object.keys(this.props.plants));
					// console.log('shapeID: ', shape.id);
					// console.log('plants[shapeID]: ', this.props.plants[shape.id])
					return (
						<View
							key={shape.id}
							style={{
								position: 'absolute',
								left: shape.x*boxSize,
								top: shape.y*boxSize,
							}}
						>
							<Shape
								glowingBlocks={this.props.glowingBlocks}
								boxSize={boxSize}
								width={shape.width}
								height={shape.height}
								block={shape.block}
								splitBlocks={shape.splitBlocks}
								keyString={shape.id}
								plants={this.props.plants[shape.id]}
								onPress={this._handleBoxPress}
							/>
						</View>
					);
				})}
				{possibleShape &&
					<View
						style={{
							position: 'absolute',
							left: possibleShape.x*boxSize,
							top: possibleShape.y*boxSize,
						}}
					>
						<Shape
							glowingBlocks={this.props.glowingBlocks}
							boxSize={boxSize}
							width={possibleShape.width}
							height={possibleShape.height}
							block={possibleShape.block}
							splitBlocks={possibleShape.splitBlocks}
							keyString={'possibleShape'}
						/>
					</View>
				}
		</View>
		);
	}

}
Location.propTypes = {
	boxSize: PropTypes.number.isRequired,
	backgroundBlock: PropTypes.object.isRequired,
	numRows: PropTypes.number.isRequired,
	numColumns: PropTypes.number.isRequired,
	shapes: PropTypes.array.isRequired,
	possibleShape: PropTypes.object,
	pressBlock: PropTypes.func,
	glowingBlocks: PropTypes.array,
}

export default Location;