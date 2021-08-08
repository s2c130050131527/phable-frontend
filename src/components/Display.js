import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { useRef } from "react";
import { API_URL } from "../CONSTANTS";

function Display({ data, parent, onSave }) {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const nameRef = useRef();

    const toast = useToast();
    const saveUser = async () => {
        if (!nameRef.current.value) {
            toast({
                title: "Oops!!",
                description: "Name is mandatory",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        try {
            const newObject = {
                ...parent,
                name: nameRef.current.value,
            }
            const res = await fetch(API_URL + 'tdee/saveuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newObject)
            });

            const result = await res.json();
            toast({
                title: "User op success",
                description: result.data,
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            onSave(newObject)
            onClose();
        } catch (err) {

            toast({
                title: "Something went wrong",
                description: "Please check after some time.",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            return;

        }
    }


    return (
        <Flex direction="column" height="100vh">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Save Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="name">
                            <FormLabel>Name</FormLabel>
                            <Input type="text" ref={nameRef} placeholder="Your name..." />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant="ghost" onClick={saveUser}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex align="center" mt={10}>
                {data ? <Flex direction="column">
                    <Box mb={3}>
                        <Text fontSize="x-large">Your TDEE is <strong>{data.tdee} </strong>calories per day.</Text>
                    </Box>
                    <Box mb={5}>
                        <Text fontSize="large">Your activity is <strong>{parent.activityId} </strong></Text>
                    </Box>
                    <Box>
                        <Text fontSize="md">To <strong>lose 2kg</strong> in a month, your calorie intake should be <strong>{data.cutting.day2} </strong>calories per day.</Text>
                    </Box>
                    <Box>
                        <Text fontSize="md">To <strong>lose 4kg</strong> in a month, your calorie intake should be <strong>{data.cutting.day4} </strong>calories per day.</Text>
                    </Box>
                    <Box>
                        <Text fontSize="md">To <strong>gain 2kg</strong> in a month, your calorie intake should be <strong>{data.gaining.day2} </strong>calories per day.</Text>
                    </Box>
                    <Box>
                        <Text fontSize="md">To <strong>gain 4kg</strong> in a month, your calorie intake should be <strong>{data.gaining.day2} </strong>calories per day.</Text>
                    </Box>
                    <Box mt={7}>
                        <Button onClick={onOpen} colorScheme="orange" >Save my details</Button>
                    </Box>
                </Flex>
                    : <Text fontSize="x-large" fontWeight="bold" alignSelf="center"> Either enter details or Load user Data</Text>}

            </Flex>
        </Flex>

    )
}

export default Display
