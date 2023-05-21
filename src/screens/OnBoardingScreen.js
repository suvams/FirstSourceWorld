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

const SCREEN_WIDTH = Dimensions.get("window").width;

const OnboardingScreen = ({ navigation }) => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  useEffect(() => {
    const onboardingCompleted = true;
    if (onboardingCompleted) {
      navigation.navigate("HomeScreen");
    } else {
      setShowOnboarding(true);
    }
  }, []);

  const handleDone = () => {
    navigation.navigate("First Source World");
  };

  const DoneButton = () => (
    <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
      <Text style={{ marginLeft: 15 }}>Search Courses {"    "}</Text>
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
            <Image
              source={require("../../assets/logo.png")}
              resizeMode="contain"
              style={styles.logo}
            />
          ),
          title: "EQUIP YOU WITH BEST EDUCATION",
          subtitle: "Your Education is your Future, make the right move today",
        },
        {
          backgroundColor: "#fff",
          image: (
            <View>
              <View style={{ flexDirection: "row", padding: 10 }}>
                <ImageBackground
                  source={require("../../assets/australia.png")}
                  resizeMode="contain"
                  style={styles.logo2}
                >
                  <View style={styles.overlay}>
                    <Text style={styles.textStyle1}>Australia</Text>
                  </View>
                </ImageBackground>

                <View style={{ width: 10 }} />
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
              <View style={{ flexDirection: "row", padding: 10 }}>
                <ImageBackground
                  source={require("../../assets/uk.png")}
                  resizeMode="contain"
                  style={styles.logo2}
                >
                  <View style={styles.overlay}>
                    <Text style={styles.textStyle1}>UK</Text>
                  </View>
                </ImageBackground>
                <View style={{ width: 10 }} />
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
    width: 250,
    height: 250,
  },
  logo1: {
    height: 250,
    width: SCREEN_WIDTH - 20,
    marginLeft: 15,
    marginRight: 15,
  },
  logo2: {
    width: 200,
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
