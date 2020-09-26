import React from "react";
import { Text, StyleSheet, View, Image} from "react-native";

const NetworkErrorMessage =({
  message = "Connect to the internet to continue."
}) => {
  const crossIcon = require("../../assets/cross.png");
  return (
    <View style={styles.networkErrorContainerStyle}>              
    <Image source={crossIcon} style={styles.crossIconStyle} />
    <Text style={styles.networkErrorTextStyle}>
      {`Internet unavailable!
      ${message}`}
    </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  networkErrorContainerStyle: { 
    alignItems: "center", 
    justifyContent: "center", 
    marginTop: 40 
  },
  crossIconStyle: { 
    width: 100, 
    height: 100
  },
  networkErrorTextStyle: { 
    fontSize: 16, 
    textAlignVertical: "center", 
    textAlign: "center", 
    marginTop: 20,
    fontWeight: "700"
  }
});

export default NetworkErrorMessage;
