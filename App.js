import React from "react";
import { View, Text, TouchableOpacity, Animated, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function HomeScreen({ animated }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home!</Text>
      <Button title="Anime" onPress={animated} />
    </View>
  );
}

function SettingsScreen({ animated }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
      <Button title="Anime" onPress={animated} />
    </View>
  );
}

function MyTabBar({ state, descriptors, navigation, opacity, translateY }) {
  return (
    <Animated.View
      style={{
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "30%",
        position: "absolute",
        bottom: "5%",
        flexDirection: "row",
        height: "7%",
        width: "90%",
        backgroundColor: "gray",
        opacity,
        transform: [
          {
            translateY,
          },
        ],
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, alignItems: "center" }}
            key={index}
          >
            <Text style={{ color: isFocused ? "#673ab7" : "#222" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const buttonAnimation = React.useRef(new Animated.Value(0)).current;
  const animated = () => {
    Animated.timing(buttonAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(buttonAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };
  const opacity = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const translateY = buttonAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={(props) => (
          <MyTabBar {...props} opacity={opacity} translateY={translateY} />
        )}
      >
        <Tab.Screen name="Home">
          {() => <HomeScreen animated={animated} />}
        </Tab.Screen>
        <Tab.Screen name="Settings">
          {() => <SettingsScreen animated={animated} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
