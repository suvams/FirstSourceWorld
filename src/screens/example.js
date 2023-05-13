// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
// } from "react-native";
// import {
//   useGetCourseCataloguesDataQuery,
//   useGetCourseCataloguesFeeRangeDataQuery,
//   useLazyGetCourseCataloguesFeeRangeDataQuery,
// } from "../rtkQuery/getCourseCataloguesData";

// const Help = () => {
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   // const [filteredData, setFilteredData] = useState(feeRange);

//   const [lazyFeeRange, { data: feeRange, isFetching2 }] =
//     useLazyGetCourseCataloguesFeeRangeDataQuery();
//   const lazyFeeRange1 = async () => {
//     await lazyFeeRange({
//       page: 1,
//       size: 10,
//       feeRange: [minPrice, maxPrice],
//     }).unwrap();
//   };

//   // console.log(feeRange);

//   // const filterPrice = React.useMemo(() => {
//   //   return (
//   //     feeRange?.data?.filter(
//   //       (item) =>
//   //         item.tutionFee >= parseInt(minPrice) &&
//   //         item.tutionFee <= parseInt(maxPrice)
//   //     ) ?? []
//   //   );
//   // });
//   // // setFilteredData(filterPrice);
//   // const filterData = () => {
//   //   let filtered = data?.data?.filter((item) => {
//   //     return (
//   //       item.price >= parseInt(minPrice) && item.price <= parseInt(maxPrice)
//   //     );
//   //   });
//   //   setFilteredData(filtered);
//   // };
//   // console.log(filtered);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Price Filter</Text>
//       <View style={styles.filterContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Min Price"
//           keyboardType="number-pad"
//           value={minPrice}
//           onChangeText={(text) => setMinPrice(text)}
//         />
//         <Text style={styles.text}>-</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Max Price"
//           keyboardType="number-pad"
//           value={maxPrice}
//           onChangeText={(text) => setMaxPrice(text)}
//         />
//         <TouchableOpacity onPress={lazyFeeRange1}>
//           <Text style={styles.btn}>Filter</Text>
//         </TouchableOpacity>
//         {/* <Text style={styles.btn} onPress={filterPrice}>
//           Filter
//         </Text> */}
//       </View>
//       <FlatList
//         data={feeRange?.data}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.itemContainer}>
//             {/* <Text style={styles.itemText}>ID: {item._id}</Text> */}
//             <Text style={styles.itemText}>Price: {item.tutionFee}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#fff",
//   },
//   heading: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   filterContainer: {
//     flexDirection: "row",
//     marginBottom: 20,
//   },
//   input: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     height: 40,
//     marginRight: 10,
//   },
//   text: {
//     fontSize: 20,
//     color: "#ccc",
//     marginHorizontal: 10,
//   },
//   btn: {
//     backgroundColor: "blue",
//     color: "#fff",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     height: 40,
//     textAlignVertical: "center",
//   },
//   itemContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     marginVertical: 5,
//   },
//   itemText: {
//     fontSize: 16,
//   },
// });

// export default Help;
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

const data = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Bob" },
  { id: 4, name: "Alice" },
  { id: 5, name: "Mike" },
  { id: 6, name: "Sara" },
];

const ExampleScreen = () => {
  const [count, setCount] = useState(data.length);

  const renderItem = ({ item }) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  );

  const renderFooter = () => (
    <View>
      <Text>Total items: {count}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      ListFooterComponent={renderFooter}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default ExampleScreen;
