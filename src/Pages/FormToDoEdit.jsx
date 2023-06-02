import { Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import Sidebar from './Sidebar'
import { useLocation } from 'react-router-dom'
import { updateDoc } from 'firebase/firestore'
import { db } from '../config/Firebase'

const FormToDoEdit = () => {
    const [input, setInput] = useState('')
    const handleInputChange = (e) => setInput(e.target.value)
    const isError = input === ''
    const location = useLocation()

    const { id, title, description, status } = location.state || {};

    const handleConfirm = async () => {
        try {
            // Membuat objek data yang akan diperbarui
            const updatedData = {
                title: title,
                description: description
            };

            // Memperbarui data di Firebase
            await updateDoc(doc(db, "db", "<DOCUMENT_ID>"), updatedData);

            console.log("Data berhasil diperbarui di Firebase");
        } catch (error) {
            console.error("Terjadi kesalahan saat memperbarui data di Firebase:", error);
        }
    };


    return (
        <Sidebar>
            <FormControl isInvalid={isError}>
                <FormLabel>Title</FormLabel>
                <Input type='email' value={title} onChange={handleInputChange} />
                <FormLabel>Description</FormLabel>
                <Input type='email' value={description} onChange={handleInputChange} />
                <Button colorScheme="blue" m={3} onClick={handleConfirm}>
                    Sumbmit
                </Button>
            </FormControl>
        </Sidebar>
    )
}

export default FormToDoEdit