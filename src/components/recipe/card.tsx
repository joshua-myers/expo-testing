import {
  Box,
  AspectRatio,
  Stack,
  Heading,
  HStack,
  Text,
  Center,
  Image,
  Pressable,
} from 'native-base';
import React from 'react';
import { RecipeDoc } from '../../firebase/recipies';

export const RecipeCard = ({
  recipe,
  onPress,
}: {
  recipe: RecipeDoc;
  onPress: () => void;
}) => {
  return (
    <Box alignItems='center' w='full'>
      <Pressable onPress={onPress}>
        <Box
          rounded='lg'
          overflow='hidden'
          borderColor='coolGray.200'
          borderWidth='1'
          _dark={{
            borderColor: 'coolGray.600',
            backgroundColor: 'gray.700',
          }}
          _web={{
            shadow: 2,
            borderWidth: 0,
          }}
          _light={{
            backgroundColor: 'gray.50',
          }}>
          <Box>
            <AspectRatio w='100%' ratio={16 / 9}>
              <Image
                source={{
                  uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg',
                }}
                alt='image'
              />
            </AspectRatio>
            <Center
              bg='violet.500'
              _dark={{
                bg: 'violet.400',
              }}
              _text={{
                color: 'warmGray.50',
                fontWeight: '700',
                fontSize: 'xs',
              }}
              position='absolute'
              bottom='0'
              px='3'
              py='1.5'>
              PHOTOS
            </Center>
          </Box>
          <Stack p='4' space={3}>
            <Stack space={2}>
              <Heading size='md' ml='-1'>
                {recipe.name}
              </Heading>
              <Text
                fontSize='xs'
                _light={{
                  color: 'violet.500',
                }}
                _dark={{
                  color: 'violet.400',
                }}
                fontWeight='500'
                ml='-0.5'
                mt='-1'>
                {recipe.author}
              </Text>
            </Stack>
            <Text fontWeight='400'></Text>
            <HStack
              alignItems='center'
              space={4}
              justifyContent='space-between'>
              <HStack alignItems='center'>
                <Text
                  color='coolGray.600'
                  _dark={{
                    color: 'warmGray.200',
                  }}
                  fontWeight='400'></Text>
              </HStack>
            </HStack>
          </Stack>
        </Box>
      </Pressable>
    </Box>
  );
};
