import React, { useEffect, useState } from "react";
import { Box, Avatar, Heading, Text, Stack, Spinner } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import Sidebar from "./Sidebar";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [data, setData] = useState('')
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(true)
  const auth = getAuth()
  //catch id from firestore(db)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
  }, [])


  const userId = auth.currentUser?.uid;
  //get data from firestore(db)

  const getData = async () => {
    setLoading(true)
    console.log(userId, "useruid")
    const docRef = doc(db, "user", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(docSnap.data(), "this is data")
      setData(docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    setLoading(false)
  }


  const displayName = `${data.firstName} ${data.lastName}`
  useEffect(() => {
    getData()
  }, [])


  return (
    <Sidebar>

      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={6}
        boxShadow="md"
      >{loading ? <Spinner mx={3} /> : <Avatar size="xl" name={`${data.firstName} ${data.lastName}`} src="/path-to-avatar.jpg" />}

        <Heading mt={4} mb={2} size="lg">
          {displayName}
        </Heading>
        <Text color="gray.500">Front-end Developer</Text>

        <Stack mt={6} spacing={4}>
          <Stack direction="row">
            <Text fontWeight="bold">Phone:</Text>
            <Text>{data.phone}</Text>
          </Stack>
          <Stack direction="row">
            <Text fontWeight="bold">Email:</Text>
            <Text>{data.email}</Text>
          </Stack>
          <Stack direction="row">
            <Text fontWeight="bold">Gender:</Text>
            <Text>
              {data.gender == 1 ? 'Man' : data.gender == 2 ? 'Woman' : data.gender == 3 ? 'Animal' : <></>}</Text>
          </Stack>
          {/* Menampilkan informasi lainnya */}
        </Stack>
      </Box>
    </Sidebar>
  )
}

export default Profile;
