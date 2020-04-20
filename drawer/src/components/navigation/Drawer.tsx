import React from "react";
import { StyleSheet, Button, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerItem,
} from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import Animated from "react-native-reanimated";
import { Feather, AntDesign } from "@expo/vector-icons";
import Dashboard from "../screens/Dashboard";
import { RouteProp } from "@react-navigation/native";
import Message from "../screens/Message";
import { Text } from "react-native";
import Contact from "../screens/Contact";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: "#FFF",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    // elevation: 3,
    overflow: "hidden",
    // borderWidth: 1,
  },
  drawerStyles: { flex: 1, width: "50%", backgroundColor: "transparent" },
  drawerItem: { alignItems: "flex-start", marginVertical: 0 },
  drawerLabel: { color: "white", marginLeft: -16 },
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

interface ScreenProps {
  route: RouteProp<Record<string, object | undefined>, "Screens">;
  navigation: any;
  animatedStyle: {
    borderRadius: Animated.Node<number>;
    transform: {
      scale: Animated.Node<number>;
    }[];
  };
}
const Screens = ({ navigation, animatedStyle }: ScreenProps) => {
  return (
    <Animated.View
      //   style={[StyleSheet.flatten([styles.stack, animatedStyle]), {}]}
      style={[
        StyleSheet.flatten([styles.stack, animatedStyle]),
        { backgroundColor: "blue" },
      ]}
    >
      <Stack.Navigator
        screenOptions={{
          //   headerTransparent: true,

          headerTitle: () => (
            <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
              <Feather
                name="menu"
                size={18}
                color="black"
                style={{ paddingHorizontal: 10 }}
              />
            </TouchableWithoutFeedback>
          ),
        }}
      >
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Message" component={Message} />
      </Stack.Navigator>
    </Animated.View>
  );
};

const DrawerContent = (
  props: DrawerContentComponentProps<DrawerContentOptions>
) => {
  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={{ flex: 1 }}
    >
      <DrawerItem
        label="Dashboard"
        labelStyle={styles.drawerLabel}
        style={styles.drawerItem}
        onPress={() => props.navigation.navigate("Dashboard")}
        icon={() => <AntDesign name="dashboard" color="white" size={16} />}
      />
      <DrawerItem
        label="Messages"
        labelStyle={{ color: "white", marginLeft: -16 }}
        style={{ alignItems: "flex-start", marginVertical: 0 }}
        onPress={() => props.navigation.navigate("Message")}
        icon={() => <AntDesign name="message1" color="white" size={16} />}
      />
      <DrawerItem
        label="Contact us"
        labelStyle={{ color: "white", marginLeft: -16 }}
        style={{ alignItems: "flex-start", marginVertical: 0 }}
        onPress={() => props.navigation.navigate("Contact")}
        icon={() => <AntDesign name="phone" color="white" size={16} />}
      />
    </DrawerContentScrollView>
  );
};

export default () => {
  const [progress, setProgress] = React.useState<Animated.Node<number>>(
    new Animated.Value(0)
  );
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };
  return (
    <LinearGradient style={{ flex: 1 }} colors={["#E94057", "#4A00E0"]}>
      <Drawer.Navigator
        // hideStatusBar
        drawerType="slide"
        overlayColor="transparent"
        drawerStyle={styles.drawerStyles}
        drawerContentOptions={{
          activeBackgroundColor: "transparent",
          activeTintColor: "white",
          inactiveTintColor: "white",
        }}
        sceneContainerStyle={{ backgroundColor: "transparent" }}
        drawerContent={(props) => {
          setProgress(props.progress);
          return <DrawerContent {...props} />;
        }}
      >
        <Drawer.Screen name="Screens">
          {(props) => <Screens {...props} animatedStyle={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </LinearGradient>
  );
};
