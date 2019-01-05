import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';


export default class HiddenDropdown extends React.PureComponent {

	constructor(props) {
		super(props);
		this.state = { showItems: false }
	}

	renderItem = ({ item }) => {
		return (
			<View style={styles.itemContainer} >
				<Text style={styles.itemText} >
					{item.type}
				</Text>
			</View>
		);
	}

	_handlePress = () => this.setState({ showItems: !this.state.showItems });

	render() {
		return (
			<View style={styles.outerContainer} >
				<TouchableOpacity
					onPress={this._handlePress}
					style={styles.titleContainer}
				>
					<Text style={styles.title} >
						{this.props.title}
					</Text>
				</TouchableOpacity>
				{(this.state.showItems || this.props.showItems) &&
					<View style={styles.itemsOuterContainer} >
						<View style={styles.itemsContainer} >
							<FlatList
								data={this.props.items}
								renderItem={this.renderItem}
								style={styles.itemsList}
							/>
						</View>
					</View>
				}
			</View>
		);
	}
}
HiddenDropdown.propTypes = {
	title: PropTypes.string,
	items: PropTypes.array,
	showItems: PropTypes.bool,
};

const styles = StyleSheet.create({
	outerContainer: {
	},
	title: {
		fontSize: 30,
		textAlign: 'left',
	},
	titleContainer: {
		borderBottomWidth: 2,
		borderColor: 'black',
	},
	itemsOuterContainer: {
		alignItems: 'flex-end',
	},
	itemsContainer: {
		width: '90%',
	},
	itemText: {
		fontSize: 20,
	},
	itemContainer: {
		borderBottomWidth: 2,
		borderColor: 'black',
		borderLeftWidth: 1,
		marginTop: 5,
		padding: 3,
	},
});