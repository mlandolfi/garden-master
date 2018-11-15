import React from 'react';
import { Button } from 'react-native';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import GridBox from '../components/GridBox';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    var numColumns = 10;
    var screenRatio = Dimensions.get('window').height / Dimensions.get('window').width ;  // height / width
    var numRows = Math.trunc(screenRatio * numColumns);
    this.boxSize = Math.trunc(Dimensions.get('window').width / numColumns);
    selected = new Array(numRows);
    for (i=0; i<numRows; i++)
      selected[i] = new Array(numColumns).fill(0);
    this.state = {
      edit: false,
      selected,
      numColumns,
      numRows, 
    };
  }

  _handleGridSelect = (index) => {
    return
    newSelected = this.state.selected;
    var { numRows, numColumns } = this.state;
    newSelected[Math.trunc(index/numColumns)][index%numColumns] = (newSelected[Math.trunc(index/numColumns)][index%numColumns] == 0) ? 1 : 0;
    this.setState({
      ...this.state,
      selected: newSelected,
    });
  };

  _toggleEditMode = () => {
    this.setState({ ...this.state, edit: !this.state.edit });
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
        <View
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <ScrollView
          minimumZoomScale={1}
          maximumZoomScale={4}
          >
            <View
              style={{
                width:  Dimensions.get('window').width,
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'center',
                borderColor: 'black',
                borderWidth: Math.floor((Dimensions.get('window').width - (this.state.numColumns*this.boxSize))/2),
              }}
            >
              {Array.from(Array(this.state.numColumns*this.state.numRows).keys()).map((index) => {
                return (
                  <GridBox
                    selectable={this.state.edit}
                    onSelect={this._handleGridSelect}
                    key={index.toString()}
                    keyName={index.toString()}
                    edgeLength={this.boxSize}
                  />
                );
              })}
            </View>
          </ScrollView>
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
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

}

const styles = StyleSheet.create({
  editModeButtonContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
    right: 10,
    bottom: 40,
  },
  editModeButton: {
    height: 50,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: 'black',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
