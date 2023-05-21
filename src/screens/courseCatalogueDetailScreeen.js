import React, { useRef, useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Share,
  Dimensions,
} from "react-native";
import { RenderHTML } from "react-native-render-html";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import {
  useGetCourseCatalogueDetailDataByIdQuery,
  usePostApplyForTheCourseMutation,
} from "../rtkQuery/courseCatalogueDetailSlice";
import { useGetAccountListDataQuery } from "../rtkQuery/accountListSlice";
import { useLazyGetAccountEntityListDataQuery } from "../rtkQuery/accountEntityListSlice";
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;
const Skeleton = () => (
  // Placeholder skeleton component
  <View style={{ padding: 20 }}>
    <View style={[styles.skeletonItem, { height: 170 }]} />
    <View style={[styles.skeletonItem, { height: 200 }]} />
    <View style={[styles.skeletonItem, { height: 300 }]} />
    <View style={[styles.skeletonItem, { height: 500 }]} />
  </View>
);
const CourseCatalogueDetailScreen = ({ route }) => {
  const scrollViewRef = useRef(null);

  const handleApplyPress = () => {
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const [account, setAccount] = useState("");
  const [entity, setEntity] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryCode, setCountryCode] = useState("+977");
  const handlePhoneChange = (value) => {
    setPhone(value);
    setPhoneError("");
  };

  const validatePhone = () => {
    let phoneRegex;

    switch (countryCode) {
      case "+977":
        phoneRegex = /^(\+977)?[7-9][0-9]{9}$/;
        break;
      case "+1":
        phoneRegex = /^(\+1)?[2-9]\d{2}[2-9](?!11)\d{6}$/;
        break;
      case "+44":
        phoneRegex = /^(\+44)?[1-9]\d{8,9}$/;
        break;
      case "+61":
        phoneRegex = /^(\+61)?[2-9]\d{8}$/;
        break;
      default:
        return;
    }

    if (phone && !phoneRegex.test(phone)) {
      setPhoneError("Please enter a valid phone number");
    }
  };

  const { data, isLoading, error } = useGetCourseCatalogueDetailDataByIdQuery(
    route.params.item._id
  );
  const _id = route.params.item - _id;
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
      !account?._id?.trim() ||
      !entity?.trim()
    ) {
      alert("Please fill all the fields.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    const phoneRegexMap = {
      "+977": /^(\+977)?[7-9][0-9]{9}$/,
      "+1": /^(\+1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
      "+44": /^(\+44)?[1-9]\d{8,9}$/,
      "+61": /^(\+61)?[2-9]\d{8}$/,
    };
    const selectedPhoneRegex = phoneRegexMap[countryCode];

    if (!selectedPhoneRegex.test(phone)) {
      alert("Please enter a valid phone number.");
      return;
    }
    const phoneNumber = countryCode + phone;
    const defaultMsg =
      "I am interested in applying for " +
      (data?.title || "") +
      ", located at " +
      (data?.location?.name || "");
    try {
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phoneNumber,
        message: message || defaultMsg,
        account: account._id,
        entity: entity,
      };
      console.log(user);
      await postApplyForTheCourse(user).unwrap();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setMessage("");
      setAccount("");
      setEntity("");

      alert("Successfully applied for the course!");
    } catch (error) {
      console.error("Error applying for the course:", error);
      alert("Error applying for the course. Please try again later.");
    }
  };
  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>An error occurred: {error.message}</Text>
      </View>
    );
  }
  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView ref={scrollViewRef} scrollIndicatorInsets={false}>
        <View>
          <View style={{ flexDirection: "row", marginRight: 15 }}></View>
          <View>
            {/* <Text>{JSON.stringify(data, null, 30)}</Text> */}
            <View
              style={{
                backgroundColor: "white",
                margin: 15,
                borderRadius: 10,
                elevation: 10,
              }}
            >
              <Image
                source={{ uri: data?.university?.logo }}
                resizeMode="contain"
                style={{ height: 150, backgroundColor: "#DCDCDC" }}
              />
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  alignSelf: "center",
                  marginTop: 10,
                }}
              >
                {data?.title}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(data?.university?.website)}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "blue",
                    alignSelf: "center",
                    textDecorationLine: "underline",
                  }}
                >
                  {data?.university?.title}
                </Text>
              </TouchableOpacity>
              <View style={{ height: 10 }} />
              <View
                style={{
                  backgroundColor: "#ffc6c4",
                  flexDirection: "row",
                  padding: 5,
                  borderRadius: 25,
                  alignSelf: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../assets/location.png")}
                  style={{ height: 15, width: 15 }}
                />
                <View style={{ width: 10 }} />
                <Text style={{ fontSize: 15 }}>{data?.location?.name}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  paddingLeft: 20,
                  paddingRight: 20,
                  paddingTop: 10,
                }}
              >
                <View style={styles.textInput1}>
                  <Ionicons name="md-cash-outline" size={24} />
                  <Text style={{ fontSize: 15, fontWeight: "500" }}>
                    Tuition Fee
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "300",
                        color: "green",
                      }}
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
                <View style={{ width: 25 }} />
                <View>
                  <Ionicons name="md-thumbs-up-outline" size={24} />
                  <Text style={{ fontSize: 18 }}>Rating</Text>
                  <Text style={{ fontSize: 18, color: "green" }}>4.5</Text>
                </View>
                <View style={{ width: 25 }} />

                <View style={styles.textInput2}>
                  <Ionicons name="md-book-outline" size={24} />
                  <Text style={{ fontSize: 15, fontWeight: "500" }}>
                    Study Field
                  </Text>
                  <Text
                    style={{ fontSize: 16, fontWeight: "300", color: "green" }}
                  >
                    {data?.field?.name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  position: "relative",
                  top: 25,
                  margin: 8,
                }}
              >
                <TouchableOpacity onPress={handleApplyPress}>
                  <View style={styles.textInput3}>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 16, fontWeight: "500" }}>
                        Apply for the Course
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity onPress={handleShare}>
                  <View style={styles.textInput3}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={require("../../assets/share.png")}
                        style={{ height: 8, width: 8, padding: 8 }}
                      />
                      <View style={{ width: 5 }} />
                      <Text style={{ fontSize: 16, fontWeight: "500" }}>
                        Share
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                padding: 10,
                marginTop: 15,
                marginHorizontal: 15,
                borderRadius: 10,
                backgroundColor: "white",
                elevation: 5,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  textAlign: "justify",
                  fontWeight: "400",
                  color: "blue",
                  alignSelf: "center",
                }}
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
            <View
              style={{
                borderWidth: 0.5,
                padding: 10,
                borderRadius: 10,
                margin: 15,
              }}
            >
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
                onBlur={() => {
                  if (email && !emailRegex.test(email)) {
                    setEmailError("Please enter a valid email address");
                  } else {
                    setEmailError("");
                  }
                }}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
              <View style={styles.phoneContainer}>
                <Picker
                  selectedValue={countryCode}
                  style={styles.countryCodePicker}
                  mode="dropdown"
                  onValueChange={(itemValue) => setCountryCode(itemValue)}
                >
                  <Picker.Item label="+977 Nepal" value="+977" />
                  <Picker.Item label="+1 Canada and USA" value="+1" />
                  <Picker.Item label="+44 UK" value="+44" />
                  <Picker.Item label="+61 Australia" value="+61" />
                </Picker>
                <TextInput
                  placeholder="Phone"
                  value={phone}
                  style={styles.textInput4}
                  onChangeText={handlePhoneChange}
                  keyboardType="phone-pad"
                  onBlur={validatePhone}
                />
              </View>
              {phoneError ? (
                <Text style={styles.errorText}>{phoneError}</Text>
              ) : null}

              <View style={styles.btncontainer}>
                <Picker
                  selectedValue={account}
                  onValueChange={(itemValue) => {
                    setAccount(itemValue);
                    setEntity(null);
                  }}
                  mode="dropdown"
                >
                  <Picker.Item label="Select Agency" value={null} />
                  {accounts?.map((item) => (
                    <Picker.Item
                      label={item.name}
                      value={item}
                      key={item.name}
                    />
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
                    mode="dropdown"
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default CourseCatalogueDetailScreen;
const styles = StyleSheet.create({
  skeletonItem: {
    width: SCREEN_WIDTH - 40,
    backgroundColor: "#E0E0E0",
    marginBottom: 10,
    borderRadius: 8,
    paddingTop: 15,
    paddingBottom: 15,
  },
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
    borderColor: "#8e8e8e",
    alignSelf: "center",
  },
  textInput2: {
    borderColor: "#8e8e8e",
    alignSelf: "center",
  },
  textInput3: {
    borderRadius: 5,
    borderWidth: 0.5,
    backgroundColor: "#ffc6c4",
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
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  countryCodePicker: {
    width: 125,
  },
  textInput4: {
    flex: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    alignSelf: "center",
    marginTop: 10,
    padding: 10,
    fontSize: 17,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});
