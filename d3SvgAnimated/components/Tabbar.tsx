import * as React from "react";
import { SafeAreaView, StyleSheet, Dimensions, View } from "react-native";
import Animated from "react-native-reanimated";

import * as shape from "d3-shape";
import Svg, { Path } from "react-native-svg";

import StaticTabbar from "./StaticTabbar";

const AnimatedSVG = Animated.createAnimatedComponent(Svg);
const { width } = Dimensions.get("window");
const height = 64;
const tabs = [
  {
    name: "grid",
  },
  {
    name: "list",
  },
  {
    name: "repeat",
  },
  {
    name: "map",
  },
  {
    name: "user",
  },
];
const tabWidth = width / tabs.length;
const backgroundColor = "white";

const getPath = (): string => {
  const left = shape
    .line()
    .x((d) => d[0])
    .y((d) => d[1])([
    [0, 0],
    [width, 0],
  ]);

  const tab = shape
    .line()
    .x((d) => d[0])
    .y((d) => d[1])
    .curve(shape.curveBasis)([
    [width, 0],
    [width + 5, 0],
    [width + 10, 10],
    [width + 15, height],
    [width + tabWidth - 15, height],
    [width + tabWidth - 10, 10],
    [width + tabWidth - 5, 0],
    [width + tabWidth, 0],
  ]);

  const right = shape
    .line()
    .x((d) => d[0])
    .y((d) => d[1])([
    [width + tabWidth, 0],
    [width * 2, 0],
    [width * 2, height],
    [0, height],
    [0, 0],
  ]);

  return `${left} ${tab} ${right}`;
};
const d = getPath();
export default () => {
  const value = new Animated.Value<number>(0);
  const translateX = value.interpolate({
    inputRange: [0, width],
    outputRange: [-width, 0],
  });
  return (
    <>
      <View {...{ height, width }}>
        <AnimatedSVG
          width={width * 2}
          height={height}
          style={{ transform: [{ translateX }] }}
        >
          <Path fill={backgroundColor} d={d} />
        </AnimatedSVG>

        <View style={StyleSheet.absoluteFill}>
          <StaticTabbar {...{ tabs, value }} />
        </View>
      </View>
      <SafeAreaView style={styles.container} />
    </>
  );
};
// eslint-disable-next-line react/prefer-stateless-function

const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
});
