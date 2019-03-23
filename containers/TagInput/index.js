import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Input, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

import Layout from '../../constants/Layout';
import Palette from '../../constants/palette';
import ConstantStyles from '../../constants/ConstantStyles';

import { getTags } from './selectors';
import { tagAdded } from './actions';

class TagInput extends React.Component {

	constructor(props) {
		super(props);
		this.state =  {
			value: "",
			nearTags: [],
		}
	}

	selectTag = (tag=this.state.value) => {
		this.props.onSelect(tag);
		if (tag == '')	return;
		this.props.addTag(tag);
	}

	setNearTags = (partialInput) => {
		let { tags } = this.props;
		nearTags = []
		for (let i=0; i<tags.length; i++) {
			for (let j=0; j<partialInput.length && j<tags[i].tag.length; j++) {
				if (partialInput[j] != tags[i].tag[j] || partialInput == tags[i].tag)
					break;
				if (j == partialInput.length-1 || j == tags[i].tag.length-1)
					nearTags.push(tags[i].tag);
			}
		}
		this.setState({ nearTags: nearTags.length > 0 ? nearTags : [] });
	}

	renderNearTags = () => (
		<View style={styles.nearTagsContainer}>
			{this.state.nearTags.map((tag, index) => (
				<TouchableOpacity
					onPress={() => this.selectTag(tag)}
					style={styles.nearTag}
					key={`tag:${tag}`}
				>
					<Text style={{ fontSize: 15 }}>
						{tag}
					</Text>
				</TouchableOpacity>
				))}
		</View>
		)

	renderSubmitButton = () => (
		<TouchableOpacity style={styles.submitButton}>
			<Icon name="check" />
		</TouchableOpacity>
		)

	_handleInputChange = (text) => {
		this.setState({ value: text.toLowerCase() });
		this.setNearTags(text.toLowerCase());
	}

	render() {
		let { nearTags } = this.state;
		return (
			<View style={styles.root} >
				<Input
					value={this.state.value}
					placeholder="text"
					onChangeText={this._handleInputChange}
					rightIcon={this.renderNearTags()}
					onSubmitEditing={({ nativeEvent }) => this.selectTag(nativeEvent.text)}
					autoFocus
					autoCorrect={false}
				/>
			</View>
		);
	}
}
TagInput.propTypes = {
	onSelect: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
	return {
		tags: getTags(state),
	}
}

function mapDispatchToProps(dispatch) {
	return {
		addTag: (tag) => dispatch(tagAdded(tag)),
	}
}

const styles = {
	root: {
		width: '100%',
		backgroundColor: Palette.primary.veryLight,
		borderRadius: 10,
	},
	inputContainer: {
		width: '100%',
		height: '95%',
	},
	nearTagsContainer: {
		display: 'flex',
		flexDirection: 'row',
	},
	nearTag: {
		borderWidth: 1,
		borderColor: '#000',
		borderRadius: 5,
		margin: 2,
		padding: 2,
		backgroundColor: Palette.primary.light,
		shadowOffset: { width: 1, height: 1 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
	},
	submitButton: {
		left: 0,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#000',
	},
}

export default connect(mapStateToProps, mapDispatchToProps)(TagInput);