import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
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

  // button width= width/4
  const buttonWidth = width / 4;
  const imageWidth = Math.round(width * 0.8);
  const imageHeight = isLandscape
    ? Math.round(height * 0.4)
    : Math.round(height * 0.3);
  const uri = `https://via.placeholder.com/${imageWidth}x${imageHeight}`;
  const logImageSize = () => {
    console.log(uri);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={isLandscape ? "#f0f0f0" : "#ffffff"}
        barStyle={isLandscape ? "dark-content" : "light-content"}
      />
      <TouchableOpacity onPress={logImageSize}>
        <Image
          source={{
            uri: `https://via.placeholder.com/${imageWidth}x${imageHeight}`,
          }}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
        />
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
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
          <Text style={styles.buttonText}>{buttonWidth}</Text>
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
          <Text style={styles.buttonText}>{buttonWidth}</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Enter text here"
        placeholderTextColor="#999"
      />
    </View>
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
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "50%", // Set the container width to 50% of the screen
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
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
  line: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 10,
  },
});

export default App;
