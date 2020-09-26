import React, { useState } from 'react';
import { Dimensions, View, Text, TouchableWithoutFeedback , StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SortCard from "../components/SortCard";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const FilterOverlay = ({
  value,
  setValue,
  setShowOverlay
}) => {
  const [currentOption, setCurrentOption] = useState(value);

  let options = [
    {label: 'Location', value: 0 },
    {label: 'Capacity', value: 1 },
    {label: 'Availability', value: 2 }
  ];

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setShowOverlay(false)}>
        <View style={styles.outsideOverlayStyle} />
      </TouchableWithoutFeedback>

      <View style={styles.overlayContainerStyle}>
        <View style={{ alignItems: "center"}}>
          <View style={styles.greyLineStyle}/>
          <Text style={styles.titleStyle}>Sort</Text>
          
          {options.map((option, idx) => {
            return (
              <SortCard 
                label={option.label}
                value={option.value}
                selected={currentOption == option.value}
                onPress={setCurrentOption}
                key={idx}
              />
            )
          })
          }
        </View>
        
        <View style={styles.buttonsContainerStyle}>
          <TouchableOpacity 
            style={styles.resetButtonStyle}
            onPress={() => { 
              setValue(null);
              setShowOverlay(false);
            }}
          >
            <Text style={styles.buttonTextStyle}>Reset</Text>
          </TouchableOpacity>
            
          <TouchableOpacity 
            style={styles.applyButtonStyle}
            onPress={() => {
              setValue(currentOption);
              setShowOverlay(false);
            }}
          >
            <Text style={styles.buttonTextStyle}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );  
}

const styles = StyleSheet.create({
  outsideOverlayStyle: { 
    position: "absolute", 
    width: SCREEN_WIDTH, 
    height: SCREEN_HEIGHT
  },
  overlayContainerStyle: {  
    position: "absolute", 
    bottom: 0, 
    height: SCREEN_HEIGHT * 0.8, 
    width:SCREEN_WIDTH, 
    backgroundColor: "#FFF", 
    zIndex: 3, borderRadius: 8, 
    alignItems: "center", 
    paddingVertical: 15, 
    justifyContent: "space-between", 
    elevation: 30 
  },
  greyLineStyle: { 
    width: 40, 
    borderColor: "#DDD", 
    borderTopWidth: 4, 
    borderStyle: "solid", 
    borderRadius: 2 
  },
  titleStyle: { 
    fontWeight: "700", 
    marginTop: 15, 
    fontSize: 15 
  },
  buttonsContainerStyle: { 
    width: SCREEN_WIDTH * 0.9, 
    height: 45,
    flexDirection: "row", 
    justifyContent: "space-between" 
  },
  resetButtonStyle: { 
    width: SCREEN_WIDTH * 0.25, 
    borderRadius: 50, 
    flex: 1, 
    flexDirection: "row", 
    backgroundColor: "#323941", 
    alignContent: "center", 
    justifyContent: "center"
  },
  buttonTextStyle: { 
    color: "#FFF", 
    fontWeight: "700", 
    textAlign: "center", 
    textAlignVertical: "center", 
    fontSize: 16 
  },
  applyButtonStyle: { 
    width: SCREEN_WIDTH * 0.6, 
    borderRadius: 50, 
    flex: 1, 
    flexDirection: "row", 
    backgroundColor: "royalblue", 
    alignContent: "center", 
    justifyContent: "center"
  }
});

export default FilterOverlay;