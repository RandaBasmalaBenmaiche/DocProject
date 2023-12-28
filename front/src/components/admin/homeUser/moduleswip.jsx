import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';

import LestActive from './lestActive';
import Chart from './charts';
import LestWatchs from './lesWatchs';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import Person3Icon from '@mui/icons-material/Person3';
import { Link, useHistory } from "react-router-dom";
import { Link as LinkS } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { display } from '@mui/system';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { API_BASE } from '../../../constants';

const CoreA = () => {
    const location = useHistory()
    const userToken = JSON.parse(localStorage.getItem('user'))

    const [general, setGeneral] = useState(null)
    const [loadingGeneral, setLoadingGeneral] = useState(true)
    const [errorGeneral, setErrorGeneral] = useState(null)
    const [Usergeneral, setUserGeneral] = useState(null)
    const [loadingUserGeneral, setLoadingUserGeneral] = useState(true)
    const [errorUserGeneral, setErrorUserGeneral] = useState(null)

    const [trafic, settrafic] = useState(null)
    const [loadingtraficl, setLoadingtrafic] = useState(true)
    const [successtrafic, setSuccesstrafic] = useState(false)
    const [errortrafic, setErrortrafic] = useState(null)

    const [Abbgeneral, setAbbGeneral] = useState(null)
    const [loadingAbbGeneral, setLoadingAbbGeneral] = useState(true)
    const [errorAbbGeneral, setErrorAbbGeneral] = useState(null)
    const getGeneralState = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${userToken.token}`
            }
        }
        await axios.get(`${API_BASE}/stat/admin/general`, config).then(res => {
            setGeneral(res.data)
            setLoadingGeneral(false)
            setErrorGeneral(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setErrorGeneral(error.response.data)
            setLoadingGeneral(false)
        })
    }
    const getAbbGeneralState = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${userToken.token}`
            }
        }
        await axios.get(`${API_BASE}/stat/admin/abb`, config).then(res => {
            setAbbGeneral(res.data)
            setLoadingAbbGeneral(false)
            setErrorAbbGeneral(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setErrorAbbGeneral(error.response.data)
            setLoadingAbbGeneral(false)
        })
    }
    const getUserGeneralState = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${userToken.token}`
            }
        }
        await axios.get(`${API_BASE}/stat/admin/Usergeneral`, config).then(res => {
            setUserGeneral(res.data)
            setLoadingUserGeneral(false)
            setErrorUserGeneral(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setErrorUserGeneral(error.response.data)
            setLoadingUserGeneral(false)
        })
    }

    const getVisitorStat = async () => {
        const checked = "semaine"
        const config = {
            headers: {
                'authorization': `Bearer ${userToken.token}`
            }
        }
        await axios.get(`${API_BASE}/stat/admin/visitor/` + checked, config).then(res => {
            settrafic(res.data)
            setLoadingtrafic(false)
            setSuccesstrafic(true)
            setErrortrafic(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setErrortrafic(error.response.data)
            setSuccesstrafic(false)
            setLoadingtrafic(false)
        })
    }

    useEffect(() => {
        getGeneralState()
        getUserGeneralState()
        getVisitorStat()
        getAbbGeneralState()
    }, [])

    const Watingstat = () => {
        return (
            <>
                <Grid item xs={5.7} sm={3.8} md={3.8}
                    sx={{
                        mt: 2
                    }}>

                    <Skeleton variant="rectangular" sx={{ width: '100%', height: 120, borderRadius: 2 }} />

                </Grid>
                <Grid item xs={5.7} sm={3.8} md={3.8}
                    sx={{
                        mt: 2
                    }}>
                    <Skeleton variant="rectangular" sx={{ width: '100%', height: 120, borderRadius: 2 }} />
                </Grid>
                <Grid item xs={5.7} sm={3.8} md={3.8}
                    sx={{
                        mt: 2
                    }}>
                    <Skeleton variant="rectangular" sx={{ width: '100%', height: 120, borderRadius: 2 }} />
                </Grid>
            </>
        );
    }
    const WatingAbn = () => {
        return (
            <>
            <Grid container item  xs={12} columnGap={2} sx={{mt:2}} >
                <Grid item xs={4}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={2.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={3.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={1}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
            </Grid>
            <Grid container item  xs={12} columnGap={2} sx={{mt:2}}>
                <Grid item xs={4}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={2.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={3.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={1}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
            </Grid>
            <Grid container item  xs={12} columnGap={2} sx={{mt:2}}>
                <Grid item xs={4}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={2.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={3.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={1}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
            </Grid>
            <Grid container item  xs={12} columnGap={2} sx={{mt:2}}>
                <Grid item xs={4}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={2.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={3.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={1}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
            </Grid>
            <Grid container item  xs={12} columnGap={2} sx={{mt:2}}>
                <Grid item xs={4}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={2.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={3.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={1}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
            </Grid>
            <Grid container item  xs={12} columnGap={2} sx={{mt:2}}>
                <Grid item xs={4}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={2.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={3.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={1}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
            </Grid>
            <Grid container item  xs={12} columnGap={2} sx={{mt:2}}>
                <Grid item xs={4}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={2.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={3.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={1}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
            </Grid>
            <Grid container item  xs={12} columnGap={2} sx={{mt:2}}>
                <Grid item xs={4}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={2.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={3.6}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
                <Grid item xs={1}>
                    <Skeleton sx={{ width: '100%', height: 25, borderRadius:2}} />
                </Grid>
            </Grid>
            </>
        )
    }
    const WatingRacourci = () => {
        return (
            <>
                <Grid item xs={5.8} 
                    sx={{
                        mt: 1
                    }}>

                    <Skeleton variant="rectangular" sx={{ width: '100%', height: 80, borderRadius: 2 }} />

                </Grid>
                <Grid item xs={5.8} 
                    sx={{
                        mt: 1
                    }}>
                    <Skeleton variant="rectangular" sx={{ width: '100%', height: 80, borderRadius: 2 }} />
                </Grid>
                <Grid item xs={5.8} 
                    sx={{
                        mt: 1
                    }}>
                    <Skeleton variant="rectangular" sx={{ width: '100%', height: 80, borderRadius: 2 }} />
                </Grid>
                <Grid item xs={5.8} 
                    sx={{
                        mt: 1
                    }}>
                    <Skeleton variant="rectangular" sx={{ width: '100%', height: 80, borderRadius: 2 }} />
                </Grid>
                <Grid item xs={5.8} 
                    sx={{
                        mt: 1
                    }}>
                    <Skeleton variant="rectangular" sx={{ width: '100%', height: 80, borderRadius: 2 }} />
                </Grid>
                <Grid item xs={5.8} 
                    sx={{
                        mt: 1
                    }}>
                    <Skeleton variant="rectangular" sx={{ width: '100%', height: 80, borderRadius: 2 }} />
                </Grid>
            </>
        );
    }
    const WatingChart = () => {
        return (
            <>
                <Grid item xs={12} 
                    sx={{
                        mt: 1
                    }}>

                    <Skeleton variant="rectangular" sx={{ width: '100%', height: 230, borderRadius: 2 }} />

                </Grid>
               
            </>
        );
    }
    return (

        <Box sx={{ flexGrow: 1 }}>
            <Toolbar />

            <Grid container spacing={0}  >

                <Grid container item xs={12} md={8} sx={{ p: 2 }} columnGap={2} flexDirection="row" alignContent={'flex-start'}>
                    <Grid item xs={12}>
                        <Typography variant="h5" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingInlineEnd: 1, mt: 1, '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                            Statistique
                        </Typography>
                    </Grid>
                    {
                        loadingUserGeneral ? <><Watingstat /></> :
                            errorUserGeneral ? <>{errorUserGeneral}</> :
                                <>
                                    <Grid item xs={5.7} sm={3.8} md={3.8}
                                        sx={{
                                            mt: 2,
                                            bgcolor: '#b33d95',
                                            paddingBlock: 3,
                                            paddingInline: 2,
                                            borderRadius: 2,
                                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                                            alignItems: 'left',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            position: 'relative'
                                        }}>

                                        <Typography variant="body1" sx={{ mb: 1, color: 'white', fontFamily: 'Bahnschrift SemiBold', }}>
                                            Vesiteure
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Bahnschrift SemiBold', opacity: '1' }}>
                                        {successtrafic ? trafic.reduce((acc, vis) => acc + vis.visitor, 0) : 0}
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={5.7} sm={3.8} md={3.8}
                                        sx={{
                                            mt: 2,
                                            bgcolor: '#ff9a57',
                                            paddingBlock: 3,
                                            paddingInline: 2,
                                            borderRadius: 2,
                                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                                            alignItems: 'left',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            position: 'relative'
                                        }}>

                                        <Typography variant="body1" sx={{ mb: 1, color: 'white', fontFamily: 'Bahnschrift SemiBold', }}>
                                            Nouveau Abonne
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Bahnschrift SemiBold', opacity: '1' }}>
                                            {Usergeneral.newAbb}
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={12} sm={3.8} md={3.8}
                                        sx={{
                                            mt: 2,
                                            bgcolor: '#3db3b3',
                                            paddingBlock: 3,
                                            paddingInline: 2,
                                            borderRadius: 2,
                                            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
                                            alignItems: 'left',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            position: 'relative'
                                        }}>

                                        <Typography variant="body1" sx={{ mb: 1, color: 'white', fontFamily: 'Bahnschrift SemiBold', }}>
                                            Abonnement expiré
                                        </Typography>
                                        <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'white', fontFamily: 'Bahnschrift SemiBold', opacity: '1' }}>
                                            {Usergeneral.endAbb}
                                        </Typography>

                                    </Grid>
                                </>
                    }
                    <Grid container item xs={12} md={12} flexDirection="row" alignContent={'flex-start'}
                        sx={{
                            mt: 2,
                            padding: '0.5rem 0.5rem ',
                        }}>

                        <Grid container item xs={12} sx={{ bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.2) 1.95px 1.95px 2.6px  ', border: '1px solid rgba(0,0,0,0.1)', p: 1, borderRadius: 4, }}>
                            <Grid container item xs={12} sx={{ display: 'flex', alignItems: 'center', mb: 1, }}>
                                <Grid item xs={10}>
                                    <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', color: '#b33d95', fontWeight: 'bold', opacity: '1', fontSize: '1rem' }}>
                                        Nouveau Abonne
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} sx={{ textAlign: 'right', }}>
                                    <Link to={"/admin/users"} className='Links'>
                                        <IconButton aria-label="Example">
                                            <ArrowRightAltIcon sx={{ color: '#b33d95' }} />
                                        </IconButton>
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ maxHeight: '60vh', overflowY: 'auto', mb: 0.5, borderBottom: '1px solid silver', transition: '.3s', alignItems: 'center', display: 'flex', p: 1 }}>
                                <Typography variant="body2" sx={{ flex: '1 0 30%', fontWeight: '500', opacity: '0.6', fontFamily: 'Bahnschrift SemiBold' }}>
                                    Email
                                </Typography>

                                <Typography variant="body2" sx={{ flex: '1 0 20%', fontWeight: '500', opacity: '0.6', fontFamily: 'Bahnschrift SemiBold' }}>
                                    Année
                                </Typography>
                                <Typography variant="body2" sx={{ flex: '1 0 25%', fontWeight: '500', opacity: '0.6', fontFamily: 'Bahnschrift SemiBold' }}>
                                    Date Debut
                                </Typography>
                                <Typography variant="body2" sx={{ flex: '1 0 5%', textAlign: 'center', fontWeight: '500', opacity: '0.6', fontFamily: 'Bahnschrift SemiBold' }}>
                                    Type
                                </Typography>

                            </Grid>



                            {
                                loadingAbbGeneral ? <><WatingAbn /></> :
                                    errorAbbGeneral ? <>{errorAbbGeneral}</> :
                                        Abbgeneral.filter(item => item.isAdmin === false && item.del !== 1).reverse().map(abb => {
                                            return (
                                                <Grid container item xs={12} sx={{ mb: 1, transition: '.3s', p: 1, alignItems: 'center', display: 'flex', '&:hover': { bgcolor: 'rgba(0,0,0,0.08)', borderRadius: 2 } }}>
                                                    <Typography variant="body2" sx={{ flex: '1 0 30%', fontWeight: 'bold', opacity: '1', fontFamily: 'Bahnschrift SemiBold' }}>
                                                        {abb.email}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ flex: '1 0 20%', fontWeight: 'bold', opacity: '1', fontFamily: 'Bahnschrift SemiBold' }}>
                                                        {abb.annee !== '' ? abb.annee : <>Toute Les Années</>}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ flex: '1 0 25%', fontWeight: 'bold', opacity: '1', fontFamily: 'Bahnschrift SemiBold' }}>
                                                        {abb.Debut[0]+''+abb.Debut[1]+''+abb.Debut[2]+''+abb.Debut[3]+'-'+abb.Debut[5]+''+abb.Debut[6]+'-'+abb.Debut[8]+''+abb.Debut[9]}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ flex: '1 0 5%', boxShadow: '3px 3px 6px rgba(0,0,0,0.1) ', textAlign: 'center', bgcolor: '#ff5757', color: 'white', paddingBlock: 0.2, paddingInline: 2, transition: '.3s', borderRadius: 4, fontFamily: 'Bahnschrift SemiBold' }}>
                                                        {abb.gold}
                                                    </Typography>
                                                </Grid>
                                            )
                                        })
                            }





                        </Grid>




                    </Grid>

                </Grid>
                {/* racourci & chart  */}
                <Grid container item xs={12} md={4} sx={{ p: 2 }}>
                    {/* racourci  */}
                    <Grid item xs={12} sm={6} md={12} sx={{ p: { sm: 1 }, }}>
                        <Typography variant="h5" sx={{ paddingInlineEnd: 1, mb: 2, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' }, fontFamily: 'Bahnschrift SemiBold' }}>
                            Raccourcis
                        </Typography>
                        <Grid container item xs={12} columnGap={1} >
                            {
                                loadingGeneral ? <><WatingRacourci /></> :
                                    errorGeneral ? <>{errorGeneral}</> :
                                        <>

                                            <Grid container item xs={5.8}
                                                sx={{
                                                    textAlign: 'left',
                                                    p: 1,
                                                    marginBlock: 1 / 2,

                                                    backgroundColor: 'white',
                                                    borderRadius: 2,

                                                    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                                    transition: '.3s',
                                                    '&:hover': {
                                                        bgcolor: '#ff5757',
                                                        color: 'white !important',
                                                        cursor: 'pointer',
                                                        '& .folderIcon': {
                                                            color: 'white',
                                                        }

                                                    }
                                                }}
                                            >

                                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Link to={"/admin/users"} >
                                                        <IconButton >
                                                            <FolderSharedIcon className='folderIcon' sx={{ transition: '.3s', color: '#ff5757' }} />
                                                        </IconButton>
                                                    </Link>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', opacity: '0.8', width: '80%', textAlign: 'right', paddingInline: 1, fontFamily: 'Bahnschrift SemiBold' }}>
                                                        {general.user}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{ pl: 1 }}>
                                                    <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold' }}>
                                                        utilisateures
                                                    </Typography>
                                                </Grid>

                                            </Grid>

                                            <Grid container item xs={5.8}
                                                sx={{
                                                    textAlign: 'left',
                                                    p: 1,
                                                    marginBlock: 1 / 2,

                                                    backgroundColor: 'white',
                                                    borderRadius: 2,

                                                    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                                    transition: '.3s',
                                                    '&:hover': {
                                                        bgcolor: '#ff5757',
                                                        color: 'white !important',
                                                        cursor: 'pointer',
                                                        '& .folderIcon': {
                                                            color: 'white',
                                                        }

                                                    }
                                                }}
                                            >
                                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Link to={"/admin/annees"} >
                                                        <IconButton >
                                                            <CreateNewFolderIcon className='folderIcon' sx={{ transition: '.3s', color: '#ff5757' }} />
                                                        </IconButton>
                                                    </Link>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', opacity: '0.8', width: '80%', textAlign: 'right', paddingInline: 1, fontFamily: 'Bahnschrift SemiBold' }}>
                                                        {general.annee}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{ pl: 1 }}>
                                                    <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold' }}>
                                                        Années
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs={5.8}
                                                sx={{
                                                    textAlign: 'left',
                                                    p: 1,
                                                    marginBlock: 1 / 2,

                                                    backgroundColor: 'white',
                                                    borderRadius: 2,

                                                    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                                    transition: '.3s',
                                                    '&:hover': {
                                                        bgcolor: '#ff5757',
                                                        color: 'white !important',
                                                        cursor: 'pointer',
                                                        '& .folderIcon': {
                                                            color: 'white',
                                                        }

                                                    }
                                                }}
                                            >
                                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Link to={"/admin/modules"} >
                                                        <IconButton >
                                                            <CreateNewFolderIcon className='folderIcon' sx={{ transition: '.3s', color: '#ff5757' }} />
                                                        </IconButton>
                                                    </Link>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', opacity: '0.8', width: '80%', textAlign: 'right', paddingInline: 1, fontFamily: 'Bahnschrift SemiBold' }}>
                                                        {general.module}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{ pl: 1 }}>
                                                    <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold' }}>
                                                        Modules
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs={5.8}
                                                sx={{
                                                    textAlign: 'left',
                                                    p: 1,
                                                    marginBlock: 1 / 2,

                                                    backgroundColor: 'white',
                                                    borderRadius: 2,

                                                    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                                    transition: '.3s',
                                                    '&:hover': {
                                                        bgcolor: '#ff5757',
                                                        color: 'white !important',
                                                        cursor: 'pointer',
                                                        '& .folderIcon': {
                                                            color: 'white',
                                                        }

                                                    }
                                                }}
                                            >
                                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Link to={"/admin/Quiz"} >
                                                        <IconButton >
                                                            <CreateNewFolderIcon className='folderIcon' sx={{ transition: '.3s', color: '#ff5757' }} />
                                                        </IconButton>
                                                    </Link>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', opacity: '0.8', width: '80%', textAlign: 'right', paddingInline: 1, fontFamily: 'Bahnschrift SemiBold' }}>
                                                        {general.quiz}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{ pl: 1 }}>
                                                    <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold' }}>
                                                        Sujet d'examen
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid container item xs={5.8}
                                                sx={{
                                                    textAlign: 'left',
                                                    p: 1,
                                                    marginBlock: 1 / 2,

                                                    backgroundColor: 'white',
                                                    borderRadius: 2,

                                                    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                                                    transition: '.3s',
                                                    '&:hover': {
                                                        bgcolor: '#ff5757',
                                                        color: 'white !important',
                                                        cursor: 'pointer',
                                                        '& .folderIcon': {
                                                            color: 'white',
                                                        }

                                                    }
                                                }}
                                            >
                                                <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Link to={"/admin/cours"} >
                                                        <IconButton >
                                                            <NoteAddIcon className='folderIcon' sx={{ transition: '.3s', color: '#ff5757' }} />
                                                        </IconButton>
                                                    </Link>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', opacity: '0.8', width: '80%', textAlign: 'right', paddingInline: 1, fontFamily: 'Bahnschrift SemiBold' }}>
                                                        {general.cour}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sx={{ pl: 1 }}>
                                                    <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold' }}>
                                                        Cours
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </>
                            }
                        </Grid>

                    </Grid>
                    {/* fin racourci */}
                    {/* chart  */}
                    <Grid item xs={12} sm={6} md={12} sx={{ p: { sm: 1 }, mt: { xs: 4, sm: 0, md: 4 } }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Bahnschrift SemiBold', mb: 2, paddingInlineEnd: 1, '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                            Statistique Trafic
                            <Link to={"/admin/statTrafic"} className='Links'>
                                <LinkS underline="none"
                                    sx={{
                                        float: 'right', fontSize: '16px', color: '#b33d95', marginTop: '7px', '&:hover': { color: 'black' }
                                    }}
                                >
                                    Voir plus
                                </LinkS>
                            </Link>
                        </Typography>
                        <Grid item xs={12}  >
                            {loadingtraficl ?
                                <><WatingChart /></>
                                : <Chart visite={trafic} />
                            }

                        </Grid>
                    </Grid>
                    {/* fin chart  */}
                </Grid>
                {/* fin racourci & chart  */}

            </Grid>


        </Box>

    );
}

export default CoreA;