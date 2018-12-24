import React from 'react';	// always import react!!
import { TouchableOpacity, View, Image } from 'react-native';	// importing components to use
import PropTypes from 'prop-types';

import { palette } from '../constants/palette';

var DirtDiagonal = require('../assets/images/DirtDiagonal50.png');
var PathBack = require('../assets/images/pathBack.png');

export default class GridBox extends React.Component {	// class always looks like this

	constructor(props) {
		super(props);
		// sets preferences for colors if they are given otherwise it sets defaults
		this.color = props.color ? props.color : 'white';
		this.borderColor = props.borderColor ? props.borderColor : 'black';
		this.state = { selected: false, fill: this.color };	// sets the initial state with selected == false
	}

	_handleSelect = () => {
		console.log('select');
		let selected  = this.state.fill != this.props.selectedColor ? true : !this.state.selected;
		this.setState({
			selected,
			fill: this.props.selectedColor,
		});				// asychronously changing the state, will re-call render() when state is changed
		if (this.props.onSelect) {						// sees if the onSelect property was passed down or not
			this.props.onSelect(this.props.keyName);	// callback to parent component
		}
	}
	
	renderInnerBox = () => {
		let { edgeLength, keyName, children } = this.props;	// pulling edgeLength, keyName, and children out of the props
		this.selectedColor = this.props.selectedColor ? this.props.selectedColor : palette.secondary.main;
		// same as let edgeLength = this.props.edgLength, we know that edgeLength is in this.props
		let { selected } = this.state;	// same as var selected = this.state.selected
		return (
			<View	// opening tag
              key={'block'+keyName}		// the key prop is just an identifier
              style={{	// inline styling 
              	width: edgeLength,
                height: edgeLength,
                backgroundColor: this.state.selected ? this.state.fill : this.color,
                borderColor: this.borderColor,
                borderWidth: selected ? 0 : 0.5,	// ternary saying if selected == true then 0 otherwise 0.5
              }}
	        >
	        { children }
	        </View>	// closing tag
		);
	}

	render() {
		var { keyName, selectable } = this.props;	// same as var keyName = this.props.keyName; var selectable = this.props.selectable
		if (selectable) {
			return (	// when component is more than one line use paranthesis ()
				<TouchableOpacity
	                onPress={this._handleSelect}	// setting the onPress to call the _handleSelect function
	                key={'touch'+keyName}
	            >
		            {this.renderInnerBox()}
	            </TouchableOpacity>
			);
		} else {
			return this.renderInnerBox();	// if it's not selectable thenno need for the TouchableOpacity
		}
		
	}
}
GridBox.propTypes = {	// setting the propTypes so if they're violated we throw errors
	keyName: PropTypes.string.isRequired,	// isRequired means you must pass some value with this property
	edgeLength: PropTypes.number.isRequired,
	selectable: PropTypes.bool,
	selectedColor: PropTypes.string,
	color: PropTypes.string,
	borderColor: PropTypes.string,
	onSelect: PropTypes.func,
}