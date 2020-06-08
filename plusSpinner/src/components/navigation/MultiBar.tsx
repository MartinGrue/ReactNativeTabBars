import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import TabIcon from "./TabIcon";
import { BottomTabBarProps } from "react-navigation-tabs/lib/typescript/src/types";

export default ({
  style,
  navigation,
  activeTintColor,
  inactiveTintColor,
  renderIcon,
  jumpTo,
}: BottomTabBarProps) => {
  const { index, routes } = navigation.state;
  return (
    <SafeAreaView pointerEvents="box-none" style={styles.container}>
      <SafeAreaView style={[styles.fakeBackground, style]}>
        <View style={{ height: 49 }} />
      </SafeAreaView>
      <View pointerEvents="box-none" style={styles.content}>
        {routes.map((route, idx) => {
          const focused = index === idx;

          if (!route.params || !route.params.navigationDisabled) {
            return (
              <TabIcon
                key={route.key}
                route={route}
                renderIcon={renderIcon}
                focused={focused}
                activeTintColor={activeTintColor}
                inactiveTintColor={inactiveTintColor}
                onPress={() =>
                  (!route.params || !route.params.navigationDisabled) &&
                  jumpTo(route.key)
                }
              />
            );
          }

          const Icon = renderIcon({
            route,
            focused,
            tintColor:
              focused && typeof activeTintColor === "string"
                ? activeTintColor
                : typeof inactiveTintColor === "string"
                ? inactiveTintColor
                : undefined,
          });

          return {
            ...(Icon as Object),
            key: "simple",
          };
        })}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "flex-end",
    minHeight: 160,
  },
  fakeBackground: {
    position: "absolute",
    width: "100%",
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
