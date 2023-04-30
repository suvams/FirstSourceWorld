import React, { useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RenderHTML } from "react-native-render-html";
import { useGetDataByIdQuery } from "../rtkQuery/getData";

const showAlert = () =>
  Alert.alert(
    "Share Link",
    "Do you really want to share?",
    [
      {
        text: "Share",
        onPress: () => Alert.alert("Shared"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This share is dismissed by tapping outside of the alert dialog."
        ),
    }
  );
const showAlert1 = () =>
  Alert.alert(
    "Apply for the Courses",
    "Do you really want to apply?",
    [
      {
        text: "Apply",
        onPress: () => Alert.alert("Applied"),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          "This apply is dismissed by tapping outside of the alert dialog."
        ),
    }
  );

const DetailScreen = ({ route }) => {
  console.log(route.params.item._id);
  const { data, isLoading, error } = useGetDataByIdQuery(route.params.item._id);
  console.log("data", data);

  if (!data) {
    return <Text>Loading</Text>;
  }
  return (
    <View>
      <ScrollView scrollIndicatorInsets={false}>
        <View style={{ flexDirection: "row", marginRight: 15 }}></View>
        <View
          style={{
            padding: 15,
            alignContent: "space-between",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>{data.title}</Text>
          <View style={{ height: 10 }} />
          <Text style={{ fontSize: 20, color: "blue" }}>
            {data.university.title}
          </Text>
          <View style={{ height: 20 }} />
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                backgroundColor: "#ffc6c4",
                marginRight: 30,
                flexDirection: "row",
                padding: 6,
                height: 30,
                borderRadius: 25,
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/location.png")}
                style={{ height: 18, width: 18 }}
              />
              <View style={{ width: 10 }} />
              <Text style={{ fontSize: 18 }}>{data.location.name}</Text>
            </View>
            <View
              style={{
                padding: 6,
                flexDirection: "row",
                alignSelf: "center",
                justifyContent: "center",
                height: 30,
              }}
            >
              <Text style={{ fontSize: 18 }}>4.5</Text>
              <View style={{ width: 10 }} />
              <Image
                source={require("../../assets/star.png")}
                style={{ height: 20, width: 20 }}
              />
              <Image
                source={require("../../assets/star.png")}
                style={{ height: 20, width: 20 }}
              />
              <Image
                source={require("../../assets/star.png")}
                style={{ height: 20, width: 20 }}
              />
              <Image
                source={require("../../assets/star.png")}
                style={{ height: 20, width: 20 }}
              />
              <Image
                source={require("../../assets/halfStar.png")}
                style={{ height: 20, width: 20 }}
              />
            </View>
            <View style={{ flex: 0.9 }} />
            <TouchableOpacity onPress={() => showAlert(true)}>
              <View style={styles.textInput3}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    source={require("../../assets/share.png")}
                    style={{ height: 8, width: 8, padding: 8 }}
                  />
                  <View style={{ width: 5 }} />
                  <Text style={{ fontSize: 16, fontWeight: "500" }}>Share</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ height: 10 }} />
          <View style={{ flexDirection: "row" }}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.textInput1}>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  Tuition Fee
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: "300", color: "green" }}
                  >
                    $ {data.tutionFee}
                  </Text>
                  <View style={{ width: 5 }} />
                  <Text style={{ fontSize: 16, fontWeight: "300" }}>
                    ({data.currency.code})
                    <View style={{ width: 5 }} />
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "300" }}>
                    / {data.feeType}
                  </Text>
                </View>
              </View>
              <View style={{ width: 15 }} />
              <View style={styles.textInput2}>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  Study Field
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "300" }}>Health</Text>
              </View>
              <View />
            </View>
          </View>
          <View style={{ height: 10 }} />
          <View
            style={{
              borderWidth: 0.5,
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontSize: 20, textAlign: "justify", fontWeight: "400" }}
            >
              Overview
            </Text>
            <RenderHTML
              source={{ html: data.summary + data.learningOutcomes }}
              contentWidth={0}
              tagsStyles={{
                p: {
                  margin: 2,
                  fontSize: 17,
                  textAlign: "justify",
                  fontWeight: "300",
                },
              }}
            ></RenderHTML>
          </View>
          <View style={{ height: 30 }} />
          <View style={{ borderWidth: 0.5, padding: 10, borderRadius: 10 }}>
            <Text style={{ fontSize: 20 }}>Apply for Course</Text>
            <View style={{ height: 10 }} />
            <TextInput placeholder="First Name" style={styles.textInput} />
            <TextInput placeholder="Last Name" style={styles.textInput} />
            <TextInput placeholder="Email Address" style={styles.textInput} />
            <TextInput placeholder="Phone" style={styles.textInput} />
            <TextInput
              defaultValue={
                "I am interested in applying for" +
                " " +
                data.title +
                ",located at" +
                " " +
                data.location.name
              }
              style={[styles.textInput, { fontSize: 17 }]}
              multiline={true}
            />
            <TouchableOpacity onPress={() => showAlert1(true)}>
              <View
                style={{
                  backgroundColor: "#ffc6c4",
                  alignSelf: "center",
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <Text>Apply Courses</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ height: 25 }} />
        </View>
      </ScrollView>
    </View>
  );
};
export default DetailScreen;
const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
    fontSize: 17,
  },
  textInput1: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
  },
  textInput2: {
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
  },
  textInput3: {
    borderRadius: 10,
    borderWidth: 0.5,
    backgroundColor: "#DCDCDC",
    alignSelf: "center",
    padding: 5,
  },
});
