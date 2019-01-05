import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Palette from '../constants/palette';
import ConstantStyles from '../constants/ConstantStyles';
import Layout from '../constants/Layout';

const categories = ['shape', 'plant']

export default class GardenIndex extends React.Component {

	render() {
		return (
			<View style={styles.outerContainer}>
				<View>
					
				</View>
				
			</View>
		);
	}

}

const styles = StyleSheet.create({
	outerContainer: {
		width: Layout.window.width * (0.8),
		height: Layout.window.height * (0.7),
		position: 'absolute',
		left: Layout.window.width * (0.1),
		top: Layout.window.height * (0.15),
		backgroundColor: '#fff',
		borderWidth: 4,
		borderColor: Palette.secondary.main,
		borderRadius: 20,
	},
});