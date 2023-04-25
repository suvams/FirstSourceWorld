import React, { useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, FlatList, Text, Modal, Button, StatusBar, Image, ScrollView } from "react-native";

const firstSourceWorldData = [
    {
        title: "Master of Nursing International",
        university:
        {
            logo: "",
            title1: "University of Wollonging"
        },
        location: {
            locationName: "Australia",
            subLocation: "AU-NSW-Sydney"
        },
        years: "2 Years",
        level: "Masters",
        tuition_fee: {
            total: "15600",
            code: "AUD",
            feeType: "Semester"

        },
    },
    {
        title: "Master of Nrsing International",
        university:
        {
            logo: "",
            title1: "University of Wollonging"
        },
        location: {
            locationName: "Australia",
            subLocation: "AU-NSW-Sydney"
        },
        years: "2 Years",
        level: "Masters",
        tuition_fee: {
            total: "15600",
            code: "AUD",
            feeType: "Semester"

        },
    },
    {
        title: "Bachelor of Nsing International",
        university:
        {
            logo: "",
            title1: "University of Wollonging"
        },
        location: {
            locationName: "Australia",
            subLocation: "AU-NSW-Sydney"
        },
        years: "2 Years",
        level: "Masters",
        tuition_fee: {
            total: "15600",
            code: "AUD",
            feeType: "Semester"

        },
    },
    {
        title: "Bachelor of Nsing International",
        university:
        {
            logo: "",
            title1: "University of Wollonging"
        },
        location: {
            locationName: "Nepal",
            subLocation: "AU-NSW-Sydney"
        },
        years: "2 Years",
        level: "Masters",
        tuition_fee: {
            total: "15600",
            code: "AUD",
            feeType: "Semester"

        },
    },
    {
        title: "Master of Ning International",
        university:
        {
            logo: "",
            title1: "University of Wollonging"
        },
        location: {
            locationName: "Australia",
            subLocation: "AU-NSW-Sydney"
        },
        years: "2 Years",
        level: "Masters",
        tuition_fee: {
            total: "15600",
            code: "AUD",
            feeType: "Semester"

        },
    },
    {
        title: "Master of Ning International",
        university:
        {
            logo: "",
            title1: "University of Wollonging"
        },
        location: {
            locationName: "Australia",
            subLocation: "AU-NSW-Sydney"
        },
        years: "2 Years",
        level: "Masters",
        tuition_fee: {
            total: "15600",
            code: "AUD",
            feeType: "Semester"

        },
    },
]

const DropdownScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const isClicked = useState(true);
    const [data, setData] = useState(firstSourceWorldData);
    const searchRef = useRef();
    const [showModal, setShowModal] = useState(false);
    const FliterModal = () => {
        return <Modal visible={showModal}
            transparent={true}
            animationType={'slide'}
        >
            <View style={styles.modal}>
                <TextInput placeholder="Search.." style={styles.searchInput} />
                <TextInput placeholder="Search.." style={styles.searchInput} />
                <TextInput placeholder="Search.." style={styles.searchInput} />
                <TextInput placeholder="Search.." style={styles.searchInput} />
                <Text style={{ marginLeft: 25, marginTop: 10 }}>Tuition Fee</Text>
                <View style={styles.oneline}>
                    <TextInput placeholder="Search.." style={styles.searchInput1} />
                    <TextInput placeholder="Search.." style={styles.searchInput1} />
                </View>
                <View style={[styles.oneline, { margin: 25 }]}>
                    <Button
                        title="Filter"
                        color="black"
                        onPress={() => setShowModal(false)}
                    />
                    <View style={{ flex: 1 }} />
                    <Button
                        title="Cancel"
                        color="black"
                        onPress={() => setShowModal(false)}
                    />
                </View>
                <Text style={{ marginLeft: 25, marginTop: 10 }}>Payment Per</Text>
            </View>
        </Modal >
    }
    const onSearch = search => {
        if (search !== '') {
            let tempData = data.filter(item => {
                return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
            });
            setData(tempData);
        } else {
            setData(firstSourceWorldData);
        }
    }
    return (
        <View style={{ backgroundColor: 'white' }}>
            <StatusBar />
            <FliterModal />
            {isClicked ? (<View style={styles.dropdownArea}>
                <View style={[styles.searchInput, styles.oneline]}>
                    <TextInput placeholder="Search.." value={search} ref={searchRef} onChangeText={tet => {
                        onSearch(tet);
                        setSearch(tet);
                    }} />
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity onPress={() => setShowModal(true)}>
                        <Image source={require('../../assets/filter.png')} style={{ height: 25, width: 25 }} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={data}
                    renderItem={({ item }) => {
                        return (
                            <View>
                                <TouchableOpacity
                                    style={styles.countryItem}
                                    onPress={() =>
                                        navigation.navigate('Detail', {
                                            paramKey: item.title
                                        })}>
                                    <View style={styles.cataloguesListsContainer}>
                                        <View style={styles.oneline}>
                                            <Image source={require('../../assets/college.png')} style={{ height: 100, width: 100 }} />
                                            <View style={{ width: 20 }} />
                                            <ScrollView nestedScrollEnabled={true}>
                                                <View style={{ justifyContent: "space-between", alignContent: "space-between" }}>
                                                    <Text style={{ fontSize: 23, fontWeight: "500" }}>{item.title}</Text>
                                                    <Text style={{ color: "blue", fontSize: 18 }}>{item.university.title1}</Text>
                                                    <View style={styles.oneline}>
                                                        <Text style={{ fontSize: 16 }}>{item.location.locationName}   </Text>
                                                        <Text style={{ fontSize: 16 }}>{item.location.subLocation}</Text>
                                                    </View>
                                                    <View style={styles.oneline}>
                                                        <Text style={{ fontSize: 16 }}>{item.years}   </Text>
                                                        <Text style={{ fontSize: 16 }}>{item.level} Degree Level</Text>
                                                    </View>
                                                    <View style={styles.oneline}>
                                                        <Text style={{ fontSize: 18, color: 'green' }}>$ {item.tuition_fee.total}   </Text>
                                                        <Text style={{ fontSize: 16 }}>({item.tuition_fee.code})   </Text>
                                                        <Text style={{ fontSize: 16 }}>{item.tuition_fee.feeType}</Text>
                                                    </View>
                                                </View>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
            </View>
            ) : null}
            <View style={{ height: 15 }} />

        </View>
    );
};
export default DropdownScreen;
const styles = StyleSheet.create({
    modal: {
        height: 800,
        borderRadius: 4,
        marginTop: 200,
        backgroundColor: 'white'
    },
    searchInput: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 10,
        padding: 15,
    },
    searchInput1: {
        width: '40%',
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        marginLeft: 25,
        borderColor: '#8e8e8e',
        alignSelf: 'center',
        marginTop: 20,
        paddingLeft: 15
    },
    cataloguesListsContainer: {
        width: '90%',
        marginLeft: 20,
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 8,
        paddingLeft: 15,
        paddingTop: 15,
        paddingBottom: 15,

    },
    oneline: {
        flexDirection: "row"
    },
})