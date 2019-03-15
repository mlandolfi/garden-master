import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';

import { getPlant } from './selectors';

import ShadowButton from '../../components/ShadowButton';

import Layout from '../../constants/Layout';
import Palette from '../../constants/palette';


class PlantCard extends React.PureComponent {

	render() {
		let { plant } = this.props;
		if (!plant)	return <Text>No Plant</Text>
		return (
			<View style={styles.root}>
				<TouchableOpacity
					key={"exitPlantCard"}
					onPress={this.props.closeCard}
					style={styles.exitButton}
				>
					<Icon name="close" style={{ fontSize: 40, color: '#FF4500' }}/>
				</TouchableOpacity>
			</View>
		);
	}
}
PlantCard.propTypes = {
	plantKey: PropTypes.string.isRequired,
	closeCard: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
	return {
		plant: getPlant(state, ownProps.plantKey)
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {

	}
}

const styles = StyleSheet.create({
	root: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
		backgroundColor: Palette.primary.light,
	},
	exitButton: {
		position: 'absolute',
		top: -20,
		right: -20,
		width: 40,
		height: 40,
		borderRadius: 10,
		backgroundColor: '#000',
		alignItems: 'center',
		justifyContent: 'center',
	}
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PlantCard)