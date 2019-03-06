import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

import { Icon } from 'native-base';

import {
	GridsScreenNav,
	SeedlingsScreenNav,
	CalendarScreenNav,
} from '../navigation/Screens';

import Palette from '../constants/palette';
import ConstantStyles from '../constants/ConstantStyles';
import Layout from '../constants/Layout';

export default class Drawer extends React.Component {

	_handleNavButtonPress = (item) => {
		if (item.key == '') {	// clicked settings button

		} else {
			this.props.navigate(item.key);
		}
	}

	renderNavigationButton = ({ item }) => (
		<TouchableOpacity 
			style={{
				...styles.navigationButton,
				backgroundColor: item.key == this.props.currentScreenKey
					? Palette.primary.light : Palette.primary.veryLight,
			}}
			onPress={() => this._handleNavButtonPress(item)}
		>
			<Icon
				type={item.iconType ? item.iconType : 'Ionicons'}
				name={item.icon}
				style={{ flex: 1, textAlign: 'center', fontSize: item.iconSize }}
			/>
			<Text style={styles.listText}>{item.title}</Text>
		</TouchableOpacity>
		);

	render() {
		return (
			<View style={styles.root}>
				<View style={styles.profileContainer}>
					<Icon
						name="contact"
						style={{ fontSize: 60 }}
					/>
					<View style={styles.profileNameContainer}>
						<Text style={{ fontSize: 20 }}>
							{this.props.profileName || "Not Signed In"}
						</Text>
					</View>
				</View>
				<FlatList
					data={[
					 	{ title: 'Seedlings', icon: 'egg', iconSize: 50, key: SeedlingsScreenNav.key },
					 	{ title: 'Grids', icon: 'grid-on', iconType: 'MaterialIcons', iconSize: 50, key: GridsScreenNav.key },
					 	{ title: 'Calendar', icon: 'calendar', iconSize: 58, key: CalendarScreenNav.key },
					 	{ title: 'Settings', icon: 'cog', iconSize: 55, key: '' },
					]}
					renderItem={this.renderNavigationButton}
					keyExtractor={(item) => item.title}
					style={styles.listContainer}
					scrollEnabled={false}
				/>
				<View style={styles.closeBarContainer}>
					<TouchableOpacity
						style={styles.closeBar}
						onPress={this.props.closeDrawer}
						activeOpacity={0.8}
					>
						<Icon name="arrow-dropleft" />
					</TouchableOpacity>
				</View>
			</View>
		);
	}

}
Drawer.propTypes = {
	navigate: PropTypes.func.isRequired,
	closeDrawer: PropTypes.func.isRequired,
	currentScreenKey: PropTypes.string.isRequired,
	profileName: PropTypes.string,
}


const styles = StyleSheet.create({
	root: {
		backgroundColor: Palette.primary.veryLight,
	},
	closeBarContainer: {
		height: Layout.window.height,
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		right: -40,
		position: 'absolute',
	},
	closeBar: {
		width: 40,
		height: 80,
		borderWidth: 3,
		borderLeftWidth: 0,
		borderRadius: 10,
		borderBottomLeftRadius: 0,
		borderTopLeftRadius: 0,
		borderColor: '#000',
		backgroundColor: Palette.primary.veryLight,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	navigationButton: {
		display: 'flex',
		flexDirection: 'row',
		padding: 5,
		alignItems: 'center',
	},
	listContainer: {
		width: '100%',
		height: '100%',
	},
	listText: {
		fontSize: 27,
		marginLeft: 20,
		flex: 3,
	},
	profileContainer: {
		width: '100%',
		padding: 30,
		marginTop: Layout.window.height - Layout.window.squareHeight,
		alignItems: 'center',
		justifyContent: 'center',
		// borderBottomWidth: 1,
		// borderColor: '#000',
	},
	profileNameContainer: {
		borderBottomWidth: 1,
		borderColor: '#000',
		paddingLeft: 10,
		paddingRight: 10,
	},
});