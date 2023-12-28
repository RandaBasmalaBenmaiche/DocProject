import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link as LinkS } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, InputLabel, LinearProgress, MenuItem, Select, TextField, Toolbar } from "@mui/material";
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import LaunchIcon from '@mui/icons-material/Launch';
import axios from 'axios';
import { API_BASE } from '../../../constants';

const Profil = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [User, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)
    const [errorUser, setErrorUser] = useState(null)
    const getUser = async ()=>{
        const config = {
            headers : {
                'authorization' : `Bearer ${user.token}`
            }
        }
        await axios.get(`${API_BASE}/user/profile`,config).then(res =>{
            setUser(res.data)
            setLoadingUser(false)
            setErrorUser(false)
        }).catch(error =>{
            console.log(error.message)
            console.log(error.response.data)
            setLoadingUser(false)
            setErrorUser(error.response.data)
        })
    }
    const [Contact, setContact] = useState(null)
    const [loadingContact, setLoadingContact] = useState(true)
    const [errorContact, setErrorContact] = useState(null)
    const getContact = async ()=>{
        const config = {
            headers : {
                'authorization' : `Bearer ${user.token}`
            }
        }
        await axios.get(`${API_BASE}/admin`,config).then(res =>{
            setContact(res.data)
            setLoadingContact(false)
            setErrorContact(false)
        }).catch(error =>{
            console.log(error.message)
            console.log(error.response.data)
            setLoadingContact(false)
            setErrorContact(error.response.data)
        })
    }
    //-----------------------------------------------------------------------------
    // annee data
    const [anneeData, setanneeData] = React.useState(null)
    const [loadinganneeData, setLoadinganneeData] = React.useState(true)
    const [successanneeData, setSuccessanneeData] = React.useState(null)
    const [erroranneeData, setErroranneeData] = React.useState(null)
    //fetch data
    const ApiCall = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${user.token}`
            }
        };
        await axios.get(`${API_BASE}/annee`, config).then(res => {
            setanneeData(res.data)
            setLoadinganneeData(false)
            setSuccessanneeData(true)
            setErroranneeData(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setErroranneeData(error.response.data)
            setSuccessanneeData(false)
            setLoadinganneeData(false)
        })
    }
    // edit data
    const [FnameUpdate, setFnameUpdate] = useState('')
    const [LnameUpdate, setLnameUpdate] = useState('')
    const [UserNmaeUpdate, setUserNameUpdate] = useState('')
    const [PasswordUpdate, setPasswordUpdate] = useState('')
    const [emailUpdate, setemailUpdate] = useState('')
    const [AnneeSchoolUpdate, setAnneeSchoolUpdate] = useState('')
    const [successUpdate, setSuccessUpdate] = React.useState(null)
    const [loadingUpdate, setLoadingUpdate] = React.useState(false)
    const [errorUpdate, setErrorUpdate] = React.useState(null)
    const EditCour = async (fname, lname, uname, pass, annees, id,email) => {
        const data = new FormData()
        data.append('firstName', fname)
        data.append('lastName', lname)
        data.append('userName', uname)
        data.append('annee', annees)
        data.append('password', pass)
        data.append('email', email)

        for (var [key, value] of data.entries()) {
            console.log(key, value);
        }

        const config = {
            headers: {
                'content-type': 'application/json',
                'accept': 'application/json',
                'authorization': `Bearer ${user.token}`
            }
        };
        await axios.patch(`${API_BASE}/user/edit/` + id, data, config).then(res => {
            setSuccessUpdate(true)
            setErrorUpdate(false)
            setLoadingUpdate(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setErrorUpdate(error.response.data)
            setSuccessUpdate(false)
            setLoadingUpdate(false)
        })
    }
    const handelchangeFname = (e) => {
        setFnameUpdate(e.target.value)
    }
    const handelchangeLname = (e) => {
        setLnameUpdate(e.target.value)
    }
    const handelchangeUname = (e) => {
        setUserNameUpdate(e.target.value)
    }
    const handelchangePassword = (e) => {
        setPasswordUpdate(e.target.value)
    }
    const handelchangeEmail = (e) => {
        setemailUpdate(e.target.value)
    }
    const handelchangeAnneeSchool = (e) => {
        setAnneeSchoolUpdate(e.target.value)
    }
    // dialog 
    const [openEdit, setOpenEdit] = React.useState(false);
    const [id, setId] = React.useState();
    //edit
    const handleClickOpenEdit = () => {
        setFnameUpdate(User.firstName)
        setLnameUpdate(User.lastName)
        setUserNameUpdate(User.userName)
        setPasswordUpdate(User.password)
        setAnneeSchoolUpdate(User.annee)
        setemailUpdate(User.email)
        console.log('AnneeSchoolUpdate')
        console.log(AnneeSchoolUpdate)
        setId(User._id);
        setOpenEdit(true);
    }
    const onClickValidEdit = (fname, lname, uname, pass, annees, id,email) => {
        setLoadingUpdate(true)
        EditCour(fname, lname, uname, pass, annees, id,email)
    }
    const handleCloseEdit = () => {
        setFnameUpdate('')
        setLnameUpdate('')
        setUserNameUpdate('')
        setPasswordUpdate('')
        setAnneeSchoolUpdate('')
        setId('');
        setSuccessUpdate(false)
        setErrorUpdate(false)
        setLoadingUpdate(false)
        setOpenEdit(false);
    }
    //------------------------------------------------------------------------------------------------------
    useEffect(()=>{
        getUser()
        getContact()
        ApiCall()
    },[successUpdate])
    if(loadingUser){
        return <p>waiting for data !</p>
    }
    if(loadingContact){
        return <p>waiting for data !</p>
    }
    if(errorUser){
        return <p>{errorUser}</p>
    }
    if(errorContact){
        return <p>{errorContact}</p>
    }
    return (
        <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={2} sx={{ display: 'flex', p: 2, paddingBlock: 1 }}>
                <Toolbar />

                <Grid container item md={12} xs={12}   >
                    <Grid item sm={12} xs={12}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            <Link to={"/simple"}className='Links'>
                                <LinkS
                                    underline="none"

                                    sx={{
                                        //     mr: 2,
                                        //     paddingBlock: 1,
                                        //     paddingInline: 3,
                                        //     borderRadius: 4,
                                        //     fontSize: 12,
                                        //     transition: '0.3s',
                                        //     backgroundColor: '#fbdef2',
                                        color: '#635985',
                                        //     border: '1px solid rgb(252, 252, 252,1)',
                                        //     boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 6px  inset,rgba(0, 0, 0, 0.2) 3px 3px 6px ',
                                        '&:hover': {
                                            color: '#635985',
                                            bgcolor: 'white',
                                        }

                                    }}
                                >
                                    <Typography variant="h6" sx={{ paddingBlock: 0, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&:hover': { color: '#635985', bgcolor: 'white', boxShadow: '1px 1px 4px rgba(0,0,0,0.15)' }, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                        Home
                                    </Typography>
                                </LinkS>
                            </Link>
                            <LinkS
                                underline="none"

                                sx={{

                                    paddingBlock: 1,
                                    paddingInline: 1,
                                    fontWeight: 'bold',
                                    borderRadius: 4,
                                    fontSize: 14,
                                    transition: '0.3s',
                                    // backgroundColor: '#fbdef2',
                                    color: '#443C68',
                                    // border: '1px solid rgb(252, 252, 252,1)',
                                    // boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 6px  inset,rgba(0, 0, 0, 0.2) 3px 3px 6px ',
                                    '&:hover': {
                                        color: '#443C68',
                                    }

                                }}
                            >
                                Profil

                            </LinkS>

                        </Breadcrumbs>
                    </Grid>

                </Grid>


                <Grid container item xs={12} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6} md={4} sx={{ paddingInline: 1.5 ,mb:2 }}>
                        <Typography variant="h6" sx={{ '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Information Personnelle
                            <IconButton onClick={() => { handleClickOpenEdit() }} aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                    <SettingsRoundedIcon />
                </IconButton>
                        </Typography>
                        <Grid item xs={12} sx={{ mt:2,bgcolor: 'white', p: 1, borderRadius: 2,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                               Nom
                            </Typography>
                            <input type="text" value={User.lastName} style={{color:'#b33d95',marginBlock:5,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px inset',borderRadius: 5,fontSize:'1rem',padding:'4px 8px',border:'0px solid silver',width:'100%'}} disabled />
                        </Grid>
                        <Grid item xs={12} sx={{ mt:2,bgcolor: 'white', p: 1, borderRadius: 2,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                               Prénom
                            </Typography>
                            <input type="text" value={User.firstName} style={{color:'#b33d95',marginBlock:5,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px inset',borderRadius: 5,fontSize:'1rem',padding:'4px 8px',border:'0px solid silver',width:'100%'}} disabled />
                        </Grid>
                        <Grid item xs={12} sx={{ mt:2,bgcolor: 'white', p: 1, borderRadius: 2,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                               UserName
                            </Typography>
                            <input type="text" value={User.userName} style={{color:'#b33d95',marginBlock:5,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px inset',borderRadius: 5,fontSize:'1rem',padding:'4px 8px',border:'0px solid silver',width:'100%'}} disabled />
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2, bgcolor: 'white', p: 1, borderRadius: 2, boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                               Email
                            </Typography>
                            <input type="text" value={User.email} style={{ color: '#b33d95', marginBlock: 5, boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px inset', borderRadius: 5, fontSize: '1rem', padding: '4px 8px', border: '0px solid silver', width: '100%' }} disabled />
                        </Grid>
                        
                       
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} sx={{ paddingInline: 1.5,mb:2 }}>
                        <Typography variant="h6" sx={{ '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Information Perofisionelle
                        </Typography>
                        <Grid item xs={12} sx={{ mt:2,bgcolor: 'white', p: 1, borderRadius: 2,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                               Type Abonnement
                            </Typography>
                            <input type="text" value={User.gold} style={{color:'#b33d95',marginBlock:5,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px inset',borderRadius: 5,fontSize:'1rem',padding:'4px 8px',border:'0px solid silver',width:'100%'}} disabled />
                        </Grid>
                        <Grid item xs={12} sx={{ mt:2,bgcolor: 'white', p: 1, borderRadius: 2,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                               Année Scolaire
                            </Typography>
                            <input type="text" value={User.annee} style={{color:'#b33d95',marginBlock:5,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px inset',borderRadius: 5,fontSize:'1rem',padding:'4px 8px',border:'0px solid silver',width:'100%'}} disabled />
                        </Grid>
                        <Grid item xs={12} sx={{ mt:2,bgcolor: 'white', p: 1, borderRadius: 2,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                               Début D'abonnement
                            </Typography>
                            <input type="text" value={User.Debut[0]+''+User.Debut[1]+''+User.Debut[2]+''+User.Debut[3]+' - '+User.Debut[5]+''+User.Debut[6]+' - '+User.Debut[8]+''+User.Debut[9]} style={{color:'#b33d95',marginBlock:5,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px inset',borderRadius: 5,fontSize:'1rem',padding:'4px 8px',border:'0px solid silver',width:'100%'}} disabled />
                        </Grid>
                        <Grid item xs={12} sx={{ mt:2,bgcolor: 'white', p: 1, borderRadius: 2,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                               Fin D'abonnement
                            </Typography>
                            <input type="text" value={User.Fin ? User.Fin[0]+''+User.Fin[1]+''+User.Fin[2]+''+User.Fin[3]+' - '+User.Fin[5]+''+User.Fin[6]+' - '+User.Fin[8]+''+User.Fin[9] : null} style={{color:'#b33d95',marginBlock:5,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px inset',borderRadius: 5,fontSize:'1rem',padding:'4px 8px',border:'0px solid silver',width:'100%'}} disabled />
                        </Grid>
                        <Grid item xs={12} sx={{ mt:2,bgcolor: 'white', p: 1, borderRadius: 2,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                               Renouvler L'abonnement
                            </Typography>
                            <Button color="secondary" variant="contained" size='small' sx={{p:1,mt:1,width:'100%'}} > Renouvler L'abonnement</Button>
                        </Grid>
                       
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} sx={{ paddingInline: 1.5,mb:2 }}>
                        <Typography variant="h6" sx={{ '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Contact
                        </Typography>
                        <Grid item xs={12} sx={{ mt:2,bgcolor: 'white', p: 1, borderRadius: 2,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                              Adresse  
                            </Typography>
                            <Typography variant="body1" sx={{ p:1,  fontWeight: 'bold' }}>
                              {Contact.Aadresse}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt:2,bgcolor: 'white', p: 1, borderRadius: 2,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                              Num Tel  
                            </Typography>
                            <Typography variant="body1" sx={{ p:1,  fontWeight: 'bold' }}>
                            {Contact.Ateleph} 
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt:2,bgcolor: 'white', p: 1, borderRadius: 2,boxShadow:' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                             Email 
                            </Typography>
                            <Typography variant="body1" sx={{ p:1,  fontWeight: 'bold' }}>
                              {Contact.Aemail} 
                            </Typography>
                        </Grid>
                        
                        
                       
                    </Grid>
                </Grid>
            </Grid>
            {/* edit dialog */}
            <Dialog
                open={openEdit}
                onClose={handleCloseEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Modifier Informations"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
                            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Nom
                            </Typography>
                            <TextField onChange={(e) => { handelchangeFname(e) }} value={FnameUpdate} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Nom" />
                            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Prénom
                            </Typography>
                            <TextField onChange={(e) => { handelchangeLname(e) }} value={LnameUpdate} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Prénom" />
                            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Nom d'utilisateure
                            </Typography>
                            <TextField onChange={(e) => { handelchangeUname(e) }} value={UserNmaeUpdate} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Nom d'utilisateure" />
                            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Mot de passe
                            </Typography>
                            <TextField onChange={(e) => { handelchangePassword(e) }} type="password"  sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Mot de passe" />
                            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                               Email
                            </Typography>
                            <TextField onChange={(e) => { handelchangeEmail(e) }} type="email" value={emailUpdate}  sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Email" />
                            {loadingUpdate ? <LinearProgress color="secondary" /> : null}
                            {errorUpdate ? <Alert sx={{ mt: 1 }} severity="error">{errorUpdate}</Alert> : null}
                            {successUpdate ? <Alert sx={{ mt: 1 }} severity="success">Modification avec success</Alert> : null}
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} sx={{ color: 'red' }}>Annuler</Button>
                    <Button onClick={() => { onClickValidEdit(FnameUpdate, LnameUpdate, UserNmaeUpdate, PasswordUpdate, AnneeSchoolUpdate, id,emailUpdate) }} autoFocus sx={{ color: 'green' }}>
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
            {/* fin edit dialog */}
        </Box >

    );
}

export default Profil;