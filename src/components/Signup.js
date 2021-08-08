import { ArrowLeftIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../CONSTANTS';

function Signup() {
    const history = useHistory();
    const emailRef = useRef('email');
    const passRef = useRef('email');
    const toast = useToast();

    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(API_URL + 'authentication/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: emailRef.current.value,
                password: passRef.current.value
            })
        });
        const result = await res.json();
        if (res.status === 200) {
            history.push('/');
            toast({
                title: "Account created.",
                description: "We've created your account for you. Please Login.",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            return;
        }
        toast({
            title: "Something went wrong",
            description: "We'll fix this issue soon.",
            status: "error",
            duration: 9000,
            isClosable: true,
        })
    }
    return (
        <form style={{ width: '25vw' }} onSubmit={onSubmit} >
            <Box>
                <Button colorScheme="telegram" fontSize="16px" leftIcon={<ArrowLeftIcon />} size="sm" variant="ghost" onClick={() => history.push('/')}>Go Back</Button>
                <Text fontSize="30px" fontWeight="bold">Enter the details</Text>
            </Box>
            <Box mt="15px">
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" ref={emailRef} />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
            </Box>
            <Box mt="15px">
                <FormControl id="password" >
                    <FormLabel>Password</FormLabel>
                    <Input type="password" ref={passRef} minLength={6} maxLength={18} />
                    <FormHelperText>Should be 6-18 characters long</FormHelperText>
                </FormControl>
            </Box>
            <Box mt={4}>
                <Button colorScheme="whatsapp" width="100%" type="submit">Sign Up</Button>
            </Box>
        </form>
    )
}

export default Signup
