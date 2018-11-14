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
    this.boxSize = Math.trunc(Dimensions.get('window').width / 20)
    var numRows = 20;
    var numColumns = 10;
    selected = new Array(numRows);
    for (i=0; i<numRows; i++)
      selected[i] = new Array(numColumns).fill(0);
    this.state = {
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

  render() {
    return (
      <View name='fullContainer'>
        <View
          name='clockSpacer'
          style={{
            display: 'block',
            height: 20,
            backgroundColor: 'grey',
          }}
        />
        <View
        style={{
          height: Dimensions.get('window').height,
          backgroundColor: 'darkgreen',
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
                    selectable
                    onSelect={this._handleGridSelect}
                    key={index.toString()}
                    keyName={index.toString()}
                    edgeLength={this.boxSize}
                  />
                );
              })}
            </View>
          </ScrollView>
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

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
