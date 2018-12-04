import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import TouchGrid from '../components/TouchGrid';

import { palette } from '../constants/palette';
import ConstantStyles from '../constants/ConstantStyles';
import Layout from '../constants/Layout';

var DirtDiagonal = require('../assets/images/DirtDiagonal.png');
var PathBack = require('../assets/images/PathFull.png');

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      edit: true,
    };
  }

  _toggleEditMode = () => {
    this.setState({ edit: !this.state.edit });
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
              edit={this.state.edit}
              foreground={DirtDiagonal}
              background={PathBack}
            />}
          <TouchableOpacity
            onPress={this._toggleEditMode}
            style={{
              ...styles.editModeButton,
              backgroundColor: this.state.edit ? 'grey' : '#fff',
            }}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  activeContainer: {
    width: Layout.window.width,
    height: Layout.window.height-20, // the 20 is clockSpacer I think
    borderWidth: 5,
  },
  editModeButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 50,
    height: 50,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    ...ConstantStyles.shadow,
  },
});
