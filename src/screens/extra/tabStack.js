// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";
// import HomeScreen from "../screens/HomeScreen";
// import CourseCataloguesScreen from "../screens/courseCataloguesScreen";

// const Tab = createBottomTabNavigator();

// const Tabs = () => {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="HOME"
//         component={HomeScreen}
//         options={{
//           headerShown: false,
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home-outline" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="SEARCH COURSES"
//         component={CourseCataloguesScreen}
//         options={{
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="search" color={color} size={size} />
//           ),
//           headerShown: false,
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default Tabs;

// import React, { useState, useEffect } from "react";
// import { View } from "react-native";
// import SelectDropdown from "react-native-select-dropdown";
// import { useGetAccountListDataQuery } from "../../rtkQuery/accountListSlice";
// import { useLazyGetAccountEntityListDataQuery } from "../../rtkQuery/accountEntityListSlice";

// const ExampleComponent = () => {
//   const [account, setAccount] = useState(null);
//   const [entity, setEntity] = useState(null);
//   const [lazyFetchAccountEntity, { data: accountEntity, isFetching }] =
//     useLazyGetAccountEntityListDataQuery();

//   const {
//     data: accounts,
//     isLoading: isLoading1,
//     error: error1,
//   } = useGetAccountListDataQuery();

//   useEffect(() => {
//     if (!account) return;
//     const handleFetchAccountEntityName = async (id) => {
//       await lazyFetchAccountEntity(id);
//     };
//     handleFetchAccountEntityName(account?._id);
//   }, [account]);

//   return (
//     <View>
//       <View style={styles.btncontainer}>
//         <SelectDropdown
//           data={accounts}
//           defaultValue="Select Agency"
//           onSelect={(item) => {
//             setAccount(item);
//             setEntity(null);
//           }}
//           buttonTextAfterSelection={(selectedItem) => {
//             return selectedItem.name;
//           }}
//           rowTextForSelection={(item) => {
//             return item.name;
//           }}
//           buttonStyle={styles.dropdownButton}
//           buttonTextStyle={styles.dropdownButtonText}
//           dropdownStyle={styles.dropdown}
//           dropdownTextStyle={styles.dropdownText} // Added style for dropdown text
//         />
//       </View>

//       {account && (
//         <View style={styles.btncontainer}>
//           <SelectDropdown
//             data={accountEntity}
//             defaultValue="Select Entity"
//             onSelect={(item) => setEntity(item)}
//             buttonTextAfterSelection={(selectedItem) => {
//               return selectedItem.name;
//             }}
//             rowTextForSelection={(item) => {
//               return item.name;
//             }}
//             buttonStyle={styles.dropdownButton}
//             buttonTextStyle={styles.dropdownButtonText}
//             dropdownStyle={styles.dropdown}
//             dropdownTextStyle={styles.dropdownText} // Added style for dropdown text
//           />
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = {
//   btncontainer: {
//     marginVertical: 10,
//     paddingHorizontal: 10,
//     width: 200,
//   },
//   dropdownButton: {
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fafafa",
//   },
//   dropdownButtonText: {
//     fontSize: 16,
//   },
//   dropdown: {
//     marginTop: 8,
//     backgroundColor: "#fafafa",
//   },
//   dropdownText: {
//     fontSize: 16, // Adjust the font size as needed
//     color: "#000000", // Adjust the text color as needed
//   },
// };

// export default ExampleComponent;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Vibration,
//   TextInput,
//   Button,
// } from "react-native";

// const TimeCountdown = () => {
//   const [countdown, setCountdown] = useState({
//     years: 0,
//     months: 0,
//     weeks: 0,
//     days: 0,
//     hours: 0,
//     minutes: 0,
//     seconds: 0,
//   });

//   const [inputTime, setInputTime] = useState({
//     years: "",
//     months: "",
//     weeks: "",
//     days: "",
//     hours: "",
//     minutes: "",
//     seconds: "",
//   });

//   const [countdownStarted, setCountdownStarted] = useState(false);

//   const startCountdown = () => {
//     const { years, months, weeks, days, hours, minutes, seconds } = inputTime;

//     setCountdown({
//       years: parseInt(years) || 0,
//       months: parseInt(months) || 0,
//       weeks: parseInt(weeks) || 0,
//       days: parseInt(days) || 0,
//       hours: parseInt(hours) || 0,
//       minutes: parseInt(minutes) || 0,
//       seconds: parseInt(seconds) || 0,
//     });

//     setCountdownStarted(true);
//   };

//   useEffect(() => {
//     if (countdownStarted) {
//       // Start the countdown timer
//       const timer = setInterval(() => {
//         setCountdown((prevCountdown) => {
//           // Calculate the remaining time
//           let { years, months, weeks, days, hours, minutes, seconds } =
//             prevCountdown;

//           if (
//             seconds === 0 &&
//             minutes === 0 &&
//             hours === 0 &&
//             days === 0 &&
//             weeks === 0 &&
//             months === 0 &&
//             years === 0
//           ) {
//             // Countdown has reached 0, perform any action
//             // and stop the countdown

//             // Vibrate the device
//             Vibration.vibrate();

//             // Clear the timer to stop the countdown
//             clearInterval(timer);
//             setCountdownStarted(false);
//           } else {
//             // Decrease the time units
//             if (seconds === 0) {
//               if (minutes === 0) {
//                 if (hours === 0) {
//                   if (days === 0) {
//                     if (weeks === 0) {
//                       if (months === 0) {
//                         // Decrease the years
//                         years--;
//                         months = 11;
//                       } else {
//                         // Decrease the months
//                         months--;
//                         weeks = 4;
//                       }
//                     } else {
//                       // Decrease the weeks
//                       weeks--;
//                       days = 6;
//                     }
//                   } else {
//                     // Decrease the days
//                     days--;
//                     hours = 23;
//                   }
//                 } else {
//                   // Decrease the hours
//                   hours--;
//                   minutes = 59;
//                 }
//               } else {
//                 // Decrease the minutes
//                 minutes--;
//                 seconds = 59;
//               }
//             } else {
//               // Decrease the seconds
//               seconds--;
//             }
//           }

//           return { years, months, weeks, days, hours, minutes, seconds };
//         });
//       }, 1000);

//       // Clean up the timer when the component unmounts or countdown is stopped
//       return () => clearInterval(timer);
//     }
//   }, [countdownStarted]);

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Years"
//         keyboardType="numeric"
//         value={inputTime.years}
//         onChangeText={(text) =>
//           setInputTime((prevState) => ({ ...prevState, years: text }))
//         }
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Months"
//         keyboardType="numeric"
//         value={inputTime.months}
//         onChangeText={(text) =>
//           setInputTime((prevState) => ({ ...prevState, months: text }))
//         }
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Weeks"
//         keyboardType="numeric"
//         value={inputTime.weeks}
//         onChangeText={(text) =>
//           setInputTime((prevState) => ({ ...prevState, weeks: text }))
//         }
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Days"
//         keyboardType="numeric"
//         value={inputTime.days}
//         onChangeText={(text) =>
//           setInputTime((prevState) => ({ ...prevState, days: text }))
//         }
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Hours"
//         keyboardType="numeric"
//         value={inputTime.hours}
//         onChangeText={(text) =>
//           setInputTime((prevState) => ({ ...prevState, hours: text }))
//         }
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Minutes"
//         keyboardType="numeric"
//         value={inputTime.minutes}
//         onChangeText={(text) =>
//           setInputTime((prevState) => ({ ...prevState, minutes: text }))
//         }
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Seconds"
//         keyboardType="numeric"
//         value={inputTime.seconds}
//         onChangeText={(text) =>
//           setInputTime((prevState) => ({ ...prevState, seconds: text }))
//         }
//       />
//       <Button
//         title="Start Countdown"
//         onPress={startCountdown}
//         disabled={countdownStarted}
//       />
//       <View style={styles.countdownContainer}>
//         <Text style={styles.countdownText}>{countdown.years} Years</Text>
//         <Text style={styles.countdownText}>{countdown.months} Months</Text>
//         <Text style={styles.countdownText}>{countdown.weeks} Weeks</Text>
//         <Text style={styles.countdownText}>{countdown.days} Days</Text>
//         <Text style={styles.countdownText}>{countdown.hours} Hours</Text>
//         <Text style={styles.countdownText}>{countdown.minutes} Minutes</Text>
//         <Text style={styles.countdownText}>{countdown.seconds} Seconds</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   input: {
//     height: 40,
//     width: "80%",
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   countdownContainer: {
//     marginTop: 20,
//   },
//   countdownText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });

// export default TimeCountdown;

// import React, { useState } from "react";
// import { View, Text, StyleSheet, TextInput, Button } from "react-native";

// const TimeCountdown1 = () => {
//   const [countdowns, setCountdowns] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [countdownName, setCountdownName] = useState("");

//   const startCountdown = () => {
//     if (selectedCourse && countdownName) {
//       const { years, months, weeks, days, hours, minutes, seconds } =
//         selectedCourse;

//       const newCountdown = {
//         name: countdownName,
//         countdown: {
//           years: parseInt(years) || 0,
//           months: parseInt(months) || 0,
//           weeks: parseInt(weeks) || 0,
//           days: parseInt(days) || 0,
//           hours: parseInt(hours) || 0,
//           minutes: parseInt(minutes) || 0,
//           seconds: parseInt(seconds) || 0,
//         },
//       };

//       setCountdowns((prevCountdowns) => [...prevCountdowns, newCountdown]);
//       setCountdownName("");
//       setSelectedCourse(null);
//     }
//   };

//   const selectCourse = (course) => {
//     setSelectedCourse(course);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.courseContainer}>
//         <Text style={styles.courseText}>Select Course:</Text>
//         {countdowns.length === 0 && (
//           <Text style={styles.courseText}>No courses selected</Text>
//         )}
//         {countdowns.map((countdownObj, index) => (
//           <Text key={index} style={styles.courseText}>
//             - {countdownObj.name}
//           </Text>
//         ))}
//       </View>

//       <View style={styles.countdownContainer}>
//         <Text style={styles.countdownText}>Countdown: </Text>
//         <Text style={styles.countdownText}>
//           {selectedCourse ? selectedCourse.name : "No course selected"}
//         </Text>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Countdown Name"
//         value={countdownName}
//         onChangeText={setCountdownName}
//       />

//       <View style={styles.courseButtonsContainer}>
//         <Button
//           title="Course 1"
//           onPress={() =>
//             selectCourse({
//               id: 1,
//               name: "Course 1",
//               years: 0,
//               months: 1,
//               weeks: 0,
//               days: 0,
//               hours: 0,
//               minutes: 1,
//               seconds: 5,
//             })
//           }
//         />
//         <Button
//           title="Course 2"
//           onPress={() =>
//             selectCourse({
//               id: 2,
//               name: "Course 2",
//               years: 0,
//               months: 2,
//               weeks: 0,
//               days: 0,
//               hours: 0,
//               minutes: 1,
//               seconds: 10,
//             })
//           }
//         />
//         <Button
//           title="Course 3"
//           onPress={() =>
//             selectCourse({
//               id: 3,
//               name: "Course 3",
//               years: 0,
//               months: 3,
//               weeks: 0,
//               days: 0,
//               hours: 0,
//               minutes: 1,
//               seconds: 20,
//             })
//           }
//         />
//       </View>

//       <Button
//         title="Start Countdown"
//         onPress={startCountdown}
//         disabled={!selectedCourse || !countdownName}
//       />

//       {countdowns.map((countdownObj, index) => (
//         <View key={index} style={styles.countdownContainer}>
//           <Text style={styles.countdownName}>{countdownObj.name}</Text>
//           <Text style={styles.countdownText}>
//             {countdownObj.countdown.years} Years
//           </Text>
//           <Text style={styles.countdownText}>
//             {countdownObj.countdown.months} Months
//           </Text>
//           <Text style={styles.countdownText}>
//             {countdownObj.countdown.weeks} Weeks
//           </Text>
//           <Text style={styles.countdownText}>
//             {countdownObj.countdown.days} Days
//           </Text>
//           <Text style={styles.countdownText}>
//             {countdownObj.countdown.hours} Hours
//           </Text>
//           <Text style={styles.countdownText}>
//             {countdownObj.countdown.minutes} Minutes
//           </Text>
//           <Text style={styles.countdownText}>
//             {countdownObj.countdown.seconds} Seconds
//           </Text>
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   courseContainer: {
//     marginBottom: 20,
//   },
//   courseText: {
//     fontSize: 16,
//   },
//   countdownContainer: {
//     marginBottom: 20,
//   },
//   countdownName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   countdownText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     height: 40,
//     width: "80%",
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   courseButtonsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginBottom: 20,
//   },
// });

// export default TimeCountdown1;

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, TextInput, Button } from "react-native";

// const TimeCountdown1 = () => {
//   const [countdowns, setCountdowns] = useState([]);
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [countdownName, setCountdownName] = useState("");
//   const [timeRemaining, setTimeRemaining] = useState("");

//   useEffect(() => {
//     let interval;
//     if (selectedCourse) {
//       interval = setInterval(updateCountdown, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [selectedCourse]);

//   const startCountdown = () => {
//     if (selectedCourse && countdownName) {
//       const { years, months, weeks, days, hours, minutes, seconds } =
//         selectedCourse;

//       const newCountdown = {
//         name: countdownName,
//         countdown: {
//           years: parseInt(years) || 0,
//           months: parseInt(months) || 0,
//           weeks: parseInt(weeks) || 0,
//           days: parseInt(days) || 0,
//           hours: parseInt(hours) || 0,
//           minutes: parseInt(minutes) || 0,
//           seconds: parseInt(seconds) || 0,
//         },
//       };

//       setCountdowns((prevCountdowns) => [...prevCountdowns, newCountdown]);
//       setCountdownName("");
//       setSelectedCourse(null);
//     }
//   };

//   const selectCourse = (course) => {
//     setSelectedCourse(course);
//   };

//   const updateCountdown = () => {
//     const currentTime = new Date().getTime();
//     const selectedTime = new Date(
//       selectedCourse.years,
//       selectedCourse.months - 1,
//       selectedCourse.weeks * 7 + selectedCourse.days,
//       selectedCourse.hours,
//       selectedCourse.minutes,
//       selectedCourse.seconds
//     ).getTime();
//     const timeDifference = selectedTime - currentTime;

//     if (timeDifference <= 0) {
//       setSelectedCourse(null);
//       setTimeRemaining("");
//       return;
//     }

//     const remaining = {
//       years: Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365)),
//       months: Math.floor(
//         (timeDifference % (1000 * 60 * 60 * 24 * 365)) /
//           (1000 * 60 * 60 * 24 * 30)
//       ),
//       weeks: Math.floor(
//         (timeDifference % (1000 * 60 * 60 * 24 * 30)) /
//           (1000 * 60 * 60 * 24 * 7)
//       ),
//       days: Math.floor(
//         (timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
//       ),
//       hours: Math.floor(
//         (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       ),
//       minutes: Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60)),
//       seconds: Math.floor((timeDifference % (1000 * 60)) / 1000),
//     };

//     setTimeRemaining(formatCountdown(remaining));

//     // Update the countdown values for selectedCourse
//     setSelectedCourse((prevCourse) => ({
//       ...prevCourse,
//       ...remaining,
//     }));
//   };

//   const formatCountdown = (countdown) => {
//     return `${countdown.years} Years ${countdown.months} Months ${countdown.weeks} Weeks ${countdown.days} Days ${countdown.hours} Hours ${countdown.minutes} Minutes ${countdown.seconds} Seconds`;
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.courseContainer}>
//         <Text style={styles.courseText}>Select Course:</Text>
//         {countdowns.length === 0 && (
//           <Text style={styles.courseText}>No courses selected</Text>
//         )}
//         {countdowns.map((countdownObj, index) => (
//           <Text key={index} style={styles.courseText}>
//             - {countdownObj.name}
//           </Text>
//         ))}
//       </View>

//       <View style={styles.countdownContainer}>
//         <Text style={styles.countdownText}>Countdown: </Text>
//         <Text style={styles.countdownText}>
//           {selectedCourse ? selectedCourse.name : "No course selected"}
//         </Text>
//       </View>

//       <TextInput
//         style={styles.input}
//         placeholder="Countdown Name"
//         value={countdownName}
//         onChangeText={setCountdownName}
//       />

//       <View style={styles.courseButtonsContainer}>
//         <Button
//           title="Course 1"
//           onPress={() =>
//             selectCourse({
//               id: 1,
//               name: "Course 1",
//               years: 0,
//               months: 1,
//               weeks: 0,
//               days: 0,
//               hours: 0,
//               minutes: 1,
//               seconds: 5,
//             })
//           }
//         />
//         <Button
//           title="Course 2"
//           onPress={() =>
//             selectCourse({
//               id: 2,
//               name: "Course 2",
//               years: 0,
//               months: 2,
//               weeks: 0,
//               days: 0,
//               hours: 0,
//               minutes: 1,
//               seconds: 10,
//             })
//           }
//         />
//         <Button
//           title="Course 3"
//           onPress={() =>
//             selectCourse({
//               id: 3,
//               name: "Course 3",
//               years: 0,
//               months: 3,
//               weeks: 0,
//               days: 0,
//               hours: 0,
//               minutes: 1,
//               seconds: 20,
//             })
//           }
//         />
//       </View>

//       <Button
//         title="Start Countdown"
//         onPress={startCountdown}
//         disabled={!selectedCourse || !countdownName}
//       />

//       {countdowns.map((countdownObj, index) => (
//         <View key={index} style={styles.countdownContainer}>
//           <Text style={styles.countdownName}>{countdownObj.name}</Text>
//           <Text style={styles.countdownText}>
//             {formatCountdown(countdownObj.countdown)}
//           </Text>
//         </View>
//       ))}
//       {timeRemaining && (
//         <View style={styles.countdownContainer}>
//           <Text style={styles.countdownName}>Current Countdown</Text>
//           <Text style={styles.countdownText}>{timeRemaining}</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   courseContainer: {
//     marginBottom: 20,
//   },
//   courseText: {
//     fontSize: 16,
//   },
//   countdownContainer: {
//     marginBottom: 20,
//   },
//   countdownName: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   countdownText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     height: 40,
//     width: "80%",
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//   },
//   courseButtonsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginBottom: 20,
//   },
// });

// export default TimeCountdown1;
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Button } from "react-native";

// const TimeCountdown1 = () => {
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [timeRemaining, setTimeRemaining] = useState("");

//   const courses = [
//     {
//       id: 1,
//       name: "Course 1",
//       duration: 60, // duration in seconds
//     },
//     {
//       id: 2,
//       name: "Course 2",
//       duration: 120,
//     },
//     {
//       id: 3,
//       name: "Course 3",
//       duration: 180,
//     },
//   ];

//   useEffect(() => {
//     let interval;

//     if (selectedCourse) {
//       const endTime = Date.now() + selectedCourse.duration * 1000;

//       interval = setInterval(() => {
//         const currentTime = Date.now();
//         const remainingTime = endTime - currentTime;

//         if (remainingTime <= 0) {
//           setSelectedCourse(null);
//           setTimeRemaining("");
//           clearInterval(interval);
//         } else {
//           const seconds = Math.floor(remainingTime / 1000) % 60;
//           const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//           const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//           const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//           setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//         }
//       }, 1000);
//     }

//     return () => clearInterval(interval);
//   }, [selectedCourse]);

//   const startCountdown = (course) => {
//     setSelectedCourse(course);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.courseButtonsContainer}>
//         {courses.map((course) => (
//           <Button
//             key={course.id}
//             title={course.name}
//             onPress={() => startCountdown(course)}
//           />
//         ))}
//       </View>

//       <View style={styles.countdownContainer}>
//         <Text style={styles.countdownText}>
//           {selectedCourse
//             ? `${selectedCourse.name} Countdown: ${timeRemaining}`
//             : "No course selected"}
//         </Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   courseButtonsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-evenly",
//     marginBottom: 20,
//   },
//   countdownContainer: {
//     marginBottom: 20,
//   },
//   countdownText: {
//     fontSize: 16,
//   },
// });

// export default TimeCountdown1;

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const CountdownExample = () => {
  const [countdowns, setCountdowns] = useState([]);

  const courses = [
    {
      id: 1,
      name: "Course 1",
      duration: 60, // duration in seconds
    },
    {
      id: 2,
      name: "Course 2",
      duration: 120,
    },
    {
      id: 3,
      name: "Course 3",
      duration: 180,
    },
  ];

  const startCountdown = (course) => {
    const countdownExists = countdowns.some(
      (countdownObj) => countdownObj.id === course.id
    );

    if (countdownExists) {
      return; // Don't start a new countdown if one already exists for the course
    }

    const endTime = Date.now() + course.duration * 1000;
    const interval = setInterval(() => {
      const currentTime = Date.now();
      const remainingTime = endTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(interval);
        setCountdowns((prevCountdowns) =>
          prevCountdowns.filter((countdownObj) => countdownObj.id !== course.id)
        );
      } else {
        const seconds = Math.floor(remainingTime / 1000) % 60;
        const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
        const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
        const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

        const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        setCountdowns((prevCountdowns) => [
          ...prevCountdowns,
          { id: course.id, countdown },
        ]);
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdownContainer}>
        {countdowns.length === 0 ? (
          <Text style={styles.countdownText}>No courses selected</Text>
        ) : (
          countdowns.map((countdownObj) => (
            <Text
              key={`${countdownObj.id}-${countdownObj.countdown}`}
              style={styles.countdownText}
            >
              {courses.find((course) => course.id === countdownObj.id).name}{" "}
              Countdown: {countdownObj.countdown}
            </Text>
          ))
        )}
      </View>

      <View style={styles.courseButtonsContainer}>
        {courses.map((course) => (
          <Button
            key={course.id}
            title={course.name}
            onPress={() => startCountdown(course)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  courseButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  countdownContainer: {
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CountdownExample;
