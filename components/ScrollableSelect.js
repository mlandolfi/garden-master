import React from 'react';	// always import react!!
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';	// importing components to use
import PropTypes from 'prop-types';

/*
[
	{ image: 1, callbackKey: "soil" },
	{ image: 2, callbackKey: "path" },
]
*/
export default class ScrollableSelect extends React.PureComponent {	// class always looks like this

	render() {
		let { onPress, width, activeKey, rotation } = this.props;
		return (
			<ScrollView
				style={{
					display: 'flex',
					flexDirection: 'row',
					marginTop: 5,
					width: width ? width : '100%',
					...this.props.style,
				}}
				horizontal
			>
				{this.props.selections.map((selection) => (
					<View
						key={selection.callbackKey}
						style={{
							...styles.buttonWrapper,
							borderWidth: activeKey == selection.callbackKey ? 2 : 0,
						}}
					>
						<TouchableOpacity
							style={styles.buttonStyle}
							onPress={() => onPress(selection.callbackKey)}
						>
							<Image
								source={selection.image}
								style={{
									...styles.imageStyle,
									transform: rotation ?
										[{ rotate: rotation.toString() + 'deg'}] : [],
								}}
							/>
						</TouchableOpacity>
					</View>
				))}
			</ScrollView>
		);
	}

}
ScrollableSelect.propTypes = {
	selections: PropTypes.array.isRequired,	// should be an array of objects of images and the callback key
	onPress: PropTypes.func.isRequired,
	width: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	rotation: PropTypes.number,	// degrees to rotate
	activeKey: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	style: PropTypes.object,
};

const styles = StyleSheet.create({
	imageStyle: {
		width: 50,
		height: 50,
		borderRadius: 10,
	    borderWidth: 2,
	    borderColor: 'black',
	},
	buttonStyle: {
		width: 50,
		height: 50,
	},
	buttonWrapper: {
		margin: 5,
		marginLeft: 8,
		padding: 3,
		borderColor: 'grey',
		borderRadius: 10,
	},
});