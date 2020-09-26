import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const SCREEN_WIDTH = Dimensions.get("window").width;

const SortCard = ({ label, value, selected, onPress }) => {
  const buttonColor = selected ? "#AAA" : "#FFF";
  return (
    <View style={styles.sortCardContainerStyle}>
      <Text style={styles.sortCardLabelStyle}>{label}</Text>
      <TouchableOpacity style={[styles.sortCardButtonStyle, { backgroundColor: buttonColor }]} 
        onPress={() => onPress(value)} />
    </View>
  );
}

const styles = StyleSheet.create({
  sortCardContainerStyle: {  
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 10, 
    paddingVertical: 15, 
    width: SCREEN_WIDTH * 0.9
  },
  sortCardLabelStyle: { 
    fontSize: 15 
  },
  sortCardButtonStyle: { 
    height: 18, 
    width: 18, 
    borderRadius: 10, 
    borderColor: "#AAA", 
    borderStyle: "solid", 
    borderWidth: 3, 
  }
});

export default SortCard;