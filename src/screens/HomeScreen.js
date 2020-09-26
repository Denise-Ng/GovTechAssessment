import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, SafeAreaView, FlatList, StatusBar } from "react-native";
import RNDateTimePicker from '@react-native-community/datetimepicker';
import NetInfo from "@react-native-community/netinfo";
import dayjs from "dayjs";
import advancedFormat from 'dayjs/plugin/advancedFormat';
import axios from 'axios';
import FilterOverlay from '../components/FilterOverlay';
import LoadingIndicatorView from "../components/LoadingIndicatorView";
import NetworkErrorMessage from "../components/NetworkErrorMessage";
import ListingCard from "../components/ListingCard";

const HomeScreen = ({ navigation }) => {
  dayjs.extend(advancedFormat);
  let CurrentTime = (new Date());

  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [roomList, setRoomList] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [showSortOverlay, setShowSortOverlay] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const sortIcon = require("../../assets/sort.png");
  const time = dayjs(date).format("HH:mm");

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
      axios.get('https://gist.githubusercontent.com/yuhong90/7ff8d4ebad6f759fcc10cc6abdda85cf/raw/463627e7d2c7ac31070ef409d29ed3439f7406f6/room-availability.json')
        .then(res => {
          setRoomList(res.data);
        });
      setIsLoading(false);
  }, []);

  useEffect(() => {
    let currentHour = CurrentTime.getHours();
    let currentMinute = CurrentTime.getMinutes();
    let newDate = new Date();

    newDate.setHours(currentHour);
    if(currentMinute >= 30) {
      setDate(newDate.setMinutes(30));
    } else {
      setDate(newDate.setMinutes(0));
    }
  }, []);

  useEffect(() => {
      const newRoomList = JSON.parse(JSON.stringify(roomList));
      if(newRoomList.length != 0) {
        switch(sortBy) {
        case 0:
          newRoomList.sort((a, b) => a.level - b.level);
          break;
        case 1:
          newRoomList.sort((a, b) => a.capacity - b.capacity);
          break;
        case 2:
          newRoomList.sort((a, b) => b.availability[time] - a.availability[time]);
          break;
        default:
          break;
        }
        setRoomList(newRoomList)  
      }
  }, [sortBy, date]);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <StatusBar  style={{backgroundColor: "#FFF"}}/>
      <View style={styles.dateTimeInputContainerStyle}>
        <Text style={styles.labelTextStyle}>Date</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <Text>{dayjs(date).format("Do MMM YYYY")}</Text>
        </TouchableOpacity>
        {mode === "date" && show && (
          <RNDateTimePicker
            value={date}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onChange}
            minuteInterval={30}
            minimumDate={CurrentTime}
          />
        )}
      </View>

      <View style={styles.dateTimeInputContainerStyle}>
        <Text style={styles.labelTextStyle}>Timeslot</Text>
        <TouchableOpacity onPress={showTimepicker}>
          <Text>{dayjs(date).format("h:mm A")}</Text>
        </TouchableOpacity>
        {mode === "time" && show && (
          <RNDateTimePicker
            value={date}
            mode={"time"}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
            minuteInterval={30}
            minimumDate={CurrentTime}
          />
        )}
      </View>
      

      {isConnected ? (
        <>
          <View style={styles.roomListHeaderContainerStyle}>
            <Text style={styles.labelTextStyle}>Rooms</Text>

            <TouchableOpacity 
              style={styles.sortButtonContainerStyle} 
              onPress ={() => { setShowSortOverlay(true) }} 
            >
              <Text style={styles.sortButtonTextStyle}>Sort</Text>
              <Image source={sortIcon} style={styles.sortButtonIconStyle} />
            </TouchableOpacity>
          </View>

          {isLoading ? <LoadingIndicatorView /> : (
            <FlatList
              data={roomList}
              extraData={time}
              keyExtractor={item => item.name}
              renderItem={({ item, index }) => {
                return (
                  <ListingCard
                    key={index}
                    name={item.name}
                    level={item.level}
                    status={isRoomAvailable(item.availability, time)}
                    capacity={item.capacity}
                  />
                )
              }
              }
            />
          )}

          {showSortOverlay && (
            <FilterOverlay 
            value={sortBy}
            setValue={setSortBy}
            setShowOverlay={setShowSortOverlay}
            />
          )}
        </>
      ): <NetworkErrorMessage /> 
      }

    </SafeAreaView>
  );

  function onChange (event, selectedDate) {
    setShow(false);
    if(event.type == "dismissed") {
      setDate(date);
    } else {
    setDate(selectedDate);
    }
  };

  function showMode (currentMode) {
    setShow(true);
    setMode(currentMode);
  };

  function showDatepicker() {
    showMode('date');
  };

  function showTimepicker(){
    showMode('time');
  };

  function isRoomAvailable(availability, time) {
    return availability[time] == 1 ? "Available" : "Not Available";
  } 

};
  
HomeScreen.navigationOptions = ({ navigation }) => {
  const cameraIcon = require("../../assets/camera.png");
  return {
    title: "Book a Room",
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
      fontWeight: "600",
      fontSize: 16,
      color: "#000"
  },
    headerTintColor: '#000',
    headerLeft: () => (<View />),
    headerRight: () =>  (
      <TouchableOpacity onPress={() => {
        return navigation.push('QrCodeScanner')
        }}>
        <Image source={cameraIcon} style={styles.headerCameraIconStyle} />
      </TouchableOpacity>
    )
  };
}

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "#FFF", 
    padding: 20, 
    flex: 1
  },
  dateTimeInputContainerStyle: { 
    display: 'flex', 
    borderStyle: 'solid', 
    borderColor: "#DDD", 
    borderBottomWidth: 1, 
    marginBottom: 20
  },
  labelTextStyle : { 
    color: "#AAA", 
    fontSize: 12 
  },
  roomListHeaderContainerStyle: { 
    display: "flex", 
    justifyContent: "space-between", 
    flexDirection: "row", 
    marginBottom: 3 
  },
  sortButtonContainerStyle: { 
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center"
  },
  sortButtonTextStyle: { 
    fontSize: 12, 
    fontWeight: "700", 
    color: "#000" 
  },
  sortButtonIconStyle: { 
    height: 15, 
    width: 15, 
    marginLeft: 2 
  },
  headerCameraIconStyle: { 
    height: 20, 
    width: 20, 
    marginRight: 10 
  }
});

export default HomeScreen;
  