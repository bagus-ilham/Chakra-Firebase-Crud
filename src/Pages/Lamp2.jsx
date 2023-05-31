import React, { useState } from 'react'
import { Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import nyala from "../assets/nyala.jpg"
import mati from "../assets/mati.jpg"

const Lamp2 = () => {
    const [isOn, setIsOn] = useState(false);
    const [isOff, setIsOff] = useState(false);

    const handleOnButtonClick = () => {
        setIsOn(true);
        setIsOff(false);
    };

    const handleOffButtonClick = () => {
        setIsOn(false);
        setIsOff(true);
    };
    return (
        <>
            <VStack spacing={4}>
            <Flex>
                {isOn && <Image src={mati} alt="Lampu Nyala" />}
                {isOff && <Image src={nyala} alt="Lampu Mati" />}
            </Flex>
            <Text>{isOn ? "Matikan" : "Nyalakan"}</Text>
            <Button onClick={handleOnButtonClick} disabled={isOn}>
                Nyalakan Lampu
            </Button>
            <Button onClick={handleOffButtonClick} disabled={isOff}>
                Matikan Lampu
            </Button>
        </VStack>
        </>
    );
};



export default Lamp2