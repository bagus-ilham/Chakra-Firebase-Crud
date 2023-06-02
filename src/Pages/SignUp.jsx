import { getAuth, createUserWithEmailAndPassword, updateProfile, EmailAuthCredential } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../config/Firebase'
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
  Spacer,
  useToast,
  InputLeftAddon,
  InputGroup,
  Radio,
  RadioGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore'

function SignUp() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '3',
  });
  const { firstName, lastName, phone, email, password, confirmPassword, gender } = userData;
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const displayName = `${firstName} ${lastName}`

  const handleClick = () => setShow(!show);
  const handleClick2 = () => setShow2(!show2);

  const handleSignUp = () => {
    if (firstName === '') {
      toast({
        title: 'An error occurred.',
        description: 'First Name is required.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else if (lastName === '') {
      toast({
        title: 'An error occurred.',
        description: 'Last Name is required.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else if (phone === '') {
      toast({
        title: 'An error occurred.',
        description: 'Phone is required.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else if (email === '') {
      toast({
        title: 'An error occurred.',
        description: 'Email is required.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else if (password === '') {
      toast({
        title: 'An error occurred.',
        description: 'Password is required.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else if (confirmPassword === '') {
      toast({
        title: 'An error occurred.',
        description: 'Confirm Password is required.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } else {
      if (password !== confirmPassword) {
        toast({
          title: 'An error occurred.',
          description: 'Passwords do not match.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } else {
        //Create user auth
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            toast({
              title: 'Account created.',
              description: "We've created your account for you.",
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
            if (user) {
              //Update auth
              updateProfile(auth.currentUser, {
                displayName: displayName,
                email: auth.currentUser.email
              },
                console.log(user, "wkwkwkwwkwkwkwkw"))
              //create user in firestore(db)
              const userRef = doc(db, 'user', user.uid)
              setDoc(userRef, {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                gender: gender,
                uid: user.uid
              })
                .then(() => {
                  navigate("/Profile", {
                    state: userData,
                  });
                  console.log(`Successfully signed up with account ${user.email}`);
                })
                .catch((error) => {
                  // An error occurred
                  // ...
                });
            } else {
              console.log('Error: No user found');
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast({
              title: 'An error occurred.',
              description: errorMessage,
              status: 'error',
              duration: 9000,
              isClosable: true,
            });
          });
      }
    }
  };

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'} marginBottom={'1'}>
            Sign Up and become one of ours
          </Heading>
          <Flex>
            <FormControl id="firstName">
              <FormLabel textAlign={'center'}>First Name</FormLabel>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                placeholder="First Name"
              />
            </FormControl>

            <Spacer />

            <FormControl id="lastName" ml={4}>
              <FormLabel textAlign={'center'}>Last Name</FormLabel>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                placeholder="Last Name"
              />
            </FormControl>
          </Flex>

          <InputGroup>
            <InputLeftAddon children="+62" />
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
              placeholder="Phone number"
            />
          </InputGroup>

          <FormControl id="email">
            <FormLabel textAlign={'center'}>Email address</FormLabel>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </FormControl>

          <FormControl id="gender">
            <Flex>
              <FormLabel textAlign={'center'}>Gender</FormLabel>
              <RadioGroup value={gender} onChange={(value) => setUserData({ ...userData, gender: value })}>
                <Stack direction="row" justifyContent={'center'} marginLeft={'10'}>
                  <Radio value="1" marginLeft={'5'}>
                    Man
                  </Radio>
                  <Radio value="2" marginLeft={'5'}>
                    Woman
                  </Radio>
                  <Radio value="3" marginLeft={'5'}>
                    Animal
                  </Radio>
                </Stack>
              </RadioGroup>
            </Flex>
          </FormControl>

          <FormControl id="password">
            <Flex justifyContent={'space-between'}>
              <FormLabel textAlign={'left'} w="20%">
                Password
              </FormLabel>
              <InputGroup size="md" w="80%">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </FormControl>

          <FormControl id="confirmPassword" ml={4}>
            <Flex justifyContent={'space-between'}>
              <FormLabel textAlign={'left'} w="20%">
                Confirm Password
              </FormLabel>
              <InputGroup size="md" w="80%">
                <Input
                  pr="4.5rem"
                  type={show2 ? 'text' : 'password'}
                  placeholder="Enter password again"
                  value={confirmPassword}
                  onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick2}>
                    {show2 ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Flex>
          </FormControl>

          <Stack spacing={6}>
            <Button colorScheme="blue" onClick={handleSignUp}>
              Sign Up
            </Button>
          </Stack>

          <Link to="/" color={'blue.400'}>
            Already have an account? Sign In
          </Link>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
  );
}

export default SignUp;
