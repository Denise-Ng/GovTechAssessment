import { createAppContainer } from 'react-navigation';
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
  }
);

const App = createAppContainer(navigator);

export default App;
