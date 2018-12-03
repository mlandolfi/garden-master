import React from 'react';
import {
	View,
	TouchableOpacity,
	Image,
	Text,
	StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

var materials = [
	{
		key: 'dirt',
		index: 0,
		layouts: {
			full: require('../assets/images/DirtFull.png'),
			diagonal: require('../assets/images/DirtDiagonal.png'),
			arc: require('../assets/images/DirtArc.png'),
		},
	},
	{
		key: 'path',
		index: 1,
		layouts: {
			full: require('../assets/images/PathFull.png'),
			diagonal: require('../assets/images/PathDiagonal.png'),
			arc: require('../assets/images/PathArc.png'),
		},
	},
]

var DirtDiagonal = require('../assets/images/DirtDiagonal.png');
var PathBack = require('../assets/images/PathFull.png');

// UI for selecting different materials and shapes
export default class BoxTypeSelect extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			activeMaterial: materials[0],
			activeLayout: 'full',
		}
	}

	_handleMaterialSelect = (typeIndex) => {
		this.setState({
			activeMaterial: materials[typeIndex],
		});
	}

	_handleLayoutSelect = (layout) => {
		this.setState({ activeLayout: layout });
	}

	render() {
		let { activeMaterial, activeLayout } = this.state;
		return (
			<View
				style={{
					backgroundColor: 'transparent',
					position: 'absolute',
					margin: 10,
					padding: 10,
				}}
			>
				<View style={styles.selectTitle}>
					<Text>
						Materials
					</Text>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					{materials.map((material) => {
						return (
							<View
								key={'materialFull#' + material.key}
								style={{
									...styles.buttonWrapper,
									borderWidth: activeMaterial.key == material.key ? 2 : 0,
								}}
							>
								<TouchableOpacity
									style={styles.buttonStyle}
									onPress={() => this._handleMaterialSelect(material.index)}
								>
									<Image
										source={material.layouts.full}
										style={styles.imageStyle}
									/>
								</TouchableOpacity>
							</View>
						);	
					})}
				</View>
				<View style={styles.selectTitle}>
					<Text>
						Layouts
					</Text>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					{Object.keys(activeMaterial.layouts).map((layoutKey) => {
						let layouts = activeMaterial.layouts[layoutKey];
						return (
							<View
								key={'layout#' + layoutKey}
								style={{
									...styles.buttonWrapper,
									borderWidth: activeLayout == layoutKey ? 2 : 0,
								}}
							>
								<TouchableOpacity
									style={styles.buttonStyle}
									onPress={() => this._handleLayoutSelect(layoutKey)}
								>
									<Image
										style={styles.imageStyle}
										source={activeMaterial.layouts[layoutKey]}
									/>
								</TouchableOpacity>
							</View>
						);
					})}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	selectTitle: {
		borderBottomWidth: 1,
		borderBottomColor: 'black',
	},
	materialLabels: {
		textAlign: 'center',
	},
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