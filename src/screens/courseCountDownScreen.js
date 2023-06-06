import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";

const courses = [
  {
    id: 1,
    name: "Course 1",
    upcomingEventDate: new Date("2023-06-05T09:30:00"),
  },
  {
    id: 2,
    name: "Course 2",
    upcomingEventDate: new Date("2023-07-05T09:30:00"),
  },
  {
    id: 3,
    name: "Course 3",
    upcomingEventDate: new Date("2023-08-05T09:30:00"),
  },
  {
    id: 4,
    name: "Advanced Diploma of Hospitality Management",
    upcomingEventDate: new Date("2023-09-05T09:30:00"),
  },
  {
    id: 5,
    name: "Advanced Diploma of Hospitality Management",
    upcomingEventDate: new Date("2023-10-05T09:30:00"),
  },
  {
    id: 6,
    name: "Business Administration - Accounting",
    upcomingEventDate: new Date("2023-11-05T09:30:00"),
  },
  {
    id: 7,
    name: "Construction Engineering Technology",
    upcomingEventDate: new Date("2023-12-05T09:30:00"),
  },
  {
    id: 8,
    name: "Journalism -Broadcast",
    upcomingEventDate: new Date("2023-06-10T09:30:00"),
  },
  {
    id: 9,
    name: "Practical Nurse",
    upcomingEventDate: new Date("2023-06-20T09:30:00"),
  },
  {
    id: 10,
    name: " Undergraduate in Kinesiology",
    upcomingEventDate: new Date("2023-06-21T09:30:00"),
  },
];

const ICON_NAMES = [
  "accessible",
  "link",
  "email",
  "search",
  "image",
  "menu",
  "radio",
  "tab",
  "timer",
  "article",
  "code",
  "details",
  "input",
  "label",
  "map",
  "source",
  "title",
  "circle",
  "filter",
  "stop",
  "forward",
  "info",
  "check",
  "close",
  "book",
  "pause",
  "mail",
  "home",
  "laptop",
  "star",
  "save",
  "phone",
  "inbox",
  "lock",
  "cloud",
  "camera",
  "delete",
  "tag",
  "flag",
  "android",
  "copyright",
  "wifi",
  "sync",
  "login",
  "logout",
  "contacts",
  "edit",
  "warning",
  "dashboard",
  "adjust",
  "archive",
  "arrow-left",
  "arrow-right",
  "attachment",
  "block",
  "bookmark",
  "bookmarks",
  "brush",
  "cake",
  "chat",
  "chevron-left",
  "chevron-right",
  "credit-card",
  "crop",
  "facebook",
  "fingerprint",
  "folder",
  "help",
  "keyboard",
  "language",
  "layers",
  "list",
  "location-pin",
  "lock-open",
  "loop",
  "message",
  "mic",
  "mouse",
];

const BACKGROUND_COLORS = [
  "white",
  "lightblue",
  "lightgreen",
  "aliceblue",
  "antiquewhite",
  "aqua",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "blue",
  "blueviolet",
  "brown",
  "burlywood",
  "cadetblue",
  "chartreuse",
  "chocolate",
  "coral",
  "cornflowerblue",
  "cornsilk",
  "crimson",
  "cyan",
  "darkblue",
  "darkcyan",
  "darkgoldenrod",
  "darkgray",
  "darkgreen",
  "darkgrey",
  "darkkhaki",
  "darkmagenta",
  "darkolivegreen",
  "darkorange",
  "darkorchid",
  "darkred",
  "darksalmon",
  "darkseagreen",
  "darkslateblue",
  "darkslategray",
  "darkslategrey",
  "darkturquoise",
  "darkviolet",
  "deeppink",
  "deepskyblue",
  "dimgray",
  "dimgrey",
  "dodgerblue",
  "firebrick",
  "floralwhite",
  "forestgreen",
  "fuchsia",
  "gainsboro",
  "ghostwhite",
  "gold",
  "goldenrod",
  "gray",
  "green",
  "greenyellow",
  "grey",
  "honeydew",
  "hotpink",
  "indianred",
  "indigo",
  "ivory",
  "khaki",
  "lavender",
  "lavenderblush",
  "lawngreen",
  "lemonchiffon",
  "lightcoral",
  "lightcyan",
  "lightgoldenrodyellow",
  "lightgray",
  "lightgrey",
  "lightpink",
  "lightsalmon",
  "lightseagreen",
  "lightskyblue",
  "lightslategray",
  "lightslategrey",
  "lightsteelblue",
  "lightyellow",
  "lime",
  "limegreen",
  "linen",
  "magenta",
  "maroon",
  "mediumaquamarine",
  "mediumblue",
  "mediumorchid",
  "mediumpurple",
  "mediumseagreen",
  "mediumslateblue",
  "mediumspringgreen",
  "mediumturquoise",
  "mediumvioletred",
  "midnightblue",
  "mintcream",
  "mistyrose",
  "moccasin",
  "navajowhite",
  "navy",
  "oldlace",
  "olive",
  "olivedrab",
  "orange",
  "orangered",
  "orchid",
  "palegoldenrod",
  "palegreen",
  "paleturquoise",
  "palevioletred",
  "papayawhip",
  "peachpuff",
  "peru",
  "pink",
  "plum",
  "powderblue",
  "purple",
  "rebeccapurple",
  "red",
  "rosybrown",
  "royalblue",
  "saddlebrown",
  "salmon",
  "sandybrown",
  "seagreen",
  "seashell",
  "sienna",
  "silver",
  "skyblue",
  "slateblue",
  "slategray",
  "slategrey",
  "snow",
  "springgreen",
  "steelblue",
  "tan",
  "teal",
  "thistle",
  "tomato",
  "turquoise",
  "violet",
  "wheat",
  "whitesmoke",
  "yellow",
  "yellowgreen",
];

const CourseCountDownScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [countdowns, setCountdowns] = useState({});
  const [countdownName, setCountdownName] = useState("");

  const SCREEN_HEIGHT = Dimensions.get("window").height;
  const SCREEN_WIDTH = Dimensions.get("window").width;

  //Colors and Icons
  const [selectedIcon, setSelectedIcon] = useState(ICON_NAMES[0]);
  useEffect(() => {
    setSelectedIcon(ICON_NAMES[0]);
  }, []);
  const [selectedBackgroundColor, setSelectedBackgroundColor] =
    useState("white");
  const [courseIcons, setCourseIcons] = useState({});
  const [courseBackgroundColors, setCourseBackgroundColors] = useState({});

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  const handleCloseModal1 = () => {
    setModalVisible1(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSelectedCourse(null);
  };
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setModalVisible1(true);
    setSelectedIcon("");
  };

  const handleStartCountdown = () => {
    startCountdown(selectedCourse, countdownName);
    setModalVisible(false);
    setModalVisible1(false);
    setCountdownName("");
    if (selectedCourse) {
      setCourseBackgroundColors((prevState) => ({
        ...prevState,
        [selectedCourse.id]: selectedBackgroundColor,
      }));

      setCourseIcons((prevState) => ({
        ...prevState,
        [selectedCourse.id]: selectedIcon,
      }));
    }
  };

  //Colors and Icons
  const handleIconSelect = (icon) => {
    setSelectedIcon(icon);
  };

  const handleBackgroundColorSelect = (color) => {
    setSelectedBackgroundColor(color);
  };

  const ModalPreview = ({
    selectedCourse,
    selectedIcon,
    countdownName,
    selectedBackgroundColor,
  }) => {
    const renderSelectedIcon = () => {
      if (ICON_NAMES.includes(selectedIcon)) {
        return <MaterialIcons name={selectedIcon} size={60} color="black" />;
      }
      // Return a default icon or null if no match is found
      return null;
    };
    return (
      <View
        style={[
          styles.modal2ContainerBackgroundColor,
          { backgroundColor: selectedBackgroundColor },
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ padding: 10 }}>{renderSelectedIcon()}</View>
          <View style={{ width: 20 }} />
          <View style={{ alignSelf: "center" }}>
            {countdownName ? (
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {countdownName}
              </Text>
            ) : (
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                {selectedCourse?.name}
              </Text>
            )}
            <Text style={{ fontSize: 25 }}>
              {selectedCourse &&
                selectedCourse.upcomingEventDate.toDateString()}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "blue" }}>
              {selectedCourse &&
                calculateRemainingTime(selectedCourse.upcomingEventDate)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderPreview = () => {
    return (
      <ModalPreview
        selectedCourse={selectedCourse}
        selectedIcon={selectedIcon}
        selectedBackgroundColor={selectedBackgroundColor}
        countdownName={countdownName}
      />
    );
  };

  useEffect(() => {
    return () => {
      // Cleanup function to clear all countdown intervals when the component unmounts
      Object.values(countdowns).forEach((countdownObj) =>
        clearInterval(countdownObj.interval)
      );
    };
  }, []);

  const calculateRemainingTime = (upcomingEventDate) => {
    const currentTime = new Date();
    const remainingTime = upcomingEventDate - currentTime;

    const seconds = Math.floor(remainingTime / 1000) % 60;
    const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
    const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
    const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const startCountdown = (course, name) => {
    if (countdowns[course.id]) {
      return; // Don't start a new countdown if one already exists for the course
    }

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = course.upcomingEventDate - currentTime;

      if (remainingTime <= 0) {
        clearInterval(interval);
        setCountdowns((prevCountdowns) => {
          const updatedCountdowns = { ...prevCountdowns };
          delete updatedCountdowns[course.id];
          return updatedCountdowns;
        });
      } else {
        const seconds = Math.floor(remainingTime / 1000) % 60;
        const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
        const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
        const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

        const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        setCountdowns((prevCountdowns) => ({
          ...prevCountdowns,
          [course.id]: { name, countdown, countdownName: name, interval },
        }));
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleOpenModal}>
        <Ionicons name="add-outline" size={35} color="white" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modal1Container}>
          <ScrollView>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a course"
              value={searchQuery}
              onChangeText={handleSearch}
            />

            {filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <TouchableOpacity
                  key={course.id}
                  style={styles.courseButton}
                  onPress={() => handleCourseSelect(course)}
                >
                  <View
                    style={[
                      styles.modal2ContainerBackgroundColor,
                      {
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginLeft: 20,
                        paddingLeft: 10,
                        marginRight: 20,
                      },
                    ]}
                  >
                    <Ionicons name="school" size={40} color="red" />
                    <View style={{ width: 20 }} />
                    <View>
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        {course.name}
                      </Text>
                      <Text style={{ fontSize: 20 }}>
                        {course.upcomingEventDate.toDateString()}
                      </Text>
                      {countdowns[course.id] && (
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "blue",
                          }}
                        >
                          {countdowns[course.id].countdown}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View style={[styles.noCoursesContainer, { marginTop: "70%" }]}>
                <Text style={styles.noCoursesText}>No courses found</Text>
              </View>
            )}
          </ScrollView>
          <TouchableOpacity
            style={styles.modal1Button1}
            onPress={handleCloseModal}
          >
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal visible={modalVisible1} animationType="slide">
        <View>
          <View style={styles.modal2Container}>
            <ScrollView>
              <Text style={styles.modal2Text}>You are counting down for:</Text>
              <Text>Enter your desired name for the course!!</Text>
              <TextInput
                style={styles.modal2TextContainer}
                placeholder={selectedCourse?.name}
                value={countdownName}
                onChangeText={setCountdownName}
              />
              <Text style={styles.modal2Text}>
                Last Date For Applying For The Courses:
              </Text>
              <Text>It is Fixed!</Text>
              <Text style={styles.modal2TextContainer}>
                {selectedCourse &&
                  selectedCourse.upcomingEventDate.toDateString()}
              </Text>
              <Text style={styles.modal2Text}>Remaining Time:</Text>
              <Text>Time remaining to apply for the course...</Text>
              <Text style={styles.modal2TextContainer}>
                {selectedCourse &&
                  calculateRemainingTime(selectedCourse.upcomingEventDate)}
              </Text>
              <Text>Select Icon:</Text>
              <View style={styles.modal2SelectIcons}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {ICON_NAMES.map((iconName, index) => {
                    if (!selectedIcon && index === 0) {
                      // Set the first icon as the default selected icon
                      handleIconSelect(iconName);
                    }

                    return (
                      <TouchableOpacity
                        key={iconName}
                        onPress={() => handleIconSelect(iconName)}
                        style={[
                          selectedIcon === iconName && {
                            borderColor: "black",
                            borderWidth: 2,
                          },
                        ]}
                      >
                        <View style={{ padding: 10 }}>
                          <MaterialIcons
                            name={iconName}
                            size={40}
                            color="black"
                          />
                          {selectedIcon === iconName && (
                            <View
                              style={[
                                { backgroundColor: selectedBackgroundColor },
                              ]}
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
              <Text>Select Background Color:</Text>
              <View style={styles.modal2SelectColor}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  {BACKGROUND_COLORS.map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.modal2SelectColorOption,
                        { backgroundColor: color, margin: 10 },
                        selectedBackgroundColor === color &&
                          styles.selectedmodal2SelectColorOption,
                      ]}
                      onPress={() => handleBackgroundColorSelect(color)}
                    >
                      {selectedBackgroundColor === color && (
                        <View
                          style={[
                            { backgroundColor: color, borderColor: "black" },
                          ]}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              <View style={{ height: 20 }} />
              <Text>Whwn you start countdown it looks like:</Text>
              {renderPreview()}
              <TouchableOpacity
                style={styles.button}
                onPress={handleStartCountdown}
              >
                <Text style={styles.buttonText}>Start Countdown</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button1}
                onPress={handleCloseModal1}
              >
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View
        style={{
          backgroundColor: "white",
          height: SCREEN_HEIGHT,
          width: SCREEN_WIDTH,
        }}
      >
        {Object.keys(countdowns).length > 0 ? (
          Object.keys(countdowns).map((courseId) => {
            const countdown = countdowns[courseId];
            const course = courses.find(
              (course) => course.id === parseInt(courseId)
            );
            const backgroundColor =
              courseBackgroundColors[courseId] || selectedBackgroundColor;
            const icon = courseIcons[courseId] || selectedIcon;

            return (
              <View
                key={courseId}
                style={[styles.container1, { backgroundColor }]}
              >
                <View style={{ flexDirection: "row" }}>
                  {icon && (
                    <View
                      style={[styles.modal2SelectIcons, { backgroundColor }]}
                    >
                      <MaterialIcons name={icon} size={50} color="black" />
                    </View>
                  )}
                  <View style={{ width: 20 }} />
                  <View style={{ alignSelf: "center" }}>
                    {countdown.countdownName ? (
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        {countdown.countdownName}
                      </Text>
                    ) : (
                      <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                        {course.name}
                      </Text>
                    )}
                    {/* <Text style={styles.countdownText}>{course.name}</Text>
                    <Text style={{ color: "blue", fontSize: 20 }}>
                      Countdown Name: {countdown.countdownName}
                    </Text> */}
                    <Text style={{ fontSize: 25 }}>
                      {course.upcomingEventDate.toDateString()}
                    </Text>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: "blue",
                      }}
                    >
                      Countdown: {countdown.countdown}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        ) : (
          <View style={styles.noCoursesContainer}>
            <Text style={styles.noCoursesText}>
              No Countdown found !!! Please ADD Countdown
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
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
    backgroundColor: "white",
  },
  coursesContainer: {
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    marginTop: 15,
  },
  button1: {
    backgroundColor: "red",
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    marginTop: 15,
  },
  modal1Button1: {
    backgroundColor: "red",
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    margin: 15,
  },
  buttonText: {
    color: "white",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "bold",
  },

  modal1Text: { fontSize: 20 },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "blue",
    borderRadius: 50,
    padding: 10,
    zIndex: 999,
  },
  modal1Container: {
    flex: 1,
    backgroundColor: "white",
  },

  //Modal 2
  modal2Container: {
    margin: 20,
  },
  modal2TextContainer: {
    marginTop: 10,
    borderWidth: 0.5,
    borderRadius: 8,
    fontSize: 20,
    padding: 10,
    marginBottom: 10,
  },
  modal2Text: { fontSize: 25 },
  modal2SelectIcons: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 75,
    flexDirection: "row",
  },
  modal2SelectColor: {
    flexDirection: "row",
  },
  modal2SelectColorOption: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "transparent",
  },
  selectedmodal2SelectColorOption: {
    borderColor: "black",
  },

  // Modal 2 Preview
  modal2PreviewText: {
    fontWeight: "bold",
    marginBottom: 5,
    fontSize: 20,
  },
  modal2ContainerBackgroundColor: {
    borderWidth: 0.5,
    borderRadius: 8,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
  },

  //No course
  noCoursesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noCoursesText: {
    fontSize: 20,
  },
});

export default CourseCountDownScreen;
