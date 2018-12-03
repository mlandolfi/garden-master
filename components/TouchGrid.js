import React from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import DisplayGrid from './DisplayGrid';
import PressGrid from './PressGrid';

import { palette } from '../constants/palette';
import { constantStyles } from '../constants/constantStyles';
import Layout from '../constants/Layout';

export default class TouchGrid extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			boxEdgeLength: Math.trunc((Layout.window.width-10) / 10),
			boxesArray: this.buildBoxesArray(10,10),
		}
	}

  	// For debugging
	printBoxesArray = () => {
	    let temp = ""
	    let { boxesArray } = this.state;
	    console.log("boxesArray" + boxesArray)
	    for (let i=0; i<boxesArray.length; i++) {
	      for (let j=0; j<boxesArray[i].length; j++) {
	        temp += "--" + boxesArray[i][j].index;
	      }
	      temp += "\n";
	    }
	    console.log(temp);
	}

	buildBoxesArray = (numRows, numColumns) => {
	    let arrayToReturn = [];
	    for (let i=0; i<numRows; i++) {
	      arrayToReturn.push([])
	      for (let j=0; j<numColumns; j++)
	        arrayToReturn[i].push({
	          index: i.toString() + "#" + j.toString(),
	        });
	    }
	    return arrayToReturn;
  	};

  	_addRow = () => {
	    let temp = [];
	    for (let i=0; i<this.state.boxesArray.length; i++)
	      temp.push(this.state.boxesArray[i].slice());
	    temp.push([]);
	    for (let i=0; i<temp[0].length; i++)
	      temp[temp.length-1].push({
	        index: (temp.length-1).toString() + "#" + i.toString(),
	      });
	    this.setState({ boxesArray: temp });
  	};

	_addColumn = () => {
	    let temp = []
	    for (let i=0; i<this.state.boxesArray.length; i++) {
	      temp.push(this.state.boxesArray[i].slice());
	      temp[i].push({
	        index: i.toString() + "#" + temp[i].length.toString(),
	      });
	    }
	    this.setState({
	      boxesArray: temp,
	      boxEdgeLength: Math.trunc((Layout.window.width-20) / temp[0].length), // this line is broken
	    });
	};

	_handleBoxPress = (indexKey) => {
	    let newBox = {
	      foreground: this.props.foreground,
	      background: this.props.background,
	    };
	    let temp = [];
	    for (let i=0; i<this.state.boxesArray.length; i++)
	      temp.push(this.state.boxesArray[i].slice());
	    rowIndex = parseInt(indexKey.split("#")[0])
	    columnIndex = parseInt(indexKey.split("#")[1])
	    temp[rowIndex][columnIndex] = {
	      ...temp[rowIndex][columnIndex],
	      ...newBox,
	    }
	    this.setState({ boxesArray: temp });
	}

	render() {
		let { edit } = this.props;
		let { boxesArray, boxEdgeLength } = this.state;
		return (
			<ScrollView
	          maximumZoomScale={4}  // zooming in
	          contentContainerStyle={{
	          	flexGrow: 1,
	            justifyContent : 'center',
	            flexWrap: 'wrap',
	            width: boxesArray[0].length * boxEdgeLength + 10,	// the 10 accounts for the border
	          }}
	          centerContent
	        >
	        	<DisplayGrid
	        		boxesArray={boxesArray}
	        		boxEdgeLength={boxEdgeLength}
	        	/>
	        	{edit &&
	        		<PressGrid
		        		boxesArray={boxesArray}
		        		boxEdgeLength={boxEdgeLength}
		        		onPress={this._handleBoxPress}
	        		/>
	        	}
	        	{edit &&
		            <TouchableOpacity
		              style={styles.addRowContainer}
		              onPress={this._addRow}
		            >
		              <View
		                name='addRowButton'
		                style={styles.addRowButton}
		              />
		            </TouchableOpacity>
		        }
		        {edit &&
		            <TouchableOpacity
		              style={styles.addColumnContainer}
		              onPress={this._addColumn}
		            >
		              <View
		                name='addColumnButton'
		                style={styles.addColumnButton}
		              />
		            </TouchableOpacity>
		        }
            </ScrollView>
		);
	}
}
TouchGrid.propTypes = {
	edit: PropTypes.bool,
}

const styles = StyleSheet.create({
  addRowContainer: {
    position: 'absolute',
    width: 150,
    height: 50,
    right: 70,
    bottom: 10,
  },
  addRowButton: {
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#fff',
    ...constantStyles.shadow,
  },
  addColumnContainer: {
    position: 'absolute',
    width: 50,
    height: 150,
    right: 10,
    bottom: 70,
  },
  addColumnButton: {
    height: 150,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#fff',
    ...constantStyles.shadow,
  }
});