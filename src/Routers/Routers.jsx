import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from "../Pages/Login"
import SignUp from "../Pages/SignUp"
import Lamp from "../Pages/Lamp"
import Profile from '../Pages/Profile'
import FormToDo from '../Pages/FormToDo'
import Sidebar from '../Pages/Sidebar'

const Routers = () => {
  return (
    <Routes>

      <Route
        exact
        path='/'
        element={<Login />}
      />

      <Route
        path='/SignUp'
        element={<SignUp />}
      />

      <Route
        path='/Profile'
        element={<Profile />}
      />

      <Route
        path='/Lamp'
        element={<Lamp />}
      />

      <Route
        path='/Sidebar'
        element={<Sidebar />}
      />

<Route
        path='/FormToDo'
        element={<FormToDo />}
      />
    </Routes>
  )
}

export default Routers