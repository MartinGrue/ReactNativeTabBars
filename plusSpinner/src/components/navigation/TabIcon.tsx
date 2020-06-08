import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
export default ({
  route,
  renderIcon,
  focused,
  activeTintColor,
  inactiveTintColor,
  onPress,
}: any) => {
  return (
    <TouchableOpacity
      style={styles.tabStyle}
      onPress={() => onPress && onPress()}
    >
      {renderIcon({
        route,
        focused,
        tintColor: focused ? activeTintColor : inactiveTintColor,
      })}
      {route.params && (
        <Text
          style={[
            styles.labelStyle,
            { color: focused ? activeTintColor : inactiveTintColor },
          ]}
        >
          {route.params.label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  tabStyle: {
    flex: 1,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  labelStyle: {
    fontSize: 11,
    marginBottom: 1,
    marginTop: 1.5,
  },
});
