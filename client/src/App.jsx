import { Box } from "@chakra-ui/react";
import Navbar from "./component/navbar/Navbar";
import AllRoutes from "./AllRoutes";
import axios from "axios";
import { useEffect } from "react";

function App() {
  
  async function makeServerStart(){
    try {
      const resp = await axios.get('https://adaan-digital.onrender.com/')
      console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    makeServerStart();
  },[])

  return (
    <Box>
      <Navbar />
      <AllRoutes />
    </Box>
  );
}

export default App;
