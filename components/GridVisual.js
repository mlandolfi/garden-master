import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import Layout from '../constants/Layout';

export default class GridVisual extends React.PureComponent {

	render() {
		let { boxSize, numRows, numColumns } = this.props;
		return (
			<View
				style={{
					position: 'absolute',
					width: Layout.window.width,
					display: 'flex',
					flexWrap: 'wrap',
					flexDirection: 'row',
				}}
			>
				{Array.from(Array(numColumns*numRows)).map((empty, index) => {
					return (
						<View
							key={index.toString()}
							style={{
								width: boxSize,
								height: boxSize,
								borderWidth: 1,
								borderColor: 'grey',
							}}
						/>
					);
				})}
			</View>
		);
	}
}
GridVisual.propTypes = {
	boxSize: PropTypes.number.isRequired,
	numRows: PropTypes.number.isRequired,
	numColumns: PropTypes.number.isRequired,
}