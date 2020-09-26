import React, { useState, useEffect } from "react";
import axios from "axios";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { WebView } from 'react-native-webview';
import LoadingIndicatorView from "../components/LoadingIndicatorView";
import NetInfo from "@react-native-community/netinfo";
import NetworkErrorMessage from "../components/NetworkErrorMessage";

const WebViewScreen = ({ navigation }) => {
  const [data, setData] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const url = navigation.state.params.url;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, []);

  useEffect(() => {
    const asyncFunc = async () => {
      console.log("running", url)
      try {
        const a = await axios({
          method: "get",
          url,
          maxRedirects: 0
        })
        setData(a.data);
      } catch (e) {
        console.log("error", e);
      }
    }
    asyncFunc();
  }, [])

  return (
    <>
      <TouchableOpacity 
        style={styles.buttonContainerStyle}
        onPress={() => navigation.popToTop()}
      >  
      <View style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Back to Home</Text>
        </View>
      </TouchableOpacity>
      {isConnected ?
        <WebView
          originWhitelist={['*']}
          source={{ html: data }}
          style={{ alignItems: "flex-start" }}
          renderLoading={LoadingIndicatorView}
          startInLoadingState={true}
          pullToRefreshEnabled
          overScrollMode={"never"}
          showsVerticalScrollIndicator={false}
          >
        </WebView> : <NetworkErrorMessage message={"Booking not confirmed. Please try again."}/>
      }
    </>
  );
};


const styles = StyleSheet.create({
  buttonContainerStyle: { 
    position: "absolute", 
    bottom: 10, 
    height: 50, 
    width: "100%", 
    justifyContent: "center", 
    alignItems: "center", 
    zIndex: 2 
  },
  buttonStyle: { 
    alignItems: "center", 
    flex: 1, width: "90%", 
    borderRadius: 50, 
    backgroundColor: "royalblue", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  buttonTextStyle: { 
    fontSize: 16, 
    color: "#FFF", 
    fontWeight: "700" 
  },
  leftArrowIconStyle: { 
    height: 20, 
    width: 20, 
    marginLeft: 10 
  }
});
  
WebViewScreen.navigationOptions = ({ navigation }) => {
  const leftArrowIcon = require("../../assets/left-arrow.png");
  return {
    title: "Confirmation",
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
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.popToTop()}>
        <Image source={leftArrowIcon} style={styles.leftArrowIconStyle} />
      </TouchableOpacity>
    ),
    headerRight: () => (<View />)
  }
}



  export default WebViewScreen;
  