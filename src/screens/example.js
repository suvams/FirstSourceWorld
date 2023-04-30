import React, { useState } from "react";
import { View, Text, Picker } from "react-native";

const DropdownExample = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [secondDropdownVisible, setSecondDropdownVisible] = useState(false);
  const [secondSelectedItem, setSecondSelectedItem] = useState(null);

  const handleSelectItem = (itemValue) => {
    setSelectedItem(itemValue);
    setSecondDropdownVisible(true);
  };

  const handleSecondSelectItem = (itemValue) => {
    setSecondSelectedItem(itemValue);
  };

  return (
    <View>
      <Picker
        selectedValue={selectedItem}
        onValueChange={(itemValue) => handleSelectItem(itemValue)}
      >
        <Picker.Item label="Select Item" value={null} />
        <Picker.Item label="Item 1" value="item1" />
        <Picker.Item label="Item 2" value="item2" />
      </Picker>
      {secondDropdownVisible && (
        <Picker
          selectedValue={secondSelectedItem}
          onValueChange={(itemValue) => handleSecondSelectItem(itemValue)}
        >
          <Picker.Item label="Select Item" value={null} />
          <Picker.Item label="Item 1" value="item1" />
          <Picker.Item label="Item 2" value="item2" />
        </Picker>
      )}
    </View>
  );
};

export default DropdownExample;
