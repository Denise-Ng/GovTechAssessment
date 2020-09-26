import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, Dimensions } from "react-native";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import NetInfo from "@react-native-community/netinfo";
import NetworkErrorMessage from "../components/NetworkErrorMessage";

const SCREEN_HEIGHT = Dimensions.get('window').height;
const QrCodeScannerScreen = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, []);
  return (
    <View style={styles.containerStyle}>
      {isConnected ? (
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={RNCamera.Constants.FlashMode.auto}
          topContent={
            <Text style={styles.headerTextStyle}>
              Scan the QR Code outside a room to book it!
            </Text>
          }
        />) : <NetworkErrorMessage />
      }
    </View>
  );

  function onSuccess(e) {
    console.log("e.data", e.data);
    return navigation.push('WebView', { url: e.data })
  }
};

const styles = StyleSheet.create({
  containerStyle: { 
    backgroundColor: "#FFF", 
    height: SCREEN_HEIGHT,
  },
  headerTextStyle: {
    fontSize: 20,
    marginHorizontal: 20,
  }
});
  
QrCodeScannerScreen.navigationOptions = {
  title: "Scan QR Code",
  headerStatusBarHeight: 0,
  headerStyle: {
    backgroundColor: '#FFF',
    elevation: 0,
    shadowOpacity: 0, 
    borderBottomWidth: 0, 
    height: 40
  },
  headerTitleStyle: { 
    alignSelf:"center", 
    textAlign: "center",
    flex: 1,
    fontWeight: "600",
    fontSize: 16
},
  headerTintColor: '#000',
  headerRight: () => (<View />)
}

export default QrCodeScannerScreen;
