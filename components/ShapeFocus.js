import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import GridVisual from './GridVisual';
import Plant from './Plant';
import HiddenDropdown from './HiddenDropdown';

import Palette from '../constants/palette';

const plantImage = require('../assets/images/flower.jpg')

export default class ShapeFocus extends React.Component {

	constructor(props) {
		super(props);
		let layout = Dimensions.get('window');
		this.state = {
			layout,
			conatinerOffset: {
				x: 0.1 * layout.width,
				y: 0.1 * layout.height
			},
			boxSize: this.calculateBoxSize(layout.width*0.7, layout.height*0.5,
							props.shape.height+2, props.shape.width+2),
		}
	}

	calculateBoxSize = (windowWidth, windowHeight, numRows, numColumns) => {
		return (windowWidth / numColumns) < (windowHeight / numRows)
			? Math.trunc(windowWidth / numColumns) : Math.trunc(windowHeight / numRows);
	}

	_handleNewPlantPress = (event) => {
		// console.log(event.nativeEvent);
		this.setState({
			addingPlant: true,
			newPlantX: event.nativeEvent.pageX - this.state.conatinerOffset.x - 60,
			newPlantY: event.nativeEvent.pageY - this.state.conatinerOffset.y - 60,
		});
	}

	_handleOverlayMove = (event) => {
		// console.log("(" + event.nativeEvent.locationX + ", " + event.nativeEvent.locationY + ")");
		this.setState({
			newPlantX: event.nativeEvent.pageX - this.state.conatinerOffset.x - 60,
			newPlantY: event.nativeEvent.pageY - this.state.conatinerOffset.y - 60,
		});
	}

	_handleNewPlantRelease = () => {
		if (!this.state.addingPlant)	return;
		let { shape } = this.props;
		let { boxSize } = this.state;
		let placementX = this.state.newPlantX;
		let placementY = this.state.newPlantY - 100;	// magic number for height of new plant box
		if ((placementX > boxSize) && (placementX < boxSize + shape.width * boxSize)
			&& (placementY > boxSize) && (placementY < boxSize + shape.height * boxSize)) {
			this.props.shape.addPlant(new Plant(placementX-boxSize, placementY-boxSize, "Tomato", plantImage));
			this.setState({ addingPlant: false });
		} else {
			this.setState({ addingPlant: false });
		}
	}

	renderPlant = ({ item }) => {
		return (
			<HiddenDropdown
				title={`${item.count} ${item.label}`}
				items={item.collection}
			/>
		);
	}

	render() {
		let { shape } = this.props;
		let { layout, boxSize } = this.state;
		return (
			<View
				style={{
					...styles.outerContainer,
					width: 0.8 * layout.width,
					height: 0.8 * layout.height,
					left: this.state.conatinerOffset.x,
					top: this.state.conatinerOffset.y,
				}}
			>
				<View
					// onStartShouldSetResponder={(event) => true}
					// onResponderGrant={(event) => this._handleNewPlantPress(event)}
					onMoveShouldSetResponder={(event) => true}
					onResponderMove={(event) => this._handleOverlayMove(event)}
					onResponderRelease={(event) => this._handleNewPlantRelease(shape)}
					// onMoveShouldSetResponderCapture
				>
					<View
						style={{
							width: boxSize * (shape.width + 2),
							height: 80,
							flexDirection: 'row',
							alignItems: 'center',
							marginTop: 20,
						}}
					>
						<View
							style={{
								width: '60%',
								flexDirection: 'column',
								alignItems: 'left',
								borderBottomWidth: 3,
								borderBottomColor: 'black',
								marginLeft: 10,
								marginRight: 10,
								paddingLeft: 5,
							}}
						>
							<Text
								style={{
									fontSize: 40,
								}}
							>
								Box 2
							</Text>
						</View>
						<View
							style={{
								width: 60,
								height: 60,
								borderColor: 'black',
								borderWidth: 1,
								borderRadius: 10,
							}}
							onStartShouldSetResponder={(event) => true}
							onResponderGrant={(event) => this._handleNewPlantPress(event)}
							onResponderTerminationRequest={(event) => true}
						>
							<Image
								source={plantImage}
								style={{
									width: 40,
									height: 40,
									margin: 10,
								}}
							/>
						</View>
					</View>
					<View
						style={{
							width: boxSize * (shape.width + 2),
							height: boxSize * (shape.height + 2),
						}}
					>
						<GridVisual
							numRows={shape.height+2}
							numColumns={shape.width+2}
							boxSize={boxSize}
						/>
						<View
							style={{
								position: 'absolute',
								left: boxSize,
								top: boxSize,
								width: shape.width * boxSize,
								height: shape.height * boxSize,
								backgroundColor: 'orange',
							}}
						>
							{shape.plants.map((plant, index) => {
								return (
									<Image
										key={"plant"+index.toString()}
										source={plant.picture}
										style={{
											position: 'absolute',
											left: plant.x,
											top: plant.y,
											width: 40,
											height: 40,
										}}
									/>
								);
							})}
						</View>
					</View>
					{this.state.addingPlant &&
						<Image
							source={plantImage}
							style={{
								position: 'absolute',
								left: this.state.newPlantX,
								top: this.state.newPlantY,
								width: 40,
								height: 40,
							}}
						/>
					}
					</View>
					<FlatList
						data={shape.getPlantsByType()}
						renderItem={this.renderPlant}
						style={{
							width: '90%',
							height: '100%',
							marginTop: 20,
							borderTopWidth: 1,
							borderColor: 'black'
						}}
					/>
					<TouchableOpacity
						onPress={() => this.props.closeShapeFocus(null)}
						style={{
							width: 40,
							height: 40,
							backgroundColor: 'red',
						}}
					/>
			</View>
		);
	}

}
ShapeFocus.propTypes = {
	shape: PropTypes.object.isRequired,
	closeShapeFocus: PropTypes.func,
}

const styles = StyleSheet.create({
	outerContainer: {
		position: 'absolute',
		backgroundColor: '#fff',
		borderWidth: 4,
		borderColor: Palette.secondary.main,
		borderRadius: 20,
		alignItems: 'center',
	},
})