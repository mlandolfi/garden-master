import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types'

export default class GridBox extends React.Component {

	constructor(props) {
		super(props);
		// sets preferences for colors if they are given otherwise it sets defaults
		this.color = props.color ? props.color : 'white';
		this.selectedColor = props.selectedColor ? props.selectedColor : 'grey';
		this.borderColor = props.borderColor ? props.borderColor : 'black';
		this.state = { selected: false };
	}

	_handleSelect = () => {
		var selected  = !this.state.selected;
		this.setState({ selected })
		if (this.props.onSelect) {
			this.props.onSelect(this.props.keyName);	// callback to parent component
		}
	}
	
	renderInnerBox = () => {
		var { edgeLength, keyName, children } = this.props;	// pulling edgeLength, keyName, and children out of the props
		var { selected } = this.state;
		return (
			<View
              key={'block'+keyName}
              style={{
              	width: edgeLength,
                height: edgeLength,
                backgroundColor: this.state.selected ? this.selectedColor : this.color,
                borderColor: this.borderColor,
                borderWidth: selected ? 0 : 0.5,
              }}
	        >
	        { children }
	        </View>
		);
	}

	render() {
		var { keyName, selectable } = this.props;
		if (selectable) {
			return (
				<TouchableOpacity
	                onPress={this._handleSelect}
	                key={'touch'+keyName}
	            >
		            {this.renderInnerBox()}
	            </TouchableOpacity>
			);
		} else {
			return this.renderInnerBox();
		}
		
	}
}
GridBox.propTypes = {
	keyName: PropTypes.string.isRequired,
	edgeLength: PropTypes.number.isRequired,
	selectable: PropTypes.bool,
	selectedColor: PropTypes.string,
	color: PropTypes.string,
	borderColor: PropTypes.string,
	onSelect: PropTypes.func,
}