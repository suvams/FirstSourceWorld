import React, { useState } from "react";
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
  ScrollView,
  Animated,
  RefreshControl,
  SafeAreaView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import SelectDropdown from "react-native-select-dropdown";
import { Ionicons } from "@expo/vector-icons";
import {
  useLazyGetCourseCataloguesDataQuery,
  useGetAllCourseCataloguesDataQuery,
  useLazyPaginateDataQuery,
} from "../rtkQuery/courseCatalogueSlice";
import {
  useGetGlobalListDataQuery,
  useLazyGetGlobalListDataQuery,
} from "../rtkQuery/globalListSlice";
import { useLazyGetUniversityListDataQuery } from "../rtkQuery/universityListSlice";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const Skeleton = () => (
  // Placeholder skeleton component
  <View style={{ padding: 20, backgroundColor: "white" }}>
    <View
      style={{
        height: 30,
        width: 150,
        backgroundColor: "#E0E0E0",
        marginBottom: 5,
        borderRadius: 8,
        paddingTop: 15,
        paddingBottom: 15,
      }}
    />
    <View style={styles.skeletonItem} />
    <View style={styles.skeletonItem} />
    <View style={styles.skeletonItem} />
    <View style={styles.skeletonItem} />
    <View style={styles.skeletonItem} />
    <View style={styles.skeletonItem} />
    <View style={styles.skeletonItem} />
    <View style={styles.skeletonItem} />
  </View>
);
const CourseCataloguesScreen = React.memo(({ navigation }) => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedValue1, setSelectedValue1] = useState(null);
  const [selectedValue2, setSelectedValue2] = useState(null);
  const [selectedValue3, setSelectedValue3] = useState(null);
  const [selectedValue4, setSelectedValue4] = useState(null);
  const [selectedValue5, setSelectedValue5] = useState(null);
  const [selectedValue6, setSelectedValue6] = useState(null);
  const [selectedValue7, setSelectedValue7] = useState(null);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const [paginating, setPaginating] = useState(false);

  const [allCourses, setAllCourses] = useState([]);

  // RTK Query

  const [lazyCourseCatalogues, { data, isLoading, isFetching, error }] =
    useLazyGetCourseCataloguesDataQuery();

  const [
    fetchPaginatedCourses,
    {
      data: paginatedCourses,
      currentData: currentCourses,
      isFetching: isFetchingPaginated,
    },
  ] = useLazyPaginateDataQuery();

  const [lazyFetchSubLocactions] = useLazyGetGlobalListDataQuery();

  const [lazyFetchTitles] = useLazyGetUniversityListDataQuery();

  const lastPage = Math.ceil(data?.totalItems / 100);

  const filteredCourse = React.useMemo(() => {
    return (
      allCourses?.filter((el) =>
        el?.title?.toLowerCase()?.includes(search.toLocaleLowerCase())
      ) ?? []
    );
  }, [allCourses, search]);

  React.useEffect(() => {
    if (!data?.data) return;
    if (currentCourses?.data) return;

    setAllCourses(data?.data);
  }, [data]);
  React.useEffect(() => {
    if (!currentCourses?.data) return;

    console.log(currentCourses?.data[0], "new courses ", page);

    setAllCourses((prev) => [...prev, ...currentCourses?.data]);
  }, [currentCourses]);
  const handleSearchCourses = async (queryParams) => {
    setShowModal(false);

    await lazyCourseCatalogues({ ...queryParams }).unwrap();
  };

  const fetchMoreData = () => {
    if (page <= lastPage) {
      if (!endReached) {
        setEndReached(true);
        setPaginating(true);
        fetchPaginatedCourses({
          page: page + 1,
          feeType: "Semester",
          feeRange: "0,100000",
        }).then(() => {
          setPaginating(false);
          setPage(page + 1);
          setEndReached(false);
        });
      }
    } else {
      console.log("here");
      return;
    }
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

  console.log(allCourses.length, "total");

  if (isLoading) {
    return <Skeleton />;
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

  const handleSelectValue1 = (value1) => {
    setSelectedValue1(value1);
  };

  const handleSelectValue3 = (value3) => {
    setSelectedValue3(value3);
  };
  const handleSelectValue4 = (value4) => {
    setSelectedValue4(value4);
  };

  const handleSelectValue5 = (value5) => {
    setSelectedValue5(value5);
  };
  const handleSelectValue6 = (value6) => {
    setSelectedValue6(value6);
  };

  const handleSelectValue2 = (value2) => {
    setSelectedValue2(value2);
  };
  const handleSelectValue7 = (value7) => {
    setSelectedValue7(value7);
  };
  const handleRemoveValue = (
    valueNumber,
    selectedValue1,
    selectedValue2,
    selectedValue3,
    selectedValue4,
    selectedValue5,
    selectedValue6,
    selectedValue7
  ) => {
    switch (valueNumber) {
      case 1:
        setSelectedValue1("");
        break;
      case 2:
        setSelectedValue2("");
        break;
      case 3:
        setSelectedValue3("");
        break;
      case 4:
        setSelectedValue4("");
        break;
      case 5:
        setSelectedValue5("");
        break;
      case 6:
        setSelectedValue6("");
        setSelectedValue7("");
        break;
      default:
        break;
    }
    const queryParams2 = {
      ...(valueNumber !== 1 &&
        selectedValue1 && { location: selectedValue1?.id }),
      ...(valueNumber !== 2 &&
        selectedValue2 && { subLocations: selectedValue2?.id }),
      ...(valueNumber !== 3 &&
        selectedValue3 && { university: selectedValue3?.id }),
      ...(valueNumber !== 4 && selectedValue4 && { feeType: selectedValue4 }),
      ...(valueNumber !== 5 &&
        selectedValue5 && { courseLevels: selectedValue5?.id }),
      page: 1,
      size: 10,
      ...(valueNumber !== 6 &&
        valueNumber !== 7 && {
          feeRange: [selectedValue6 || 0, selectedValue7 || 100000000000],
        }),
    };
    console.log(queryParams2);
    handleSearchCourses(queryParams2);
  };

  return (
    <SafeAreaView>
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
                <Text style={styles.text2}>You Filter The Folllowing: </Text>
              ) : null}
              <View>
                <View style={[styles.oneline, { flexWrap: "wrap" }]}>
                  {!!selectedValue1 && (
                    <TouchableOpacity
                      onPress={() =>
                        handleRemoveValue(
                          1,
                          selectedValue1,
                          selectedValue2,
                          selectedValue3,
                          selectedValue4,
                          selectedValue5,
                          selectedValue6,
                          selectedValue7
                        )
                      }
                      style={styles.selectedValue}
                    >
                      <View style={styles.oneline}>
                        <Text style={styles.text}>Location:</Text>
                        <Text style={styles.text1}>{selectedValue1?.name}</Text>
                        <Ionicons
                          name="close-circle-outline"
                          size={20}
                          color="red"
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                  {!!selectedValue2 && (
                    <TouchableOpacity
                      onPress={() =>
                        handleRemoveValue(
                          2,
                          selectedValue1,
                          selectedValue2,
                          selectedValue3,
                          selectedValue4,
                          selectedValue5,
                          selectedValue6,
                          selectedValue7
                        )
                      }
                      style={styles.selectedValue}
                    >
                      <View style={styles.oneline}>
                        <Text style={styles.text}>Sub Location:</Text>
                        <Text style={styles.text1}>{selectedValue2?.name}</Text>
                        <Ionicons
                          name="close-circle-outline"
                          size={20}
                          color="red"
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                {!!selectedValue3 && (
                  <View style={styles.oneline}>
                    <TouchableOpacity
                      onPress={() =>
                        handleRemoveValue(
                          3,
                          selectedValue1,
                          selectedValue2,
                          selectedValue3,
                          selectedValue4,
                          selectedValue5,
                          selectedValue6,
                          selectedValue7
                        )
                      }
                      style={styles.selectedValue}
                    >
                      <View style={styles.oneline}>
                        <Text style={styles.text}>Course Title:</Text>
                        <Text style={styles.text1}>{selectedValue3?.name}</Text>
                        <Ionicons
                          name="close-circle-outline"
                          size={20}
                          color="red"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
                <View style={[styles.oneline, { flexWrap: "wrap" }]}>
                  {!!selectedValue4 && (
                    <TouchableOpacity
                      onPress={() =>
                        handleRemoveValue(
                          4,
                          selectedValue1,
                          selectedValue2,
                          selectedValue3,
                          selectedValue4,
                          selectedValue5,
                          selectedValue6,
                          selectedValue7
                        )
                      }
                      style={styles.selectedValue}
                    >
                      <View style={styles.oneline}>
                        <Text style={styles.text}>Fee Type:</Text>
                        <Text style={styles.text1}>{selectedValue4}</Text>
                        <Ionicons
                          name="close-circle-outline"
                          size={20}
                          color="red"
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                  {!!selectedValue5 && (
                    <TouchableOpacity
                      onPress={() =>
                        handleRemoveValue(
                          5,
                          selectedValue1,
                          selectedValue2,
                          selectedValue3,
                          selectedValue4,
                          selectedValue5,
                          selectedValue6,
                          selectedValue7
                        )
                      }
                      style={styles.selectedValue}
                    >
                      <View style={styles.oneline}>
                        <Text style={styles.text}>Course Level:</Text>
                        <Text style={styles.text1}>{selectedValue5?.name}</Text>
                        <Ionicons
                          name="close-circle-outline"
                          size={20}
                          color="red"
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
                <View style={styles.oneline}>
                  {selectedValue6 || selectedValue7 ? (
                    <TouchableOpacity
                      onPress={() =>
                        handleRemoveValue(
                          6,
                          selectedValue1,
                          selectedValue2,
                          selectedValue3,
                          selectedValue4,
                          selectedValue5,
                          selectedValue6,
                          selectedValue7
                        )
                      }
                      style={styles.selectedValue}
                    >
                      <View style={styles.oneline}>
                        <Text style={styles.text}>Fee Cost Range:</Text>
                        <Text style={styles.text1}>
                          {selectedValue6}-{selectedValue7}
                        </Text>
                        <Ionicons
                          name="close-circle-outline"
                          size={20}
                          color="red"
                        />
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
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
                    ListFooterComponent={<View style={{ height: 500 }} />}
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                      />
                    }
                    data={filteredCourse}
                    keyExtractor={(item) => item?._id.toString()}
                    onEndReachedThreshold={0.5}
                    onEndReached={fetchMoreData}
                    renderItem={({ item }) => {
                      return (
                        <View>
                          <Text style={{ color: "black" }}>
                            {item?.totalItems}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              navigation.navigate("Course Detail", {
                                item,
                              })
                            }
                          >
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
                                    style={{ fontSize: 18, fontWeight: "500" }}
                                  >
                                    {item?.title}
                                  </Text>
                                  <Text style={{ color: "blue", fontSize: 18 }}>
                                    {item?.university?.title}
                                  </Text>
                                  <View
                                    style={[
                                      styles.oneline,
                                      { flexWrap: "wrap" },
                                    ]}
                                  >
                                    <Text style={{ fontSize: 14 }}>
                                      {item?.location?.name}{" "}
                                    </Text>
                                    <Text style={{ fontSize: 14 }}>
                                      {"   "}
                                      {item?.subLocations[0]?.name}
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.oneline,
                                      { flexWrap: "wrap" },
                                    ]}
                                  >
                                    <Text style={{ fontSize: 14 }}>
                                      {item?.duration?.name}
                                      {"   "}
                                    </Text>
                                    <Text style={{ fontSize: 14 }}>
                                      {item?.level?.name} Level
                                    </Text>
                                  </View>
                                  <View
                                    style={[
                                      styles.oneline,
                                      { flexWrap: "wrap" },
                                    ]}
                                  >
                                    <Text
                                      style={{ fontSize: 18, color: "green" }}
                                    >
                                      $ {item?.tuitionFee}{" "}
                                    </Text>
                                    <Text style={{ fontSize: 14 }}>
                                      ({item?.currency?.code}){" "}
                                    </Text>
                                    <Text style={{ fontSize: 14 }}>
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
                {isFetchingPaginated ? (
                  <View
                    style={{
                      width: "100%",
                      height: 100,
                    }}
                  >
                    <Skeleton />
                  </View>
                ) : null}
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
            <Skeleton />
          )}
        </View>
      </View>
    </SafeAreaView>
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
    const location = selectedLocation
      ? { name: selectedLocation.name, id: selectedLocation._id }
      : null;
    const subLocation = selectedSubLocation
      ? { name: selectedSubLocation.name, id: selectedSubLocation._id }
      : null;
    const title = selectedTitle
      ? { name: selectedTitle.title, id: selectedTitle._id }
      : null;
    const feeType = selectedFeeType;
    const courseLevels = selectedCourseLevels
      ? { name: selectedCourseLevels.name, id: selectedCourseLevels._id }
      : null;
    const selectedMinPrice = minPrice;
    const selectedMaxPrice = maxPrice;

    onSelectValue1(location);
    onSelectValue2(subLocation);
    onSelectValue3(title);
    onSelectValue4(feeType);
    onSelectValue5(courseLevels);
    onSelectValue6(selectedMinPrice);
    onSelectValue7(selectedMaxPrice);
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
      ...(selectedCourseLevels && { courseLevels: selectedCourseLevels?._id }),
      page: 1,
      size: 10,
      feeRange: [
        isNaN(parsedMinPrice) ? 0 : parsedMinPrice,
        isNaN(parsedMaxPrice) ? 10000000000 : parsedMaxPrice,
      ],
    };

    onSearch(query);
  };

  const renderDropdown = () => {
    if (Platform.OS === "android") {
      return (
        <View>
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
        </View>
      );
    } else if (Platform.OS === "ios") {
      return (
        <View>
          <Text style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}>
            Select Location
          </Text>
          <SelectDropdown
            data={locations}
            defaultButtonText="Select Location"
            onSelect={(item) => {
              setSelectedLocation(item);
              setSelectedSubLocation(null);
              setSelectedTitle(null);
            }}
            buttonTextAfterSelection={(selectedItem) =>
              selectedItem ? selectedItem.name : ""
            }
            rowTextForSelection={(item) => item.name}
            buttonStyle={styles.btncontainer}
            buttonTextStyle={styles.dropdownButtonText}
            dropdownStyle={styles.dropdown}
            rowStyle={styles.dropdownRowStyle}
            rowTextStyle={styles.dropdownRowTextStyle}
          />
          {selectedLocation && (
            <View>
              <Text
                style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}
              >
                Select SubLocation
              </Text>
              <SelectDropdown
                data={subLocations}
                defaultButtonText="Select SubLocation"
                onSelect={(item) => setSelectedSubLocation(item)}
                buttonTextAfterSelection={(selectedItem) =>
                  selectedItem ? selectedItem.name : ""
                }
                rowTextForSelection={(item) => item.name}
                buttonStyle={styles.btncontainer}
                buttonTextStyle={styles.dropdownButtonText}
                dropdownStyle={styles.dropdown}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTextStyle}
              />
            </View>
          )}
          {selectedSubLocation && (
            <View>
              <Text
                style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}
              >
                Select Title
              </Text>
              <SelectDropdown
                data={titles}
                defaultButtonText="Select Title"
                onSelect={(item) => setSelectedTitle(item)}
                buttonTextAfterSelection={(selectedItem) =>
                  selectedItem ? selectedItem.title : ""
                }
                rowTextForSelection={(item) => item.title}
                buttonStyle={styles.btncontainer}
                buttonTextStyle={styles.dropdownButtonText}
                dropdownStyle={styles.dropdown}
                rowStyle={styles.dropdownRowStyle}
                rowTextStyle={styles.dropdownRowTextStyle}
              />
            </View>
          )}
        </View>
      );
    } else {
      return (
        <View>
          <Text>Dropdown not supported on this platform.</Text>
        </View>
      );
    }
  };
  const renderDropdown1 = () => {
    if (Platform.OS === "ios") {
      return (
        <View>
          <View>
            <Text
              style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}
            >
              Select Payment Per
            </Text>
            <SelectDropdown
              data={data1}
              defaultButtonText="Select Payment Per"
              onSelect={(item) => setSelectedFeeType(item.feeType)}
              buttonTextAfterSelection={(selectedItem) => selectedItem?.feeType}
              rowTextForSelection={(item) => item.feeType}
              buttonStyle={styles.btncontainer}
              buttonTextStyle={styles.dropdownButtonText}
              dropdownStyle={styles.dropdown}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={styles.dropdownRowTextStyle}
            />
          </View>
          <View>
            <Text
              style={{ paddingLeft: 20, paddingTop: 10, paddingBottom: 10 }}
            >
              Select Course Levels
            </Text>
            <SelectDropdown
              data={filteredData}
              defaultButtonText="Select Course Levels"
              onSelect={(item) => setSelectedCourseLevels(item.level)}
              buttonTextAfterSelection={(selectedItem) =>
                selectedItem ? selectedItem?.level?.name : ""
              }
              rowTextForSelection={(item) => item.level.name}
              buttonStyle={styles.btncontainer}
              buttonTextStyle={styles.dropdownButtonText}
              dropdownStyle={styles.dropdown}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={styles.dropdownRowTextStyle}
            />
          </View>
        </View>
      );
    } else if (Platform.OS === "android") {
      return (
        <View>
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
        </View>
      );
    } else {
      return (
        <View>
          <Text>Dropdown not supported on this platform.</Text>
        </View>
      );
    }
  };

  return (
    <Modal visible={showModal} transparent={true} animationType={"slide"}>
      <ScrollView>
        <View style={styles.modal}>
          <TextInput placeholder="Search.." style={styles.searchInput} />
          {renderDropdown()}
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
          {renderDropdown1()}
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
            <View style={{ flex: 1 }} />
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  skeletonItem: {
    height: 150,
    width: SCREEN_WIDTH - 40,
    backgroundColor: "#E0E0E0",
    marginBottom: 10,
    borderRadius: 8,
    paddingTop: 15,
    paddingBottom: 15,
  },
  screen: {
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
    marginTop: 10,
    backgroundColor: "white",
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
    marginLeft: 20,
    marginRight: 20,
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
    marginRight: 5,
  },
  text2: {
    color: "blue",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  text: {
    color: "black",
    fontSize: 16,
    marginRight: 5,
  },
  selectedValue: {
    borderWidth: 0.5,
    borderRadius: 5,
    padding: 5,
    backgroundColor: "#DCDCDC",
    margin: 2,
  },
  dropdownButtonText: {
    color: "black",
    fontSize: 17,
    justifyContent: "flex-end",
  },

  dropdown: {
    borderRadius: 10,
    width: SCREEN_WIDTH - 55,
  },

  dropdownRowStyle: {
    backgroundColor: "#eff4f6",
  },

  dropdownRowTextStyle: {
    color: "black",
    fontSize: 15,
  },
});
