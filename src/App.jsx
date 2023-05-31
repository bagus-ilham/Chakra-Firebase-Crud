import { BrowserRouter } from "react-router-dom";
import Routers from "./Routers/Routers";
import { ChakraProvider } from '@chakra-ui/react'
import Sidebar from "./Pages/Sidebar";

function App() {

  return (
    <BrowserRouter>
      <ChakraProvider>
        {/* <Sidebar > */}
        <Routers />
        {/* </Sidebar> */}
      </ChakraProvider>
    </BrowserRouter>
  )
}

export default App