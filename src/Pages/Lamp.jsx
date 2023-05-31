import React, { useState } from 'react';
import { Box, Button, Flex, Image, VStack } from "@chakra-ui/react";
import nyala from "../assets/nyala.jpg";
import mati from "../assets/mati.jpg";
import Sidebar from './Sidebar';

const Lamp = () => {
    const [isOn, setIsOn] = useState(false);

    return (
        <Sidebar>
            <VStack h="650" margin="10" maxW="100%" spacing="4">
                <Flex
                    bg={isOn ? "gray.800" : "gray.300"}
                    justifyContent="center"
                    alignItems="center"
                    flex="1"
                    borderRadius="md"
                    p="4"
                    boxShadow="md"
                >
                    <Image
                        src={isOn ? mati : nyala}
                        alt={isOn ? "Lampu Mati" : "Lampu Menyala"}
                        maxH="400px"
                        maxW="100%"
                    />
                </Flex>
                <Button
                    borderRadius="md"
                    bg={isOn ? "red.500" : "green.500"}
                    color="white"
                    w="100%"
                    h="12"
                    onClick={() => setIsOn(!isOn)}
                    _hover={{ bg: isOn ? "red.600" : "green.600" }}
                >
                    {isOn ? "Matikan" : "Nyalakan"}
                </Button>
            </VStack>
        </Sidebar>
    );
};

export default Lamp;
