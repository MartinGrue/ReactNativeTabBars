import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Bookmarks from "./src/components/screens/Bookmarks";
import Icon from "react-native-vector-icons/FontAwesome";
import Likes from "./src/components/screens/Likes";
import Private from "./src/components/screens/Private";
import Profile from "./src/components/screens/Profile";
import MultiBarToggle from "./src/components/navigation/MultiBarToggle";
import MultiBar from "./src/components/navigation/MultiBar";

const tabNavigator = createBottomTabNavigator(
  {
    Bookmarks: {
      screen: Bookmarks,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }: { tintColor: string }) => (
          <Icon name="bookmark" color={tintColor} size={24} />
        ),
      }),
    },
    Likes: {
      screen: Likes,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="heart" color={tintColor} size={24} />
        ),
      }),
    },
    MultiBar: {
      screen: () => null,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: () => (
          <MultiBarToggle
            navigation={navigation}
            actionSize={30}
            routes={[
              {
                routeName: "Likes",
                color: "#FF8360",
                icon: <Icon name="rocket" color="#333333" size={15} />,
              },
              {
                routeName: "Likes",
                color: "#E8E288",
                icon: <Icon name="dashboard" color="#333333" size={15} />,
              },
              {
                routeName: "Likes",
                color: "#7DCE82",
                icon: <Icon name="gears" color="#333333" size={15} />,
              },
            ]}
            icon={<Icon name="plus" color="#FFFFFF" size={24} />}
          />
        ),
      }),
      params: {
        navigationDisabled: true,
      },
    },
    Private: {
      screen: Private,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="lock" color={tintColor} size={24} />
        ),
      }),
    },
    Profile: {
      screen: Profile,
      navigationOptions: () => ({
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" color={tintColor} size={24} />
        ),
      }),
    },
  },
  {
    tabBarComponent: MultiBar,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: "#F8F8F8",
      inactiveTintColor: "#586589",
      style: {
        backgroundColor: "#171F33",
      },
      tabStyle: {},
    },
  }
);
const AppNavigator = createAppContainer(tabNavigator);
export default () => {
  return <AppNavigator></AppNavigator>;
};
