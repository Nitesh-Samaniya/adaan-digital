import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('adaanDigitalUserToken') || '';
        if(!token){
            navigate('/login')
        }
    },[navigate])

  return (
    <div style={{
        marginTop: '150px'
    }}>Profile</div>
  )
}

export default Profile