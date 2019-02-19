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
		let { width, height } = this.props;
		return (
			<View style={styles.root}>
				<View
					style={{
						width,
						height,
						borderRadius: 10,
						borderWidth: 2,
						borderColor: 'black',
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
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired,
};

const styles = {
	root: {
		position: 'absolute',
		width: Layout.window.width,
		height: Layout.window.height,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
}