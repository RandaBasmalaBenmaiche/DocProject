import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Link, useHistory, useParams } from "react-router-dom";
import { logOut, reset } from '../../features/auth/authSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography } from '@mui/material';
import Image from './img/test.png';
import { API_BASE } from '../../constants';
const Experi = () => {
    const params = useParams()
    const location = useHistory()
    const dispatch = useDispatch()
    const userToken = JSON.parse(localStorage.getItem('user'))
    const logou = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${userToken.token}`
            }
        }
        await axios.get(`${API_BASE}/user/logout`, config).then(res => {
            console.log("confirmed logout")
            dispatch(logOut())
            dispatch(reset())
            localStorage.clear()
            location.push('/')
        }).catch(error => {
            console.log(error.message)
        })
    }
    
    // alert(params.text)
    return (
        <Grid container item xs={12} sx={{ minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden', }}>
            <Grid item xs={6}  sx={{ display:{xs:'none',sm:'none',md:'flex'}, alignItems: 'center', justifyContent: 'center' }}>
                <img src={Image} style={{ width: '80%', marginInline: '10%' }} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} sx={{ py: 10, position: 'relative', }}>
                {
                    params.text == 'test' ?
                        <>
                            <Typography variant='h5' sx={{ color: 'white', p: 3, opacity: '0.8', maxWidth: '80%',marginInline:'10%', borderRadius: 2, fontFamily: 'Bahnschrift SemiBold', bgcolor: '#ff5757' }}>
                                Votre Abonnement A Expiré
                                <Typography variant='h6' sx={{ boxShadow: '3px 3px 6px rgba(0,0,0,0.1) inset', mt: 2, color: '#0d2742', p: 3, opacity: '1', maxWidth: '100%', borderRadius: 2, fontFamily: 'Bahnschrift SemiBold', bgcolor: 'white' }}>
                                    Votre période d'essai a expiré voulez-vous activer votre abonnement ?
                                </Typography>
                            </Typography>
                        </> :
                        <>
                            <Typography variant='h5' sx={{ color: 'white', p: 3, opacity: '0.8', maxWidth: '80%',marginInline:'10%', borderRadius: 2, fontFamily: 'Bahnschrift SemiBold', bgcolor: '#ff5757' }}>
                                Votre Abonnement A Expiré
                                <Typography variant='h6' sx={{ boxShadow: '3px 3px 6px rgba(0,0,0,0.1) inset', mt: 2, color: '#0d2742', p: 3, opacity: '1', maxWidth: '100%', borderRadius: 2, fontFamily: 'Bahnschrift SemiBold', bgcolor: 'white' }}>
                                    Votre abonnement a expiré voulez-vous activer votre abonnement ?
                                </Typography>
                            </Typography>
                        </>
                }


                <Link className="Links" >
                    <Typography variant='body1' sx={{
                        border: '1px solid transparent', fontFamily: 'Bahnschrift SemiBold', maxWidth: {md:'50%',xs:'80%'}, p: 1, marginInline: {md:'25%',xs:'10%'}, transition: '.3s', borderRadius: 2,
                        mt: 5, color: 'white', textAlign: 'center', bgcolor: '#0d2742', '&:hover': { border: '1px solid #0d2742', bgcolor: 'white', color: '#0d2742' }
                    }}>
                        activer votre abonnement
                    </Typography>
                </Link>
                <Link onClick={logou} style={{ position: 'absolute', bottom: '3%', right: '0px', width: '100%', }} className="Links" >
                    <Typography variant='body1' sx={{
                        border: '1px solid transparent', fontFamily: 'Bahnschrift SemiBold',maxWidth: {md:'50%',xs:'80%'}, p: 1, marginInline: {md:'25%',xs:'10%'}, transition: '.3s', borderRadius: 2,
                        mt: 3, color: 'white', textAlign: 'center', bgcolor: '#0d2742', '&:hover': { border: '1px solid #0d2742', bgcolor: 'white', color: '#0d2742' }
                    }}>
                        Home
                    </Typography>
                </Link>
            </Grid>
        </Grid>
        // <Stack spacing={2} direction="row">
        //     <Link to={"/simple"} exact className='Links'>
        //         <Button variant="text">simple</Button>
        //     </Link>

        //     <Link to={"/gold"} className='Links'>
        //         <Button variant="contained">gold</Button>
        //     </Link>
        //     <Link to={"/admin"} className='Links'>
        //         <Button variant="admin">Outlined</Button>
        //     </Link>
        //     <Link to={"/SignIn"} className='Links'>
        //         <Button variant="SignIn">SignIn</Button>
        //     </Link>
        //     <Link to={"/Login"} className='Links'>
        //         <Button variant="LogIn">LogIn</Button>
        //     </Link>

        // </Stack>

    );
}

export default Experi;