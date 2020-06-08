import React from "react";
import { Text, SafeAreaView } from "react-native";

export default () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ textAlign: "center" }}>Message Message Message</Text>
    </SafeAreaView>
  );
};
