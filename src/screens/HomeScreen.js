import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("screen").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const images = [
  "https://www.firstsourceworld.com/static/media/australia.c697020dc77a37aa6887.png",
  "https://www.firstsourceworld.com/static/media/banner1.5dd88e33f179a354fd9e.jpg",
  "https://www.firstsourceworld.com/static/media/banner2.51c64d7bbeb17cb2842d.png",
  "https://www.firstsourceworld.com/static/media/banner3.01a7e5ef34721e52c46e.png",
  "https://www.firstsourceworld.com/static/media/banner4.ed5b9188b0745eee93ad.png",
  "https://www.firstsourceworld.com/static/media/canada.631ce2255956c41481e5.png",
  "https://www.firstsourceworld.com/static/media/uk.048aaa2a50fc7d89ada7.png",
  "https://www.firstsourceworld.com/static/media/usa.c5eff3911621da91754d.png",
];
const image = [
  "https://www.firstsourceworld.com/static/media/australia.c697020dc77a37aa6887.png",
  "https://www.firstsourceworld.com/static/media/canada.631ce2255956c41481e5.png",
  "https://www.firstsourceworld.com/static/media/uk.048aaa2a50fc7d89ada7.png",
  "https://www.firstsourceworld.com/static/media/usa.c5eff3911621da91754d.png",
];
// const items = [
//   {
//     id: "1",

//     image:
//       "https://www.firstsourceworld.com/static/media/avatar1.049cc8a9bd99f75138e8.jpg",
//     name: "Ditya Gaire",
//     description:
//       "“ FSW is the best education consultancy in Nepal. They provided great assistance on my student visa application in Melbourne, Australia. Additionally, the team has been very approachable and always there to answer all my queries. They are the best consultancy in Nepal for Australia. ”",
//   },
//   {
//     id: "2",

//     image:
//       "https://www.firstsourceworld.com/static/media/avatar2.18fd8d10bdafc1cf1afb.png",
//     name: "Pooja Shrestha",
//     description:
//       "“ I am ever grateful to the competent team for helping me attain my Canada student visa in no time. The consultation and customer services they provide is efficient and excellent. FSW is the best education consultancy in Kathmandu and also they are the best consultancy in Nepal for Canada. ”",
//   },
//   {
//     id: "3",

//     image:
//       "https://www.firstsourceworld.com/static/media/avatar3.69d2d45ed00b91594f5f.png",
//     name: "Dilip Rana",
//     description:
//       " Hello I am Dilip Rana and I have recently got my visa granted to study in Australia with 50% Scholarship and for this FSW supported me a lot and they also praised me to get this scholarship. I am very thankful to FSW team. So if you guys are planning for study abroad then FSW would be the best option for you.",
//   },
//   {
//     id: "4",

//     image:
//       "https://www.firstsourceworld.com/static/media/avatar4.33515e350ea1198e35b3.png",
//     name: "Umesh Dhungel    ",
//     description:
//       "“ I very thankful to this consultancy that they supported me in every step of my processing and finally granted my visa for Australia.. I would like to give the credit for this success to FSW and the team. Thank you for your guidelines and suggestions.”",
//   },
// ];
// const Container = ({ title, image, description, backgroundColor }) => (
//   <View style={[styles.container, { backgroundColor }]}>
//     <Text style={styles.title}>{title}</Text>
//     <Text style={styles.title}>{description}</Text>
//     <Image
//       source={{
//         uri: image,
//       }}
//       resizeMode="cover"
//       style={styles.logo2}
//     />
//   </View>
// );

const HomeScreen = ({ navigation }) => {
  const [currentImage, setCurrentImage] = useState(images[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  useEffect(() => {
    setCurrentImage(images[currentIndex]);
  }, [currentIndex]);

  const flatlistRef = useRef(null);
  const [currentIndex1, setCurrentIndex1] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex1 + 1) % image.length;
      setCurrentIndex1(newIndex);
      flatlistRef.current.scrollToIndex({
        index: newIndex,
        animated: true,
        viewOffset: 0.5,
        viewPosition: 0.5,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex1]);

  const renderItem = ({ item, index }) => {
    let imageText = "";
    if (index === 0) {
      imageText = "Australia";
    } else if (index === 1) {
      imageText = "Canada";
    } else if (index === 2) {
      imageText = "UK";
    } else if (index === 3) {
      imageText = "USA";
    }

    return (
      <View key={index} style={styles.imageContainer}>
        <ImageBackground
          source={{ uri: item }}
          resizeMode="cover"
          style={styles.image1}
        >
          <View style={styles.overlay}>
            <Text style={styles.textStyle1}>{imageText}</Text>
          </View>
        </ImageBackground>
      </View>
    );
  };

  const handleButtonPress = () => {
    navigation.navigate("First Source World");
  };

  return (
    <>
      <StatusBar backgroundColor="#be4d25" barStyle="dark-content"></StatusBar>
      <SafeAreaView>
        <View
          style={{
            marginRight: 15,
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Image
            source={{
              uri: "https://www.firstsourceworld.com/static/media/fsw-logo.6d47a10924041f62aa41.png",
            }}
            resizeMode="cover"
            style={styles.logo}
          />
          <View style={{ flex: 1 }} />
          <TouchableOpacity onPress={() => navigation.navigate("Contact Us")}>
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
                Contact Us
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={{ height: SCREEN_HEIGHT - 350 }}>
            <ImageBackground
              source={{ uri: currentImage }}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.overlay}>
                <Text style={[styles.textStyle, { fontSize: 50 }]}>
                  EQUIP YOU
                </Text>
                <Text style={[styles.textStyle, { fontSize: 50 }]}>
                  WITH BEST
                </Text>
                <Text style={[styles.textStyle, { fontSize: 50 }]}>
                  EDUCATION
                </Text>
                <Text style={styles.textStyle}>
                  Your Education is your Future, make the right move today
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleButtonPress}
                >
                  <Text style={styles.buttonText}>Search Courses</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <Text style={{ fontSize: 40, alignSelf: "center", color: "purple" }}>
            Study Abroad
          </Text>
          <Text style={{ fontSize: 20, alignSelf: "center", color: "purple" }}>
            Choose your destination
          </Text>
          <View style={{ height: 10 }} />
          <FlatList
            ref={flatlistRef}
            data={image.slice(0, 4)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={false}
            snapToInterval={300}
            decelerationRate="normal"
            onScroll={(event) => {
              const { contentOffset, layoutMeasurement } = event.nativeEvent;
              const index = Math.round(
                contentOffset.x / layoutMeasurement.width
              );
              setCurrentIndex1(index);
            }}
          />
          <View style={{ height: 20 }} />

          <View
            style={{
              backgroundColor: "purple",
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 15,
              paddingRight: 15,
            }}
          >
            <Text style={{ fontSize: 15, alignSelf: "center", color: "white" }}>
              LOOKING FOR AN EXPERT ADVICE?
            </Text>
            <Text
              style={{
                fontSize: 25,
                alignSelf: "center",
                marginBottom: 5,
                color: "white",
              }}
            >
              Consult with our experts
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Contact Us")}>
              <View
                style={{
                  padding: 5,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: "white",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
                >
                  Contact Us
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={{ alignSelf: "center", fontSize: 20, marginTop: 10 }}>
            First Source World
          </Text>
          <Text
            style={{
              fontSize: 40,
              alignSelf: "center",
              color: "purple",
              marginLeft: 15,
              marginRight: 15,
            }}
          >
            Since 2016 we have 30+ branches all over the globe
          </Text>
          <Image
            source={{
              uri: "https://www.firstsourceworld.com/static/media/worldMap.71126adbb018eb0e0613.png",
            }}
            resizeMode="contain"
            // style={{ flex: 1 }}
            style={styles.logo1}
          />
          {/* <FlatList
            data={items}
            horizontal={true}
            pagingEnabled={true}
            renderItem={({ item }) => (
              <Container
                title={item.name}
                description={item.description}
                image={item.image}
                backgroundColor={item.backgroundColor}
              />
            )}
            keyExtractor={(item) => item.id}
          /> */}
          <View style={{ marginBottom: 80 }} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    justifyContent: "center",
    height: "100%",
    width: SCREEN_WIDTH,
    opacity: 1,
    overflow: "hidden",
  },
  logo: {
    width: 250,
  },
  logo1: {
    height: 200,
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
  },
  logo2: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  overlay: {
    position: "absolute",
    left: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
    opacity: 1,
  },
  button: {
    backgroundColor: "brown",
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#ffffff",
    justifyContent: "center",
    fontSize: 25,
  },
  imageContainer: {
    width: 350,
    height: 175,
    borderRadius: 10,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  image1: {
    justifyContent: "center",
    width: "100%",
    height: "100%",
    opacity: 0.8,
    backgroundColor: "pink",
  },
  textStyle1: {
    fontSize: 25,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
  },
  // container: {
  //   width: SCREEN_WIDTH,
  //   // height: 200,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // title: {
  //   fontSize: 24,
  //   fontWeight: "bold",
  //   color: "#fff",
  // },
});

export default HomeScreen;
