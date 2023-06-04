import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SCREEN_WIDTH = Dimensions.get("window").width;

const OnboardingScreen = ({ navigation }) => {
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (!showOnboarding) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Tab Stack" }],
      });
    }
  }, [showOnboarding, navigation]);

  const checkOnboardingStatus = async () => {
    try {
      const onboardingCompleted = await AsyncStorage.getItem(
        "onboardingCompleted"
      );
      if (onboardingCompleted) {
        setShowOnboarding(false);
      } else {
        setShowOnboarding(true);
      }
    } catch (error) {
      console.log("Error retrieving onboarding status:", error);
    }
  };

  const handleDone = async () => {
    try {
      await AsyncStorage.setItem("onboardingCompleted", "true");
      setShowOnboarding(false);
    } catch (error) {
      console.log("Error storing onboarding status:", error);
    }
  };

  const DoneButton = () => (
    <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
      <Text>Search Courses {"    "}</Text>
    </TouchableOpacity>
  );

  if (!showOnboarding) {
    return null;
  }

  return (
    <Onboarding
      onDone={handleDone}
      DoneButtonComponent={DoneButton}
      onSkip={handleDone}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <View>
              <Image
                source={require("../../assets/logo.png")}
                resizeMode="contain"
                style={styles.logo}
              />
            </View>
          ),
          title: "EQUIP YOU WITH BEST EDUCATION",
          subtitle: "Your Education is your Future, make the right move today",
        },
        {
          backgroundColor: "#fff",
          image: (
            <View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "50%", padding: 5 }}>
                  <ImageBackground
                    source={require("../../assets/australia.png")}
                    resizeMode="contain"
                    style={styles.logo2}
                  >
                    <View style={styles.overlay}>
                      <Text style={styles.textStyle1}>Australia</Text>
                    </View>
                  </ImageBackground>
                </View>
                <View style={{ width: "50%", padding: 5 }}>
                  <ImageBackground
                    source={require("../../assets/canada.png")}
                    resizeMode="contain"
                    style={styles.logo2}
                  >
                    <View style={styles.overlay}>
                      <Text style={styles.textStyle1}>Canada</Text>
                    </View>
                  </ImageBackground>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={{ width: "50%", padding: 5 }}>
                  <ImageBackground
                    source={require("../../assets/uk.png")}
                    resizeMode="contain"
                    style={styles.logo2}
                  >
                    <View style={styles.overlay}>
                      <Text style={styles.textStyle1}>UK</Text>
                    </View>
                  </ImageBackground>
                </View>
                <View style={{ width: "50%", padding: 5 }}>
                  <ImageBackground
                    source={require("../../assets/usa.png")}
                    resizeMode="contain"
                    style={styles.logo2}
                  >
                    <View style={styles.overlay}>
                      <Text style={styles.textStyle1}>USA</Text>
                    </View>
                  </ImageBackground>
                </View>
              </View>
            </View>
          ),
          title: "Study Abroad",
          subtitle: "Choose your destination",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("../../assets/map.png")}
              resizeMode="contain"
              style={styles.logo1}
            />
          ),
          title: "EduXGateway",
          subtitle: "Since 2016 we have 30+ branches all over the globe",
        },
      ]}
    />
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  logo: {
    width: SCREEN_WIDTH - 20,
    height: 250,
  },
  logo1: {
    height: 250,
    width: SCREEN_WIDTH - 20,
    marginLeft: 15,
    marginRight: 15,
  },
  logo2: {
    height: 100,
    borderRadius: 10,
    opacity: 0.9,
  },
  doneButton: {
    marginVertical: 15,
    marginLeft: 15,
  },
  textStyle1: {
    fontSize: 25,
    fontWeight: "500",
    color: "white",
    alignSelf: "center",
    marginTop: 40,
  },
});
