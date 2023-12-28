import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Toolbar, Typography } from '@mui/material';
import "./style.css";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Image from './back.png'
import { width } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from "react-router-dom";







import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { login, reset } from '../../features/auth/authSlice';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { ProtectAdmin } from '../../protectedRoute';
import HomeA from '../admin/home';

const Login = () => {
    const [typee, settypee] = useState('password');
    const [display, setdisplay] = useState(false);
    const ChangeType = () => {
        if (typee == 'password') {
            settypee('text');
        } else {
            settypee('password');
        }
    }
    const { register, handleSubmit } = useForm();
    const location = useHistory()
    const dispatch = useDispatch()

    const { isLoading, isError, isSuccess, message, type, user } = useSelector((state) => state.auth)


    useEffect(() => {
        if (isSuccess || type) {
            if (type == 'admin') {
                location.push('/admin')
            }
            if (type === "gold") {
                location.push('/gold')
            } else if (type === "normal") {
                location.push('/simple')
            }
            setdisplay(true)
        }

        // dispatch(reset())
    }, [user, isError, isSuccess, message, location, dispatch])
    const onSubmit = data => dispatch(login(data))

    if (isLoading) {
        return <p>loading ...</p>
    }
    return (

        display ? null :
            <Grid container sx={{ bgcolor: 'white', minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
                {/* <Toolbar /> */}
                <Grid container item xs={12} sm={12} md={6} className="Login"
                    sx={{
                        minHeight: '100vh',
                        bgcolor: 'rgba(255,255,255,1)',
                        backdropFilter: 'blur(4px)',

                        position: 'relative',
                        zIndex: 0,
                        p: { xs: 5, md: 10, sm: 15 },
                    }}>
                    <Grid item xs={12} flexDirection={'top'} direction={'row'} >
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
                            <MonitorHeartIcon sx={{ mr: 2, color: '#0a0a58' }} />
                            <Typography variant="h5" sx={{ color: '#0a0a58', fontWeight: 'bold', fontFamily: 'Bahnschrift SemiBold' }}>
                                MedLife
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} >
                            <Grid item xs={12} sx={{ display: 'block' }}>
                                <Typography variant="h3" sx={{ fontFamily: 'Comic Sans MS', textAlign: 'center', color: '#1b1b2d', fontWeight: 'bold', }}>
                                    Welcom Back
                                </Typography>

                            </Grid>

                        </Grid>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container item xs={12} sx={{ px: { xs: 0, md: 2 }, bgcolor: 'white', mt: 7, }}>
                                <Grid item xs={12} sx={{ p: 1, borderRadius: 5, mb: 0 }}>
                                    <TextField {...register("email")} type='email' id="outlined-basic" placeholder="email" variant="outlined" sx={{ width: '100%', boxShadow: '2px 2px 4px rgba(0,0,0,0.1)', borderRadius: 0, }} />
                                </Grid>
                                <Grid item xs={12} sx={{ bgcolor: 'white', mt: 0, p: 1, }}>

                                    <div style={{ position: 'relative' }}>
                                        <TextField type={typee} {...register("password")} id="outlined-basic" placeholder=' Mot De Passe' variant="outlined" sx={{ width: '100%' }} />
                                        {
                                            typee == 'password' ?
                                                <IconButton onClick={() => ChangeType()} aria-label="delete" sx={{ color: '#1d1e6b', position: 'absolute', top: '0.5rem', right: '10px' }}>
                                                    <RemoveRedEyeIcon />
                                                </IconButton>
                                                :
                                                <IconButton onClick={() => ChangeType()} aria-label="delete" sx={{ color: '#1d1e6b', position: 'absolute', top: '0.5rem', right: '10px' }}>
                                                    <VisibilityOffIcon />
                                                </IconButton>

                                        }


                                    </div>
                                </Grid>
                                {isError ?
                                    <Grid item xs={12} sx={{ paddingInline: 1, py: 2 }}>
                                        <Alert severity="error"><b>mot de passe</b> ou <b>nom d'utilisateure</b> incorecte !</Alert>
                                    </Grid>
                                    : null}

                                <Grid item xs={12} sx={{ mt: { md: 2, sm: 0 }, p: { md: 2, xs: 0 }, px: { xs: 1, sm: 0, md: 0 }, borderRadius: 5, display: { md: 'flex', xs: 'block' }, justifyContent: 'end' }}>
                                    <Link to={"/Forget"} className="linkNav">
                                        <Typography variant="body2" sx={{ ml: { md: 0, xs: 1 / 2 }, mt: { xs: 2, md: -2 }, mb: { xs: 1, md: 0 }, color: '#1d1e6b', textDecoration: 'solid' }}>
                                            Mot De Passe oublié !
                                        </Typography>
                                    </Link>
                                </Grid>
                                <Grid item xs={12} sx={{ mt: 2, p: { md: 2, xs: 0 }, px: { xs: 1, sm: 0, md: 0 }, borderRadius: 2, display: { md: 'flex', xs: 'block' }, alignItems: 'center', }}>
                                    <Button type="submit" variant="contained" sx={{ py: 2, bgcolor: '#1d1e6b', width: { md: '100%', xs: '100%' }, '&:hover': { bgcolor: '#ff5757', } }}>
                                        Connexion
                                    </Button>
                                </Grid>
                                <Grid item xs={8} sx={{ mx: 12, mt: { xs: 3, md: 2 }, mb: { xs: 0, sm: 1 } }} className='HR'></Grid>
                                <Grid item xs={12} sx={{ mt: { md: 0, xs: 1 }, py: { md: 5 }, borderRadius: 5, display: { md: 'flex', xs: 'block' }, justifyContent: 'center', textAlign: 'center' }}>
                                    <Typography variant="body2" sx={{ mr: { md: 0, xs: 1 / 2 }, mt: { xs: 1, md: -2 }, mb: { xs: 1, md: 0 }, color: 'silver', textDecoration: 'solid' }}>
                                        Vous n'avez pas un compet
                                    </Typography>
                                    <Link to={"/Signin"} className="linkNav">
                                        <Typography variant="body2" sx={{ ml: { md: 1, xs: 1 / 2 }, mt: { xs: 1, md: -2 }, mb: { xs: 1, md: 0 }, color: '#1d1e6b', textDecoration: 'solid' }}>
                                            Créer un compte !
                                        </Typography>
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>

                    </Grid>
                </Grid>
                <Grid container item md={6} sx={{ display: { xs: 'none', sm: 'flex' }, minHeight: '100vh', maxHeight: '100vh', bgcolor: 'transparent', paddingInline: 2, paddingBlock: 2 }}>
                    <Grid container item xs={12} className='containerA' sx={{ paddingInline: 4, paddingBlock: 8 }}>
                        <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', maxHeight: 50, }}>
                            <MonitorHeartIcon sx={{ mr: 2, color: 'white' }} />
                            <Typography variant="h5" sx={{ color: 'white' }}>
                                MedLife
                            </Typography>
                        </Grid>
                        <img src={Image} style={{ width: '100%' }} loading="lazy" />
                    </Grid>
                </Grid>


            </Grid>



    );
}

export default Login;  