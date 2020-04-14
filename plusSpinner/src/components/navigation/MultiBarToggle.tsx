import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Animated, { Easing } from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";
import { NavigationTabProp } from "react-navigation-tabs";
import { NavigationRoute, NavigationParams } from "react-navigation";
import { MultiBarActions } from "./MultiBarActions";

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
} = Animated;

interface MultibarToggleProps {
  navigation: NavigationTabProp<NavigationRoute<NavigationParams>, any>;
  routes: {
    routeName: string;
    color: string;
    icon: JSX.Element;
  }[];
  actionSize: number;
  icon: JSX.Element;
}
const { width, height } = Dimensions.get("window");
export default ({
  routes,
  icon,
  navigation,
  actionSize,
}: MultibarToggleProps) => {
  const { clock, activation, actionActivation } = useMemoOne(
    () => ({
      clock: new Clock(),
      activation: new Animated.Value(0),
      delayed: new Animated.Value(0),
      from: new Animated.Value(0),
      to: new Animated.Value(1),
      actionActivation: routes.map(() => new Animated.Value(0)),
    }),
    []
  );
  const showOverlay = false;
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
  const [active, setactive] = useState(false);

  const runTiming = (
    startPostion: Animated.Value<number>,
    clock: Animated.Clock,
    config: {
      toValue: Animated.Value<number>;
      fromValue: Animated.Value<number>;
      duration: number;
      easing: Animated.EasingFunction;
    }
  ): Animated.Node<number> => {
    const state: Animated.TimingState = {
      finished: new Value(0),
      position: startPostion,
      time: new Value(0),
      frameTime: new Value(0),
    };
    return block([timing(clock, state, config), state.position]);
  };
  useCode(
    () =>
      block([
        cond(not(clockRunning(clock)), [startClock(clock)]),
        set(
          activation,
          runTiming(activation, clock, {
            toValue: active ? new Animated.Value(0) : new Animated.Value(1),
            fromValue: active ? new Animated.Value(1) : new Animated.Value(0),
            duration: 300,
            easing: Easing.linear,
          })
        ),
        routes.map((v, i) =>
          set(
            actionActivation[routes.length - 1 - i],
            runTiming(actionActivation[routes.length - 1 - i], clock, {
              toValue: active ? new Animated.Value(1) : new Animated.Value(0),
              fromValue: active ? new Animated.Value(0) : new Animated.Value(1),
              duration: 400,
              easing: Easing.linear,
            })
          )
        ),
      ]),
    [active]
  );
  const togglePressed = () => {
    setactive((prev) => !prev);
  };

  const activationRotate = activation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2 * Math.PI * 5],
  });
  const activationScale = activation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.25, 1],
  });
  return (
    <View pointerEvents="box-none" style={styles.container}>
      {active && showOverlay && (
        <TouchableWithoutFeedback onPress={togglePressed}>
          <View style={styles.overlayActive} />
        </TouchableWithoutFeedback>
      )}
      {
        <View style={styles.actionsWrapper}>
          <MultiBarActions
            routes={routes}
            actionActivation={actionActivation}
            togglePressed={togglePressed}
            navigation={navigation}
          ></MultiBarActions>
        </View>
      }
      <Animated.View>
        <AnimatedTouchable activeOpacity={1} onPress={togglePressed}>
          <Animated.View
            style={[
              styles.toggleButton,
              {
                transform: [
                  { rotate: activationRotate },
                  { scale: activationScale },
                ],
                width: 80,
                height: 80,
                borderRadius: 80 / 2,
                backgroundColor: "#1DA2FF",
              },
            ]}
          >
            {icon}
          </Animated.View>
        </AnimatedTouchable>
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 40,
    marginRight: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  toggleButton: {
    marginLeft: 20,
    marginRight: 20,
    top: 15,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  toggleIcon: {
    fontSize: 30,
    color: "#FFFFFF",
  },
  actionsWrapper: {
    position: "absolute",
    bottom: 0,
  },
  actionContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  actionContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  actionContentLabel: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
    fontSize: 9,
    textAlign: "center",
    color: "#FFFFFF",
  },
  overlayActive: {
    position: "absolute",
    height: height * 2,
    width: width * 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    bottom: "-150%",
  },
});
