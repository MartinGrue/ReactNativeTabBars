import React from "react";
import Animated from "react-native-reanimated";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, StyleSheet } from "react-native";
import { NavigationTabProp } from "react-navigation-tabs";
import { NavigationRoute, NavigationParams } from "react-navigation";

interface MultiBarActionsProps {
  routes: {
    routeName: string;
    color: string;
    icon: JSX.Element;
  }[];
  navigation: NavigationTabProp<NavigationRoute<NavigationParams>, any>;
  actionActivation: Animated.Value<0>[];
  togglePressed: () => void;
}
export const MultiBarActions = ({
  routes,
  actionActivation,
  togglePressed,
  navigation,
}: MultiBarActionsProps) => {
  const STEP = 135 / routes.length;
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const actionPressed = (route: {
    routeName: string;
    color: string;
    icon: JSX.Element;
  }) => {
    togglePressed();
    navigation.navigate(route.routeName);
  };

  return (
    <>
      {routes.map((route, i) => {
        const offset = (STEP * (i + 1)) / 135 - 0.5;
        const angle = -90 + 135 * offset - STEP / 2;
        const radius = 80;

        const x = radius * Math.cos((-angle * Math.PI) / 180);
        const y = radius * Math.sin((-angle * Math.PI) / 180);

        const activationScale = actionActivation[i].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        });

        const activationPositionX = actionActivation[i].interpolate({
          inputRange: [0, 1],
          outputRange: [0, x],
        });

        const activationPositionY = actionActivation[i].interpolate({
          inputRange: [0, 1],
          outputRange: [0, y],
        });

        return (
          <Animated.View
            key={`action_${i}`}
            style={[
              styles.actionContainer,
              {
                marginLeft: -40 / 2,
                left: activationPositionX,
                bottom: activationPositionY,
              },
              { transform: [{ scale: activationScale }] },
            ]}
          >
            <AnimatedTouchable
              style={{
                width: 40,
                height: 40,
                borderRadius: 40 / 2,
                backgroundColor: route.color,
              }}
              onPress={() => actionPressed(route)}
            >
              <View pointerEvents="box-none" style={styles.actionContent}>
                {route.icon}
              </View>
            </AnimatedTouchable>
          </Animated.View>
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
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
});
