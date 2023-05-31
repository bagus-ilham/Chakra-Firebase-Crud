import { getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { auth } from '../config/Firebase'
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    useToast,
    HStack,
    Spinner,
    Text,
} from '@chakra-ui/react';

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const toast = useToast()

    const handleLogin = () => {
        setLoading(true)
        setError('')

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                toast({
                    title: 'Login Success.',
                    description: "Thanks for visiting.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                const user = userCredential.user
                console.log(user, "user")
                if (user) {
                    navigate('/Profile')
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                setError(error.message)
                toast({
                    title: 'An error occurred.',
                    description: 'Wrong Password.',
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }).finally(() => {
                setLoading(false)
            })
    }

    const onEnter = (e) => {
        if (e.key === "Enter") {
            handleLogin()
        }
    }

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Sign in to your account</Heading>
                    <FormControl id="email">
                        <FormLabel>Email address</FormLabel>
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Password</FormLabel>
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} onKeyDown={onEnter} />

                    </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Remember me</Checkbox>
                            <Link to="SignUp" color={'blue.500'}>Don't Have Account?</Link>
                        </Stack>
                        <Button disabled={loading} colorScheme={'blue'} variant={'solid'} onClick={() => handleLogin()}>
                            <HStack>
                                <Text>Sign in</Text>
                                {loading ? <Spinner mx={3} /> : null} </HStack>

                        </Button>
                    </Stack>
                </Stack>
            </Flex >
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }
                />
            </Flex>
        </Stack >
    )
}

export default Login
