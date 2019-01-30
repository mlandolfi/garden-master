import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import BoxTypeSelect from '../components/BoxTypeSelect';
import MainGrid from '../containers/MainGrid';
import GardenIndex from '../components/GardenIndex';
import ShapeFocus from '../components/ShapeFocus';
import Shape from '../components/Shape';

import Palette from '../constants/palette';
import ConstantStyles from '../constants/ConstantStyles';
import Layout from '../constants/Layout';

let shape = new Shape(0, 0, 6, 4);

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { focusedShape: null };
  }

  static navigationOptions = {
    header: null,
  };

  _handleShapeFocus = (shape) => {
    if (shape) {
      this.setState({
        focusedShape: shape,
      });
    } else {
      this.setState({ focusedShape: null })
    }
    
  }

  render() {
    return (
      <View name='fullContainer'>
        <View style={styles.activeContainer} > 
          <MainGrid />
          {false && <GardenIndex />}
          {this.state.focusedShape &&
            <ShapeFocus
              shape={this.state.focusedShape}
              closeShapeFocus={this._handleShapeFocus}
            />
          }
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  activeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.primary.main,
  },
});
