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
} from "react-native";
import { useGetDataQuery } from "../rtkQuery/getData";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const FirstScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const isClicked = useState(true);
  // const
  const searchRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const { data, isLoading, error } = useGetDataQuery();
  // console.log(_id);
  // console.log(data?.data?.map((item) => item._id));
  // const { data, isLoading, error } = useGetDataByIdQuery(_id);

  const filteredCourse = React.useMemo(() => {
    return (
      data?.data?.filter((el) =>
        el?.title?.toLowerCase()?.includes(search.toLocaleLowerCase())
      ) ?? []
    );
  }, [data, search]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{`Error: ${error}`}</Text>;
  }

  const DropDown = () => {
    const [isClicked2, setIsClicked2] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("Select Country");

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setIsClicked2(!isClicked2);
          }}
        >
          <View style={[styles.btncontainer, styles.oneline]}>
            <Text style={styles.btnText}> {selectedCountry}</Text>
            {isClicked2 ? <Text>Help</Text> : <Text>Help</Text>}
          </View>
        </TouchableOpacity>
        {isClicked2 ? (
          <View style={styles.dropdownArea}>
            <FlatList
              data={filteredCourse}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.countryItem2}
                    onPress={() => {
                      setSelectedCountry(item.location.name);
                      setIsClicked2(!isClicked2);
                    }}
                  >
                    <Text>{item.location.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };
  const DropDown1 = () => {
    const [isClicked3, setIsClicked3] = useState(false);
    const [selectedCountry1, setSelectedCountry1] = useState("Select Country");

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setIsClicked3(!isClicked3);
          }}
        >
          <View style={[styles.btncontainer, styles.oneline]}>
            <Text style={styles.btnText}> {selectedCountry1}</Text>
            {isClicked3 ? <Text>Help</Text> : <Text>Help</Text>}
          </View>
        </TouchableOpacity>
        {isClicked3 ? (
          <View style={styles.dropdownArea}>
            <FlatList
              data={filteredCourse}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.countryItem2}
                    onPress={() => {
                      setSelectedCountry1(item.subLocations[0].name);
                      setIsClicked3(!isClicked3);
                    }}
                  >
                    <Text>{item.subLocations[0].name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };
  const DropDown2 = () => {
    const [isClicked3, setIsClicked3] = useState(false);
    const [selectedCountry1, setSelectedCountry1] = useState("Select Country");

    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            setIsClicked3(!isClicked3);
          }}
        >
          <View style={[styles.btncontainer, styles.oneline]}>
            <Text style={styles.btnText}> {selectedCountry1}</Text>
            {isClicked3 ? <Text>Help</Text> : <Text>Help</Text>}
          </View>
        </TouchableOpacity>
        {isClicked3 ? (
          <View style={styles.dropdownArea}>
            <FlatList
              data={filteredCourse}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.countryItem2}
                    onPress={() => {
                      setSelectedCountry1(item.title);
                      setIsClicked3(!isClicked3);
                    }}
                  >
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    );
  };

  const FliterModal = () => {
    return (
      <Modal visible={showModal} transparent={true} animationType={"slide"}>
        <View style={styles.modal}>
          <TextInput placeholder="Search.." style={styles.searchInput} />
          <DropDown />
          <DropDown1 />
          <DropDown2 />
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
  };

  return (
    <View style={styles.screen}>
      <View style={{ backgroundColor: "white" }}>
        <StatusBar />
        <FliterModal />
        {isClicked ? (
          <View>
            <View style={[styles.searchInput, styles.oneline]}>
              <TextInput
                style={{ fontSize: 17 }}
                placeholder="Search.."
                value={search}
                ref={searchRef}
                onChangeText={(tet) => {
                  setSearch(tet);
                }}
              />
              <View style={{ flex: 1 }} />
              <TouchableOpacity onPress={() => setShowModal(true)}>
                <Image
                  source={require("../../assets/filter.png")}
                  style={{ height: 25, width: 25 }}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              scrollIndicatorInsets={false}
              nestedScrollEnabled={true}
              data={filteredCourse}
              keyExtractor={(item) => item._id.toString()}
              ListFooterComponent={<View style={{ height: 150 }} />}
              renderItem={({ item }) => {
                return (
                  <View>
                    <TouchableOpacity
                      style={styles.countryItem}
                      onPress={() =>
                        navigation.navigate("Detail", {
                          item,
                        })
                      }
                    >
                      {/* <Text>{JSON.stringify(item, null, 30)}</Text> */}
                      <View style={styles.cataloguesListsContainer}>
                        <View style={styles.oneline}>
                          <Image
                            source={{ uri: item.university.logo }}
                            style={{ height: 110, width: 110 }}
                          />
                          <View style={{ width: 20 }} />
                          <View
                            style={{
                              justifyContent: "space-between",
                              alignContent: "space-between",
                              flexShrink: 1,
                              paddingHorizontal: 10,
                            }}
                          >
                            <Text style={{ fontSize: 23, fontWeight: "500" }}>
                              {item.title}
                            </Text>
                            <Text style={{ color: "blue", fontSize: 18 }}>
                              {item.university.title}
                            </Text>
                            <View style={styles.oneline}>
                              <Text style={{ fontSize: 16 }}>
                                {item.location.name}{" "}
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                {item.subLocations.name}
                              </Text>
                            </View>
                            <View style={styles.oneline}>
                              <Text style={{ fontSize: 16 }}>
                                {item.years}{" "}
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                {item.level.name} Level
                              </Text>
                            </View>
                            <View style={styles.oneline}>
                              <Text style={{ fontSize: 18, color: "green" }}>
                                $ {item.tutionFee}{" "}
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                ({item.currency.code}){" "}
                              </Text>
                              <Text style={{ fontSize: 16 }}>
                                {item.feeType}
                              </Text>
                            </View>
                          </View>
                          {/* </ScrollView> */}
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};
export default FirstScreen;
const styles = StyleSheet.create({
  screen: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
  },
  modal: {
    height: 800,
    borderRadius: 4,
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
