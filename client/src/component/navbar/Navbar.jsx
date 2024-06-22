import React from 'react'
import { Box, Button,Show, Hide, Text
   } from '@chakra-ui/react'
import Drawerr from './Drawer'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
        <Box w='100%'bg={"#010026"} color={'#fff'} position={'fixed'} top={0} zIndex={5}>
            <Box w={'90%'} m='auto' p={'3'} display="flex" alignItems="center" justifyContent="space-between">
                <Box fontSize={['27px','30px','30px','30px']} fontFamily={['heading','cursive','cursive','cursive']} cursor={'pointer'}>Adaan Digital</Box>
                <Hide below='sm'>
                    <Box display="flex" alignItems="center" gap={10}>
                        <Button size='sm'><Link to={'/login'}>Sign In</Link></Button>
                        <Text cursor={'pointer'} fontSize={'2xl'} fontFamily={'cursive'}><Link to={'/'}>Profile</Link></Text>
                    </Box>
                </Hide>
                <Show  below='sm'>
                  <Drawerr/>
                </Show>
            </Box>            
        </Box>
    </>
  )
}

export default Navbar