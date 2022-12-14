import { MaterialIcons } from '@expo/vector-icons';
import { Box, HStack, Icon, IconButton, StatusBar, Text } from 'native-base';
import React from 'react';

export const AppBar = () => {
  return (
    <>
      <StatusBar backgroundColor="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="#6200ee" />
      <HStack
        bg="#6200ee"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%">
        <HStack alignItems="center">
          <IconButton
            disabled
            icon={
              <Icon size="sm" as={MaterialIcons} name="menu" color="white" />
            }
          />
          <Text color="white" fontSize="20" fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack>
          {/* <IconButton disabled icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
        <IconButton disabled icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
        <IconButton disabled icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} /> */}
        </HStack>
      </HStack>
    </>
  );
};
