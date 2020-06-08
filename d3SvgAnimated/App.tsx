import React from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import Tabbar from "./components/Tabbar";

export default () => {
  return (
    <Animated.View style={styles.container}>
      <Tabbar />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eb3345",
    justifyContent: "flex-end",
  },
});
