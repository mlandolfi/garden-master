import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Animated,
  DatePickerIOS,
} from 'react-native';
import { Button, Text } from 'native-base'
import PropTypes from 'prop-types';

import GridVisual from './GridVisual';
import Shape from './Shape';
import ShadowButton from './ShadowButton';

import Layout from '../constants/Layout';
import ConstantStyles from '../constants/ConstantStyles';
import Palette from '../constants/palette';

const colors = [,"#ff0000", "#ffa500", "#ffff00", "#008000", "#0000ff", "#4B0082"];
const sexes = ["male", "female", ""];
const types = ["seedling", "clone"]

class PlantCreator extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			group: '',
			color: '',
			datePlanted: new Date(Date.now()),
			sex: '',
			type: 'seedling',
			strain: '',
		}
	}

	setSex = (sex) => this.setState({ sex });

	setGroup = (group) => this.setState({ group });

	setColor = (color) => this.setState({ color });

	setDate = (newDate) => this.setState({ datePlanted: newDate });

	setStrain = (strain) => this.setState({ strain });

	setType = (type) => this.setState({ type });

	_handleSubmit = (isGroup) => {
		this.props.onSubmit({
			name: this.state.strain,
			type: this.state.type,
			color: this.state.color,
			datePlanted: this.state.datePlanted.toString(),
			sex: this.state.sex,
			groupID: isGroup ? Math.random().toString(36).substr(2, 9) : -1,
		});
	}

	render() {
		let { name, group, color, sex, datePlanted, strain, type } = this.state;
		return (
			<View style={styles.root}>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.textInput}
						value={strain}
						onChangeText={this.setStrain}
						placeholder="Enter Strain"
						placeholderTextColor={Palette.secondary.dark}
					/>
				</View>
				<View style={styles.inputContainer}>
					{types.map((item) => (
						<ShadowButton
							active={item == type}
							key={`type:${item}`}
							onPress={() => this.setType(item)}
							style={styles.sexesButton}
						>
							<Text
								style={styles.buttonText}
							>
								{item != "" ? item : "-"}
							</Text>
						</ShadowButton>
						))}
				</View>
				<View style={styles.inputContainer}>
					<View style={styles.colorLabelContainer}>
						<ShadowButton
							active={color == ""}
							onPress={() => this.setColor("")}
							style={{
								borderColor: 'red',
								shadowColor: 'red',
								backgroundColor: '#fff',
								width: '100%',
							}}
						>
							<Text style={styles.buttonText}>-</Text>
						</ShadowButton>
					</View>
					<View style={styles.colorsContainer}>
						{colors.map((item) => (
							<View
								key={`color:${item}`}
								style={{
									width: '25%',
									margin: 10,
								}}
							>
							<ShadowButton
								onPress={() => this.setColor(item)}
								active={item == color}
								style={{
									backgroundColor: item,
									width: '100%',
									height: 40,
									shadowColor: '#000',
									borderColor:'#000',
								}}
							/>
							</View>
							))}
					</View>
				</View>
				<View style={{ ...styles.inputContainer, flex: 1.5, overflow: 'hidden', flexDirection: 'column' }}>
					<DatePickerIOS
						minimumDate={new Date(datePlanted.getDate()-30)}
						maximumDate={new Date()}
						date={datePlanted}
						mode="date"
						style={{ width: '100%', height: '100%' }}
						onDateChange={this.setDate}
					/>
					<Text style={styles.dateText}>Date Planted</Text>
				</View>
				<View style={styles.inputContainer}>
					{sexes.map((item) => (
						<ShadowButton
							active={item == sex}
							key={`sex:${item}`}
							onPress={() => this.setSex(item)}
							style={styles.sexesButton}
						>
							<Text style={styles.buttonText}>
								{item != "" ? item : "-"}
							</Text>
						</ShadowButton>
						))}
				</View>
				<View style={styles.submitContainer}>
					<Button
						onPress={() => this._handleSubmit(false)}
						style={styles.plantButton}
					>
						<Text style={styles.plantButtonText}>
							Plant as Singles
						</Text>
					</Button>
					<Button
						onPress={() => this._handleSubmit(true)}
						style={styles.plantButton}
					>
						<Text style={styles.plantButtonText}>
							Plant as Group
						</Text>
					</Button>
				</View>
			</View>
			);
	}
}
PlantCreator.propTypes = {
	onSubmit: PropTypes.func.isRequired,
}

const styles = StyleSheet.create({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: Palette.primary.veryLight,
		height: '100%',
		width: '100%',
		padding: 30,
	},
	inputContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
	},
	textInput: {
		width: '90%',
		fontSize: 30,
		borderBottomWidth: 1,
		borderColor: '#000',
		color: '#000',
		textAlign: 'center',
	},
	dateText: {
		position: 'absolute',
		backgroundColor: Palette.primary.veryLight,
		fontSize: 40,
		padding: 10,
		width: '100%',
		textAlign: 'center',
		color: Palette.secondary.dark,
	},
	colorsContainer: {
		flex: 5,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	colorLabelContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		height: '100%',
	},
	sexesButton: {
		flex: 1,
		margin: 20,
		textAlign: 'center',
		borderColor: 'black',
		borderWidth: 1,
		backgroundColor: '#fff',
		borderWidth: 2,
		borderColor: Palette.secondary.main,
	},
	submitContainer: {
		flex: 1.5,
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		justifyContent: 'space-around',
	},
	buttonText: {
		width: '100%',
		textAlign: 'center',
		fontSize: 15,
		color: Palette.primary.dark,
	},
	plantButton: {
		width: '80%',
		height: '30%',
		alignSelf: 'center',
		backgroundColor: Palette.primary.main,
		borderWidth: 2,
		borderColor: Palette.secondary.veryDark,
	},
	plantButtonText: {
		fontSize: 30,
		width: '100%',
		textAlign: 'center',
	}
});

export default PlantCreator;