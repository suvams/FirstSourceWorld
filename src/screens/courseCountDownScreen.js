import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  StatusBar,
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

const CourseCountDownScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [countdowns, setCountdowns] = useState({});
  const [countdownName, setCountdownName] = useState("");

  //Colors and Icons
  const [selectedIcon, setSelectedIcon] = useState("add-circle");
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
    selectedBackgroundColor,
  }) => {
    return (
      <View
        style={[
          styles.modal2ContainerBackgroundColor,
          { backgroundColor: selectedBackgroundColor },
        ]}
      >
        <Text style={styles.modal2PreviewText}>Selected Course:</Text>
        <Text>{selectedCourse?.name}</Text>

        <Text style={styles.modal2PreviewText}>Selected Time:</Text>
        <Text>
          {selectedCourse && selectedCourse.upcomingEventDate.toDateString()}
        </Text>

        <Text style={styles.modal2PreviewText}>Selected Icon:</Text>
        <View>
          {/* Display the first icon as the default if no icon is selected */}
          {(!selectedIcon || selectedIcon === "add-circle") && (
            <MaterialIcons name="add-circle" size={40} color="black" />
          )}
          {selectedIcon === "check-circle" && (
            <MaterialIcons name="check-circle" size={40} color="black" />
          )}
          {selectedIcon === "remove-circle" && (
            <MaterialIcons name="remove-circle" size={40} color="black" />
          )}
        </View>

        <Text style={styles.modal2PreviewText}>Selected Background Color:</Text>
        <View>
          {/* Container to show the selected background color */}
          {selectedBackgroundColor === "" && (
            <View style={{ backgroundColor: "lightblue" }} />
          )}
          {selectedBackgroundColor !== "" && (
            <View style={[{ backgroundColor: selectedBackgroundColor }]} />
          )}
        </View>

        {/* Countdown */}
        <Text style={styles.modal2PreviewText}>Countdown:</Text>
        <Text>
          {selectedCourse &&
            calculateRemainingTime(selectedCourse.upcomingEventDate)}
        </Text>
      </View>
    );
  };

  const renderPreview = () => {
    return (
      <ModalPreview
        selectedCourse={selectedCourse}
        selectedIcon={selectedIcon}
        selectedBackgroundColor={selectedBackgroundColor}
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
          <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent={true}
          />
          <ScrollView>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a course"
              value={searchQuery}
              onChangeText={handleSearch}
            />

            {searchQuery ? (
              // Render search results based on searchQuery
              filteredCourses.map((course) => (
                <TouchableOpacity
                  key={course.id}
                  style={styles.courseButton}
                  onPress={() => handleCourseSelect(course)}
                >
                  <View
                    style={[
                      styles.coursesContainer,
                      { flexDirection: "row", flexWrap: "wrap" },
                    ]}
                  >
                    <Ionicons name="school" size={35} color="red" />
                    <View style={{ width: 20 }} />
                    <View>
                      <Text style={styles.modal1Text}>{course.name}</Text>
                      <Text style={styles.courseButtonText}>
                        {course.upcomingEventDate.toDateString()}
                      </Text>
                      {countdowns[course.id] && (
                        <Text style={styles.modal1Text}>
                          Countdown: {countdowns[course.id].countdown}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : // Render all courses if searchQuery is empty
            filteredCourses.length > 0 ? (
              filteredCourses.map((course) => (
                <TouchableOpacity
                  key={course.id}
                  style={styles.courseButton}
                  onPress={() => handleCourseSelect(course)}
                >
                  <View
                    style={[
                      styles.coursesContainer,
                      { flexDirection: "row", flexWrap: "wrap" },
                    ]}
                  >
                    <Ionicons name="school" size={35} color="red" />
                    <View style={{ width: 20 }} />
                    <View>
                      <Text style={styles.modal1Text}>{course.name}</Text>
                      <Text style={styles.courseButtonText}>
                        {course.upcomingEventDate.toDateString()}
                      </Text>
                      {countdowns[course.id] && (
                        <Text style={styles.modal1Text}>
                          Countdown: {countdowns[course.id].countdown}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No courses found</Text>
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
          <StatusBar
            backgroundColor="transparent"
            barStyle="dark-content"
            translucent={true}
          />
          <View style={styles.modal2Container}>
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
              <TouchableOpacity
                onPress={() => handleIconSelect("add-circle")}
                style={[selectedIcon === "add-circle"]}
              >
                <View
                  style={[
                    selectedIcon === "add-circle" && {
                      borderColor: "black",
                      borderWidth: 2,
                    },
                  ]}
                >
                  <MaterialIcons name="add-circle" size={40} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleIconSelect("check-circle")}
                style={[selectedIcon === "check-circle"]}
              >
                <View
                  style={[
                    selectedIcon === "check-circle" && {
                      borderColor: "black",
                      borderWidth: 2,
                    },
                  ]}
                >
                  <MaterialIcons name="check-circle" size={40} color="black" />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleIconSelect("remove-circle")}
                style={[selectedIcon === "remove-circle"]}
              >
                <View
                  style={[
                    selectedIcon === "remove-circle" && {
                      borderColor: "black",
                      borderWidth: 2,
                    },
                  ]}
                >
                  <MaterialIcons name="remove-circle" size={40} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.modal2SelectIcons}>
              <TouchableOpacity
                onPress={() => handleIconSelect("add-circle")}
                style={[selectedIcon === "add-circle"]}
              >
                {/* Icon content */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleIconSelect("check-circle")}
                style={[selectedIcon === "check-circle"]}
              >
                {/* Icon content */}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleIconSelect("remove-circle")}
                style={[selectedIcon === "remove-circle"]}
              >
                {/* Icon content */}
              </TouchableOpacity>
            </View>
            <Text>Select Background Color:</Text>
            <View style={styles.modal2SelectColor}>
              <TouchableOpacity
                style={[
                  styles.modal2SelectColorOption,
                  { backgroundColor: "white" },
                  selectedBackgroundColor === "white" &&
                    styles.selectedmodal2SelectColorOption,
                ]}
                onPress={() => handleBackgroundColorSelect("white")}
              >
                {selectedBackgroundColor === "white" && (
                  <View
                    style={[{ backgroundColor: "white", borderColor: "black" }]}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modal2SelectColorOption,
                  { backgroundColor: "lightblue" },
                  selectedBackgroundColor === "lightblue" &&
                    styles.selectedmodal2SelectColorOption,
                ]}
                onPress={() => handleBackgroundColorSelect("lightblue")}
              >
                {selectedBackgroundColor === "lightblue" && (
                  <View
                    style={[
                      { backgroundColor: "lightblue", borderColor: "black" },
                    ]}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modal2SelectColorOption,
                  { backgroundColor: "lightgreen" },
                  selectedBackgroundColor === "lightgreen" &&
                    styles.selectedmodal2SelectColorOption,
                ]}
                onPress={() => handleBackgroundColorSelect("lightgreen")}
              >
                {selectedBackgroundColor === "lightgreen" && (
                  <View
                    style={[
                      { backgroundColor: "lightgreen", borderColor: "black" },
                    ]}
                  />
                )}
              </TouchableOpacity>
            </View>
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
          </View>
        </View>
      </Modal>
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
              <Text style={styles.countdownText}>{course.name}</Text>
              <Text style={{ fontSize: 20 }}>
                Countdown: {countdown.countdown}
              </Text>
              <Text style={{ color: "blue" }}>
                Countdown Name: {countdown.countdownName}
              </Text>
              {icon && (
                <View style={[styles.modal2SelectIcons, { backgroundColor }]}>
                  <MaterialIcons name={icon} size={50} color="black" />
                </View>
              )}
            </View>
          );
        })
      ) : (
        <Text>Please add countdown</Text>
      )}
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
    borderRadius: 75,
    padding: 10,
    flexDirection: "row",
  },
  modal2SelectColor: {
    flexDirection: "row",
    padding: 10,
  },
  modal2SelectColorOption: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 5,
    borderColor: "transparent",
  },
  selectedmodal2SelectColorOption: {
    borderColor: "red",
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
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 10,
  },
});

export default CourseCountDownScreen;
