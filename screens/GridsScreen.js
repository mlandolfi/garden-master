import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import MainGrid from '../containers/MainGrid';

import Palette from '../constants/palette';
import Layout from '../constants/Layout';



export default class GridsScreen extends React.Component {

	static navigationOptions = {
		header: null,
	};

	render() {
		return (
			<View name='fullContainer'>
				<View style={styles.activeContainer} >
					<MainGrid location={0} />
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	activeContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		height: Layout.window.height,
		backgroundColor: Palette.secondary.light,
		// paddingTop: Layout.window.height - Layout.window.squareHeight,
	},
});
