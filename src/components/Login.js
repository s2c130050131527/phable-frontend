import { Box, Button, FormControl, FormHelperText, FormLabel, Input, Text, useToast, } from '@chakra-ui/react';
import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { API_URL } from '../CONSTANTS';

function Login() {
    const history = useHistory();
    const emailRef = useRef('email');
    const passRef = useRef('email');
    const toast = useToast();
    const onSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(API_URL + 'authentication/login', {
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
            localStorage.setItem('token', result.token)
            localStorage.setItem('username', result.user)
            history.push('/main');
            toast({
                title: "Login Successful.",
                description: "You will be redirected to home page.",
                status: "success",
                duration: 9000,
                isClosable: true,
            })
            return;
        }
        if (res.status === 401) {
            toast({
                title: "Invalid Credentials",
                description: "Please check your username and password.",
                status: "error",
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
        <form style={{ width: '25vw' }} onSubmit={onSubmit}>

            <Box>
                <Text fontSize="16px">Welcome Back</Text>
                <Text fontSize="30px" fontWeight="bold">Login to your account</Text>
            </Box>
            <Box mt="15px">
                <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" ref={emailRef} />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                </FormControl>
            </Box>
            <Box mt="15px">
                <FormControl id="email">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" ref={passRef} minLength={6} maxLength={18} />
                    <FormHelperText>Should be 6-18 characters long</FormHelperText>
                </FormControl>
            </Box>
            <Box mt={4}>
                <Button colorScheme="whatsapp" width="100%" type="submit">Login</Button>
            </Box>
            <Box mt={4}>Don't have an account. <Button variant="link" onClick={() => { history.push('/signup') }}>Sign Up</Button></Box>
        </form>
    )
}

export default Login
