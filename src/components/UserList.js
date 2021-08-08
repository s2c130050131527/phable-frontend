import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react'


function UserList({ onClickLoad, users }) {


    return (
        <Flex flex={1} direction="column" p={12} maxH="100%" w="100%" overflow="auto" >
            {users.map(user => (
                <Flex mt={6} w="100%" bg="#fcfcfc" p={4} boxShadow="0px 0px 9px rgba(0,0,0,0.15)" borderRadius={6} justify="space-between">
                    <Box>
                        Name: <strong>{user.name}</strong>
                    </Box>
                    <Button colorScheme="facebook" size="sm" onClick={() => {
                        onClickLoad({
                            bodyFat: user.fat,
                            weight: user.weight,
                            name: user.name,
                            activityId: user.activity,
                        })
                    }}>Load User</Button>
                </Flex>
            ))}
        </Flex>
    )
}

export default UserList
