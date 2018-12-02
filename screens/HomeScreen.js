import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import TouchGrid from '../components/TouchGrid';

import { palette } from '../constants/palette';
import { constantStyles } from '../constants/constantStyles';
import Layout from '../constants/Layout';

var DirtDiagonal = require('../assets/images/DirtDiagonal50.png');
var PathBack = require('../assets/images/pathBack.png');

var tempBox = {
  // foreground: DirtDiagonal,
  // background: PathBack,
};

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    var numColumns = 5;
    var numRows = 5;
    this.materials = {
      soil: palette.secondary.main,
      grass: palette.primary.light,
      path: palette.trevsMix.blueshine,
    };
    this.state = {
      edit: false,
      boxesArray: this.buildBoxesArray(numRows, numColumns),
      boxSize: Math.trunc((Layout.window.width-10) / numColumns),
      currentMaterial: "soil",
    };
  }

  buildBoxesArray = (numRows, numColumns) => {
    let arrayToReturn = [];
    for (let i=0; i<numRows; i++) {
      arrayToReturn.push([])
      for (let j=0; j<numColumns; j++)
        arrayToReturn[i].push({
          ...tempBox,
          index: i.toString() + j.toString(),
        });
    }
    return arrayToReturn;
  };

  _toggleEditMode = () => {
    this.setState({ edit: !this.state.edit });
  };

  _addRow = () => {
    let temp = [];
    for (let i=0; i<this.state.boxesArray.length; i++)
      temp.push(this.state.boxesArray[i].slice());
    temp.push([]);
    for (let i=0; i<temp[0].length; i++)
      temp[temp.length-1].push({
        ...tempBox,
        index: temp.length.toString() + i.toString(),
      });
    this.setState({ boxesArray: temp });
  };

  _addColumn = () => {
    let temp = []
    for (let i=0; i<this.state.boxesArray.length; i++) {
      temp.push(this.state.boxesArray[i].slice());
      temp[i].push({
        ...tempBox,
        index: i.toString() + temp[i].length.toString(),
      });
    }
    this.setState({
      boxesArray: temp,
      boxSize: Math.trunc((Layout.window.width-10) / temp[0].length),
    });
  };

  _handleMaterialSelect = (type) => {
    if (!type)  return;
    console.log(type);
    this.setState({ currentMaterial: type });
  };

  render() {
    return (
      <View name='fullContainer'>
        <View
          name='clockSpacer'
          style={{
            display: 'block',
            height: 20,
          }}
        />
        <View style={styles.activeContainer} > 
          {true &&
            <TouchGrid
              boxEdgeLength={this.state.boxSize}
              boxesArray={this.state.boxesArray}
              edit={this.state.edit}
              selectFill={this.materials[this.state.currentMaterial]}
            />}
          <TouchableOpacity
            onPress={this._toggleEditMode}
            style={{
              ...styles.editModeButton,
              backgroundColor: this.state.edit ? 'grey' : '#fff',
            }}
          />
          {this.state.edit &&
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
          {this.state.edit &&
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
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  activeContainer: {
    width: Layout.window.width,
    height: Layout.window.height-20, // the 20 is weird shit Lando can explain
    borderWidth: 5,
  },
  editModeButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
    ...constantStyles.shadow,
  },
  materialsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    top: 10,
  },
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
