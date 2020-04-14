import { TouchableNativeFeedback } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";

import { useMemoOne } from "use-memo-one";

import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

// import Clock from "react-native-reanimated";
const {
  useCode,
  set,
  Value,
  Clock,
  block,
  clockRunning,
  not,
  cond,
  startClock,
  timing,
  Extrapolate,
} = Animated;

interface Tab {
  name: string;
}

interface StaticTabbarProps {
  tabs: Tab[];
  value: Animated.Value<number>;
}
export default ({ tabs, value }: StaticTabbarProps) => {
  const { clock, from, values } = useMemoOne(
    () => ({
      clock: new Clock(),
      from: new Value(0),
      values: tabs.map(
        (tab: any, index: any) => new Animated.Value(index === 0 ? 1 : 0)
      ),
    }),
    []
  );

  const runTiming = (
    startPostion: Animated.Value<number>,
    clock: Animated.Clock,
    easingFunction: Animated.EasingFunction,
    from: Animated.Value<number>,
    to: Animated.Value<number>
  ): Animated.Node<number> => {
    const state: Animated.TimingState = {
      finished: new Value(0),
      position: startPostion,
      time: new Value(0),
      frameTime: new Value(0),
    };
    const config = {
      toValue: to,
      fromValue: from,
      duration: 200,
      easing: easingFunction,
    };
    return block([timing(clock, state, config), state.position]);
  };

  const [play, setPlay] = useState(true);
  const [index, setindex] = useState(0);
  const tabWidth = width / tabs.length;

  useCode(
    () =>
      block([
        cond(not(clockRunning(clock)), [startClock(clock)]),
        values.map((v) =>
          set(
            v,
            runTiming(new Value(0), clock, Easing.linear, from, new Value(0))
          )
        ),
        set(
          value,
          runTiming(
            value,
            clock,
            Easing.linear,
            from,
            new Value(tabWidth * index)
          )
        ),
        set(
          values[index],
          runTiming(values[index], clock, Easing.linear, from, new Value(1))
        ),
      ]),
    [play]
  );

  const onPress = (index: number) => {
    setPlay((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, key) => {
        const tabWidth = width / tabs.length;

        const cursor = tabWidth * key;
        const opacity = value.interpolate({
          inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
          outputRange: [1, 0, 1],
          extrapolate: Extrapolate.CLAMP,
        });
        const translateY = values[key].interpolate({
          inputRange: [0, 1],
          outputRange: [64, 0],
          extrapolate: Extrapolate.CLAMP,
        });
        const opacity1 = values[key].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: Extrapolate.CLAMP,
        });

        return (
          <React.Fragment {...{ key }}>
            <TouchableNativeFeedback
              onPress={() => {
                onPress(key);
                setindex(key);
              }}
            >
              <Animated.View style={[styles.tab, { opacity }]}>
                <Icon name={tab.name} color="black" size={25} />
              </Animated.View>
            </TouchableNativeFeedback>
            <Animated.View
              style={{
                position: "absolute",
                top: -8,
                left: tabWidth * key,
                width: tabWidth,
                height: 64,
                justifyContent: "center",
                alignItems: "center",
                opacity: opacity1,
                transform: [{ translateY }],
              }}
            >
              <View style={styles.activeIcon}>
                <Icon name={tab.name} color="black" size={25} />
              </View>
            </Animated.View>
          </React.Fragment>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 64,
  },
  activeIcon: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
