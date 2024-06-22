import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Box, Button, FormLabel, Grid, GridItem, IconButton, Image, Input, SkeletonCircle, SkeletonText, Tag, TagCloseButton, TagLabel, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { EditIcon } from '@chakra-ui/icons';

const Profile = () => {
  const [userData, setUserData] = useState({
    education: '',
    email: '',
    experience: '',
    name: '',
    phone: '',
    photo: '',
    skills: []
  })
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const { isToken } = useContext(AuthContext);
  const [newSkill, setNewSkill] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  async function getUserData(token) {
    setLoading(true);
    try {
      const resp = await axios.get('https://adaan-digital.onrender.com/user-profile/', {
        headers: {
          Authorization: token,
        },
      })
      setUserData({
        education: resp?.data?.user?.education,
        email: resp?.data?.user?.email,
        experience: resp?.data?.user?.experience,
        name: resp?.data?.user?.name,
        phone: resp?.data?.user?.phone,
        photo: resp?.data?.user?.photo,
        skills: resp?.data?.user?.skills
      })
      setUserId(resp?.data?.user?._id)
      setLoading(false)
    } catch (error) {
      toast({
        title: error.message || 'Internal Server Error.',
        description: 'Login again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false)
    }
  }

  const postDetails = (imageUrl) => {

    if (imageUrl === undefined) {
      toast({
        title: "Please seclect an Image!",
        description: "warning",
        status: "success",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (imageUrl.type === "image/jpeg" || imageUrl.type === "image/png" || imageUrl.type === "image/jpg") {
      const data = new FormData();
      data.append("file", imageUrl);
      data.append("upload_preset", "data-storage");
      data.append("cloud_name", "dztva4gbe");
      fetch("https://api.cloudinary.com/v1_1/dztva4gbe/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedPhoto = data.url.toString();
          setUserData((prevData) => ({
            ...prevData,
            photo: updatedPhoto,
          }));
          toast({
            title: "Image uploaded successfully!",
            description: "Your profile picture has been updated.",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top",
          });
          return {
            data: data.url.toString()

          }
        })
        .catch((er) => {
          console.log(er);
        });
    } else {
      toast({
        title: "Please select an Image!",
        description: "warning",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
  };

  const handlePreviewClick = () => {
    window.open(userData.photo, '_blank');
  };

  const handleEditImageClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
        const regex = /^[0-9\b]+$/;
        if (value === '' || (regex.test(value) && value.length <= 10)) {
            setUserData({
                ...userData,
                [name]: value,
            });
        }
    } else {
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

};

const handleSkillChange = (e) => {
  setNewSkill(e.target.value);
};

const handleAddSkill = () => {
  if (newSkill.trim() !== '') {
    setUserData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, newSkill.trim()]
    }));
    setNewSkill('');
  }
};

const handleRemoveSkill = (skillToRemove) => {
  setUserData((prevData) => ({
    ...prevData,
    skills: prevData.skills.filter(skill => skill !== skillToRemove)
  }));
};


const handleSubmit = async (e) => {
  e.preventDefault();
  const alphaNumericRegex = /^(?!\d+$)[a-zA-Z0-9\s]+$/;

  if(!alphaNumericRegex.test(userData.name)){
      toast({
          title: 'Invalid Name.',
          description: 'Name cannot start with number.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
      });
  }
  else {
      await handleUpdate();
  }
};

const handleUpdate = async () => {
  setBtnLoading(true);
  try {
      const resp = await axios.patch('https://adaan-digital.onrender.com/user-profile/update',{
        id: userId,
        name: userData.name,
        photo: userData.photo,
        experience: userData.experience,
        skills: userData.skills,
        education: userData.education
      });
      toast({
          title: resp?.data?.message || 'Details Updated Succefully',
          status: 'success',
          duration: 5000,
          isClosable: true,
      });
      setBtnLoading(false);
  } catch (error) {
      toast({
          title: error?.message || 'Something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
      });
      setBtnLoading(false);
  }
}

  useEffect(() => {
    if (!isToken) {
      navigate('/login')
    } else {
      getUserData(isToken);
    }
  }, [navigate, isToken]);

  return (
    <Box
      width={{ base: '85%' }}
      margin="auto"
      marginTop={{ base: '30%', md: '20%', lg: '8%' }}
    >
      {
        loading ?
          <Box padding='6' boxShadow='lg' bg='white'>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
          </Box>
          :
          <Box
            padding="1rem"
            boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            fontFamily={'sans-serif'}
          >
            <Box display={'flex'} justifyContent={'space-between'}>
              <Box fontSize={'xx-large'} fontWeight={600}>My Account</Box>
              <Button isLoading={btnLoading} colorScheme='teal' onClick={handleSubmit}>Update</Button>
            </Box>
            <form>
              <Box marginTop={'50px'} display={'flex'} justifyContent={'space-between'} flexDirection={{ base: 'column-reverse', md: 'row' }}>
                <Box width={{ base: '80%', md: '70%', lg: '60%' }}>
                  <Box display={'flex'} justifyContent={'space-between'} flexDirection={{ base: 'column', lg: 'row' }}>
                    <Box marginTop={{base: '1rem', lg: '0'}}>
                      <FormLabel color={'gray'} >Name</FormLabel>
                      <Input
                        required
                        name='name'
                        onChange={handleChange}
                        value={userData.name}
                        type='text'
                        placeholder='Enter Name'
                      />
                    </Box>

                    <Box marginTop={{base: '1rem', lg: '0'}}>
                      <FormLabel color={'gray'} >Email</FormLabel>
                      <Input
                        required
                        name='email'
                        onChange={handleChange}
                        value={userData.email}
                        type='email'
                        placeholder='abc@xyz.com'
                      />
                    </Box>

                    
                  </Box>

                  <Box marginTop={{base: '2px', lg: '20px'}} display={'flex'} justifyContent={'space-between'} flexDirection={{ base: 'column', lg: 'row' }}>
                  <Box marginTop={{base: '1rem', lg: '0'}}>
                      <FormLabel color={'gray'} >Highest Education</FormLabel>
                      <Input
                        required
                        name='education'
                        onChange={handleChange}
                        value={userData.education}
                        type='text'
                        placeholder='Degree/School'
                      />
                    </Box>

                    <Box marginTop={{base: '1rem', lg: '0'}}>
                      <FormLabel color={'gray'} >Experience</FormLabel>
                      <Input
                        required
                        name='experience'
                        onChange={handleChange}
                        value={userData.experience}
                        type='text'
                        placeholder='Total experience in Months'
                      />
                    </Box>

                    
                  </Box>

                  <Box marginTop={{base: '2px', lg: '20px'}} display={'flex'} justifyContent={'space-between'} flexDirection={{ base: 'column', lg: 'row' }}>
                    <Box marginTop={{base: '1rem', lg: '0'}}>
                      <FormLabel color={'gray'} >Mobile No.</FormLabel>
                      <Input
                        required
                        name='phone'
                        onChange={handleChange}
                        value={userData.phone}
                        type='text'
                        disabled
                        placeholder='xxxxxxxxxx'
                      />
                    </Box>

                  </Box>

                  <Box marginTop={{ base: '2px', lg: '20px' }}>
                    <FormLabel color={'gray'}>Skill Set</FormLabel>
                    <Box display={'flex'} gap={5} alignItems={'center'}>
                    <Input
                      name='skill'
                      value={newSkill}
                      onChange={handleSkillChange}
                      type='text'
                      placeholder='Add a new skill'
                    />
                    <Button onClick={handleAddSkill}>Add Skill</Button>
                    </Box>
                    
                    <Grid templateColumns='repeat(auto-fill, minmax(100px, 1fr))' gap={2} mt={2}>
                      {userData.skills.map((skill, index) => (
                        <GridItem key={index}>
                          <Tag size='lg' borderRadius='full' variant='solid' colorScheme='teal'>
                            <TagLabel>{skill}</TagLabel>
                            <TagCloseButton onClick={() => handleRemoveSkill(skill)} />
                          </Tag>
                        </GridItem>
                      ))}
                    </Grid>
                  </Box>

                </Box>

                <Box width={'250px'} alignItems={'center'} display={'flex'} flexDirection={'column'} alignContent={'center'}>
                  <Box>
                    <Image
                      border='1px'
                      borderColor='gray.500'
                      src={userData.photo}
                      align={userData.name}
                      borderRadius={'full'}
                      width={'150px'}
                      height={'150px'}
                    />
                  </Box>
                  <Box display={'flex'} gap={5} marginTop={2}>
                    <Button onClick={handlePreviewClick}>Preview</Button>
                    <IconButton
                      aria-label="Edit Image"
                      icon={<EditIcon />}
                      onClick={handleEditImageClick}
                    />
                    <Input
                      id='fileInput'
                      type='file'
                      name='avatar'
                      display='none'
                      onChange={(e) => postDetails(e.target.files[0])}
                    />

                  </Box>
                </Box>
              </Box>

            </form>
          </Box>
      }
    </Box>
  )
}

export default Profile