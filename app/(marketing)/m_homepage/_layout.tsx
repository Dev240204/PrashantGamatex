import { View, Text } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          marginBottom:5,
        },
      }}
    >
      <Tabs.Screen
        name="m_index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons size={25} name="home" />
            ) : (
              <Ionicons size={25} name="home-outline" />
            ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="m_calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons size={25} name="calendar" />
            ) : (
              <Ionicons size={25} name="calendar-outline" />
            ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default _layout;
