import React from 'react';
import {
	View,
	TouchableOpacity,
	Image,
	Text,
	StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

import Layout from '../constants/Layout';
import ConstantStyles from '../constants/ConstantStyles';

import ScrollableSelect from '../components/ScrollableSelect';

// var materials = [
// 	{
// 		key: 'dirt',
// 		index: 0,
// 		layouts: {
// 			full: require('../assets/images/DirtFull.png'),
// 			diagonal: require('../assets/images/DirtDiagonal.png'),
// 			arc: require('../assets/images/DirtArc.png'),
// 		},
// 	},
// 	{
// 		key: 'path',
// 		index: 1,
// 		layouts: {
// 			full: require('../assets/images/PathFull.png'),
// 			diagonal: require('../assets/images/PathDiagonal.png'),
// 			arc: require('../assets/images/PathArc.png'),
// 		},
// 	},
// ]

// var DirtDiagonal = require('../assets/images/DirtDiagonal.png');
// var PathBack = require('../assets/images/PathFull.png');

// UI for selecting different materials and shapes
export default class BoxTypeSelect extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = {
			activeMaterial: materials[0],
			activeLayout: 'full',
			activeRotation: 0,
		}
		this.props.onUpdate(this.buildSelected());
	}

	buildSelected() {
		let box = {
			material: this.state.activeMaterial.layouts[this.state.activeLayout],
			rotation: this.state.activeRotation,
		};
		return box;
	}

	_handleMaterialSelect = (typeIndex) => {
		this.setState({
			activeMaterial: materials[typeIndex],
		}, () => this.props.onUpdate(this.buildSelected()));
	}

	_handleLayoutSelect = (layout) => {
		this.setState({
			activeLayout: layout
		}, () => this.props.onUpdate(this.buildSelected()));
	}

	_handleRotate = () => {
		this.setState({
			activeRotation: (this.state.activeRotation % 360) + 90
		}, () => this.props.onUpdate(this.buildSelected()))
	}

	render() {
		let { activeMaterial, activeLayout } = this.state;
		return (
			<View
				style={{
					backgroundColor: '#fff',
					padding: 10,
					...ConstantStyles.shadow,

				}}
			>
				<View style={styles.selectTitle}>
					<Text>
						Layouts
					</Text>
				</View>
				<View style={styles.rowContainer} >
					<ScrollableSelect
						selections={Object.keys(activeMaterial.layouts).map((layoutKey) => {
							return {
								image: activeMaterial.layouts[layoutKey],
								callbackKey: layoutKey,
							};
						})}
						onPress={this._handleLayoutSelect}
						rotation={this.state.activeRotation}
						activeKey={this.state.activeLayout}
						style={styles.scrollableBorder}
					/>
					<TouchableOpacity
						style={styles.rotateButton}
						onPress={this._handleRotate}
					/>
				</View>
				<View>
					<View style={styles.selectTitle}>
						<Text>
							Materials
						</Text>
					</View>
					<View style={styles.rowContainer} >
						<ScrollableSelect
							selections={materials.map((material) => {
								return {
									image: material.layouts.full,
									callbackKey: material.index,
								};
							})}
							onPress={this._handleMaterialSelect}
							activeKey={activeMaterial.index}
							style={styles.scrollableBorder}
						/>
						<View style={styles.activeMaterialBox} >
							<View>
								<Image
									source={activeMaterial.layouts[activeLayout]}
									style={{
										...styles.imageStyle,
										transform: [{ rotate: this.state.activeRotation.toString() + 'deg'}],
									}}
								/>
							</View>
						</View>
					</View>	
				</View>		
			</View>
		);
	}
}
BoxTypeSelect.propTypes = {
	onUpdate: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
	selectTitle: {
		borderBottomWidth: 1,
		borderBottomColor: 'black',
	},
	rowContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	scrollableBorder: {
		borderRightWidth: 1,
		borderRightColor: 'black',
	},
	imageStyle: {
		width: 50,
		height: 50,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: 'black',
	},
	rotateButton: {
		width: 50,
		height: 50,
		borderColor: 'red',
		borderWidth: 2,
		marginTop: 12,
		marginLeft: 8,
		borderRadius: 10,
	},
	activeMaterialBox: {
		width: 50,
		height: 50,
		marginTop: 12,
		marginLeft: 8,
	}
});