
import { Link, useParams } from "react-router-dom";
import { InputLabel, Skeleton, Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import { Typography } from '@mui/material';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SourceIcon from '@mui/icons-material/Source';
import IconButton from '@mui/material/IconButton';
// import "./../../modules.css";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

import TextField from '@mui/material/TextField';


import { Link as LinkS } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import "./../../../index.css";
import img from "./logo192.png";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import image from './image/videModules.png';
import Alert from '@mui/material/Alert';
import { param } from "jquery";
import { API_BASE, API_ROOT } from "../../../constants";

const ModulesG = () => {
    const params = useParams();

    const userToken = JSON.parse(localStorage.getItem('user'))
    console.log(userToken.token)

    const [loading, setLoading] = useState(true)
    const [Allmodules, setAllModules] = useState({})
    const [year, setYear] = useState('')
    // fetch errors
    const [ModulesError, setModulesError] = useState()
    const [AllModulesError, setAllModulesError] = useState()
    const [FetchBYanneeError, setFetchBYanneeError] = useState()
    const [annee, setAnnee] = useState([])
    const [loainganneedata, setLoadinganneeData] = React.useState(true)
    const [erroranneedata, setErroranneeData] = React.useState(null)
    // if(annee){
    //     setFetchBYannee(true)
    // }
    const anneparamchange = () => {
        if (params.annee !== undefined) {
            setYear(params.annee)
        } else {
            setYear('')
        }
    }

    const handleChange = (e) => {
        setYear(e.target.value)
    }
    const ApiCall = async () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${userToken.token}`
            }
        }
        await axios.get(`${API_BASE}/annee`, config).then(res => { setAnnee(res.data); setLoadinganneeData(false) }).catch(error => { console.log(error.response.data); setErroranneeData(error.response.data); setLoadinganneeData(false) })
    }
    const allmodule = async () => {
        await axios.get(`${API_BASE}/module/`, { headers: { authorization: `Bearer ${userToken.token}` } }).then(respons => {
            setAllModules(respons.data)
            setLoading(false)
        }
        ).catch(error => {
            console.log(error.message);
            setAllModulesError(error.message)
        }
        )
    }

    // const APIcall = async () => {
    //     await axios.get(`${API_BASE}/module/moduleUser`, { headers: { authorization: `Bearer ${userToken.token}` } }).then(respons => 
    //     setModules(respons.data)
    //     ).catch(error => { 
    //         console.log(error.message); 
    //         setAllModulesError(error.message) 
    //     })
    //     setLoading(false)
    // }

    const FilterModuleByAnnee = async () => {
        await axios.get(`${API_BASE}/module/gold/annee/` + year, { headers: { authorization: `Bearer ${userToken.token}` } }).then(respons =>
            setAllModules(respons.data)
        ).catch(error => {
            console.log(error.message);
            setFetchBYanneeError(error.message)
        }
        )
    }

    console.log('render')

    useEffect(() => {
        ApiCall()
        anneparamchange()
    }, [])
    useEffect(() => {
        if (ModulesError) {
            console.log(ModulesError)
        }
        if (FetchBYanneeError) {
            console.log(FetchBYanneeError)
        }
        //fetch all modules
        if (year === '') {
            allmodule()
        } else {
            FilterModuleByAnnee()
        }
    }, [ModulesError, year])

    // store the history
    // const [score, setScore] = useState(0)
    const history = (id, name, annee) => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        if (localStorage.getItem('module')) {
            let data = localStorage.getItem('module')
            const newdata = JSON.parse(data)
            newdata.push({ id: id, name: name, annee: annee, date: today })
            console.log(newdata)
            localStorage.setItem('module', JSON.stringify(newdata))
        } else {
            localStorage.setItem('module', JSON.stringify([{ id: id, name: name, annee: annee, date: today }]))
        }
    }

    // if (loading) {
    //     return <p>...</p>
    // }
    const NullModules = () => {
        return (
            <>

                <Grid item xs={12}>
                    <img src={image} style={{ width: '40%', marginInline: '30%', marginBlock: '0.5rem' }} />
                    <Alert severity="error">Désolé   -   Aucun module ajouté dans cette section!</Alert>
                </Grid>
            </>
        )
    }
    const WatingAnne = () => {
        return (
            <>
                <Grid xs={12} >
                    <Skeleton variant="rectangular" sx={{ width: '100%', mt: 0, height: 50, borderRadius: 1 }} />
                </Grid>
            </>
        )
    }
    const WatingCard = () => {
        return (
            <>
                <Grid item md={4} sm={6} xs={12} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height: 180, borderRadius: 4 }} />
                </Grid>
                <Grid item md={4} sm={6} xs={12} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height: 180, borderRadius: 4 }} />
                </Grid>
                <Grid item md={4} sm={6} xs={12} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height: 180, borderRadius: 4 }} />
                </Grid>
                <Grid item md={4} sm={6} xs={12} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height: 180, borderRadius: 4 }} />
                </Grid>
                <Grid item md={4} sm={6} xs={12} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height: 180, borderRadius: 4 }} />
                </Grid>
                <Grid item md={4} sm={6} xs={12} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height: 180, borderRadius: 4 }} />
                </Grid>
            </>
        )
    }
    return (

        <Box sx={{ flexGrow: 1 }}>
            <Toolbar />
            <Grid container spacing={4} sx={{ display: 'flex', p: 2, paddingBlock: 4, }}>
                <Grid item xs={12} sm={7} md={8}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ fontFamily: 'Bahnschrift SemiBold !important', }}>
                        <Link to={"/gold"} className='Links'>
                            <LinkS
                                underline="none"
                                sx={{
                                    color: '#635985',
                                    '&:hover': {
                                        color: '#635985',
                                        bgcolor: 'white',
                                    }

                                }}
                            >
                                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 1, borderRadius: 2, transition: '0.3s', '&:hover': { color: '#635985', bgcolor: 'white', boxShadow: '1px 1px 4px rgba(0,0,0,0.15)' }, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
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
                            Mes Modules
                        </LinkS>

                    </Breadcrumbs>
                </Grid>
                <Grid item xs={12} sm={5} md={4} sx={{ p: 0 }}>
                    {
                        loainganneedata ? <><WatingAnne /></> : erroranneedata ?
                            <>
                                {erroranneedata}
                            </>
                            :
                            <>
                                <Grid xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">annee scolaire</InputLabel>
                                        <Select
                                            sx={{ bgcolor: 'white' }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={year}
                                            label="annee scolaire"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={''}>All</MenuItem>
                                            {annee.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </>
                    }

                </Grid>

                {loading ? <><WatingCard /></> : AllModulesError ?
                    <>{AllModulesError}</>
                    :
                    Allmodules.length > 0 ?
                        Allmodules.filter(item => item.del !== 1).map(module => {
                            return (
                                <Grid item md={4} sm={6} xs={12}   >
                                    <Card
                                        key={module._id}
                                        elevation={1}
                                        sx={{
                                            borderRadius: 5,
                                            mt: 0,
                                            backgroundColor: 'white',
                                            transition: '.3s',
                                            '&:hover': {
                                                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'

                                            }
                                        }} >




                                        <CardContent sx={{ display: 'flex', alignItems: 'center' }} >
                                            <img
                                                style={{ borderRadius: '50%' }}
                                                height={50}
                                                width={50}
                                                src={`${API_ROOT}/uploads/` + module.file.data}
                                                alt={module.name}
                                                loading="lazy"
                                            />
                                            <Grid sx={{ flex: '1 0 80%' }}>
                                                <Link to={loading ? <p>...</p> : `/gold/moduleInfo/${module._id}`} className='Links'>
                                                    <IconButton onClick={() => history(module._id, module.name, module.annee)} sx={{ float: 'right', transition: '.3s', backgroundColor: '#ffdddd', color: '#ff5757', '&:hover': { transform: 'scale(1.1)' } }}>
                                                        <SourceIcon />
                                                    </IconButton>
                                                </Link>
                                            </Grid>
                                        </CardContent>
                                        <CardContent>
                                            <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', transition: '.5s', color: '#443C68' }}>
                                                {module.name}
                                            </Typography>
                                            <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'Bahnschrift SemiBold', transition: '.5s', fontWeight: '400', opacity: '0.8' }}>
                                                {module.desc}
                                            </Typography>
                                        </CardContent>

                                    </Card>
                                </Grid>

                            )
                        })
                        :
                        <><NullModules /></>
                }
            </Grid>
        </Box >

    );
}


export default ModulesG;

const top100Films = [

];