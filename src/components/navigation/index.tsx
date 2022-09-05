import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Icon } from 'native-base';
import React from 'react';
import { HomeStackScreen } from '../../screen';
import { RecipesStackScreen } from '../../screen/recipes';

const Tab = createBottomTabNavigator();

export const Navigation = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName='HomeStack'
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}>
      <Tab.Screen
        name='HomeStack'
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              as={Ionicons}
              name={focused ? 'home' : 'home-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name='RecipesStack'
        component={RecipesStackScreen}
        options={{
          title: 'Recipes',
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              as={Ionicons}
              name={focused ? 'receipt' : 'receipt-outline'}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);
