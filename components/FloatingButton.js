import React, { Fragment } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

import Layout from '../constants/Layout';
import Palette from '../constants/palette';
import ConstantStyles from '../constants/ConstantStyles';

/*
buttons: [
	{ iconName: '', iconType: '', color: '', onPress: () },
]
*/


export default class FloatingButton extends React.Component {

	constructor(props) {
		super(props);
		this.state =  {
			width: new Animated.Value(0),
			height: new Animated.Value(0),
		}
	}

	componentDidUpdate(prevProps, prevState) {
	    if (!prevProps.active && this.props.active) {
	    	Animated.parallel([
    			Animated.timing(this.state.width, {
		    		toValue: 60,
					duration: 100,
				}),
				Animated.timing(this.state.height, {
		    		toValue: 60,
					duration: 100,
				}),
	    	]).start();
	    } else if (!this.props.active) {
	    	Animated.parallel([
	    		Animated.timing(this.state.width, {
		    		toValue: 0,
					duration: 100,
				}),
				Animated.timing(this.state.height, {
		    		toValue: 0,
					duration: 100,
				}),
	    	]).start();
	    	
	    }
	}

	renderBranch = (buttons, containerStyle) => {
		if (!buttons)	return false;
		return (
			<View style={containerStyle} pointerEvents="box-none" >
				{buttons.map((button, index) => {
					return (
						<Animated.View
							key={`Fab${index}`}
							style={{
								...styles.branchButton,
								width: this.state.width,
								height: this.state.height,
								overflow: 'hidden'
							}}
						>
						<TouchableOpacity
							key={`Fab${index}`}
							activeOpacity={0.6}
							style={{
								...styles.branchButton,
								backgroundColor: button.color,
							}}
							onPress={button.onPress}
						>
							<Icon
								type={button.iconType ? button.iconType : 'material'}
								name={button.iconName}
								color={this.props.dark ? '#000' : '#fff'}
								size={19}
							/>
						</TouchableOpacity>
						</Animated.View>
						);
					}
				)}
			</View>
			);
	}

	render() {
		let { style, icon, containerStyle, active } = this.props;
		return (
			<View
				style={{
					...styles.root,
					top: this.props.top ? 25 : undefined,
					bottom: this.props.bottom ? 25 : undefined,
					left: this.props.left ? 25 : undefined,
					right: this.props.right ? 25 : undefined,
					...containerStyle,
				}}>
				{true && this.renderBranch(this.props.leftBranchButtons, styles.leftBranch)}
				{true && this.renderBranch(this.props.topBranchButtons, styles.topBranch)}
				{true && this.renderBranch(this.props.rightBranchButtons, styles.rightBranch)}
				{true && this.renderBranch(this.props.bottomBranchButtons, styles.bottomBranch)}
				<TouchableOpacity
					activeOpacity={0.6}
					onPress={this.props.onPress}
					style={{
						...styles.rootButton,
						...style,
						borderWidth: active ? 2 : 0,
						borderColor: '#fff',
					}}
				>
					{icon ? icon : <View />}
				</TouchableOpacity>
			</View>
		);
	}
}
FloatingButton.propTypes = {
	onPress: PropTypes.func.isRequired,
	top: PropTypes.bool, bottom: PropTypes.bool, left: PropTypes.bool, right: PropTypes.bool,
	active: PropTypes.bool,
	dark: PropTypes.bool,
	icon: PropTypes.element,
	leftBranchButtons: PropTypes.arrayOf(PropTypes.object),
	topBranchButtons: PropTypes.arrayOf(PropTypes.object),
	rightBranchButtons: PropTypes.arrayOf(PropTypes.object),
	bottomBranchButtons: PropTypes.arrayOf(PropTypes.object),
	style: PropTypes.object,
	containerStyle: PropTypes.object,
};

const styles = {
	root: {
		position: 'absolute',
		width: 60,
		height: 60,
		backgroundColor: 'transparent',
	},
	rootButton: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Palette.primary.dark,
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		alignItems: 'center',
		justifyContent: 'center',
	},
	branchButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		margin: 10,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 1, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 2,
		justifyContent: 'center',
	},
	leftBranch: {
		position: 'absolute',
		right: 60,
		height: 60,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row-reverse',
		flexWrap: 'none',
	},
	topBranch: {
		position: 'absolute',
		bottom: 60,
		width: 60,
		display: 'flex',
		flexDirection: 'column-reverse',
		alignItems: 'center',
		flexWrap: 'none',
	},
	rightBranch: {
		position: 'absolute',
		left: 60,
		height: 60,
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'row',
		flexWrap: 'none',
	},
	bottomBranch: {
		position: 'absolute',
		top: 60 + (Layout.window.height - Layout.window.squareHeight),
		width: 60,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		flexWrap: 'none',
	},
}