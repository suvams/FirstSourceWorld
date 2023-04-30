import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList,
  Text,
} from "react-native";
const dropdownData = [
  {
    id: "1",
    locations: [
      {
        name: "AU",
      },
    ],
    subLocations: [
      {
        name: "AU",
      },
    ],
    title: [
      {
        name: "AU",
      },
    ],
  },
  {
    id: "1",
    locations: [
      {
        name: "AU",
      },
    ],
    subLocations: [
      {
        name: "AU",
      },
    ],
    title: [
      {
        name: "AU",
      },
    ],
  },
];

const DropdownScreen = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [data, setData] = useState(dropdownData);
  const [selectedCountry, setSelectedCountry] = useState("Select Country");

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => {
          setIsClicked(!isClicked);
        }}
      >
        <View style={[styles.btncontainer, styles.oneLine]}>
          <Text style={styles.btnText}> {selectedCountry}</Text>
          {isClicked ? <Text>Help</Text> : <Text>Help</Text>}
        </View>
      </TouchableOpacity>
      {isClicked ? (
        <View style={styles.dropdownArea}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.countryItem}
                  onPress={() => {
                    setSelectedCountry(item.category);
                    setIsClicked(!isClicked);
                  }}
                >
                  <Text>{item.category}</Text>
                </TouchableOpacity>
              );
            }}
            s
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
};
export default DropdownScreen;
const styles = StyleSheet.create({
  btncontainer: {
    backgroundColor: "white",
    borderWidth: 0.9,
    height: 50,
    marginLeft: 50,
    marginRight: 50,
    padding: 15,
    borderRadius: 8,
    justifyContent: "space-between",
    marginTop: 30,
  },
  btnText: {
    color: "black",
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  textStyle: {
    fontSize: 20,
    color: "black",
  },
  oneLine: {
    flexDirection: "row",
  },
  dropdownArea: {
    width: "70%",
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#fff",
    elevation: 5,
    alignSelf: "center",
  },
  searchInput: {
    width: "90%",
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 20,
    paddingLeft: 15,
  },
  countryItem: {
    width: "70%",
    height: 50,
    borderBottomWidth: 0.9,
    borderBottomColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center",
  },
});
