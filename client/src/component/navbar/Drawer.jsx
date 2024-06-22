import { useDisclosure ,DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
    Drawer,
    Button,
    Box
} from '@chakra-ui/react'
import React, { useContext } from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';


const Drawerr = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const {isToken, setIsToken} = useContext(AuthContext);
    const btnRef = React.useRef()

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('adaanDigitalUserToken');
    setIsToken(''); 
  };
  
    
  return (
    <>
    <HamburgerIcon onClick={onOpen} ref={btnRef} w={6} h={6} mt={2}/>

    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent height="70% !important">
        <DrawerCloseButton mt={2} color={'#fff'}/>
        <DrawerHeader bg={'#010026'} color={'#fff'}>Adaan Digital</DrawerHeader>

        <DrawerBody bg="#0c111b" color={'#fff'}>
          <Box>
          <Text borderBottom={'1px solid gray'} mb={3} cursor="pointer" fontSize="2xl" fontFamily="cursive">
                <Link to="/">Profile</Link>
              </Text>
              
              {isToken ? (
                <Button borderBottom={'1px solid gray'} mb={3} size="sm" onClick={handleLogout}>Log out</Button>
              ) : (
                <Button borderBottom={'1px solid gray'} mb={3} size="sm"><Link to="/login">Sign In</Link></Button>
              )}
              
            </Box>
        </DrawerBody>

        <DrawerFooter h={'60px'}>
          {/* <Button variant='outline' mr={3} onClick={onClose}>
            Cancel
          </Button> */}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  </>
  )
}

export default Drawerr
