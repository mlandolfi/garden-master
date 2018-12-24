import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

// will recieve a plant as a prop
// which has a label and a picture (just a color for now)

export default class NewPlantCard extends React.PureComponent {

	render() {
		let { label, picture } = this.props.plant;
		return (
			<View style={styles.cardContainer}>
				<View
					style={{
						backgroundColor: picture,
						width: 50,
						height: 60,
						marginTop: 10,
					}}
				/>
				<Text>{label}</Text>
			</View>
		);
	}

}
NewPlantCard.propTypes = {
	plant: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
	cardContainer: {
		width: 80,
		height: 100,
		borderWidth: 2,
		borderColor: 'black',
		margin: 4,
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
});