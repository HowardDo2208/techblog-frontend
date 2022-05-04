import React from 'react'
import {
  Box,
  Heading,
  Spacer,
  Button,
  VStack,
  HStack,
  Grid,
  Text,
  Link,
  Image,
} from '@chakra-ui/react'

const UserCard = ({ email }: any) => {
  return (
    <Box
      mt="3"
      as="article"
      bg="white"
      borderRadius="md"
      overflow="hidden"
      border="1px solid #08090a1a"
    >
      <Grid
        templateColumns={{ base: '1fr', sm: 'max-content 1fr' }}
        gap={2}
        p={4}
      >
        {/* <Image src={userProfile} w="8" borderRadius="full" /> */}

        <HStack d={{ base: 'flex', sm: 'block' }}>
          <VStack
            align="flex-start"
            spacing={0}
            d={{ base: 'flex', sm: 'none' }}
          >
            <Text color="#4d5760" fontSize="14px" fontWeight="500">
              {email ? email : 'email'}
            </Text>
          </VStack>
        </HStack>
        <Box>
          <VStack
            align="flex-start"
            spacing={0}
            d={{ base: 'none', sm: 'flex' }}
          >
            <Text color="#4d5760" fontSize="14px" fontWeight="500">
              {email}
            </Text>
          </VStack>
        </Box>
      </Grid>
    </Box>
  )
}

export default UserCard

