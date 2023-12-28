import React, { useRef, useState } from 'react';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Toolbar, Typography } from '@mui/material';
import "./style.css";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';

import { width } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import Alert from '@mui/material/Alert';

import CssBaseline from '@mui/material/CssBaseline';
import { Link,useHistory } from "react-router-dom";
import Image from './img/etapone.png'
import Imaget from './img/etapt.png'
import Imagefin from './img/etapfin.png'
import axios from 'axios';
import { API_BASE } from '../../constants';

export const Forget = () => {
    const location = useHistory();
    const [emial, setemial] = useState('')
    const [errorCheckMail, seterrorCheckMail] = useState(false)
    const [success, setsuccess] = useState(false)
    //--------------------------------------
    const [Code, setCode] = useState('')
    const [errorCode, seterrorCode] = useState(false)
    const [successCode, setsuccessCode] = useState(false)
    //====================================
    const [Pass, setPass] = useState('')
    const [errorPass, seterrorPass] = useState(false)
    const [successPass, setsuccessPass] = useState(false)
    //--------------------------------------
    const [Delete, setDelete] = useState('')
    const [errorDelete, seterrorDelete] = useState(false)
    const [successDelete, setsuccessDelete] = useState(false)

    const [displayEmail, setdisplayEmail] = useState('block');
    const [displayCode, setdisplayCode] = useState('none');
    const [displayPasword, setdisplayPasword] = useState('none');
    const [Numbere, setNumbere] = useState(0);

    const checkEmail = async (email) => {
        await axios.get(`${API_BASE}/code/check/` + email).then(res => {
            console.log(res.data)
            setdisplayEmail('none')
            setdisplayCode('block')
            seterrorCheckMail(false)
            setsuccess(res.data.msg)
        }).catch(error => {
            console.log(error.message)
            seterrorCheckMail(error.response.data)
            setsuccess(false)
        })
    }
    const checkCode = async (code) => {

        await axios.get(`${API_BASE}/code/validate/` + code).then(res => {
            console.log(res.data)
            setdisplayCode('none')
            setdisplayPasword('block')
            seterrorCode(false)
            setsuccessCode(res.data)
        }).catch(error => {
            setNumbere((setNumbere) => setNumbere + 1)
            console.log(error.message)
            console.log(setNumbere)
            seterrorCode(error.response.data)
            setsuccessCode(false)

        })
    }
    const deleteCode = async (code) => {
        await axios.delete(`${API_BASE}/code/delte/` + code).then(res => {
            console.log(res.data)
            setdisplayEmail('block')
            setdisplayCode('none')
            setsuccess(false)
            setemial('')
            setNumbere(0)
            setCode('')
            seterrorCode(false)
            seterrorDelete(false)
            setsuccessDelete(res.data)
        }).catch(error => {

            console.log(error.message)
            seterrorDelete(error.response.data)
            setsuccessDelete(false)
        })
    }
    const NewPass = async (email, pass) => {
        const data = new FormData()
        data.append('password', pass)
        const config = {
            headers: {
                'content-type': 'application/json'
            }
        }

        await axios.patch(`${API_BASE}/code/edit/` + email, data, config).then(res => {
            console.log(res.data)
            seterrorPass(false)
            setsuccessPass(res.data)
        }).catch(error => {
            console.log(error.message)
            seterrorPass(error.response.data)
            setsuccessPass(false)
        })
    }
    if (Numbere >= 3) {
        deleteCode(emial)
    }
    return (
        <>
            <Grid container xs={12} sx={{minHeight:'100vh'}}>
                <Grid item xs={8} sx={{display: displayEmail}}>
                    <img src={Image} style={{ width: '75%',marginInline:'12.5%' }} />
                </Grid>
                <Grid item xs={8} sx={{display: displayCode}}>
                    <img src={Imaget} style={{ width: '75%',marginInline:'12.5%' }} />
                </Grid>
                <Grid item xs={8} sx={{ display: displayPasword }}>
                    <img src={Imagefin} style={{ width: '75%',marginInline:'12.5%' }} />
                </Grid>
                <Grid item xs={4} sx={{ py: 10, px: 2, bgcolor: 'white', display: displayEmail }}>
                    <form>
                        <Grid item xs={12}>
                            <Typography variant='h6' sx={{fontFamily: 'Bahnschrift SemiBold', textAlign: 'center' }}>
                                Email
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 10 }}>
                            <Typography variant='h6' sx={{ textAlign: 'left',fontFamily: 'Bahnschrift SemiBold' }}>
                                Email
                            </Typography>
                            <input style={{ fontFamily: 'Bahnschrift SemiBold',border: '1px solid rgba(0,0,0,0.3)', marginTop: '0.5rem', width: '100%', padding: '0.5rem 1rem', borderRadius: '5px 2px 5px 2px', }} required type='email' onChange={(e) => { setemial(e.target.value) }} value={emial} placeholder='enter your email' />
                            {errorCheckMail ? <Alert severity="error" sx={{fontFamily: 'Bahnschrift SemiBold',mt:1}}><b>Email</b>  incorecte !</Alert> : null}
                            <br /><button style={{fontFamily: 'Bahnschrift SemiBold', marginTop: '1rem', border: 'none', borderRadius: '5px 2px 5px 2px', padding: '0.2rem 1rem', marginTop: '1rem' }} type='submit' onClick={(e) => { e.preventDefault(); checkEmail(emial) }}>check</button>
                            <br />
                           
                            {success ? <p>{success}</p> : null}
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={4} sx={{ py: 10, px: 2, bgcolor: 'white',fontFamily: 'Bahnschrift SemiBold', display: displayCode }}>
                    <form>
                        <Grid item xs={12}>
                            <Typography variant='h6' sx={{fontFamily: 'Bahnschrift SemiBold', textAlign: 'center' }}>
                                Code
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 10 }}>
                            <Typography variant='h6' sx={{ fontFamily: 'Bahnschrift SemiBold',textAlign: 'left' }}>
                                Code
                            </Typography>
                            <input style={{ fontFamily: 'Bahnschrift SemiBold',border: '1px solid rgba(0,0,0,0.3)', marginTop: '0.5rem', width: '100%', padding: '0.5rem 1rem', borderRadius: '5px 2px 5px 2px', }} type='text' onChange={(e) => { setCode(e.target.value) }} value={Code} placeholder='enter validation code here' />
                            {errorCode ? <> <Alert severity="error" sx={{fontFamily: 'Bahnschrift SemiBold',mt:1}}><b>Code</b>  incorecte !</Alert></> : null}
                            <br /><button style={{fontFamily: 'Bahnschrift SemiBold', marginTop: '0.5rem', border: 'none', borderRadius: '5px 2px 5px 2px', padding: '0.2rem 1rem',  }} onClick={(e) => { e.preventDefault(); checkCode(Code) }}>check</button>
                            <br />
                           
                            {successCode == 'valid' ? <p>{successCode}</p> : null}
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={4} sx={{ py: 10, px: 2, bgcolor: 'white', display: displayPasword }}>
                    <form>
                        <Grid item xs={12}>
                            <Typography variant='h6' sx={{fontFamily: 'Bahnschrift SemiBold', textAlign: 'center' }}>
                                password
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 10 }}>
                            <Typography variant='h6' sx={{fontFamily: 'Bahnschrift SemiBold', textAlign: 'left' }}>
                                password
                            </Typography>
                            <input style={{ fontFamily: 'Bahnschrift SemiBold',border: '1px solid rgba(0,0,0,0.3)', marginTop: '0.5rem', width: '100%', padding: '0.5rem 1rem', borderRadius: '5px 2px 5px 2px', }} type='password' onChange={(e) => { setPass(e.target.value) }} value={Pass} placeholder='enter your password' />
                            {successPass ? <Alert severity="success" sx={{fontFamily: 'Bahnschrift SemiBold',mt:1}}><b>Votre Mot De Passe  </b> a été bien renouveler !</Alert> : null}
                            <br /> 
                            {!successPass ? <button style={{fontFamily: 'Bahnschrift SemiBold', marginTop: '1rem', border: 'none', borderRadius: '5px 2px 5px 2px', padding: '0.2rem 1rem', marginTop: '1rem' }} onClick={(e) => { e.preventDefault(); NewPass(emial, Pass) }}>check</button>
                            : <button style={{fontFamily: 'Bahnschrift SemiBold', marginTop: '1rem', border: 'none', borderRadius: '5px 2px 5px 2px', padding: '0.2rem 1rem', marginTop: '1rem' }} onClick={() => { location.push('/') }}>Home</button> }
                            <br />
                            {errorPass ? <Alert severity="error" sx={{fontFamily: 'Bahnschrift SemiBold',mt:1}}><b>Code</b>  incorecte !</Alert> : null}
                           
                        </Grid>
                    </form>
                </Grid>
            </Grid>






            {/* <form style={{ display: displayEmail }}>

            </form>
            <form style={{ display: displayCode }}>
                <input type='text' onChange={(e) => { setCode(e.target.value) }} value={Code} placeholder='enter validation code here' />
                <button onClick={(e) => { e.preventDefault(); checkCode(Code) }}>check</button>
                <br />
                {errorCode ? <> <p>{errorCode}</p> <b>{Numbere}</b></> : null}
                {successCode == 'valid' ? <p>{successCode}</p> : null}
            </form>
            <form style={{ display: displayPasword }}>
                <input type='password' onChange={(e) => { setPass(e.target.value) }} value={Pass} placeholder='enter your password' />
                <button onClick={(e) => { e.preventDefault(); NewPass(emial, Pass) }}>check</button>
                <br />
                {errorPass ? <p>{errorPass}</p> : null}
                {successPass ? <p>{successPass}</p> : null}
            </form> */}
            {/* ;deleteCode(emial) */}
        </>
    );
};
export default Forget