import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import NewPlantCard from './NewPlantCard';

import Layout from '../constants/Layout';
import ConstantStyles from '../constants/ConstantStyles';

// picture is just a color for now
const plants = [
	{ label: 'red', picture: 'red' },
	{ label: 'blue', picture: 'blue' },
	{ label: 'green', picture: 'green' },
];

export default class NewPlantSelect extends React.PureComponent {

	render() {
		return (
			<View style={styles.outerContainer}>
				<FlatList
					data={plants}
					renderItem={({ item }) => <NewPlantCard plant={item} />}
					keyExtractor={(item, index) => item.label}
				/>
			</View>
		);
	}

}

const styles = StyleSheet.create({
	outerContainer: {
		position: 'absolute',
		left: 0,
		width: 100,
		height: 500,
		backgroundColor: '#fff',
		borderWidth: 2,
		borderLeftWidth: 0,
		borderColor: '#000',
		borderBottomRightRadius: 10,
		borderTopRightRadius: 10,
		...ConstantStyles.shadow
	},
});