import React from "react";
import { StyleSheet,  ActivityIndicator } from "react-native";

const LoadingIndicatorView =() => {
  return (
    <ActivityIndicator
      color='royalblue'
      size='large'
      style={styles.loadingIndicatorStyle}
    />
  )
}

const styles = StyleSheet.create({
  loadingIndicatorStyle: {
    flex: 1,
    justifyContent: 'center'
  }

});

export default LoadingIndicatorView;
