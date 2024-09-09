import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
  StyleSheet,
  useWindowDimensions,
  Dimensions,
} from "react-native";

const App = () => {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    const updateOrientation = () => {
      setOrientation(height > width ? "portrait" : "landscape");
    };
    updateOrientation();
    const subscription = Dimensions.addEventListener(
      "change",
      updateOrientation
    );
    return () => subscription.remove();
  }, [width, height]);

  const isLandscape = orientation === "landscape";

  const buttonWidth = isLandscape ? width / 4 : width / 2 - 20;
  const imageWidth = width * 0.8;
  const imageHeight = isLandscape ? height * 0.4 : height * 0.3;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar
        backgroundColor={isLandscape ? "#f0f0f0" : "#ffffff"}
        barStyle={isLandscape ? "dark-content" : "light-content"}
      />
      <Image
        source={{ uri: `https://picsum.photos/${imageWidth}/${imageHeight}` }}
        // style={[styles.image, { width: imageWidth, height: imageHeight }]}
      />
      <View
        style={[
          styles.buttonContainer,
          isLandscape && styles.buttonContainerLandscape,
        ]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            { width: buttonWidth },
            Platform.select({
              ios: styles.buttonIOS,
              android: styles.buttonAndroid,
            }),
          ]}
        >
          <Text style={styles.buttonText}>Button 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { width: buttonWidth },
            Platform.select({
              ios: styles.buttonIOS,
              android: styles.buttonAndroid,
            }),
          ]}
        >
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter text here"
        placeholderTextColor="#999"
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  image: {
    resizeMode: "contain",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainerLandscape: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  buttonIOS: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonAndroid: {},
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 20,
    ...Platform.select({
      ios: {
        paddingVertical: 10,
      },
      android: {
        paddingVertical: 5,
      },
    }),
  },
});

export default App;
