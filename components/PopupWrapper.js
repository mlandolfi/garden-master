import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import Layout from '../constants/Layout';
import Palette from '../constants/palette';
import ConstantStyles from '../constants/ConstantStyles';


export default class PopupWrapper extends React.PureComponent {

	render() {
		let { width, height, bordered } = this.props;
		return (
			<View style={styles.root} pointerEvents="box-none">
				<View
					style={{
						width,
						height,
						borderColor: 'black',
						borderRadius: bordered ? 10 : 0,
						borderWidth: bordered ? 2 : 0,
						...ConstantStyles.shadow,
					}}
				>
					{this.props.children}
				</View>
			</View>
		);
	}
}
PopupWrapper.propTypes = {
	children: PropTypes.any.isRequired,
	width: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
	height: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
	bordered: PropTypes.bool,
};

const styles = {
	root: {
		position: 'absolute',
		top: Layout.window.height - Layout.window.squareHeight,
		width: Layout.window.width,
		height: Layout.window.squareHeight,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
}