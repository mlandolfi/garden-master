import React from 'react';
import { Button } from 'react-native';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Layout from '../constants/Layout';

import TouchGrid from '../components/TouchGrid';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    var numColumns = 10;
    var numRows = 10;
    this.state = {
      edit: false,
      showGrid: true,
      numColumns,
      numRows, 
      boxSize: Math.trunc((Layout.window.width-10) / numColumns),
    };
  }

  _toggleEditMode = () => {
    this.setState({ edit: !this.state.edit });
  };

  _addRow = () => {
    this.setState({ numRows: this.state.numRows+1 });
  };

  _addColumn = () => {
    this.setState({
      numColumns: this.state.numColumns+1,
      boxSize: Math.trunc((Layout.window.width-10) / (this.state.numColumns+1)),
    });
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
            <TouchGrid
              numRows={this.state.numRows}
              numColumns={this.state.numColumns}
              boxEdgeLength={this.state.boxSize}
              edit={this.state.edit}
            />
          <TouchableOpacity
            onPress={this._toggleEditMode}
            style={styles.editModeButtonContainer}
          >
            <View
            name='editModeButton'
            style={{
              ...styles.editModeButton,
              backgroundColor: this.state.edit ? 'grey' : 'white',
            }}
            />
          </TouchableOpacity>
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
  editModeButtonContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 10,
    bottom: 10,
  },
  editModeButton: {
    height: 50,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: 'black',
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
    backgroundColor: 'grey',
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
    backgroundColor: 'grey',
  }
});
