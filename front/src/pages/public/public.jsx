import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Link, useHistory } from "react-router-dom";
import { logOut, reset } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './home/home';
import { Box } from '@mui/material';
import { API_BASE } from '../../constants';
const Public = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const visit = async () => {
        const data = { visite: "ok" }
        
        await axios.post(`${API_BASE}/visit`, data).then(res => {
            console.log('ok')
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
        })
    }
    useEffect(() => {
        visit()
    }, [])
    return (
        <Box>
            <Home />
        </Box>
        
        

    );
}

export default Public;
{/* <Stack spacing={2} direction="row">
            <Link to={"/simple"} exact className='Links'>
                <Button variant="text">simple</Button>
            </Link>

            <Link to={"/gold"} className='Links'>
                <Button variant="contained">gold</Button>
            </Link>
            <Link to={"/admin"} className='Links'>
                <Button variant="admin">Outlined</Button>
            </Link>
            <Link to={"/SignIn"} className='Links'>
                <Button variant="SignIn">SignIn</Button>
            </Link>
            <Link to={"/Login"} className='Links'>
                <Button variant="LogIn">LogIn</Button>
            </Link>

        </Stack> */}