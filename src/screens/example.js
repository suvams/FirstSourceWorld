import React, { useState, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, Animated } from "react-native";

const SlideModal = ({ visible, onClose }) => {
  const [slideAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: visible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={{ flex: 1, marginTop: 80 }} onPress={onClose}>
        <Animated.View
          style={{
            flex: 1,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            transform: [
              {
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0],
                }),
              },
            ],
            justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <Animated.View
            style={{
              backgroundColor: "white",
              padding: 20,
              borderRadius: 10,
              opacity: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
            }}
          >
            <Text>Modal content goes here</Text>
          </Animated.View>
        </Animated.View>
      </TouchableOpacity>
    </Modal>
  );
};

export default function App() {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={handleOpen}>
        <Text>Open Modal</Text>
      </TouchableOpacity>

      <SlideModal visible={visible} onClose={handleClose} />
    </View>
  );
}
