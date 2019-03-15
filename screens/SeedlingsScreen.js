import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';

import { Fab, Icon } from 'native-base';

import Palette from '../constants/palette';
import ConstantStyles from '../constants/ConstantStyles';
import Layout from '../constants/Layout';

export default class SeedlingsScreen extends React.Component {

	render() {
		return (
			<View>
				<View style={styles.activeContainer} >
					<Text style={{ color: 'black', fontSize: 40 }}>Seedlings</Text>
				</View>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	activeContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		height: Layout.window.height,
		backgroundColor: Palette.secondary.light,
		// paddingTop: Layout.window.height - Layout.window.squareHeight,
	},
});
