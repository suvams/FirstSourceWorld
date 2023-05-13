import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const services = [
  "Visa Services",
  "Career Counselling",
  "Schlorship Processing",
  "Health Cover",
  "Destination Services",
  "Student Accomodation",
];

const ContactUsScreen = ({ onSubmit }) => {
  const [selectedService, setSelectedService] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApply = () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !selectedService ||
      !message.trim()
    ) {
      alert("Please fill all the fields.");
      return;
    }

    setIsSubmitting(true);
    onSubmit(
      {
        firstName,
        lastName,
        email,
        phone,
        selectedService,
        message,
      },
      () => {
        setSelectedService(null);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setIsSubmitting(false);
        alert("Applied successfully!");
      }
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://www.firstsourceworld.com/static/media/fsw-logo.6d47a10924041f62aa41.png",
        }}
        resizeMode="cover"
        style={styles.logo}
      />
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Contact Us</Text>
        <Text style={styles.heading1}>Get in touch with FSW</Text>
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
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedService}
            onValueChange={(itemValue) => setSelectedService(itemValue)}
          >
            <Picker.Item label="Select Services" value={null} />
            {services.map((service) => (
              <Picker.Item label={service} value={service} key={service} />
            ))}
          </Picker>
        </View>
        <TextInput
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
          style={styles.messageInput}
          multiline={true}
        />
        <TouchableOpacity
          style={[styles.applyButton, isSubmitting && styles.disabledButton]}
          disabled={isSubmitting}
          onPress={handleApply}
        >
          <Text style={styles.applyButtonText}>
            {isSubmitting ? "Applying..." : "Apply"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

ContactUsScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  formContainer: {
    // borderWidth: 0.5,
    padding: 10,
    borderRadius: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  heading1: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "purple",
  },
  textInput: {
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    fontSize: 17,
  },
  logo: {
    height: 80,
    width: 300,
  },

  pickerContainer: {
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    borderRadius: 10,
    marginTop: 10,
  },
  messageInput: {
    borderWidth: 0.5,
    borderColor: "#8e8e8e",
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    fontSize: 17,
    minHeight: 100,
  },
  applyButton: {
    backgroundColor: "#841584",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
  },
});
