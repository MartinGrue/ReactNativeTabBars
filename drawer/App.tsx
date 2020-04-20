import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Drawer from "./src/components/navigation/Drawer";

export default function App() {
  return <NavigationContainer>{<Drawer></Drawer>}</NavigationContainer>;
}
