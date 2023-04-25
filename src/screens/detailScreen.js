import React, { useRef, useState } from "react";
import { Text, TextInput, View, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Icon } from "react-native";

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
    return <ScrollView>
        <View style={{ padding: 15, alignContent: "space-between", justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{ fontSize: 30, fontWeight: "bold" }}>{route.params.paramKey}</Text>
                <View style={{ width: 10 }} />
                <TouchableOpacity onPress={() => showAlert(true)}>
                    <Image source={require('../../assets/share.png')} style={{ height: 10, width: 10, padding: 12 }} />
                </TouchableOpacity>
            </View>
            <View style={{ height: 10 }} />
            <Text style={{ fontSize: 20, color: "blue" }}>University of Wollongong</Text>
            <View style={{ height: 20 }} />

            <View style={{ flexDirection: "row" }}>
                <View style={{ backgroundColor: '#ffc6c4', marginRight: 50, flexDirection: "row", padding: 10, borderRadius: 25 }}>
                    <Image source={require('../../assets/location.png')} style={{ height: 16, width: 15 }} />
                    <View style={{ width: 10 }} />
                    <Text style={{ fontSize: 15 }}>Australia</Text>
                </View>
                <View style={{ padding: 10, flexDirection: "row", alignSelf: "center", justifyContent: "center" }}>
                    <Text style={{ fontSize: 18 }}>4.5</Text>
                    <View style={{ width: 10 }} />
                    <Image source={require('../../assets/star.png')} style={{ height: 20, width: 20 }} />
                    <Image source={require('../../assets/star.png')} style={{ height: 20, width: 20 }} />
                    <Image source={require('../../assets/star.png')} style={{ height: 20, width: 20 }} />
                    <Image source={require('../../assets/star.png')} style={{ height: 20, width: 20 }} />
                    <Image source={require('../../assets/halfStar.png')} style={{ height: 20, width: 20 }} />
                </View>
            </View>
            <View style={{ height: 10 }} />
            <View style={{ flexDirection: "row" }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.textInput1}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>Australia</Text>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={{ fontSize: 16, fontWeight: "300" }}>$ 15600</Text>
                            <Text style={{ fontSize: 16, fontWeight: "300" }}>(AUD)</Text>
                            <Text style={{ fontSize: 16, fontWeight: "300" }}>/  Semester</Text>
                        </View>
                    </View>
                    <View style={styles.textInput2}>
                        <Text style={{ fontSize: 15, fontWeight: "500" }}>Study Field</Text>
                        <Text style={{ fontSize: 16, fontWeight: "300" }}>Health</Text>
                    </View>
                </View>
            </View>
            <View style={{ height: 10 }} />
            <View style={{ borderWidth: 0.5, padding: 10, borderTopRightRadius: 50, borderBottomLeftRadius: 30 }}>
                <Text style={{ fontSize: 20 }}>Overview</Text>
                <Text style={{ fontSize: 17, fontWeight: "300" }}>
                    International students with a recognised Bachelor degree in Nursing can accelerate their career progression by undertaking the Master of Nursing International at UOW.{"\n"}
                    The Master of Nursing International is a two-year degree that is designed to prepare nurses for professional roles in the health care system. The main objectives of the degree are to provide an academic avenue for professional development, knowledge and the application of evidence-based practice.{"\n"}
                    *Please note this course does not meet the requirements to obtain a licence as Registered Nuse in Australia.
                </Text>
            </View>
            <View style={{ height: 30 }} />
            <View style={{ borderWidth: 0.5, padding: 10, borderRadius: 10 }}>
                <Text style={{ fontSize: 20 }}>Apply for Course</Text>
                <View style={{ height: 10 }} />
                <TextInput placeholder="First Name" style={styles.textInput} />
                <TextInput placeholder="Last Name" style={styles.textInput} />
                <TextInput placeholder="Email Address" style={styles.textInput} />
                <TextInput placeholder="Phone" style={styles.textInput} />
                <TextInput defaultValue="I am interested in applying for Master of Nursing International located at Australia." style={[styles.textInput, { fontSize: 16 }]} multiline={true} />
                <TouchableOpacity onPress={() => showAlert1(true)}>
                    <View style={{ backgroundColor: '#ffc6c4', alignSelf: "center", padding: 10, marginTop: 15 }}>
                        <Text>Apply Courses</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        <View style={{ height: 50 }} />
    </ScrollView >

}
export default DetailScreen;
const styles = StyleSheet.create({
    textInput: {
        width: '100%',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 10,
        padding: 10,
    },
    textInput1: {
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 20,
        padding: 10,
    },
    textInput2: {
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 20,
        padding: 10,
    },
}
)