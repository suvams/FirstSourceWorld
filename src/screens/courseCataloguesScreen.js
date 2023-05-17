import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  Text,
  Modal,
  StatusBar,
  Image,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Animated,
  RefreshControl,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  useGetCourseCataloguesDataQuery,
  useGetCourseCataloguesFeeRangeDataQuery,
  useLazyGetCourseCataloguesDataQuery,
  useLazyGetCourseCataloguesFeeRangeDataQuery,
  useLazyGetSearchAllFilterDataQuery,
  useGetAllCourseCataloguesDataQuery,
} from "../rtkQuery/courseCatalogueSlice";
import {
  useGetGlobalListDataQuery,
  useLazyGetGlobalListDataQuery,
} from "../rtkQuery/globalListSlice";
import { useLazyGetUniversityListDataQuery } from "../rtkQuery/universityListSlice";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const CourseCataloguesScreen = React.memo(({ navigation }) => {
  const [search, setSearch] = useState("");
  // const searchRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSubLocation, setSelectedSubLocation] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedValue1, setSelectedValue1] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState(null);
  const [selectedValue4, setSelectedValue4] = useState(null);
  const [selectedValue5, setSelectedValue5] = useState(null);
  const [selectedValue6, setSelectedValue6] = useState(null);
  const [selectedValue7, setSelectedValue7] = useState(null);

  // RTK Query

  const [
    lazyCourseCatalogues,
    { data, isLoading, isFetching, error, refetch },
  ] = useLazyGetCourseCataloguesDataQuery();

  const { data: locations, isLoading: loadingLocations } =
    useGetGlobalListDataQuery({
      type: "Locations",
      includeChildren: true,
      status: "Active",
    });

  const [lazyFetchSubLocactions] = useLazyGetGlobalListDataQuery();

  const [lazyFetchTitles] = useLazyGetUniversityListDataQuery();

  const filteredCourse = React.useMemo(() => {
    return (
      data?.data?.filter((el) =>
        el?.title?.toLowerCase()?.includes(search.toLocaleLowerCase())
      ) ?? []
    );
  }, [data, search]);

  const handleSearchCourses = async (queryParams) => {
    setShowModal(false);

    await lazyCourseCatalogues({ ...queryParams }).unwrap();
  };

  React.useEffect(() => {
    if (!selectedLocation) return;

    const handleFetchLocalUniversitieTitle = async (locationId) => {
      await lazyFetchTitles(locationId).unwrap();
    };

    const handleFetchSubLocations = async (location) => {
      const locations = { name: location.name, _id: location._id };
      await lazyFetchSubLocactions({
        type: locations,
        includeChildren: true,
        status: "Active",
      }).unwrap();
    };

    handleFetchSubLocations(selectedLocation?.name);
    handleFetchLocalUniversitieTitle(selectedLocation?._id);
  }, [selectedLocation]);

  React.useEffect(() => {
    lazyCourseCatalogues().unwrap();
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text>An error occurred: {error.message}</Text>
      </View>
    );
  }

  const handleRefresh = () => {
    setRefreshing(true) ? isFetching() : setRefreshing(false);
  };

  const handleSelectValue1 = (value) => {
    setSelectedValue1(value);
  };

  const handleSelectValue3 = (value) => {
    setSelectedValue3(value);
  };
  const handleSelectValue4 = (value) => {
    setSelectedValue4(value);
  };

  const handleSelectValue5 = (value) => {
    setSelectedValue5(value);
  };
  const handleSelectValue6 = (value) => {
    setSelectedValue6(value);
  };

  const handleSelectValue2 = (value) => {
    setSelectedValue2(value);
  };
  const handleSelectValue7 = (value) => {
    setSelectedValue7(value);
  };

  return (
    <View style={[styles.screen]}>
      <View
        style={{
          ...(showModal && {
            backgroundColor: "black",
            opacity: 0.3,
            zIndex: 2,
          }),
        }}
      >
        <StatusBar />
        <FliterModal
          showModal={showModal}
          setShowModal={setShowModal}
          onSearch={handleSearchCourses}
          selectedValue1={selectedValue1}
          selectedValue2={selectedValue2}
          selectedValue3={selectedValue3}
          selectedValue4={selectedValue4}
          selectedValue5={selectedValue5}
          selectedValue6={selectedValue6}
          selectedValue7={selectedValue7}
          onSelectValue1={handleSelectValue1}
          onSelectValue2={handleSelectValue2}
          onSelectValue3={handleSelectValue3}
          onSelectValue4={handleSelectValue4}
          onSelectValue5={handleSelectValue5}
          onSelectValue6={handleSelectValue6}
          onSelectValue7={handleSelectValue7}
        />
        <View style={[styles.searchInput, styles.oneline]}>
          <TextInput
            style={{ fontSize: 17 }}
            placeholder="Search.."
            value={search}
            // ref={searchRef}
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
        <View style={{ marginLeft: 15, marginTop: 10 }}>
          <View>
            {!!selectedValue1 ||
            !!selectedValue2 ||
            !!selectedValue3 ||
            !!selectedValue5 ||
            !!selectedValue4 ||
            !!selectedValue6 ||
            !!selectedValue7 ? (
              <Text style={styles.text1}>You Filter The Folllowing: </Text>
            ) : null}
            <View style={styles.oneline}>
              {!!selectedValue1 && (
                <View style={styles.oneline}>
                  <Text style={styles.text}>Location:</Text>
                  <Text style={styles.text1}>{selectedValue1}</Text>
                </View>
              )}
              <View style={{ flex: 1 }} />
              {!!selectedValue2 && (
                <View style={styles.oneline}>
                  <Text style={styles.text}>Sub Location:</Text>
                  <Text style={styles.text1}>{selectedValue2}</Text>
                </View>
              )}
            </View>
            {!!selectedValue3 && (
              <View style={styles.oneline}>
                <Text style={styles.text}>Course Title:</Text>
                <Text style={styles.text1}>{selectedValue3}</Text>
              </View>
            )}
            <View style={styles.oneline}>
              {!!selectedValue5 && (
                <View style={styles.oneline}>
                  <Text style={styles.text}>Fee Type:</Text>
                  <Text style={styles.text1}>{selectedValue5}</Text>
                </View>
              )}
              <View style={{ flex: 1 }} />
              {!!selectedValue4 && (
                <View style={styles.oneline}>
                  <Text style={styles.text}>Course Level:</Text>
                  <Text style={styles.text1}>{selectedValue4}</Text>
                </View>
              )}
            </View>
            <View style={styles.oneline}>
              {!!selectedValue6 && !!selectedValue7 && (
                <View style={styles.oneline}>
                  <Text style={styles.text}>Fee Cost Range:</Text>
                  <Text style={styles.text1}>
                    {selectedValue6}-{selectedValue7}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {!isLoading && !isFetching ? (
          data?.data?.length ? (
            <View>
              <Text
                style={{
                  paddingHorizontal: 20,
                  paddingTop: 15,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {data.totalItems} results found!
              </Text>
              {filteredCourse.length > 0 ? (
                <FlatList
                  scrollIndicatorInsets={false}
                  nestedScrollEnabled={true}
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={handleRefresh}
                    />
                  }
                  data={filteredCourse}
                  keyExtractor={(item) => item?._id.toString()}
                  renderItem={({ item }) => {
                    return (
                      <View>
                        <Text style={{ color: "black" }}>
                          {item?.totalItems}
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("Detail", {
                              item,
                            })
                          }
                        >
                          {/* <Text>{JSON.stringify(data, null, 30)}</Text> */}
                          <View style={styles.cataloguesListsContainer}>
                            <View style={styles.oneline}>
                              <Image
                                source={{ uri: item?.university?.logo }}
                                style={{ height: 110, width: 110, zIndex: 1 }}
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
                                <Text
                                  style={{ fontSize: 23, fontWeight: "500" }}
                                >
                                  {item?.title}
                                </Text>
                                <Text style={{ color: "blue", fontSize: 18 }}>
                                  {item?.university?.title}
                                </Text>
                                <View style={styles.oneline}>
                                  <Text style={{ fontSize: 16 }}>
                                    {item?.location?.name}{" "}
                                  </Text>
                                  <Text style={{ fontSize: 16 }}>
                                    {"   "}
                                    {item?.subLocations[0]?.name}
                                  </Text>
                                </View>
                                <View style={styles.oneline}>
                                  <Text style={{ fontSize: 16 }}>
                                    {item?.duration?.name}
                                    {"   "}
                                  </Text>
                                  <Text style={{ fontSize: 16 }}>
                                    {item?.level?.name} Level
                                  </Text>
                                </View>
                                <View style={styles.oneline}>
                                  <Text
                                    style={{ fontSize: 18, color: "green" }}
                                  >
                                    $ {item?.tuitionFee}{" "}
                                  </Text>
                                  <Text style={{ fontSize: 16 }}>
                                    ({item?.currency?.code}){" "}
                                  </Text>
                                  <Text style={{ fontSize: 16 }}>
                                    {"/"}
                                    {item?.feeType}
                                  </Text>
                                </View>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              ) : (
                <View
                  style={{ justifyContent: "center", alignContent: "center" }}
                >
                  <Text style={{ alignSelf: "center", marginTop: 100 }}>
                    University Not Found
                  </Text>
                </View>
              )}
            </View>
          ) : (
            <View style={{ height: SCREEN_HEIGHT }}>
              <Text
                style={{
                  alignSelf: "center",
                  marginTop: "90%",
                }}
              >
                No Courses Found!
              </Text>
            </View>
          )
        ) : (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              marginTop: "80%",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </View>
  );
});
export default CourseCataloguesScreen;

const FliterModal = ({
  showModal,
  setShowModal,
  onSearch,
  selectedValue1,
  selectedValue2,
  selectedValue3,
  selectedValue4,
  selectedValue5,
  selectedValue6,
  selectedValue7,
  onSelectValue1,
  onSelectValue2,
  onSelectValue3,
  onSelectValue4,
  onSelectValue5,
  onSelectValue6,
  onSelectValue7,
}) => {
  const initialFilterState = {
    minPrice: null,
    maxPrice: null,
    setSelectedLocation: null,
    setSelectedSubLocation: null,
    setSelectedTitle: null,
    setSelectedFeeType: null,
    setSelectedCourseLevels: null,
  };

  const handleSelectValue = () => {
    onSelectValue1(selectedLocation?.name);
    onSelectValue2(selectedSubLocation?.name);
    onSelectValue3(selectedTitle?.title);
    onSelectValue4(selectedCourseLevels?.name);
    onSelectValue5(selectedFeeType);
    onSelectValue6(minPrice);
    onSelectValue7(maxPrice);
  };
  const [minPrice, setMinPrice] = useState(selectedValue6);
  const [maxPrice, setMaxPrice] = useState(selectedValue7);
  const [selectedLocation, setSelectedLocation] = useState(selectedValue1);
  const [selectedSubLocation, setSelectedSubLocation] = useState(
    selectedValue2
      ? { name: selectedValue2.name, _id: selectedValue2._id }
      : null
  );
  const [selectedTitle, setSelectedTitle] = useState(selectedValue3);
  const [selectedFeeType, setSelectedFeeType] = useState(selectedValue5);
  const [selectedCourseLevels, setSelectedCourseLevels] =
    useState(selectedValue4);
  const [filters, setFilters] = useState(initialFilterState);

  const handleResetFilters = () => {
    setMinPrice(initialFilterState.minPrice);
    setMaxPrice(initialFilterState.maxPrice);
    setSelectedLocation(initialFilterState.setSelectedLocation);
    setSelectedSubLocation(initialFilterState.setSelectedSubLocation);
    setSelectedTitle(initialFilterState.setSelectedTitle);
    setSelectedFeeType(initialFilterState.setSelectedFeeType);
    setSelectedCourseLevels(initialFilterState.setSelectedCourseLevels);
    setFilters(initialFilterState);
  };

  const { data } = useGetAllCourseCataloguesDataQuery();
  const filteredData = Array.from(
    new Set(data?.data?.map((item) => item?.level?.name))
  ).map((name) => data?.data?.find((item) => item?.level?.name === name));
  const data1 = [
    {
      id: "1",
      feeType: "Semester",
    },
    {
      id: "2",
      feeType: "Term",
    },
    {
      id: "3",
      feeType: "Year",
    },
    {
      id: "4",
      feeType: "Course",
    },
  ];

  // RTK Query
  const { data: locations } = useGetGlobalListDataQuery({
    type: "Locations",
    includeChildren: true,
    status: "Active",
  });

  const [lazyFetchSubLocactions, { data: subLocations }] =
    useLazyGetGlobalListDataQuery();

  const [lazyFetchTitles, { data: titles }] =
    useLazyGetUniversityListDataQuery();
  // console.log(titles);
  const [slideAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (!selectedLocation) return;

    const handleFetchLocalUniversitieTitle = async (locationId) => {
      await lazyFetchTitles(locationId).unwrap();
    };

    const handleFetchSubLocations = async (location) => {
      await lazyFetchSubLocactions({
        type: location,
        includeChildren: true,
        status: "Active",
      }).unwrap();
    };

    handleFetchSubLocations(selectedLocation?.name);
    handleFetchLocalUniversitieTitle(selectedLocation?._id);
  }, [selectedLocation]);

  // methods
  const handleSearchCourses = () => {
    const parsedMinPrice = parseFloat(minPrice);
    const parsedMaxPrice = parseFloat(maxPrice);

    const query = {
      ...(selectedLocation && { location: selectedLocation?._id }),
      ...(selectedTitle && { university: selectedTitle?._id }),
      ...(selectedSubLocation && { subLocations: [selectedSubLocation?._id] }),
      ...(selectedFeeType && { feeType: selectedFeeType }),
      ...(selectedCourseLevels && { courseLevels: selectedCourseLevels?.id }),
      page: 1,
      size: 10,
      feeRange: [
        isNaN(parsedMinPrice) ? 0 : parsedMinPrice,
        isNaN(parsedMaxPrice) ? 100000000 : parsedMaxPrice,
      ],
    };

    onSearch(query);
  };

  return (
    <Modal visible={showModal} transparent={true} animationType={"slide"}>
      <ScrollView>
        <View style={styles.modal}>
          <TextInput placeholder="Search.." style={styles.searchInput} />
          <Text style={{ padding: 20 }}>Select Location</Text>
          <View style={styles.btncontainer}>
            <Picker
              selectedValue={selectedLocation}
              onValueChange={(itemValue) => {
                setSelectedLocation(itemValue);
                setSelectedSubLocation(null);
                setSelectedTitle(null);
              }}
              mode="dropdown"
            >
              <Picker.Item label="Select Location" value={null} />
              {locations?.map((item) => (
                <Picker.Item label={item?.name} value={item} key={item?.name} />
              ))}
            </Picker>
          </View>
          {selectedLocation && (
            <View>
              <Text style={{ padding: 20 }}>Select SubLocation</Text>
              <View style={styles.btncontainer}>
                <Picker
                  selectedValue={selectedSubLocation}
                  onValueChange={(itemValue) => {
                    setSelectedSubLocation(itemValue);
                    // setSelectedTitle(null);
                  }}
                  mode="dropdown"
                >
                  <Picker.Item label="Select SubLocation" value={null} />
                  {subLocations?.map((item) => (
                    <Picker.Item
                      label={item?.name}
                      value={item}
                      key={item?._id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          )}
          {selectedSubLocation && (
            <View>
              <Text style={{ padding: 20 }}>Select Title</Text>
              <View style={styles.btncontainer}>
                <Picker
                  selectedValue={selectedTitle}
                  onValueChange={(itemValue) => setSelectedTitle(itemValue)}
                  mode="dropdown"
                >
                  <Picker.Item label="Select Title" value={null} />
                  {titles?.map((item) => (
                    <Picker.Item
                      label={item?.title}
                      value={item}
                      key={item?._id}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          )}
          <View>
            <Text style={{ padding: 20 }}>Tuition Fee</Text>
            <View style={styles.filterContainer}>
              <TextInput
                style={styles.input}
                placeholder="Min Price"
                keyboardType="number-pad"
                value={minPrice}
                onChangeText={(text) => setMinPrice(text)}
              />
              <Text style={styles.text}>-</Text>
              <TextInput
                style={styles.input}
                placeholder="Max Price"
                keyboardType="number-pad"
                value={maxPrice}
                onChangeText={(text) => setMaxPrice(text)}
              />
            </View>
          </View>
          <View>
            <Text style={{ padding: 20 }}>Select Payment Per</Text>
            <View style={styles.btncontainer}>
              <Picker
                selectedValue={selectedFeeType}
                onValueChange={(itemValue) => setSelectedFeeType(itemValue)}
                mode="dropdown"
              >
                <Picker.Item label="Select Payment Per" value={null} />
                {data1.map((item) => (
                  <Picker.Item
                    label={item?.feeType}
                    value={item?.feeType}
                    key={item?.feeType}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View>
            <Text style={{ padding: 20 }}>Select Course Levels</Text>
            <View style={styles.btncontainer}>
              <Picker
                selectedValue={selectedCourseLevels}
                style={{ flex: 1 }}
                onValueChange={(itemValue) =>
                  setSelectedCourseLevels(itemValue)
                }
                mode="dropdown"
              >
                <Picker.Item label="Select Course Levels" value={null} />
                {filteredData?.map((item) => (
                  <Picker.Item
                    label={item?.level?.name}
                    value={item?.level}
                    key={item?.level?._id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <View style={[styles.oneline, { padding: 20 }]}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              onPress={() => {
                handleSearchCourses();
                handleSelectValue();
              }}
            >
              <View
                style={{
                  backgroundColor: "purple",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Search
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />

            <TouchableOpacity onPress={() => setShowModal(false)}>
              <View
                style={{
                  backgroundColor: "purple",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Cancel
                </Text>
              </View>
            </TouchableOpacity>
            {/* <Button title="Search" color="black" /> */}
            {/* <Button title="Cancel" color="black" /> */}
            <View style={{ flex: 1 }} />
            <TouchableOpacity onPress={handleResetFilters}>
              <View
                style={{
                  backgroundColor: "purple",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Reset
                </Text>
              </View>
            </TouchableOpacity>
            {/* <Button title="Reset" color="black" /> */}
            <View style={{ flex: 1 }} />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  screen: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: "white",
  },
  modal: {
    borderRadius: 4,
    marginTop: 400,
    backgroundColor: "white",
    elevation: 10,
    paddingTop: 10,
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
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "gray",
    alignSelf: "center",
    fontSize: 17,
    justifyContent: "space-between",
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
    // width: "95%",
    marginLeft: 20,
    marginRight: 20,
    // marginTop: 10,
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
    width: "95%",
    // height: 50,
    borderBottomWidth: 0.9,
    borderBottomColor: "#8e8e8e",
    alignSelf: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  filterContainer: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginVertical: 5,
  },
  text1: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 50,
  },
  text: {
    color: "black",
    fontSize: 16,
    // fontWeight: "bold",
    marginRight: 5,
  },
});
