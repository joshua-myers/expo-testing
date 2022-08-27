import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Center, Heading, View } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeStack = createNativeStackNavigator();

export const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
)

export const Home = () => {
  return <SafeAreaView>
    <Center bg="coolGray.200" p="20" h="full">
      <View >
        <Heading>Digital Diner</Heading>
      </View>
    </Center>
  </SafeAreaView>
}