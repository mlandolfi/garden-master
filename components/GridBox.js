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

	_handleGridSelect = () => {
		var selected  = !this.state.selected;
		this.setState({ selected })
		if (this.props.onSelect) {
			this.props.onSelect(this.props.keyName);	// callback to parent component
		}
	}

	getBorderProps = (borders) => {
		if (borders.length < 4)	return { borderWidth: 0.5 };
		return {
		    borderTopWidth: borders[0] ? 0.5 : 0,
            borderRightWidth: borders[1] ? 0.5 : 0,
            borderBottomWidth: borders[2] ? 0.5 : 0,
            borderLeftWidth: borders[3] ? 0.5 : 0,
		};
	}

	renderInnerBox = () => {
		var { edgeLength, keyName, children } = this.props;	// pulling edgeLength, keyName, and children out of the props
		var borders = this.props.borders ? this.props.borders : [];
		return (
			<View
              key={'block'+keyName}
              style={{
              	width: edgeLength,
                height: edgeLength,
                backgroundColor: this.state.selected ? this.selectedColor : this.color,
                borderColor: this.borderColor,
                ...this.getBorderProps(borders),	// destructure the borderProps
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
	                onPress={this._handleGridSelect}
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
	borders: PropTypes.array,	// borders = [top, right, bottom, left]; 1 for yes 0 for no
	selectedColor: PropTypes.string,
	color: PropTypes.string,
	borderColor: PropTypes.string,
	onSelect: PropTypes.func,
}