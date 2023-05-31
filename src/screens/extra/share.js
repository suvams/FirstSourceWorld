// import React from "react";
// import { Share, Button, View } from "react-native";

// const ShareLinkButton = () => {
//   const handleShare = async () => {
//     try {
//       const result = await Share.share({
//         message: "Check out this cool link: https://example.com",
//         url: "https://example.com",
//         title: "Example Website",
//       });
//       if (result.action === Share.sharedAction) {
//         console.log("Link shared successfully");
//       } else if (result.action === Share.dismissedAction) {
//         console.log("Link sharing dismissed");
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   return (
//     <View>
//       <Button title="Share Link" onPress={handleShare} />
//     </View>
//   );
// };

// export default ShareLinkButton;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Vibration,
  TextInput,
  Button,
} from "react-native";

const TimeCountdown1 = () => {
  const [countdown, setCountdown] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [inputTime, setInputTime] = useState({
    years: "",
    months: "",
    weeks: "",
    days: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  const [countdownStarted, setCountdownStarted] = useState(false);

  const startCountdown = () => {
    const { years, months, weeks, days, hours, minutes, seconds } = inputTime;

    setCountdown({
      years: parseInt(years) || 0,
      months: parseInt(months) || 0,
      weeks: parseInt(weeks) || 0,
      days: parseInt(days) || 0,
      hours: parseInt(hours) || 0,
      minutes: parseInt(minutes) || 0,
      seconds: parseInt(seconds) || 0,
    });

    setCountdownStarted(true);
  };

  useEffect(() => {
    if (countdownStarted) {
      // Start the countdown timer
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          // Calculate the remaining time
          let { years, months, weeks, days, hours, minutes, seconds } =
            prevCountdown;

          if (
            seconds === 0 &&
            minutes === 0 &&
            hours === 0 &&
            days === 0 &&
            weeks === 0 &&
            months === 0 &&
            years === 0
          ) {
            // Countdown has reached 0, perform any action
            // and stop the countdown

            // Vibrate the device
            Vibration.vibrate();

            // Clear the timer to stop the countdown
            clearInterval(timer);
            setCountdownStarted(false);
          } else {
            // Decrease the time units
            if (seconds === 0) {
              if (minutes === 0) {
                if (hours === 0) {
                  if (days === 0) {
                    if (weeks === 0) {
                      if (months === 0) {
                        // Decrease the years
                        years--;
                        months = 11;
                      } else {
                        // Decrease the months
                        months--;
                        weeks = 4;
                      }
                    } else {
                      // Decrease the weeks
                      weeks--;
                      days = 6;
                    }
                  } else {
                    // Decrease the days
                    days--;
                    hours = 23;
                  }
                } else {
                  // Decrease the hours
                  hours--;
                  minutes = 59;
                }
              } else {
                // Decrease the minutes
                minutes--;
                seconds = 59;
              }
            } else {
              // Decrease the seconds
              seconds--;
            }
          }

          return { years, months, weeks, days, hours, minutes, seconds };
        });
      }, 1000);

      // Clean up the timer when the component unmounts or countdown is stopped
      return () => clearInterval(timer);
    }
  }, [countdownStarted]);

  const searchCourse = () => {
    // Perform the search logic here using the inputTime data
    // For demonstration purposes, let's assume the search returns the course event date as a string in the format "YYYY-MM-DD HH:mm:ss"
    const courseEventDate = "2023-06-30 09:00:00";

    // Calculate the time difference between today's date and the course event date
    const today = new Date();
    const eventDate = new Date(courseEventDate);
    const timeDifference = eventDate - today;

    // Convert the time difference to years, months, weeks, days, hours, minutes, and seconds
    const seconds = Math.floor(timeDifference / 1000) % 60;
    const minutes = Math.floor(timeDifference / (1000 * 60)) % 60;
    const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)) % 7;
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7)) % 4;
    const months =
      Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7 * 4)) % 12;
    const years = Math.floor(
      timeDifference / (1000 * 60 * 60 * 24 * 7 * 4 * 12)
    );

    // Update the countdown state with the calculated values
    setCountdown({
      years,
      months,
      weeks,
      days,
      hours,
      minutes,
      seconds,
    });

    // Start the countdown
    setCountdownStarted(true);
  };

  return (
    <View style={styles.container}>
      <TextInput
      // Input fields for the countdown
      />
      <Button
        title="Start Countdown"
        onPress={startCountdown}
        disabled={countdownStarted}
      />
      <Button title="Search Course" onPress={searchCourse} />
      <View style={styles.countdownContainer}>
        <Text style={styles.countdownText}>{countdown.years} Years</Text>
        <Text style={styles.countdownText}>{countdown.months} Months</Text>
        <Text style={styles.countdownText}>{countdown.weeks} Weeks</Text>
        <Text style={styles.countdownText}>{countdown.days} Days</Text>
        <Text style={styles.countdownText}>{countdown.hours} Hours</Text>
        <Text style={styles.countdownText}>{countdown.minutes} Minutes</Text>
        <Text style={styles.countdownText}>{countdown.seconds} Seconds</Text>
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
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  countdownContainer: {
    marginTop: 20,
  },
  countdownText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default TimeCountdown1;
