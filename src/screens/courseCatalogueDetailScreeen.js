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
  ActivityIndicator,
  Share,
} from "react-native";
import { RenderHTML } from "react-native-render-html";
import { Picker } from "@react-native-picker/picker";
import {
  useGetCourseCatalogueDetailDataByIdQuery,
  usePostApplyForTheCourseMutation,
} from "../rtkQuery/courseCatalogueDetailSlice";
import { useGetAccountListDataQuery } from "../rtkQuery/accountListSlice";
import { useLazyGetAccountEntityListDataQuery } from "../rtkQuery/accountEntityListSlice";

const CourseCatalogueDetailScreen = ({ route }) => {
  const scrollViewRef = useRef(null);

  const handleApplyPress = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const [account, setAccount] = useState("");
  const [entity, setEntity] = useState("");
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("a@gamil.com");
  const [phone, setPhone] = useState("98451545");
  const [message, setMessage] = useState("Message");

  // console.log(route.params.item._id);
  const { data, isLoading, error } = useGetCourseCatalogueDetailDataByIdQuery(
    route.params.item._id
  );
  const _id = route.params.item - _id;
  // console.log(data);
  const { data: accounts, isLoading1, error1 } = useGetAccountListDataQuery();

  const [lazyFetchAccountEntity, { data: accountEntity, isFetching }] =
    useLazyGetAccountEntityListDataQuery();

  const [postApplyForTheCourse, { isLoading2, isSuccess, isError }] =
    usePostApplyForTheCourseMutation();

  React.useEffect(() => {
    if (!account) return;
    const handleFetchAccountEntityName = async (id) => {
      lazyFetchAccountEntity(id).unwrap();
    };
    handleFetchAccountEntityName(account?._id);
  }, [account]);

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this cool link: https://www.firstsourceworld.com/v2/courses-catalogue/${data?._id}`,
        // url: `https://www.firstsourceworld.com/v2/courses-catalogue/${data._id}`,
        title: "FirstSource World Course Catalogue",
      });
      if (result.action === Share.sharedAction) {
        console.log("Link shared successfully");
      } else if (result.action === Share.dismissedAction) {
        console.log("Link sharing dismissed");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !account?._id.trim() ||
      !entity.trim() ||
      !message.trim()
    ) {
      alert("Please fill all the fields.");
      return;
    }
    try {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        message: message,
        account: account._id,
        entity: entity,
      };
      await postApplyForTheCourse(user).unwrap();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setAccount("");
      setEntity("");

      alert("User created successfully!");
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error creating user. Please try again later.");
    }
  };
  // console.log("data", data);

  // if (!data) {
  //   return <Text>Loading</Text>;
  // }
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An error occurred: {error.message}</Text>
      </View>
    );
  }
  return (
    <View>
      <ScrollView ref={scrollViewRef} scrollIndicatorInsets={false}>
        <View style={{ flexDirection: "row", marginRight: 15 }}></View>
        <View
          style={{
            padding: 15,
            alignContent: "space-between",
            justifyContent: "space-between",
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {data?.title}
          </Text>
          <View style={{ height: 10 }} />

          <Text style={{ fontSize: 20, color: "blue" }}>
            {data?.university?.title}
          </Text>
          <View style={{ height: 10 }} />

          <TouchableOpacity onPress={handleApplyPress}>
            <View style={styles.textInput3}>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 16, fontWeight: "500" }}>
                  Apply for the Course
                </Text>
              </View>
            </View>
          </TouchableOpacity>

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
              <Text style={{ fontSize: 18 }}>{data?.location?.name}</Text>
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
            <TouchableOpacity onPress={handleShare}>
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
                    $ {data?.tuitionFee}
                  </Text>
                  <View style={{ width: 5 }} />
                  <Text style={{ fontSize: 16, fontWeight: "300" }}>
                    ({data?.currency?.code})
                    <View style={{ width: 5 }} />
                  </Text>
                  <Text style={{ fontSize: 16, fontWeight: "300" }}>
                    / {data?.feeType}
                  </Text>
                </View>
              </View>
              <View style={{ width: 15 }} />
              <View style={styles.textInput2}>
                <Text style={{ fontSize: 15, fontWeight: "500" }}>
                  Study Field
                </Text>
                <Text style={{ fontSize: 16, fontWeight: "300" }}>
                  {data?.field?.name}
                </Text>
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
              source={{ html: data?.summary + data?.learningOutcomes }}
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
            <TextInput
              placeholder="First Name"
              value={firstName}
              style={styles.textInput}
              onChangeText={setFirstName}
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              style={styles.textInput}
              onChangeText={setLastName}
            />
            <TextInput
              placeholder="Email"
              value={email}
              style={styles.textInput}
              onChangeText={setEmail}
            />
            <TextInput
              placeholder="Phone"
              value={phone}
              style={styles.textInput}
              onChangeText={setPhone}
            />
            <View style={styles.btncontainer}>
              <Picker
                selectedValue={account}
                onValueChange={(itemValue) => {
                  setAccount(itemValue);
                  setEntity(null);
                }}
              >
                <Picker.Item label="Select Agency" value={null} />
                {accounts?.map((item) => (
                  <Picker.Item label={item.name} value={item} key={item.name} />
                ))}
              </Picker>
            </View>
            {account && (
              <View style={styles.btncontainer}>
                <Picker
                  selectedValue={entity}
                  onValueChange={(itemValue) => {
                    setEntity(itemValue);
                  }}
                >
                  <Picker.Item label="Select Entity" value={null} />
                  {accountEntity?.map((item) => (
                    <Picker.Item
                      label={item.name}
                      value={item._id}
                      key={item._id}
                    />
                  ))}
                </Picker>
              </View>
            )}

            <TextInput
              defaultValue={
                "I am interested in applying for" +
                " " +
                data?.title +
                ",located at" +
                " " +
                data?.location?.name
              }
              value={message}
              onChangeText={setMessage}
              style={[styles.textInput, { fontSize: 17 }]}
              multiline={true}
            />
            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isLoading}
              style={{
                backgroundColor: isLoading ? "grey" : "purple",
                padding: 10,
                borderRadius: 5,
                alignSelf: "center",
                marginTop: 20,
                width: "100%",
              }}
            >
              <Text
                style={{ color: "white", fontSize: 18, alignSelf: "center" }}
              >
                {isLoading
                  ? "Applying for the Courses..."
                  : "Apply for the Courses"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 25 }} />
        </View>
      </ScrollView>
    </View>
  );
};
export default CourseCatalogueDetailScreen;
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
    alignSelf: "flex-start",
    padding: 5,
  },
  btncontainer: {
    width: "100%",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "gray",
    alignSelf: "center",
    fontSize: 17,
    justifyContent: "space-between",
    marginTop: 10,
  },
});
