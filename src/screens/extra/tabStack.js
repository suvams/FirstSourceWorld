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

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Button } from "react-native";

// const CountdownExample = () => {
//   const [countdown, setCountdown] = useState(null);

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

//   const startCountdown = (course) => {
//     const countdownExists = countdown && countdown.id === course.id;

//     if (countdownExists) {
//       return; // Don't start a new countdown if one already exists for the course
//     }

//     const endTime = Date.now() + course.duration * 1000;
//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const remainingTime = endTime - currentTime;

//       if (remainingTime <= 0) {
//         clearInterval(interval);
//         setCountdown(null);
//       } else {
//         const seconds = Math.floor(remainingTime / 1000) % 60;
//         const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//         const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//         const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//         const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//         setCountdown({ id: course.id, countdown });
//       }
//     }, 1000);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.countdownContainer}>
//         {countdown ? (
//           <Text style={styles.countdownText}>
//             {courses.find((course) => course.id === countdown.id).name}{" "}
//             Countdown: {countdown.countdown}
//           </Text>
//         ) : (
//           <Text style={styles.countdownText}>No courses selected</Text>
//         )}
//       </View>

//       <View style={styles.courseButtonsContainer}>
//         {courses.map((course) => (
//           <Button
//             key={course.id}
//             title={course.name}
//             onPress={() => startCountdown(course)}
//           />
//         ))}
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
//     marginBottom: 5,
//   },
// });

// export default CountdownExample;

// //Correct code
// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Button } from "react-native";

// const CountdownExample = () => {
//   const [countdowns, setCountdowns] = useState({});

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

//   const startCountdown = (course) => {
//     if (countdowns[course.id]) {
//       return; // Don't start a new countdown if one already exists for the course
//     }

//     const endTime = Date.now() + course.duration * 1000;
//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const remainingTime = endTime - currentTime;

//       if (remainingTime <= 0) {
//         clearInterval(interval);
//         setCountdowns((prevCountdowns) => {
//           const updatedCountdowns = { ...prevCountdowns };
//           delete updatedCountdowns[course.id];
//           return updatedCountdowns;
//         });
//       } else {
//         const seconds = Math.floor(remainingTime / 1000) % 60;
//         const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//         const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//         const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//         const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//         setCountdowns((prevCountdowns) => ({
//           ...prevCountdowns,
//           [course.id]: { countdown, interval },
//         }));
//       }
//     }, 1000);
//   };

//   useEffect(() => {
//     return () => {
//       // Cleanup function to clear all countdown intervals when the component unmounts
//       Object.values(countdowns).forEach((countdownObj) =>
//         clearInterval(countdownObj.interval)
//       );
//     };
//   }, []);

//   return (
//     <View style={styles.container}>
//       {courses.map((course) => {
//         const countdownObj = countdowns[course.id];

//         return (
//           <View key={course.id} style={styles.countdownContainer}>
//             {countdownObj && (
//               <Text style={styles.countdownText}>
//                 {course.name} Countdown: {countdownObj.countdown}
//               </Text>
//             )}
//             {!countdownObj && (
//               <Button
//                 title={course.name}
//                 onPress={() => startCountdown(course)}
//               />
//             )}
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   countdownContainer: {
//     marginBottom: 20,
//   },
//   countdownText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

// export default CountdownExample;

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Button, TextInput } from "react-native";

// const CountdownExample = () => {
//   const [countdowns, setCountdowns] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState(null);

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

//   const startCountdown = (course) => {
//     if (countdowns[course.id]) {
//       return; // Don't start a new countdown if one already exists for the course
//     }

//     const endTime = Date.now() + course.duration * 1000;
//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const remainingTime = endTime - currentTime;

//       if (remainingTime <= 0) {
//         clearInterval(interval);
//         setCountdowns((prevCountdowns) => {
//           const updatedCountdowns = { ...prevCountdowns };
//           delete updatedCountdowns[course.id];
//           return updatedCountdowns;
//         });
//       } else {
//         const seconds = Math.floor(remainingTime / 1000) % 60;
//         const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//         const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//         const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//         const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//         setCountdowns((prevCountdowns) => ({
//           ...prevCountdowns,
//           [course.id]: { countdown, interval },
//         }));
//       }
//     }, 1000);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setSelectedCourse(null);
//   };

//   const handleCourseSelect = (course) => {
//     setSelectedCourse(course);
//     startCountdown(course);
//   };

//   useEffect(() => {
//     return () => {
//       // Cleanup function to clear all countdown intervals when the component unmounts
//       Object.values(countdowns).forEach((countdownObj) =>
//         clearInterval(countdownObj.interval)
//       );
//     };
//   }, []);

//   const filteredCourses = courses.filter((course) =>
//     course.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search for a course"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {!selectedCourse && (
//         <View style={styles.coursesContainer}>
//           {filteredCourses.map((course) => (
//             <Button
//               key={course.id}
//               title={course.name}
//               onPress={() => handleCourseSelect(course)}
//             />
//           ))}
//         </View>
//       )}

//       {Object.keys(countdowns).map((courseId) => (
//         <View key={courseId} style={styles.countdownContainer}>
//           <Text style={styles.countdownText}>
//             {courses.find((course) => course.id === parseInt(courseId)).name}{" "}
//             Countdown: {countdowns[courseId].countdown}
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
//   searchInput: {
//     height: 40,
//     width: 200,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   coursesContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   countdownContainer: {
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   countdownText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
// });

// export default CountdownExample;

// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet, Button, TextInput, Modal } from "react-native";

// const CountdownExample = () => {
//   const [countdowns, setCountdowns] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [countdownName, setCountdownName] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);

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

//   const startCountdown = (course, name) => {
//     if (countdowns[course.id]) {
//       return; // Don't start a new countdown if one already exists for the course
//     }

//     const endTime = Date.now() + course.duration * 1000;
//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const remainingTime = endTime - currentTime;

//       if (remainingTime <= 0) {
//         clearInterval(interval);
//         setCountdowns((prevCountdowns) => {
//           const updatedCountdowns = { ...prevCountdowns };
//           delete updatedCountdowns[course.id];
//           return updatedCountdowns;
//         });
//       } else {
//         const seconds = Math.floor(remainingTime / 1000) % 60;
//         const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//         const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//         const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//         const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//         setCountdowns((prevCountdowns) => ({
//           ...prevCountdowns,
//           [course.id]: { name, countdown, interval },
//         }));
//       }
//     }, 1000);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setSelectedCourse(null);
//   };

//   const handleCourseSelect = (course) => {
//     setSelectedCourse(course);
//     setModalVisible(true);
//   };

//   const handleStartCountdown = () => {
//     startCountdown(selectedCourse, countdownName);
//     setModalVisible(false);
//     setCountdownName("");
//   };

//   useEffect(() => {
//     return () => {
//       // Cleanup function to clear all countdown intervals when the component unmounts
//       Object.values(countdowns).forEach((countdownObj) =>
//         clearInterval(countdownObj.interval)
//       );
//     };
//   }, []);

//   const filteredCourses = courses.filter((course) =>
//     course.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search for a course"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {!selectedCourse && (
//         <View style={styles.coursesContainer}>
//           {filteredCourses.map((course) => (
//             <Button
//               key={course.id}
//               title={course.name}
//               onPress={() => handleCourseSelect(course)}
//             />
//           ))}
//         </View>
//       )}

//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalText}>Enter Countdown Name:</Text>
//           <TextInput
//             style={styles.modalInput}
//             placeholder="Countdown Name"
//             value={countdownName}
//             onChangeText={setCountdownName}
//           />
//           <Button title="Start Countdown" onPress={handleStartCountdown} />
//         </View>
//       </Modal>

//       {Object.keys(countdowns).map((courseId) => (
//         <View key={courseId} style={styles.countdownContainer}>
//           <Text style={styles.countdownText}>
//             {courses.find((course) => course.id === parseInt(courseId)).name}{" "}
//             Countdown: {countdowns[courseId].countdown}
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
//   searchInput: {
//     height: 40,
//     width: 200,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   coursesContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   countdownContainer: {
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   countdownText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   modalInput: {
//     height: 40,
//     width: 200,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });

// export default CountdownExample;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Modal,
// } from "react-native";

// const CountdownExample = () => {
//   const [countdowns, setCountdowns] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [countdownName, setCountdownName] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);

//   const courses = [
//     {
//       id: 1,
//       name: "Course 1",
//       upcomingEventDate: new Date("2023-06-01T12:00:00"), // set the upcoming event date for Course 1
//     },
//     {
//       id: 2,
//       name: "Course 2",
//       upcomingEventDate: new Date("2023-06-05T09:30:00"), // set the upcoming event date for Course 2
//     },
//     {
//       id: 3,
//       name: "Course 3",
//       upcomingEventDate: new Date("2023-06-10T18:15:00"), // set the upcoming event date for Course 3
//     },
//   ];

//   const startCountdown = (course, name) => {
//     if (countdowns[course.id]) {
//       return; // Don't start a new countdown if one already exists for the course
//     }

//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const remainingTime = course.upcomingEventDate - currentTime;

//       if (remainingTime <= 0) {
//         clearInterval(interval);
//         setCountdowns((prevCountdowns) => {
//           const updatedCountdowns = { ...prevCountdowns };
//           delete updatedCountdowns[course.id];
//           return updatedCountdowns;
//         });
//       } else {
//         const seconds = Math.floor(remainingTime / 1000) % 60;
//         const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//         const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//         const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//         const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//         setCountdowns((prevCountdowns) => ({
//           ...prevCountdowns,
//           [course.id]: { name, countdown, countdownName: name, interval },
//         }));
//       }
//     }, 1000);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setSelectedCourse(null);
//   };

//   const handleCourseSelect = (course) => {
//     setSelectedCourse(course);
//     setModalVisible(true);
//   };

//   const handleStartCountdown = () => {
//     startCountdown(selectedCourse, countdownName);
//     setModalVisible(false);
//     setCountdownName("");
//   };

//   useEffect(() => {
//     return () => {
//       // Cleanup function to clear all countdown intervals when the component unmounts
//       Object.values(countdowns).forEach((countdownObj) =>
//         clearInterval(countdownObj.interval)
//       );
//     };
//   }, []);

//   const filteredCourses = courses.filter((course) =>
//     course.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const calculateRemainingTime = (upcomingEventDate) => {
//     const currentTime = new Date();
//     const remainingTime = upcomingEventDate - currentTime;

//     const seconds = Math.floor(remainingTime / 1000) % 60;
//     const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//     const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//     const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search for a course"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {!selectedCourse && (
//         <View style={styles.coursesContainer}>
//           {filteredCourses.map((course) => (
//             <TouchableOpacity
//               key={course.id}
//               style={styles.courseButton}
//               onPress={() => handleCourseSelect(course)}
//             >
//               <Text style={styles.courseButtonText}>{course.name}</Text>
//               {countdowns[course.id] && (
//                 <Text style={styles.countdownText}>
//                   Countdown: {countdowns[course.id].countdown}
//                 </Text>
//               )}
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}

//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalText}>Upcoming Event Date:</Text>
//           <Text style={styles.modalText}>
//             {selectedCourse && selectedCourse.upcomingEventDate.toDateString()}
//           </Text>
//           <Text style={styles.modalText}>Remaining Time:</Text>
//           <Text style={styles.modalText}>
//             {selectedCourse &&
//               calculateRemainingTime(selectedCourse.upcomingEventDate)}
//           </Text>
//           <Text style={styles.modalText}>Enter Countdown Name:</Text>
//           <TextInput
//             style={styles.modalInput}
//             placeholder="Countdown Name"
//             value={countdownName}
//             onChangeText={setCountdownName}
//           />
//           <TouchableOpacity
//             style={styles.startButton}
//             onPress={handleStartCountdown}
//           >
//             <Text style={styles.startButtonText}>Start Countdown</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchInput: {
//     height: 40,
//     width: 200,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   coursesContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   courseButton: {
//     marginBottom: 10,
//     padding: 10,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 5,
//   },
//   courseButtonText: {
//     fontSize: 16,
//   },
//   countdownText: {
//     fontSize: 14,
//     color: "gray",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   modalInput: {
//     height: 40,
//     width: 200,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   startButton: {
//     backgroundColor: "blue",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   startButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

// export default CountdownExample;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Modal,
// } from "react-native";

// const CountdownExample = () => {
//   const [countdowns, setCountdowns] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [countdownName, setCountdownName] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);

//   const courses = [
//     {
//       id: 1,
//       name: "Course 1",
//       upcomingEventDate: new Date("2023-06-01T12:00:00"), // set the upcoming event date for Course 1
//     },
//     {
//       id: 2,
//       name: "Course 2",
//       upcomingEventDate: new Date("2023-06-05T09:30:00"), // set the upcoming event date for Course 2
//     },
//     {
//       id: 3,
//       name: "Course 3",
//       upcomingEventDate: new Date("2023-06-10T18:15:00"), // set the upcoming event date for Course 3
//     },
//   ];

//   const startCountdown = (course, name) => {
//     if (countdowns[course.id]) {
//       return; // Don't start a new countdown if one already exists for the course
//     }

//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const remainingTime = course.upcomingEventDate - currentTime;

//       if (remainingTime <= 0) {
//         clearInterval(interval);
//         setCountdowns((prevCountdowns) => {
//           const updatedCountdowns = { ...prevCountdowns };
//           delete updatedCountdowns[course.id];
//           return updatedCountdowns;
//         });
//       } else {
//         const seconds = Math.floor(remainingTime / 1000) % 60;
//         const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//         const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//         const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//         const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//         setCountdowns((prevCountdowns) => ({
//           ...prevCountdowns,
//           [course.id]: { name, countdown, countdownName: name, interval },
//         }));
//       }
//     }, 1000);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setSelectedCourse(null);
//   };

//   const handleCourseSelect = (course) => {
//     setSelectedCourse(course);
//     setModalVisible(true);
//   };

//   const handleStartCountdown = () => {
//     startCountdown(selectedCourse, countdownName);
//     setModalVisible(false);
//     setCountdownName("");
//   };

//   useEffect(() => {
//     return () => {
//       // Cleanup function to clear all countdown intervals when the component unmounts
//       Object.values(countdowns).forEach((countdownObj) =>
//         clearInterval(countdownObj.interval)
//       );
//     };
//   }, []);

//   const filteredCourses = courses.filter((course) =>
//     course.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const calculateRemainingTime = (upcomingEventDate) => {
//     const currentTime = new Date();
//     const remainingTime = upcomingEventDate - currentTime;

//     const seconds = Math.floor(remainingTime / 1000) % 60;
//     const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//     const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//     const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search for a course"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       <View style={styles.coursesContainer}>
//         {filteredCourses.map((course) => (
//           <TouchableOpacity
//             key={course.id}
//             style={styles.courseButton}
//             onPress={() => handleCourseSelect(course)}
//           >
//             <Text style={styles.courseButtonText}>{course.name}</Text>
//             {countdowns[course.id] && (
//               <Text style={styles.countdownText}>
//                 Countdown: {countdowns[course.id].countdown}
//               </Text>
//             )}
//           </TouchableOpacity>
//         ))}
//       </View>

//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalText}>Upcoming Event Date:</Text>
//           <Text style={styles.modalText}>
//             {selectedCourse && selectedCourse.upcomingEventDate.toDateString()}
//           </Text>
//           <Text style={styles.modalText}>Remaining Time:</Text>
//           <Text style={styles.modalText}>
//             {selectedCourse &&
//               calculateRemainingTime(selectedCourse.upcomingEventDate)}
//           </Text>
//           <Text style={styles.modalText}>Enter Countdown Name:</Text>
//           <TextInput
//             style={styles.modalInput}
//             placeholder="Countdown Name"
//             value={countdownName}
//             onChangeText={setCountdownName}
//           />
//           <TouchableOpacity
//             style={styles.startButton}
//             onPress={handleStartCountdown}
//           >
//             <Text style={styles.startButtonText}>Start Countdown</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   searchInput: {
//     height: 40,
//     width: 200,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   coursesContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   courseButton: {
//     marginBottom: 10,
//     padding: 10,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 5,
//   },
//   courseButtonText: {
//     fontSize: 16,
//   },
//   countdownText: {
//     fontSize: 14,
//     color: "gray",
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   modalInput: {
//     height: 40,
//     width: 200,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
// });

// export default CountdownExample;

//aaaaaaaaaaaaaaaaaaaaaaaaaaaa

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Modal,
// } from "react-native";

// const CountdownExample = () => {
//   const [countdowns, setCountdowns] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [countdownName, setCountdownName] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);

//   const courses = [
//     {
//       id: 1,
//       name: "Course 1",
//       upcomingEventDate: new Date("2023-06-01T12:00:00"), // set the upcoming event date for Course 1
//     },
//     {
//       id: 2,
//       name: "Course 2",
//       upcomingEventDate: new Date("2023-06-05T09:30:00"), // set the upcoming event date for Course 2
//     },
//     {
//       id: 3,
//       name: "Course 3",
//       upcomingEventDate: new Date("2023-06-10T18:15:00"), // set the upcoming event date for Course 3
//     },
//   ];

//   const startCountdown = (course, name) => {
//     if (countdowns[course.id]) {
//       return; // Don't start a new countdown if one already exists for the course
//     }

//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const remainingTime = course.upcomingEventDate - currentTime;

//       if (remainingTime <= 0) {
//         clearInterval(interval);
//         setCountdowns((prevCountdowns) => {
//           const updatedCountdowns = { ...prevCountdowns };
//           delete updatedCountdowns[course.id];
//           return updatedCountdowns;
//         });
//       } else {
//         const seconds = Math.floor(remainingTime / 1000) % 60;
//         const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//         const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//         const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//         const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//         setCountdowns((prevCountdowns) => ({
//           ...prevCountdowns,
//           [course.id]: { name, countdown, countdownName: name, interval },
//         }));
//       }
//     }, 1000);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setSelectedCourse(null);
//   };

//   const handleCourseSelect = (course) => {
//     setSelectedCourse(course);
//     setModalVisible(true);
//   };

//   const handleStartCountdown = () => {
//     startCountdown(selectedCourse, countdownName);
//     setModalVisible(false);
//     setCountdownName("");
//   };

//   useEffect(() => {
//     return () => {
//       // Cleanup function to clear all countdown intervals when the component unmounts
//       Object.values(countdowns).forEach((countdownObj) =>
//         clearInterval(countdownObj.interval)
//       );
//     };
//   }, []);

//   const filteredCourses = courses.filter((course) =>
//     course.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const calculateRemainingTime = (upcomingEventDate) => {
//     const currentTime = new Date();
//     const remainingTime = upcomingEventDate - currentTime;

//     const seconds = Math.floor(remainingTime / 1000) % 60;
//     const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//     const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//     const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search for a course"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {!selectedCourse && (
//         <View style={styles.coursesContainer}>
//           {filteredCourses.map((course) => (
//             <TouchableOpacity
//               key={course.id}
//               style={styles.courseButton}
//               onPress={() => handleCourseSelect(course)}
//             >
//               <Text style={styles.courseButtonText}>{course.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}

//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalText}>Upcoming Event Date:</Text>
//           <Text style={styles.modalText}>
//             {selectedCourse && selectedCourse.upcomingEventDate.toDateString()}
//           </Text>
//           <Text style={styles.modalText}>Remaining Time:</Text>
//           <Text style={styles.modalText}>
//             {selectedCourse &&
//               calculateRemainingTime(selectedCourse.upcomingEventDate)}
//           </Text>
//           <Text style={styles.modalText}>Enter Countdown Name:</Text>
//           <TextInput
//             style={styles.modalInput}
//             placeholder="Countdown Name"
//             value={countdownName}
//             onChangeText={setCountdownName}
//           />
//           <TouchableOpacity
//             style={styles.startButton}
//             onPress={handleStartCountdown}
//           >
//             <Text style={styles.startButtonText}>Start Countdown</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       {Object.keys(countdowns).map((courseId) => (
//         <View key={courseId} style={styles.countdownContainer}>
//           <Text style={styles.countdownText}>
//             {courses.find((course) => course.id === parseInt(courseId)).name}{" "}
//             Countdown: {countdowns[courseId].countdown}
//           </Text>
//           <Text style={styles.countdownText}>
//             Countdown Name: {countdowns[courseId].countdownName}
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
//   searchInput: {
//     height: 40,
//     width: 200,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   coursesContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   countdownContainer: {
//     marginBottom: 20,
//     alignItems: "center",
//   },
//   countdownText: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   modalInput: {
//     height: 40,
//     width: 200,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   startButton: {
//     backgroundColor: "blue",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 5,
//   },
//   startButtonText: {
//     color: "white",
//     fontSize: 16,
//   },
// });

// export default CountdownExample;

// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   Modal,
// } from "react-native";

// const CountdownExample = () => {
//   const [countdowns, setCountdowns] = useState({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCourse, setSelectedCourse] = useState(null);
//   const [countdownName, setCountdownName] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);

//   const courses = [
//     {
//       id: 1,
//       name: "Course 1",
//       upcomingEventDate: new Date("2023-06-01T12:00:00"), // set the upcoming event date for Course 1
//       startTime: new Date("2023-06-01T10:00:00"), // set the start time for Course 1 (for countup)
//     },
//     {
//       id: 2,
//       name: "Course 2",
//       upcomingEventDate: new Date("2023-06-05T09:30:00"), // set the upcoming event date for Course 2
//       startTime: new Date("2023-06-05T08:00:00"), // set the start time for Course 2 (for countup)
//     },
//     {
//       id: 3,
//       name: "Course 3",
//       upcomingEventDate: new Date("2023-06-10T18:15:00"), // set the upcoming event date for Course 3
//       startTime: new Date("2023-06-10T17:30:00"), // set the start time for Course 3 (for countup)
//     },
//   ];

//   const startCountdown = (course, name) => {
//     if (countdowns[course.id]) {
//       return; // Don't start a new countdown if one already exists for the course
//     }

//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const remainingTime = course.upcomingEventDate - currentTime;

//       if (remainingTime <= 0) {
//         clearInterval(interval);
//         setCountdowns((prevCountdowns) => {
//           const updatedCountdowns = { ...prevCountdowns };
//           delete updatedCountdowns[course.id];
//           return updatedCountdowns;
//         });
//       } else {
//         const seconds = Math.floor(remainingTime / 1000) % 60;
//         const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//         const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//         const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//         const countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//         setCountdowns((prevCountdowns) => ({
//           ...prevCountdowns,
//           [course.id]: { name, countdown, countdownName: name, interval },
//         }));
//       }
//     }, 1000);
//   };

//   const startCountup = (course, name) => {
//     if (countdowns[course.id]) {
//       return; // Don't start a new countup if one already exists for the course
//     }

//     const interval = setInterval(() => {
//       const currentTime = Date.now();
//       const elapsedTime = currentTime - course.startTime;

//       const seconds = Math.floor(elapsedTime / 1000) % 60;
//       const minutes = Math.floor(elapsedTime / 1000 / 60) % 60;
//       const hours = Math.floor(elapsedTime / 1000 / 60 / 60) % 24;
//       const days = Math.floor(elapsedTime / 1000 / 60 / 60 / 24);

//       const countup = `${days}d ${hours}h ${minutes}m ${seconds}s`;

//       setCountdowns((prevCountdowns) => ({
//         ...prevCountdowns,
//         [course.id]: { name, countup, countdownName: name, interval },
//       }));
//     }, 1000);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setSelectedCourse(null);
//   };

//   const handleCourseSelect = (course) => {
//     setSelectedCourse(course);
//     setModalVisible(true);
//   };

//   const handleStartCountdown = () => {
//     startCountdown(selectedCourse, countdownName);
//     setModalVisible(false);
//     setCountdownName("");
//   };

//   useEffect(() => {
//     return () => {
//       // Cleanup function to clear all countdown intervals when the component unmounts
//       Object.values(countdowns).forEach((countdownObj) =>
//         clearInterval(countdownObj.interval)
//       );
//     };
//   }, []);

//   const filteredCourses = courses.filter((course) =>
//     course.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const calculateRemainingTime = (upcomingEventDate) => {
//     const currentTime = new Date();
//     const remainingTime = upcomingEventDate - currentTime;

//     const seconds = Math.floor(remainingTime / 1000) % 60;
//     const minutes = Math.floor(remainingTime / 1000 / 60) % 60;
//     const hours = Math.floor(remainingTime / 1000 / 60 / 60) % 24;
//     const days = Math.floor(remainingTime / 1000 / 60 / 60 / 24);

//     return `${days}d ${hours}h ${minutes}m ${seconds}s`;
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search for a course"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {!selectedCourse && (
//         <View style={styles.coursesContainer}>
//           {filteredCourses.map((course) => (
//             <TouchableOpacity
//               key={course.id}
//               style={styles.courseButton}
//               onPress={() => handleCourseSelect(course)}
//             >
//               <Text style={styles.courseButtonText}>{course.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </View>
//       )}

//       <Modal visible={modalVisible} animationType="slide">
//         <View style={styles.modalContainer}>
//           <Text style={styles.modalText}>Upcoming Event Date:</Text>
//           <Text style={styles.modalText}>
//             {selectedCourse && selectedCourse.upcomingEventDate.toDateString()}
//           </Text>
//           <Text style={styles.modalText}>Remaining Time:</Text>
//           <Text style={styles.modalText}>
//             {selectedCourse &&
//               calculateRemainingTime(selectedCourse.upcomingEventDate)}
//           </Text>
//           <Text style={styles.modalText}>Enter Countdown Name:</Text>
//           <TextInput
//             style={styles.modalInput}
//             placeholder="Countdown Name"
//             value={countdownName}
//             onChangeText={setCountdownName}
//           />
//           <TouchableOpacity
//             style={styles.startButton}
//             onPress={handleStartCountdown}
//           >
//             <Text style={styles.startButtonText}>Start Countdown </Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.startButton}
//             onPress={() => startCountup(selectedCourse, countdownName)}
//           >
//             <Text style={styles.startButtonText}>Start Countup</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.cancelButton}
//             onPress={() => setModalVisible(false)}
//           >
//             <Text style={styles.cancelButtonText}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>

//       <View style={styles.countdownsContainer}>
//         {Object.values(countdowns).map((countdown) => (
//           <View key={countdown.countdownName} style={styles.countdownItem}>
//             <Text style={styles.countdownName}>{countdown.countdownName}</Text>
//             <Text style={styles.countdownText}>{countdown.countdown}</Text>
//           </View>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   searchInput: {
//     marginBottom: 16,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 4,
//   },
//   coursesContainer: {
//     flex: 1,
//   },
//   courseButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     marginBottom: 8,
//     backgroundColor: "#f0f0f0",
//     borderRadius: 4,
//   },
//   courseButtonText: {
//     fontSize: 16,
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modalText: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
//   modalInput: {
//     width: "80%",
//     marginBottom: 16,
//     padding: 8,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 4,
//   },
//   startButton: {
//     backgroundColor: "#1e90ff",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//     marginBottom: 8,
//   },
//   startButtonText: {
//     fontSize: 16,
//     color: "#fff",
//   },
//   cancelButton: {
//     backgroundColor: "#ccc",
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 4,
//   },
//   cancelButtonText: {
//     fontSize: 16,
//     color: "#fff",
//   },
//   countdownsContainer: {
//     marginTop: 16,
//   },
//   countdownItem: {
//     marginBottom: 8,
//   },
//   countdownName: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   countdownText: {
//     fontSize: 14,
//   },
// });

// export default CountdownExample;

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const CountupExample = () => {
  const upcomingEventDates = [
    new Date("2023-06-01T12:00:00"), // Replace with your first upcoming event date
    new Date("2023-06-00T09:30:00"), // Replace with your second upcoming event date
  ];

  const [countups, setCountups] = useState([]);
  const [showCountups, setShowCountups] = useState(false);

  useEffect(() => {
    let intervals = [];

    if (showCountups) {
      intervals = upcomingEventDates.map((eventDate) => {
        return setInterval(() => {
          const currentTime = Date.now();
          const elapsedTime = currentTime - eventDate.getTime();

          const seconds = Math.floor((elapsedTime / 1000) % 60);
          const minutes = Math.floor((elapsedTime / 1000 / 60) % 60);
          const hours = Math.floor((elapsedTime / 1000 / 60 / 60) % 24);
          const days = Math.floor(elapsedTime / 1000 / 60 / 60 / 24);

          const countupText =
            elapsedTime >= 0
              ? `${days}d ${hours}h ${minutes}m ${seconds}s`
              : "Event has passed";

          setCountups((prevCountups) => {
            const updatedCountups = [...prevCountups];
            const index = updatedCountups.findIndex(
              (countup) => countup.eventDate.getTime() === eventDate.getTime()
            );
            if (index !== -1) {
              updatedCountups[index].countup = countupText;
            } else {
              updatedCountups.push({ eventDate, countup: countupText });
            }
            return updatedCountups;
          });
        }, 1000);
      });
    }

    return () => {
      intervals.forEach((interval) => clearInterval(interval));
    };
  }, [showCountups]);

  const handleButtonPress = () => {
    setShowCountups(true);
  };

  return (
    <View style={styles.container}>
      {showCountups ? (
        countups.map((countupObj, index) => (
          <Text key={index} style={styles.countupText}>
            {countupObj.eventDate.toDateString()}: {countupObj.countup}
          </Text>
        ))
      ) : (
        <Button title="Start Countup" onPress={handleButtonPress} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  countupText: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default CountupExample;
