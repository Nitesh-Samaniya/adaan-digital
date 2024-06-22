import { Box, Button, FormLabel, Input, InputGroup, InputRightElement, useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';


const Login = () => {
    const {setIsToken} = useContext(AuthContext);
    const [show, setShow] = React.useState(false)
    const [formData, setFormData] = useState({
        phone: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleClick = () => setShow(!show)

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'phone') {
            const regex = /^[0-9\b]+$/;
            if (value === '' || (regex.test(value) && value.length <= 10)) {
                setFormData({
                    ...formData,
                    [name]: value,
                });
            }
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password.length < 8) {
            toast({
                title: 'Password too short.',
                description: 'Password must be at least 8 characters long.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } else {
            await handleLogin();
            setFormData({
                phone: '',
                password: ''
            });
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const resp = await axios.post('https://adaan-digital.onrender.com/user/login',formData);
            toast({
                title: resp?.data?.message || 'Logged In Succefully',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            localStorage.setItem('adaanDigitalUserToken', resp?.data?.token)
            setIsToken(resp?.data?.token)
            if(resp?.data?.token){
                navigate('/')
            }
            setLoading(false);
        } catch (error) {
            toast({
                title: error?.message || 'Something went wrong',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setLoading(false);
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <Box 
            width={{ base: '85%', md: '60%', lg: '40%' }}
            margin="auto"
            marginTop={{ base: '30%', md: '20%', lg: '8%' }}
            padding="1rem"
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            fontFamily={'sans-serif'}
        >
            <Box fontWeight={600} fontSize={'x-large'} sx={{color: '#5146ff'}} textAlign={'center'} marginBottom={2}>Log-In</Box>
            <Box
                width={'100%'}
                padding="1rem"
                boxShadow= 'rgba(0, 0, 0, 0.16) 0px 1px 4px'
            >

            <Box marginTop={5}>
                <FormLabel color={'gray'} >Mobile No.</FormLabel>
                <Box display="flex" alignItems="center">
                    <Box border='1px' borderColor='gray.200' padding={'0.4rem'} borderRadius={'5px'} >+91</Box>
                    <Input required name='phone' onChange={handleChange} value={formData.phone} type='text' placeholder='xxxxxxxxxx'/>
                </Box>
            </Box>

            <Box marginTop={5}>
                <FormLabel color={'gray'}>Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Enter password'
                        name='password' onChange={handleChange} value={formData.password}
                        required
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Box>

            <Box mt={5} mb={5} sx={{display: 'flex', justifyContent:'center'}}>
                <Button isLoading={loading} type="submit" colorScheme='teal' size='md'>Log In</Button>
            </Box>
            <Box display='Flex' flexDirection='row-reverse' color={'blue'} fontFamily={'monospace'} fontSize={'larger'}><Link to="/signup">Create an Account</Link></Box>
          </Box>
        </Box>
    </form>
  )
}

export default Login