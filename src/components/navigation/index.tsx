import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "native-base";
import React from "react";
import { Home } from "../../screen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const Navigation = () => {
  return <NavigationContainer>
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name='Home' component={Home} options={{ tabBarIcon: ({ focused, color, size }) => <Icon as={Ionicons} name={focused ? 'home' : 'home-outline'} size={size} color={color} /> }} />
      <Tab.Screen name='Recipes' component={Home} options={{ tabBarIcon: ({ focused, color, size }) => <Icon as={Ionicons} name={focused ? 'receipt' : 'receipt-outline'} size={size} color={color} /> }} />
    </Tab.Navigator>
  </NavigationContainer>
}