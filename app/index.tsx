import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

const App = () => {
  const [orientation, setOrientation] = useState("portrait");
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  useEffect(() => {
    const handleOrientationChange = () => {
      if (windowWidth > windowHeight) {
        setOrientation("landscape");
      } else {
        setOrientation("portrait");
      }
    };

    handleOrientationChange();
  }, [windowWidth, windowHeight]);

  const isLandscape = orientation === "landscape";

  const buttonWidth = isLandscape ? windowWidth * 0.25 : windowWidth * 0.5;
  const imageWidth = Math.round(
    isLandscape ? 0.8 * 0.4 * windowWidth : 0.8 * windowWidth
  );
  const imageHeight = isLandscape
    ? Math.round(0.4 * windowHeight)
    : Math.round(0.3 * windowHeight);
  const uri = `https://via.placeholder.com/${imageWidth}x${imageHeight}`;
  const logImageSize = () => {
    console.log(uri);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar
        backgroundColor={isLandscape ? "#ebb813" : "#ffffff"}
        barStyle={isLandscape ? "light-content" : "dark-content"}
      />
      <TouchableOpacity onPress={logImageSize}>
        <Image
          source={{ uri }}
          style={[styles.image, { width: imageWidth, height: imageHeight }]}
        />
      </TouchableOpacity>
      <View
        style={[
          styles.buttonContainer,
          { flexDirection: isLandscape ? "row" : "column" },
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
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: "50%",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    margin: 5,
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
