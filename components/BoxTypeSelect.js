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
			activeRotation: 0,
			activeBackround: materials[0],
		}
		this.props.onUpdate(this.buildSelected());
	}

	buildSelected() {
		let box = {
			foreground: this.state.activeMaterial.layouts[this.state.activeLayout],
			background: this.state.activeBackround.layouts['full'],
			rotation: this.state.activeRotation,
		};
		return box;
	}

	_handleForegroundSelect = (typeIndex) => {
		this.setState({
			activeMaterial: materials[typeIndex],
		}, () => this.props.onUpdate(this.buildSelected()));
	}

	_handleLayoutSelect = (layout) => {
		this.setState({
			activeLayout: layout
		}, () => this.props.onUpdate(this.buildSelected()));
	}

	_handleBackgroundSelect = (typeIndex) => {
		this.setState({
			activeBackround: materials[typeIndex],
		}, this.props.onUpdate(this.buildSelected()));
	}

	_handleRotate = () => {
		this.setState({
			activeRotation: (this.state.activeRotation % 360) + 90
		}, () => this.props.onUpdate(this.buildSelected()))
	}

	render() {
		let { activeMaterial, activeLayout, activeBackround } = this.state;
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
						Materials
					</Text>
				</View>
				<View
					style={{
						display: 'flex',
						flexDirection: 'row',
					}}
				>
					<ScrollableSelect
						selections={materials.map((material) => {
							return {
								image: material.layouts.full,
								callbackKey: material.index,
							};
						})}
						width='50%'
						onPress={this._handleForegroundSelect}
						activeKey={activeMaterial.index}
						style={{
							borderRightWidth: 1,
							borderRightColor: 'black',
						}}
					/>
					<ScrollableSelect
						selections={materials.map((material)=> {
							return {
								image: material.layouts.full,
								callbackKey: material.index,
							};
						})}
						width='50%'
						onPress={this._handleBackgroundSelect}
						activeKey={activeBackround.index}
					/>
				</View>
				<View>
					<View style={styles.selectTitle}>
						<Text>
							Layouts
						</Text>
					</View>
					<View style={styles.lowerContainer} >
						<View style={styles.layoutsContainer} >
							<ScrollableSelect
								selections={Object.keys(activeMaterial.layouts).map((layoutKey) => {
									return {
										image: activeMaterial.layouts[layoutKey],
										callbackKey: layoutKey,
									};
								})}
								width='50%'
								onPress={this._handleLayoutSelect}
								rotation={this.state.activeRotation}
								activeKey={this.state.activeLayout}
								style={{
									borderRightWidth: 1,
									borderRightColor: 'black',
								}}
							/>
							<TouchableOpacity
								style={styles.rotateButton}
								onPress={this._handleRotate}
							/>
						</View>
						<View style={styles.activeBox} >
							<Image
								source={activeBackround.layouts['full']}
								style={{
									...styles.imageStyle,
									position: 'absolute',
								}}
							/>
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
	materialLabels: {
		textAlign: 'center',
	},
	imageStyle: {
		width: 50,
		height: 50,
		borderRadius: 10,
	    borderWidth: 3,
	    borderColor: 'green',
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
	layoutsContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	lowerContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	activeBox: {
		marginTop: 12,
		marginRight: 10,
	}
});