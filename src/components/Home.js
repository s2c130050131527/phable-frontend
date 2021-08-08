import { Box, Flex, Image } from '@chakra-ui/react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import Books from '../assets/abc.jpg';
import './Home.scss';
import Login from './Login';
import Signup from './Signup';

function Home() {
    const { url } = useRouteMatch();


    return (
        <Flex height="100vh">
            <Box flex="1">
                <Image src={Books} alt="Books" height="100vh" objectFit="cover"></Image>
            </Box>
            <Flex flex="1" height="100%" direction="column" justify="center" align="center" >
                <Switch>
                    <Route exact path='/home' component={Login}></Route>
                    <Route exact path='/signup' component={Signup}></Route>
                    <Redirect to="/home"></Redirect>

                </Switch>
            </Flex>

        </Flex>
    )
}

export default Home
