import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
  Modal,
  Button,
  StatusBar,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useGetDataQuery } from "../rtkQuery/getData";
import { Picker } from "@react-native-picker/picker";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

class FliterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }
  show = () => {
    this.setState({ show: true });
  };
  close = () => {
    this.setState({ show: false });
  };
  render() {
    const { data, isLoading, error } = useGetDataQuery();

    let { show } = this.state;
    return (
      <Modal visible={show} transparent={true} animationType={"slide"}>
        <View style={styles.modal}>
          <TextInput placeholder="Search.." style={styles.searchInput} />
          <Picker
            selectedValue={selectedLocation}
            style={styles.btncontainer}
            onValueChange={(itemValue) => {
              setSelectedLocation(itemValue);
              setSelectedSubLocation(null);
              setSelectedTitle(null);
            }}
          >
            <Picker.Item label="Select Location" value={null} />
            {location.map((item) => (
              <Picker.Item label={item} value={item} key={item} />
            ))}
          </Picker>
          {selectedLocation && (
            <Picker
              selectedValue={selectedSubLocation}
              style={styles.btncontainer}
              onValueChange={(itemValue) => {
                setSelectedSubLocation(itemValue);
                setSelectedTitle(null);
              }}
            >
              <Picker.Item label="Select SubLocation" value={null} />
              {subLocations.map((item) => (
                <Picker.Item label={item} value={item} key={item} />
              ))}
            </Picker>
          )}
          {selectedSubLocation && (
            <Picker
              selectedValue={selectedTitle}
              style={styles.btncontainer}
              onValueChange={(itemValue) => setSelectedTitle(itemValue)}
            >
              <Picker.Item label="Select Title" value={null} />
              {titles.map((item) => (
                <Picker.Item label={item} value={item} key={item} />
              ))}
            </Picker>
          )}
          <Text style={{ marginLeft: 25, marginTop: 10 }}>Tuition Fee</Text>
          <View style={[styles.oneline, { justifyContent: "center" }]}>
            <TextInput placeholder="0" style={styles.searchInput1} />
            <Text>-as</Text>
            <TextInput placeholder="100000" style={styles.searchInput1} />
          </View>
          <View style={[styles.oneline, { margin: 25 }]}>
            <View style={{ flex: 1 }} />
            <Button
              title="Filter"
              color="black"
              onPress={() => setShowModal(false)}
            />
            <View style={{ flex: 1 }} />
            <Button
              title="Cancel"
              color="black"
              onPress={() => setShowModal(false)}
            />
            <View style={{ flex: 1 }} />
          </View>
          <Text style={{ marginLeft: 25, marginTop: 10 }}>Payment Per</Text>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
  },
  modal: {
    height: 800,
    borderRadius: 20,
    marginTop: 300,
    backgroundColor: "white",
    elevation: 10,
  },
  searchInput: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 10,
    padding: 15,
    fontSize: 17,
  },
  btncontainer: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 10,
    padding: 15,
    fontSize: 17,
    justifyContent: "space-between",
    marginTop: 15,
  },
  searchInput1: {
    width: "40%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 20,
    paddingLeft: 15,
    fontSize: 17,
  },
  cataloguesListsContainer: {
    width: "90%",
    marginLeft: 20,
    marginTop: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
  },
  oneline: {
    flexDirection: "row",
  },

  btnText: {
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 16,
  },
  textStyle: {
    fontSize: 20,
    color: "black",
  },
  dropdownArea: {
    width: "90%",
    height: 300,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
  },
  countryItem2: {
    width: "90%",
    height: 50,
    borderBottomWidth: 0.9,
    borderBottomColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center",
  },
});
export default FliterModal;
