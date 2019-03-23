import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import { getPlant, getShapeDimensions } from './selectors';

import ShadowButton from '../../components/ShadowButton';
import GridVisual from '../../components/GridVisual';
import Shape from '../../components/Shape';
import TagInput from '../../containers/TagInput';

import Layout from '../../constants/Layout';
import Palette from '../../constants/palette';

import { addTagToPlant } from './actions';

const defaultShapeBlock = { visual: require('../../assets/images/transparent3d.png'), offsetMultiplier: 0.3333333, color: 'skyblue' };
var flower = require('../../assets/images/flower.png');

class PlantCard extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = { addingTags: false };
	}

	toggleAddTags = () => this.setState({ addingTags: true });

	addTag = (tag) => {
		if (tag == '')	return;
		this.props.addTag(tag);
		this.setState({ addingTags: false });
	}

	calculateBoxSize = () => {
		let { containerDimensions } = this.props;
		return Math.min(
				(containerDimensions.width / 2) / (this.props.shapeDimensions.width + 2),
				(containerDimensions.height / 3) / (this.props.shapeDimensions.height + 2)
			);
	}

	parseDate = () => {
		let datePlanted = new Date(this.props.plant.datePlanted);
		var options = { weekday: 'short', month: 'short', day: 'numeric' };
		return datePlanted.toLocaleDateString("en-US", options)	// Sat, Mar 2
	}

	parseAge = () => {
		let datePlanted = new Date(this.props.plant.datePlanted).getTime();
		let today = new Date().getTime();
		let diff = datePlanted - today;
		let numDays = (today - datePlanted) / (1000 * 60 * 60 * 24);
		if (numDays < 7) 
			return `${Math.floor((today - datePlanted) / (1000 * 60 * 60 * 24))} days`;
		else if (numDays < 30)
			return `${((today - datePlanted) / (7 * 1000 * 60 * 60 * 24)).toPrecision(2)} weeks`;
		else
			return `${((today - datePlanted) / (30 * 1000 * 60 * 60 * 24)).toPrecision(2)} months`;

	}


	render() {
		let { backgroundBlock, containerDimensions, shapeDimensions } = this.props;
		let { plantID, name, type, color, sex, tags } = this.props.plant;
		let boxSize = this.calculateBoxSize()
		if (!this.props.plant)	return <Text>No Plant</Text>
		return (
			<View style={styles.root}>
				<ScrollView>
				<View style={styles.header}>
					<View style={styles.titleContainer}>
						<Image
							source={flower}
							style={{
								flex: 3,
								resizeMode: 'center',
								width: '100%',
							}}
						/>
						<Text style={{ flex: 2, fontSize: 30, width: '100%', textAlign: 'center' }} >
							{`${name}\n1/1`}
						</Text>
					</View>
					<View style={styles.gridContainer}>
						<View>
							<GridVisual
								block={backgroundBlock}
								boxSize={boxSize}
								numRows={shapeDimensions.height+2}
								numColumns={shapeDimensions.width+2}
								keyString={"PlantCard"}
							/>
							<View
								key={"plantCardShape"}
								style={{
									position: 'absolute',
									left: boxSize,
									top: boxSize,
								}}
							>
								<Shape
									boxSize={boxSize}
									width={shapeDimensions.width}
									height={shapeDimensions.height}
									block={defaultShapeBlock}
									keyString={"plantCardShapeInner"}
									plants={[{ plantID }]}
								/>
							</View>
						</View>
					</View>
				</View>
				<View style={styles.contentContainer}>
					<Text style={styles.plantInfoText} >{`planted on ${this.parseDate()} | ${this.parseAge()} old`}</Text>
					<Text style={styles.plantInfoText} >{type}</Text>
					<Text style={styles.plantInfoText} >{sex}</Text>
				</View>
				<View style={styles.tagsContainer} >
					{this.state.addingTags ?
						<TagInput
							onSelect={this.addTag}
						/>
						:
						<View style={styles.tagsHeaderContainer}>
							<Text style={{ fontSize: 20, margin: 10 }} >Tags</Text>
							<TouchableOpacity onPress={this.toggleAddTags}>
								<Icon
									type="font-awesome"
									name="plus-square"
								/>
							</TouchableOpacity>
						</View>
					}
					<View style={styles.plantTagsContainer}>
						{tags.map((tag) => (
							<View style={styles.tag} key={tag}>
								<Text>
									{tag}
								</Text>
							</View>
							))}
					</View>
				</View>
				{false && 
					<View style={styles.notesContainer} >
						<TextInput
							style={styles.notesArea}
							value={"notes"}
							multiline
						/>
					</View>
				}
				</ScrollView>
				<TouchableOpacity
					key={"exitPlantCard"}
					onPress={this.props.closeCard}
					style={styles.exitButton}
				>
					<Icon name="close" color="#FF4500" />
				</TouchableOpacity>
			</View>
		);
	}
}
PlantCard.propTypes = {
	plantKey: PropTypes.string.isRequired,
	closeCard: PropTypes.func.isRequired,
	containerDimensions: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
	return {
		plant: getPlant(state, ownProps.plantKey),
		shapeDimensions: getShapeDimensions(state, ownProps.plantKey.split("#")[0])
	};
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		addTag: (tag) => dispatch(addTagToPlant( tag, ownProps.plantKey, ownProps.locationID )),
	}
}

const styles = StyleSheet.create({
	root: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
		display: 'flex',
		flexDirection: 'column',
		backgroundColor: Palette.primary.veryLight,
		padding: 10,
	},
	header: {
		width: '100%',
		flex: 3,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	titleContainer: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		// overflow: 'hidden',
	},
	gridContainer: {
		flex: 1,
		display: 'flex',
		alignItems: 'center',
	},
	contentContainer: {
		flex: 2,
	},
	plantInfoText: {
		flex: 1,
		fontSize: 20,
	},
	tagsContainer: {
		flex: 2,
	},
	notesContainer: {
		flex: 2,
	},
	tagsHeaderContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	plantTagsContainer: {
		margin: 10,
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	tag: {
		margin: 4,
		padding: 4,
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 3,
		backgroundColor: Palette.primary.main,
	},
	notesArea: {
		borderColor: '#000',
		borderWidth: 1,
		borderRadius: 5,
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
	},
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PlantCard)