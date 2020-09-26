import React from "react";
import { Text, StyleSheet, View } from "react-native";

const ListingCard = ({ name, level, status, capacity}) => {
  const statusColor = status === "Available" ? "green" : "#AAA";
  return (
    <View style={styles.listingCardContainerStyle}>
      <View style={styles.listingCardRowContainerStyle}>
        <Text style={styles.listingCardNameLabelStyle}>{name}</Text>
        <Text style={[ styles.listingCardStatusLabelStyle, { color: statusColor }]}>{status}</Text>
      </View>

      <View style={styles.listingCardRowContainerStyle}>
        <Text style={styles.listingCardLevelLabelStyle}>Level {level}</Text>
        <Text style={styles.listingCardCapacityLabelStyle}>{capacity} Pax</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listingCardContainerStyle: { 
    display: "flex", 
    backgroundColor: "#F5F5F5", 
    borderRadius: 6, 
    paddingHorizontal: 20, 
    paddingVertical: 15, 
    marginVertical: 4 
  },
  listingCardRowContainerStyle: { 
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "space-between"
  },
  listingCardNameLabelStyle: { 
    color: "#4f4f4f", 
    fontWeight: "700", 
    fontSize: 15 
  },
  listingCardStatusLabelStyle: {
    fontSize: 13, 
    fontStyle: "italic"
  },
  listingCardLevelLabelStyle: {
    fontSize: 13
  },
  listingCardCapacityLabelStyle: {
    fontSize: 13
  }
});

export default ListingCard;