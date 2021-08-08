import { Avatar, Box, Button, Divider, Flex, Image, Popover, PopoverArrow, PopoverContent, PopoverHeader, PopoverTrigger, Text, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { API_URL } from "../CONSTANTS";
import qs from 'querystring'

function Main() {
    const username = localStorage.getItem('username')
    const toast = useToast();
    const [courses, setCourses] = useState([]);
    const history = useHistory();
    const apiCall = async () => {
        try {
            const res = await fetch(API_URL + 'course/getall', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')

                },

            });
            const result = await res.json();
            setCourses(result.data);
        } catch (e) {
            toast({
                title: "Something went wrong",
                description: "We'll fix this issue soon.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
    }

    useEffect(() => {
        apiCall();
    }, [])

    const logoutApi = async () => {
        const res = await fetch(API_URL + 'authentication/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },

        });
        localStorage.clear();
        history.replace('/')

    }
    return (
        <Flex direction="column" bg="#f0f0f0" height="100vh">
            <Flex height="70px" boxShadow="0px 0px 3px rgba(0,0,0,0.5)" bg="white" justify="space-between" align="center" pl={8} pr={8}>
                <Box>
                    <Text fontWeight="bold" fontSize="28px">Course Academy</Text>
                </Box>
                <Popover>
                    <PopoverTrigger>

                        <Flex align="center" cursor="pointer" role="button">
                            <Avatar mr="15px"></Avatar>
                            <Text fontWeight="bold" fontSize="20px">{username}</Text>
                        </Flex>
                    </PopoverTrigger>
                    <PopoverContent width="120px">
                        <PopoverArrow />
                        <PopoverHeader cursor="pointer" onClick={logoutApi} color="red.400" fontWeight="bold"> Logout</PopoverHeader>
                    </PopoverContent>
                </Popover>
            </Flex>
            <Flex p={8} height="calc(100vh - 70px)" overflowY="scroll">
                <Flex flex="3" direction="column" height="100%">
                    <Box >
                        <Text fontWeight="semibold" fontSize="20px">All Available Courses</Text>
                    </Box>
                    {courses.length > 0 ? <Flex wrap="wrap" height="100%" >

                        {courses.map(el => <Flex flexBasis="33.33%" height="220px" flexShrink="revert" p={4}  >
                            <Flex bg="#fff" height="100%" width="100%" borderRadius="6px" _hover={{
                                transform: "scale(1.05)"
                            }}>
                                <Box>
                                    <Image src={el.thumbnailURL} objectFit="contain" height="100%"></Image>
                                </Box>
                                <Flex p={4} direction="column" justify="space-between">
                                    <Text fontWeight="semibold" fontSize="20px" h="40%">{el.title}</Text>
                                    <Divider />
                                    <Text fontWeight="semibold" fontSize="20px">₹ {el.price}</Text>
                                    <Divider />
                                    <Button colorScheme="messenger" onClick={() => {
                                        const str = qs.encode({
                                            id: el.id,
                                            user: username,
                                            price: el.price
                                        });
                                        console.log(str);
                                        history.push('/payment?' + str)
                                    }}>Buy Now</Button>
                                </Flex>
                            </Flex>
                        </Flex>)}

                    </Flex> : <Text fontWeight="semibold" fontSize="16px">No courses Available</Text>}
                </Flex>
                <Flex flex="1" bg="#fff" direction="column" borderRadius="10px" boxShadow="0px 0px 3px rgba(0,0,0,0.5)">
                    <Box>
                        <Text fontWeight="semibold" fontSize="20px">Bought Courses</Text>
                    </Box>
                </Flex>


            </Flex>


        </Flex>
    )
}

export default Main
