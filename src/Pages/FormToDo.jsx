import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Flex,
  Input,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react'
import Sidebar from './Sidebar';
import { collection, addDoc, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { async } from '@firebase/util';
import { auth, db } from '../config/firebase';


const FormToDo = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [todos, setTodos] = useState([])
  const [todoInput, setTodoInput] = useState({
    title: '',
    description: ''
  })
  const user = auth.currentUser
  const [alert, setAlert] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setTodoInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }))
  }

  const handleAddTodo = async () => {
    const docRef = await addDoc(collection(db, "db"), {
      title: todoInput.title,
      description: todoInput.description,
      status: "pending",
      uid: user.uid
    });
      setTodoInput({
      title: '',
      description: ''
    })
    onClose()
    setAlert(!alert)

  }

  const getData = async () => {
    const q = query(collection(db, "db"), where('uid', '==', user.uid));
    try {
      const querySnapshot = await getDocs(q);
      const p = []
      querySnapshot.forEach((doc) =>
        p.push(doc.data())

      )
      setTodos(p)

    } catch (error) {
      console.log(error)
    }

  }

  // console.log(todos, 'ni todos');


  const handleUpdateStatus = (index) => {
    const old = todos
    old[index].status = old[index].status === 'pending' ? 'done' : 'pending'
    setTodos([...old])
  }

  const handleDelete = async (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    await deleteDoc(doc(db, "db",));
    setTodos();
  }

  const handleEdit = (index) => {

    console.log(index, "wkwkwkwkw")
  }

  useEffect(() => {
    getData()
  }, [alert])
  return (
    <Sidebar>
      <Box p={4} h={600} maxW='full'>
        <Flex justifyContent={"space-around"}>
          <Heading as='h3' size='lg'>
            To-Do List
          </Heading>
          <Button colorScheme="blue" mb={4} onClick={onOpen}>
            Tambah To-Do
          </Button>
        </Flex>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Tambah To-Do</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="Title"
                mb={2}
                name="title"
                value={todoInput.title}
                onChange={handleInputChange}
              />
              <Input
                placeholder="Description"
                mb={2}
                name="description"
                value={todoInput.description}
                onChange={handleInputChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleAddTodo}>
                Tambah
              </Button>
              <Button onClick={onClose}>Batal</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Table>
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos.map((todo, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{todo.title}</Td>
                <Td>{todo.description}</Td>
                <Td>{todo.status}</Td>
                <Td>
                  <Button colorScheme="green" size="sm" mr="3" onClick={() => handleUpdateStatus(index)}>
                    {todo.status === 'pending' ? 'Done' : 'Pending'}
                  </Button>
                  <Button colorScheme="red" size="sm" mr="3" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                  <Button colorScheme="blue" size="sm" onClick={() => handleEdit(index)}>
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Sidebar>
  );
};
export default FormToDo
