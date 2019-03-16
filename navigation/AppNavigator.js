import React, { Fragment } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import { Icon } from 'react-native-elements';

import PropTypes from 'prop-types';
import {
	GridsScreenNav,
	SeedlingsScreenNav,
	CalendarScreenNav,
} from './Screens'

import Drawer from '../components/Drawer';
import FloatingButton from '../components/FloatingButton';

import Palette from '../constants/palette';
import Layout from '../constants/Layout';

const defaultScreen = GridsScreenNav.screen;

export default class AppNavigator extends React.Component {

	constructor(props) {
		super(props);
		this.stack = []	//last value stored is the screen before
		this.state = {
			currentScreenKey: GridsScreenNav.key,
			showDrawer: false,
			drawerWidth: new Animated.Value(0),
		}
	}

	openDrawer = () => this.setState({ showDrawer: true });
  	closeDrawer = () => this.setState({ showDrawer: false });

	componentDidUpdate(prevProps, prevState) {
	    if (prevState.showDrawer != this.state.showDrawer) {
	    	Animated.timing(this.state.drawerWidth, {
	    		toValue: this.state.showDrawer ? 250 : 0,
				duration: 150,
			}).start()
	    }
	  }

	  goTo = (screenKey) => {
	  	return this.setState({ showDrawer: false, currentScreenKey: screenKey });
	  }

	renderScreen(screenKey) {
		switch(screenKey) {
			case GridsScreenNav.key:
				return GridsScreenNav.screen;
			case SeedlingsScreenNav.key:
				return SeedlingsScreenNav.screen;
			case CalendarScreenNav.key:
				return CalendarScreenNav.screen;
			default:
				return defaultScreen;
		}
	}


	render() {
		return (
			<Fragment>
				{this.renderScreen(this.state.currentScreenKey)}
				<Animated.View
                style={{
                  position: 'absolute',
                  height: '100%',
                  left: 0,
                  width: this.state.drawerWidth,
                  backgroundColor: Palette.primary.veryLight,
                  borderRightColor: '#000',
                  borderRightWidth: 2,
                }}
              >
              {!this.state.showDrawer &&
                <FloatingButton
                  top
                  left
                  icon={<Icon name="menu" color="#fff" />}
                  onPress={this.openDrawer}
                  style={styles.upperFabContainer}
                />
              }
                {this.state.showDrawer &&
                  <View style={styles.menuContainer}>
                    <Drawer
                    	navigate={this.goTo}
                    	closeDrawer={this.closeDrawer}
                    	currentScreenKey={this.state.currentScreenKey}
                    />
                  </View>
                }
              </Animated.View>
			</Fragment>
			);
		
	}

}

const styles = StyleSheet.create({
	menuContainer: {
		width: '100%',
		height: '100%',
		shadowColor: '#000',
		shadowOffset: { width: 6, height: 8 },
		shadowRadius: 4,
		shadowOpacity: 0.5,
		backgroundColor: '#fff',
	},
	upperFabContainer: {
		top: Layout.window.height - Layout.window.squareHeight,
	}
});