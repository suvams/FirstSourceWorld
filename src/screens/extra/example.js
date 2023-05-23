// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   RefreshControl,
// } from "react-native";

// const Skeleton = () => (
//   // Placeholder skeleton component
//   <View style={{ padding: 20 }}>
//     <View
//       style={{
//         height: 20,
//         width: 200,
//         backgroundColor: "#E0E0E0",
//         marginBottom: 10,
//       }}
//     />
//     <View
//       style={{
//         height: 20,
//         width: 150,
//         backgroundColor: "#E0E0E0",
//         marginBottom: 5,
//       }}
//     />
//     <View style={{ height: 20, width: 100, backgroundColor: "#E0E0E0" }} />
//   </View>
// );

// const YourComponent = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isFetching, setIsFetching] = useState(false);

//   const [data, setData] = useState(null);
//   const [filteredCourse, setFilteredCourse] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     // Simulating data fetching
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     // Simulating an API call
//     setTimeout(() => {
//       const mockData = {
//         totalItems: 10,
//         data: [
//           { _id: 1, title: "Course 1" },
//           { _id: 2, title: "Course 2" },
//         ],
//       };
//       setData(mockData);
//       setFilteredCourse(mockData.data);
//       setIsLoading(false);
//     }, 2000);
//   };

//   const handleRefresh = () => {
//     setRefreshing(true);
//     // Simulating refreshing data
//     setTimeout(() => {
//       setRefreshing(false);
//     }, 1500);
//   };

//   return (
//     <View>
//       {!isLoading && !isFetching ? (
//         data?.data?.length ? (
//           <View>
//             <Text
//               style={{
//                 paddingHorizontal: 20,
//                 paddingTop: 15,
//                 fontSize: 18,
//                 fontWeight: "bold",
//               }}
//             >
//               {data.totalItems} results found!
//             </Text>
//             {filteredCourse.length > 0 ? (
//               <FlatList
//                 scrollIndicatorInsets={false}
//                 nestedScrollEnabled={true}
//                 refreshControl={
//                   <RefreshControl
//                     refreshing={refreshing}
//                     onRefresh={handleRefresh}
//                   />
//                 }
//                 data={filteredCourse}
//                 keyExtractor={(item) => item?._id.toString()}
//                 renderItem={({ item }) => {
//                   return (
//                     <View>
//                       <Text style={{ color: "black" }}>{item?.totalItems}</Text>
//                       <TouchableOpacity
//                         onPress={() =>
//                           navigation.navigate("Detail", {
//                             item,
//                           })
//                         }
//                       >
//                         <View style={styles.cataloguesListsContainer}>
//                           <View style={styles.oneline}>
//                             <Image
//                               source={{ uri: item?.university?.logo }}
//                               style={{ height: 110, width: 110, zIndex: 1 }}
//                             />
//                             <View style={{ width: 20 }} />
//                             <View
//                               style={{
//                                 justifyContent: "space-between",
//                                 alignContent: "space-between",
//                                 flexShrink: 1,
//                                 paddingHorizontal: 10,
//                               }}
//                             >
//                               <Text
//                                 style={{
//                                   fontSize: 23,
//                                   fontWeight: "500",
//                                 }}
//                               >
//                                 {item?.title}
//                               </Text>
//                               <Text style={{ color: "blue", fontSize: 18 }}>
//                                 {item?.university?.title}
//                               </Text>
//                               <View style={styles.oneline}>
//                                 <Text style={{ fontSize: 16 }}>
//                                   {item?.location?.name}{" "}
//                                 </Text>
//                                 <Text style={{ fontSize: 16 }}>
//                                   {"   "}
//                                   {item?.subLocations[0]?.name}
//                                 </Text>
//                               </View>
//                               <View style={styles.oneline}>
//                                 <Text style={{ fontSize: 16 }}>
//                                   {item?.duration?.name}
//                                   {"   "}
//                                 </Text>
//                                 <Text style={{ fontSize: 16 }}>
//                                   {item?.level?.name} Level
//                                 </Text>
//                               </View>
//                               <View style={styles.oneline}>
//                                 <Text style={{ fontSize: 18, color: "green" }}>
//                                   $ {item?.tuitionFee}{" "}
//                                 </Text>
//                                 <Text style={{ fontSize: 16 }}>
//                                   ({item?.currency?.code}){" "}
//                                 </Text>
//                                 <Text style={{ fontSize: 16 }}>
//                                   {"/"}
//                                   {item?.feeType}
//                                 </Text>
//                               </View>
//                             </View>
//                           </View>
//                         </View>
//                       </TouchableOpacity>
//                     </View>
//                   );
//                 }}
//               />
//             ) : (
//               <View
//                 style={{ justifyContent: "center", alignContent: "center" }}
//               >
//                 <Text style={{ alignSelf: "center", marginTop: 100 }}>
//                   University Not Found
//                 </Text>
//               </View>
//             )}
//           </View>
//         ) : (
//           <View style={{ height: SCREEN_HEIGHT }}>
//             <Text
//               style={{
//                 alignSelf: "center",
//                 marginTop: "90%",
//               }}
//             >
//               No Courses Found!
//             </Text>
//           </View>
//         )
//       ) : (
//         <View
//           style={{
//             justifyContent: "center",
//             alignItems: "center",
//             backgroundColor: "white",
//             marginTop: "80%",
//           }}
//         >
//           <Skeleton />
//         </View>
//       )}
//     </View>
//   );
// };

// export default YourComponent;
