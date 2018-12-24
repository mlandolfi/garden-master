import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import BoxTypeSelect from '../components/BoxTypeSelect';
import MainGrid from '../components/MainGrid';
import NewPlantSelect from '../components/NewPlantSelect';

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
      newPlantUI: false,
    };
  }

  toggleNewPlantUI = () => {
    this.setState({ newPlantUI: !this.state.newPlantUI })
  }

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
          <MainGrid />
          {this.state.newPlantUI &&
            <NewPlantSelect />
          }
          <TouchableOpacity
            style={styles.newPlantButton}
            onPress={this.toggleNewPlantUI}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  newPlantButton: {
    position: 'absolute',
    right: 20,
    top: 80,
    width: 50,
    height: 50,
    backgroundColor: 'limegreen',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
  },
});
