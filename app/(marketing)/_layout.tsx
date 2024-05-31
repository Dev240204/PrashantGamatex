import "~/global.css";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, SplashScreen, useNavigation } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform, View, Image } from "react-native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import { PortalHost } from "~/components/primitives/portal";
import { ThemeToggle } from "~/components/ThemeToggle";
import CustomDrawerContent from "~/components/CustomDrawerContent";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import MenuIcon from "~/components/MenuIcon";
import Logo from "~/components/Logo";
import CustomHeader from "~/components/CustomHeader";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");
      if (Platform.OS === "web") {
        // Adds the background color to the html element to prevent white background on overscroll.
        document.documentElement.classList.add("bg-background");
      }
      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      // const colorTheme = theme === "dark" ? "dark" : "light";
      // if (colorTheme !== colorScheme) {
      //   setColorScheme(colorTheme);

      //   setIsColorSchemeLoaded(true);
      //   return;
      // }
      setColorScheme("light");
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            drawerLabelStyle: {
              fontSize: 14,
              fontWeight: "bold",
              marginLeft: -10,
            },
            drawerActiveTintColor: "steelblue",
          }}
          initialRouteName="signin"
          drawerContent={CustomDrawerContent}
        >
          <Drawer.Screen
            name="homepage"
            options={{
              drawerLabel: "Homepage",
              headerStyle: {
                borderWidth: 1,
                borderColor: "#f0f0f0",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              },
              headerTitle: () => <Logo />,
              headerTitleAlign: "center",
              headerTitleContainerStyle: {
                height: "auto",
              },
              drawerIcon: ({ color, size }) => (
                <FontAwesome size={size} name="home" color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="lead"
            options={{
              drawerLabel: "Lead",
              headerStyle: {
                borderWidth: 1,
                borderColor: "#f0f0f0",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              },
              drawerLabelStyle: {
                marginLeft: -5,
                fontSize: 14,
                fontWeight: "bold",
              },
              headerTitle: () => <Logo />,
              headerTitleAlign: "center",
              headerTitleContainerStyle: {
                height: "auto",
              },
              drawerIcon: ({ color, size }) => (
                <FontAwesome size={size} name="user" color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="followup"
            options={{
              drawerLabel: "Follow Up",
              headerStyle: {
                borderWidth: 1,
                borderColor: "#f0f0f0",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              },
              headerTitle: () => <Logo />,
              headerTitleAlign: "center",
              headerTitleContainerStyle: {
                height: "auto",
              },
              drawerIcon: ({ color, size }) => (
                <FontAwesome size={size - 3} name="bell" color={color} />
              ),
            }}
          />
          <Drawer.Screen
            name="VisualizeAsync"
            options={{
              drawerLabel: "Async",
              headerStyle: {
                borderWidth: 1,
                borderColor: "#f0f0f0",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              },
              headerTitle: () => <Logo />,
              headerTitleAlign: "center",
              headerTitleContainerStyle: {
                height: "auto",
              },
              drawerIcon: ({ color, size }) => (
                <FontAwesome size={size - 3} name="bell" color={color} />
              ),
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
      <PortalHost />
    </ThemeProvider>
  );
}