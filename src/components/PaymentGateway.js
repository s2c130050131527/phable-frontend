import { Box, Button, Flex, FormControl, FormHelperText, FormLabel, Input, useToast } from '@chakra-ui/react'
import { useLocation } from 'react-router-dom'
import qs from 'querystring';
import { useRef } from 'react';
import { API_URL } from '../CONSTANTS';

function PaymentGateway() {
    const location = useLocation();
    const ccNumRef = useRef('');
    const cvvNumRef = useRef('');
    const toast = useToast();


    const decoded = qs.decode(location.search.substring(1));
    const onSubmit = async (e) => {
        e.preventDefault();
        if (ccNumRef.current.value.length !== 16) {
            toast({
                title: "Invalid Card",
                description: "Card Number should be of 16 digits",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            return
        }
        if (cvvNumRef.current.value.length !== 3) {
            toast({
                title: "Invalid CVV",
                description: "CVV Number should be of 3 digits",
                status: "error",
                duration: 9000,
                isClosable: true,
            })
            return
        }

        const res = await fetch(API_URL + 'course/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({
                user: decoded.user,
                course: decoded.id,
                ccNo: ccNumRef.current.value,
                cvvNumRef: cvvNumRef.current.value
            })

        });
    }
    return (
        <Flex height="100vh" width="100vw" justify="center" align="center">
            <form style={{
                width: "25vw",
                display: 'flex'
            }} onSubmit={onSubmit}>
                <Flex direction="column" width="100%">

                    <Box>Please Make Payment</Box>
                    <Box>Amount ₹ {decoded.price}</Box>
                    <Box mt="15px">
                        <FormControl id="email" width="100%">
                            <FormLabel>Credit/Debit Card Number</FormLabel>
                            <Input type="number" ref={ccNumRef} />
                        </FormControl>
                    </Box>
                    <Box mt="15px">
                        <FormControl id="email" width="100%">
                            <FormLabel>CVV No.</FormLabel>
                            <Input type="number" ref={cvvNumRef} minLength={3} maxLength={3} />
                        </FormControl>
                    </Box>
                    <Box mt={4}>
                        <Button colorScheme="whatsapp" width="100%" type="submit">Login</Button>
                    </Box>

                </Flex>
            </form>
        </Flex >

    )
}

export default PaymentGateway
