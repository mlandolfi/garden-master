import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import Layout from '../constants/Layout';
import Palette from '../constants/palette';


export default class PopupWrapper extends React.PureComponent {

	render() {
		let { width, height, bordered } = this.props;
		return (
			<View style={styles.root}>
				<View
					style={{
						width,
						height,
						borderColor: 'black',
						borderRadius: bordered ? 10 : 0,
						borderWidth: bordered ? 2 : 0,
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
		width: Layout.window.width,
		height: Layout.window.squareHeight,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
}