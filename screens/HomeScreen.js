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

import TouchGrid from '../components/TouchGrid';

export default class HomeScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    var numColumns = 10;
    var numRows = 10;
    this.boxSize = Math.trunc((Dimensions.get('window').width-10) / numColumns);  // rn the 10 is for borders
    this.state = {
      edit: false,
      numColumns,
      numRows, 
    };
  }

  getBoxWidth 

  _toggleEditMode = () => {
    this.setState({ edit: !this.state.edit });
  };

  _addRow = () => {
    this.setState({ numRows: this.state.numRows+1 });
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
          <ScrollView
          minimumZoomScale={0.75}  // zooming out
          maximumZoomScale={4}  // zooming in
          contentContainerStyle={{
            flexGrow : 1,
            justifyContent : 'center'
          }}
          centerContent
          >
            <TouchGrid
              numRows={this.state.numRows}
              numColumns={this.state.numColumns}
              boxEdgeLength={this.boxSize}
              edit={this.state.edit}
            />
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
  activeContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    borderWidth: 5,
  },
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
    borderWidth: 2,
    borderColor: 'black',
  },
  addRowContainer: {
    position: 'absolute',
    width: 150,
    height: 50,
    right: 80,
    bottom: 40,
  },
  addRowButton: {
    height: 50,
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: 'grey',
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
