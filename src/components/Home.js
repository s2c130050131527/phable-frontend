import { Divider, Flex, useToast } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_URL } from '../CONSTANTS';
import Display from './Display';
import TDEEForm from './TDEEForm';
import UserList from './UserList';

function Home() {
    const [parentObject, setParentObj] = useState({
        weight: '',
        bodyFat: '',
        activityId: '',
        name: ''
    });
    const [countData, setCountData] = useState(null);
    const [users, setUsers] = useState([]);
    const toast = useToast();
    const getUsers = async () => {
        try {
            const res = await fetch(API_URL + 'tdee/getusers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await res.json();
            setUsers(result.data);
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

    const fetchCount = async (abc) => {
        try {
            const res = await fetch(API_URL + 'tdee/count', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    weight: abc.weight,
                    bodyFat: abc.bodyFat,
                    activityId: abc.activityId
                })
            });

            const result = await res.json();
            setCountData(result.data);
            if (res.status === 404) {
                toast({
                    title: "Oops!!",
                    description: result.error,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
                return;
            }
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

    useEffect(() => {
        getUsers()
    }, [])
    const onChange = (ab) => {
        setParentObj(ab)
        fetchCount(ab)
    }

    return (
        <Flex height="100vh">
            <Flex flex="1" height="100%" direction="column" align="center" h="100vh">
                <TDEEForm onChange={onChange}></TDEEForm>
                <Divider pt={2} pb={2}></Divider>
                <UserList onClickLoad={onChange} users={users} />
            </Flex>
            <Flex flex="1" height="100%" direction="column" justify="center" align="center" >
                <Display data={countData} parent={parentObject} onSave={(newObj) => {
                    setUsers([...users, newObj])
                }}></Display>
            </Flex>
            <Flex flex="1" height="100%" direction="column" justify="center" align="center" >
                Calorie calculator and Food selector not implemented.
            </Flex>

        </Flex>
    )
}

export default Home
