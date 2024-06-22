import { useDisclosure ,DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
    Drawer,
    Button
} from '@chakra-ui/react'
import React from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'



const Drawerr = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
  
    
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
          <Text cursor={'pointer'} fontSize={'2xl'} fontFamily={'cursive'} borderBottom={'1px solid gray'} mb={3}>
            <Button colorScheme='teal' size='sm' mb={2} mt={1}>Sign In</Button>
          </Text>
          <Text cursor={'pointer'} fontSize={'2xl'} fontFamily={'cursive'} borderBottom={'1px solid gray'} mb={3}>Profile</Text>
          
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
