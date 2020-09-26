import React from 'react';
import { createAppContainer  } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from "./src/screens/HomeScreen";
import QrCodeScannerScreen from './src/screens/QrCodeScannerScreen';
import WebViewScreen from './src/screens/WebViewScreen';

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    QrCodeScanner: QrCodeScannerScreen,
    WebView: WebViewScreen

  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        // backgroundColor: '#FFF',
        // elevation: 0, //for android
        // shadowOpacity: 0, //for ios
        // borderBottomWidth: 0, //for ios
      }
    }
  }
);

const AppContainer = createAppContainer(navigator);


const App = () => {
  return (
    <AppContainer />
  );
};

export default App;
