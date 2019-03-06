import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { Fab, Icon } from 'native-base';
import { createStore } from 'redux';
import RootReducer from './RootReducer'
import INITIAL_STATE from './InitialState'
import { AppLoading, Asset, Font, Icon as ExpoIcon } from 'expo';
import AppNavigator from './navigation/AppNavigator';

import Palette from './constants/palette';
import Layout from './constants/Layout';

const store = createStore(RootReducer, INITIAL_STATE);	// creates the redux store from the reducer

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
      	<Provider store={store}>
	        <View style={styles.container}>
	          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              <AppNavigator />
	        </View>
        </Provider>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...ExpoIcon.Ionicons.font,
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuContainer: {
    width: '100%',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 6, height: 8 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    backgroundColor: '#fff',
  },
  fab: {
    backgroundColor: Palette.primary.dark,
  },
  upperFabContainer: {
    top: Layout.window.height - Layout.window.squareHeight + 20,
  }
});
