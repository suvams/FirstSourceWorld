import React, { useState } from "react";
import { View, Text, Button, FlatList } from "react-native";

const data = [
  {
    id: 1,
    location: "Location 1",
    subLocation: "Sub Location 1",
    name: "Item 1",
  },
  {
    id: 2,
    location: "Location 2",
    subLocation: "Sub Location 1",
    name: "Item 2",
  },
  {
    id: 3,
    location: "Location 1",
    subLocation: "Sub Location 2",
    name: "Item 3",
  },
  {
    id: 4,
    location: "Location 3",
    subLocation: "Sub Location 2",
    name: "Item 4",
  },
  {
    id: 5,
    location: "Location 2",
    subLocation: "Sub Location 1",
    name: "Item 5",
  },
  // Add more data items as needed
];

const HomeScreen = () => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedSubLocation, setSelectedSubLocation] = useState(null);

  const handleLocationFilter = () => {
    setFilteredData(data);
    setSelectedLocation(null);
    setSelectedSubLocation(null);
  };

  const handleSubLocationFilter = () => {
    setFilteredData(data);
    setSelectedSubLocation(null);
  };

  const renderItem = ({ item }) => (
    <View style={{ marginBottom: 10 }}>
      <Text>{item.name}</Text>
    </View>
  );

  const filteredByLocation = selectedLocation
    ? data.filter((item) => item.location === selectedLocation)
    : data;

  const filteredBySubLocation = selectedSubLocation
    ? filteredByLocation.filter(
        (item) => item.subLocation === selectedSubLocation
      )
    : filteredByLocation;

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
        Filter by Location:
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {selectedLocation && (
          <Button
            title="Remove Location Filter"
            onPress={handleLocationFilter}
            color="red"
          />
        )}
        {!selectedLocation && (
          <>
            <Button
              title="Location 1"
              onPress={() => setSelectedLocation("Location 1")}
            />
            <Button
              title="Location 2"
              onPress={() => setSelectedLocation("Location 2")}
            />
            <Button
              title="Location 3"
              onPress={() => setSelectedLocation("Location 3")}
            />
            {/* Add more location buttons as needed */}
          </>
        )}
      </View>

      {selectedLocation && (
        <>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>
            Filter by Sub Location:
          </Text>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            {selectedSubLocation && (
              <Button
                title="Remove Sub Location Filter"
                onPress={handleSubLocationFilter}
                color="red"
              />
            )}
            {!selectedSubLocation && (
              <>
                <Button
                  title="Sub Location 1"
                  onPress={() => setSelectedSubLocation("Sub Location 1")}
                />
                <Button
                  title="Sub Location 2"
                  onPress={() => setSelectedSubLocation("Sub Location 2")}
                />
                {/* Add more sublocation buttons as needed */}
              </>
            )}
          </View>

          <FlatList
            data={filteredBySubLocation}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </>
      )}

      {!selectedLocation && !selectedSubLocation && (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default HomeScreen;
