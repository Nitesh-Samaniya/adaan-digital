import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const {isToken} = useContext(AuthContext);

    const navigate = useNavigate();

    useEffect(()=>{
        if(!isToken){
            navigate('/login')
        }
    },[navigate, isToken])

  return (
    <div style={{
        marginTop: '150px'
    }}>Profile</div>
  )
}

export default Profile