import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, LinearProgress, TextField, Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link as LinkS } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

import LaunchIcon from '@mui/icons-material/Launch';
import axios from 'axios';
import { API_BASE } from '../../../constants';
const ProfilA = () => {


    const user = JSON.parse(localStorage.getItem('user'))
    const [User, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)
    const [errorUser, setErrorUser] = useState(null)
    const getUser = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${user.token}`
            }
        }
        await axios.get(`${API_BASE}/user/profile`, config).then(res => {
            setUser(res.data)
            setLoadingUser(false)
            setErrorUser(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setLoadingUser(false)
            setErrorUser(error.response.data)
        })
    }
    const [Contact, setContact] = useState(null)
    const [loadingContact, setLoadingContact] = useState(true)
    const [errorContact, setErrorContact] = useState(null)



    const getContact = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${user.token}`
            }
        }
        await axios.get(`${API_BASE}/admin`, config).then(res => {
            setContact(res.data)
            console.log(res.data)
            setLoadingContact(false)
            setErrorContact(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setLoadingContact(false)
            setErrorContact(error.response.data)
        })
    }
    // edit data admin

    const EditCour = async (email, pass, id) => {
        const data = new FormData()
        data.append('email', email)
        data.append('password', pass)

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
    const handelchangeEmail = (e) => {
        setEmailUpdate(e.target.value)
    }
    const handelchangePassword = (e) => {
        setPasswordUpdate(e.target.value)
    }
    // edit data contact admin
    const [EmailUpdateA, setEmailUpdateA] = useState('')
    const [AddressUpdateA, setAddressUpdateA] = useState('')
    const [TelephUpdate, seTelephUpdateA] = useState('')
    const [successUpdateA, setSuccessUpdateA] = React.useState(null)
    const [loadingUpdateA, setLoadingUpdateA] = React.useState(false)
    const [errorUpdateA, setErrorUpdateA] = React.useState(null)
    const [EmailUpdate, setEmailUpdate] = useState('')
    const [PasswordUpdate, setPasswordUpdate] = useState('')
    const [successUpdate, setSuccessUpdate] = useState(null)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [errorUpdate, setErrorUpdate] = useState(null)
    const EditA = async (email, address, telph, id) => {
        const data = new FormData()
        data.append('Aemail', email)
        data.append('Aadresse', address)
        data.append('Ateleph', telph)

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
        await axios.patch(`${API_BASE}/admin/` + id, data, config).then(res => {
            setSuccessUpdateA(true)
            setErrorUpdateA(false)
            setLoadingUpdateA(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setErrorUpdate(error.response.data)
            setSuccessUpdateA(false)
            setLoadingUpdateA(false)
        })
    }
    const handelchangeEmailA = (e) => {
        setEmailUpdateA(e.target.value)
    }
    const handelchangeAdressA = (e) => {
        setAddressUpdateA(e.target.value)
    }
    const handelchangeTelephA = (e) => {
        seTelephUpdateA(e.target.value)
    }
    // dialog 
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openEditA, setOpenEditA] = React.useState(false);
    const [id, setId] = React.useState();
    //edit
    const handleClickOpenEdit = () => {
        setEmailUpdate(User.email)
        setPasswordUpdate(User.password)
        setId(User._id);
        setOpenEdit(true);
    }
    const onClickValidEdit = (email, pass, id) => {
        setLoadingUpdate(true)
        EditCour(email, pass, id)
    }
    const handleCloseEdit = () => {
        setEmailUpdate('')
        setPasswordUpdate('')
        setId('');
        setSuccessUpdate(false)
        setErrorUpdate(false)
        setLoadingUpdate(false)
        setOpenEdit(false);
    }
    //edit Contact
    const handleClickOpenEditA = () => {
        setEmailUpdateA(Contact.Aemail)
        setAddressUpdateA(Contact.Aadresse)
        seTelephUpdateA(Contact.Ateleph)
        setId(Contact._id);
        setOpenEditA(true);
    }
    const onClickValidEditA = (email, add, tel, id) => {
        setLoadingUpdateA(true)
        EditA(email, add, tel, id)
    }
    const handleCloseEditA = () => {
        setEmailUpdateA('')
        setAddressUpdateA('')
        seTelephUpdateA('')
        setId('');
        setSuccessUpdateA(false)
        setErrorUpdateA(false)
        setLoadingUpdateA(false)
        setOpenEditA(false);
    }
    useEffect(() => {
        getUser()
        getContact()
    }, [successUpdate, successUpdateA])
    if (loadingUser) {
        return <p>waiting for data !</p>
    }
    if (loadingContact) {
        return <p>waiting for data !</p>
    }
    if (errorUser) {
        return <p>{errorUser}</p>
    }
    if (errorContact) {
        return <p>{errorContact}</p>
    }



    return (
        <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={2} sx={{ display: 'flex', p: 2, paddingBlock: 1 }}>
                <Toolbar />

                <Grid container item md={12} xs={12}   >
                    <Grid item sm={12} xs={12}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            <Link to={"/simple"} className='Links'>
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
                    <Grid item xs={12} sm={6} md={4} sx={{ paddingInline: 1.5, mb: 2 }}>

                        <Typography variant="h6" sx={{ '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Information Personnelle
                            <IconButton onClick={() => { handleClickOpenEdit() }} aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                                <SettingsRoundedIcon />
                            </IconButton>
                        </Typography>



                        <Grid item xs={12} sx={{ mt: 2, bgcolor: 'white', p: 1, borderRadius: 2, boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                                UserName
                            </Typography>
                            <input type="text" value={User.email} style={{ color: '#b33d95', marginBlock: 5, boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px inset', borderRadius: 5, fontSize: '1rem', padding: '4px 8px', border: '0px solid silver', width: '100%' }} disabled />
                        </Grid>
                        

                    </Grid>
                    <Grid item xs={12} sm={6} md={4} sx={{ paddingInline: 1.5, mb: 2 }}>
                        <Typography variant="h6" sx={{ '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Information Perofisionelle
                            <IconButton onClick={() => { handleClickOpenEditA() }} aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                                <SettingsRoundedIcon />
                            </IconButton>
                        </Typography>

                        <Grid item xs={12} sx={{ mt: 2, bgcolor: 'white', p: 1, borderRadius: 2, boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                                Adresse
                            </Typography>
                            <Typography variant="body1" sx={{ p: 1, fontWeight: 'bold' }}>
                                {Contact.Aadresse}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2, bgcolor: 'white', p: 1, borderRadius: 2, boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                                Num Tel
                            </Typography>
                            <Typography variant="body1" sx={{ p: 1, fontWeight: 'bold' }}>
                                {Contact.Ateleph}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ mt: 2, bgcolor: 'white', p: 1, borderRadius: 2, boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px ', }}>
                            <Typography variant="body1" sx={{ '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                                Email
                            </Typography>
                            <Typography variant="body1" sx={{ p: 1, fontWeight: 'bold' }}>
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
                    {"Modifier Une Année Scolaire"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
                            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                email
                            </Typography>
                            <TextField onChange={(e) => { handelchangeEmail(e) }} value={EmailUpdate} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Id védio" />
                            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                Password
                            </Typography>
                            <TextField onChange={(e) => { handelchangePassword(e) }}  sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="New Password" />
                            {loadingUpdate ? <LinearProgress color="secondary" /> : null}
                            {errorUpdate ? <Alert sx={{ mt: 1 }} severity="error">{errorUpdate}</Alert> : null}
                            {successUpdate ? <Alert sx={{ mt: 1 }} severity="success">Ce Modules a été ajouter avec success</Alert> : null}
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit} sx={{ color: 'red' }}>Annuler</Button>
                    <Button onClick={() => { onClickValidEdit(EmailUpdate, PasswordUpdate, id) }} autoFocus sx={{ color: 'green' }}>
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
            {/* fin edit dialog */}
            {/* edit dialog */}
            <Dialog
                open={openEditA}
                onClose={handleCloseEditA}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Modifier Une Année Scolaire"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
                            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                Adress
                            </Typography>
                            <TextField onChange={(e) => { handelchangeAdressA(e) }} value={AddressUpdateA} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Id védio" />
                            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                Num Tel
                            </Typography>
                            <TextField onChange={(e) => { handelchangeTelephA(e) }} value={TelephUpdate} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Id védio" />
                            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                Email
                            </Typography>
                            <TextField onChange={(e) => { handelchangeEmailA(e) }} value={EmailUpdateA} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Id védio" />
                            {loadingUpdateA ? <LinearProgress color="secondary" /> : null}
                            {errorUpdateA ? <Alert sx={{ mt: 1 }} severity="error">{errorUpdateA}</Alert> : null}
                            {successUpdateA ? <Alert sx={{ mt: 1 }} severity="success">Modification avec success</Alert> : null}
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditA} sx={{ color: 'red' }}>Annuler</Button>
                    <Button onClick={() => { onClickValidEditA(EmailUpdateA, AddressUpdateA, TelephUpdate, id) }} autoFocus sx={{ color: 'green' }}>
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
            {/* fin edit dialog */}
        </Box >

    );
}


export default ProfilA;