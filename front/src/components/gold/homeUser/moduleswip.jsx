import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import { Skeleton, Typography } from '@mui/material';
import * as React from 'react';
import LestActive from './lestActive';
import Chart from './charts';
import LestWatchs from './lesWatchs';
import FolderIcon from '@mui/icons-material/Folder';
import IconButton from '@mui/material/IconButton';
import Person3Icon from '@mui/icons-material/Person3';
import { Link, useHistory } from "react-router-dom";
import { Link as LinkS } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import image from './image/videCour.png';
import welcom from './image/welcommm.png';
import imagewatch from './image/videWatch.png';
import imageactive from './image/videActive.png';
import CircularProgress from '@mui/material/CircularProgress';
import { API_BASE } from '../../../constants';


const CoreG = () => {
    const token = JSON.parse(localStorage.getItem('user'))
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useHistory()
    const userToken = JSON.parse(localStorage.getItem('user'))
    // console.log(userToken.token)

    // if (!userToken) {
    //     navigate.push('/')
    // }
    // if (userToken.gold !== 'gold') {
    //     navigate.push('/')
    // }
    // // Retrieve the start and end dates from local storage
    // const startString = token.start;
    // if (token.end != null) {
    //     const endString = token.end;

    //     // Convert the start and end dates into Date objects
    //     const startDatee = new Date(startString);
    //     const endDatee = new Date(endString);

    //     // Calculate the difference between the end date and the current date in milliseconds
    //     const diffTimee = endDatee.getTime() - new Date().getTime();

    //     // Check if the difference is negative (i.e., the subscription has expired)
    //     if (diffTimee < 0) {
    //         // Redirect the user to another page
    //         alert('end')
    //         navigate.push('/abb')
    //     }
    // }
    const checkUserAb = async () => {
        const config = {
            headers : {
                'authorization' : `Bearer ${userToken.token}`
            }
        }
        axios.get(`${API_BASE}/user/checkAnis`,config).then(res =>{
             if(res.data.abb !== "ok"){
                navigate.push('/expire/'+res.data.abb)
             }
        
        }).catch(error => {
            console.log(error.message)
        })
    }
    // // Get the start date of the subscription
    // const date = token.start
    // const dateComponents = date.split('/');
    // const year = dateComponents[0];
    // const month = dateComponents[1];
    // const day = dateComponents[2];
    // const startDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
    // // Calculate the end date of the subscription by adding 7 days to the start date
    // const endDate = new Date(startDate.getTime() + (7 * 24 * 60 * 60 * 1000));

    // // Calculate the difference between the end date and the current date in days
    // const diffTime = endDate.getTime() - new Date().getTime();
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Round up to the nearest day
    // alert(diffDays)
    // // Check if the subscription has expired
    // if (diffDays <= 7 && diffDays >= 0) {

    // }
    // if (diffDays < 0) {

    //     navigate.push('/abb')
    // }
    //==========================================================================================================
    const getHistory = async () => {
        await axios.get(`${API_BASE}/history`, { headers: { authorization: `Bearer ${userToken.token}` } }).then(res => { setHistory(res.data); setLoading(false); }).catch(error => console.log(error.message));
        console.log('history')
        console.log(history)
    };

    const [courdelete, setcourdelete] = useState(false)
    const [videodelete, setvideodelete] = useState(false)
    const deletcour = async (id) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        await axios.delete(`${API_BASE}/history/cour/` + id, config).then(res => {
            setcourdelete(true)
        }).catch(error => {
            console.log(error.message)
            setcourdelete(false)
        })
    }

    const deletvideo = async (id) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        await axios.delete(`${API_BASE}/history/video/` + id, config).then(res => {
            setvideodelete(true)
        }).catch(error => {
            console.log(error.message)
            setvideodelete(false)
        })
    }

    const [loadingModule, setLoadingModule] = React.useState(true)
    const [ErrorModule, setErrorModule] = React.useState('')
    const [successModule, setSuccessModule] = React.useState(null)
    const [Module, setModule] = React.useState(null)

    const GetModuleStatBytime = () => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/stat/quiz/home`, config).then(res => {
            setModule(res.data)
            setLoadingModule(false)
            setErrorModule(false)
            setSuccessModule(true)
        }).catch(error => {
            console.log(error.message)
            setErrorModule(error.response.data)
            setLoadingModule(false)
            setSuccessModule(false)
        })
    }

    const [anneeData, setanneeData] = React.useState(null)
    const [loadinganneeData, setLoadinganneeData] = React.useState(true)
    const [successanneeData, setSuccessanneeData] = React.useState(null)
    const [erroranneeData, setErroranneeData] = React.useState(null)

    const ApiCall = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
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

    useEffect(() => {
        ApiCall();
        GetModuleStatBytime();
        getHistory();
        setcourdelete(false)
        setvideodelete(false)
        checkUserAb()
    }, [courdelete, videodelete]);


    const Vide = () => {
        return (
            <Grid container item xs={12}
                sx={{
                    maxHeight: '36vh',
                    minHeight: '36vh',
                    p: 2,
                    display: 'block',
                    backgroundColor: 'white',
                    borderRadius: 3,
                    alignItems: 'center',
                    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
                    transition: '.3s',
                    '&:hover': {
                        p: 1,

                        color: '#ff5757 !important',
                        cursor: 'pointer',
                        '& .Desc': {
                            color: 'rgba(0, 0, 0, 0.9)',
                        }
                    }
                }}
            >
                <img src={image} style={{ width: '50%', marginInline: '25%' }} />
                <Typography variant="h6" sx={{ ml: 1, fontFamily: 'Bahnschrift SemiBold' }}>
                    Année
                </Typography>
                <Typography className='Desc' variant="body1" sx={{ ml: 1, fontFamily: 'Bahnschrift SemiBold' }}>
                    Année
                </Typography>
            </Grid>
        );
    }
    const VideWatch = () => {
        return (
            <>
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingInlineEnd: 5, mt: 4, '&::first-letter': { color: '#ff9a57', fontWeight: 'bold' } }}>
                        Dernier Activité
                    </Typography>
                </Grid>
                <Grid container item xs={12} columnGap={3} rowGap={1} sx={{
                    pt: 2,
                }}>
                    <Grid container item xs={12} sm={12} md={12}
                        sx={{
                            overflow: 'hidden',
                            paddingBlock: 0,
                            backgroundColor: 'rgb(255, 204, 170,0.8)',
                            border: '2px solid rgba(245, 245, 245,1)',
                            borderRadius: 5,
                            transition: '.3s',
                            '&:hover': {
                                backgroundColor: 'rgb(255, 204, 170)',
                                boxShadow: 'rgba(0, 0, 0, 0.05) 3px 3px 6px ',
                            }
                        }}>
                        <Grid container item xs={3} sx={{ display: { md: 'flex', xs: 'none', sm: 'flex' }, justifyContent: 'left', }}>
                            <img src={imagewatch} style={{ width: '95%' }} />
                        </Grid>
                        <Grid container item xs={12} sm={9} md={9} sx={{ display: 'block', p: { md: 5, xs: 3, sm: 5 }, transition: '.3s' }}>
                            <Typography variant="h5" sx={{ color: 'black', fontWeight: '600', mb: 1, fontFamily: 'Bahnschrift SemiBold' }} >
                                Regarder Des Védio
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'black', opacity: '0.8', fontFamily: 'Bahnschrift SemiBold', maxWidth: '90%' }} >
                                Regarder Des Védio  Regarder Des Védio Regarder Des Védio Regarder Des Védio Regarder Des Védio
                            </Typography>
                        </Grid>
                    </Grid >
                </Grid>
            </>
        )
    }
    const VideActive = () => {
        return (
            <>
                <Grid item xs={12}>
                    <Typography variant="h5" sx={{ fontFamily: 'Bahnschrift SemiBold', mb: 0, paddingInlineEnd: 5, '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                        Activité
                    </Typography>
                </Grid>
                <Grid container item xs={12} columnGap={3} rowGap={1} sx={{
                    pt: 2,
                }}>
                    <Grid container item xs={12} sm={12} md={12}
                        sx={{
                            overflow: 'hidden',
                            paddingBlock: 0,
                            backgroundColor: 'rgb(253, 201, 237,0.8)',
                            border: '2px solid rgba(245, 245, 245,1)',
                            borderRadius: 5,
                            transition: '.3s',

                            '&:hover': {
                                backgroundColor: 'rgb(253, 201, 237)',
                                boxShadow: 'rgba(0, 0, 0, 0.05) 3px 3px 6px ',

                            }
                        }}>
                        <Grid container item xs={3} sx={{ display: { md: 'flex', xs: 'none', sm: 'flex' }, justifyContent: 'left', }}>
                            <img src={imageactive} style={{ width: '95%' }} />
                        </Grid>
                        <Grid container item xs={12} sm={9} md={9} sx={{ display: 'block', p: { md: 5, xs: 3, sm: 5 }, transition: '.3s' }}>
                            <Typography variant="h5" sx={{ color: 'black', fontWeight: '600', mb: 1, fontFamily: 'Bahnschrift SemiBold' }} >
                                Regarder Des Védio
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'black', opacity: '0.8', fontFamily: 'Bahnschrift SemiBold', maxWidth: '90%' }} >
                                Regarder Des Védio  Regarder Des Védio Regarder Des Védio Regarder Des Védio Regarder Des Védio
                            </Typography>
                        </Grid>
                    </Grid >
                </Grid>
            </>
        )
    }
    const WatingAnne = () => {
        return (
            <>
                <Grid xs={12} >
                    <Skeleton variant="rectangular" sx={{ width: '100%', mt: 1, height: 50, borderRadius: 1 }} />
                </Grid>
                <Grid xs={12} >
                    <Skeleton variant="rectangular" sx={{ width: '100%', mt: 1, height: 50, borderRadius: 1 }} />
                </Grid>
                <Grid xs={12} >
                    <Skeleton variant="rectangular" sx={{ width: '100%', mt: 1, height: 50, borderRadius: 1 }} />
                </Grid>
                <Grid xs={12} >
                    <Skeleton variant="rectangular" sx={{ width: '100%', mt: 1, height: 50, borderRadius: 1 }} />
                </Grid>
                
            </>
        )
    }
    const WatingHis = () => {
        return (
            <>
                <Grid xs={12} >
                <Skeleton variant="rectangular" sx={{ width: '30%', mb: 2, height: 20, borderRadius: 1 }} />
                    <Skeleton variant="rectangular" sx={{ width: '100%', mt: 0, height: 200, borderRadius: 1 }} />
                </Grid>
                <Grid xs={12} >
                <Skeleton variant="rectangular" sx={{ width: '30%',mt: 5, mb: 2, height: 20, borderRadius: 1 }} />
                    <Skeleton variant="rectangular" sx={{ width: '100%',  height: 200, borderRadius: 1 }} />
                </Grid>
            </>
        )
    }
    const WatingChart = () => {
        return (
            <Grid item container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200 }} xs={12}>
                <CircularProgress color="secondary" sx={{ width: 200, height: 200, bgcolor: 'rgba(0,0,0,0.1)', borderRadius: '50%' }} />
            </Grid>
        );
    }

    return (

        <Box sx={{ flexGrow: 1 }}>
            <Toolbar />

            <Grid container spacing={0}  >

                <Grid container item xs={12} md={8} sx={{ p: 2 }} >
                    <Grid item xs={12} md={12}
                        sx={{
                            mt: 2,
                            padding: '0.5rem 1rem ',
                            height: 120,
                            maxHeight: 120,
                            bgcolor: 'white',
                            borderRadius: 4,
                            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                            alignItems: 'left',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            position: 'relative'


                        }}>

                        <Typography variant="h5" sx={{ fontFamily: 'Bahnschrift SemiBold', mb: 1, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Welcom To Your Profil
                        </Typography>
                        <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold', }} >
                            Welcom To Your Profil
                        </Typography>
                        <img src={welcom} style={{ position: 'absolute', right: '-1rem', bottom: '-1rem', width: '8.5rem', }} />



                    </Grid>
                    <Grid container item xs={12} md={12}
                        sx={{
                            mt: 2,
                            padding: '0.5rem 1rem ',

                        }}>
                        {loading ?
                            <><WatingHis /></>
                            :
                            <>
                                {history[0] != null ? <LestActive Delete={deletcour} data={history[0].cours} /> : <VideActive />}
                                {history[0] != null ? <LestWatchs Delete={deletvideo} data={history[0].video} /> : <VideWatch />}
                            </>}


                    </Grid>

                </Grid>
                <Grid container item xs={12} md={4} sx={{ p: 2 }}>
                    {/* module */}
                    <Grid item xs={12} sm={6} md={12} sx={{ p: { sm: 1 },minHeight:{md:300,sm:'auto',xs:'auto'}, }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingInlineEnd: 1, mb: 2, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Année
                            <Link to={"/gold/mesModules"} className='Links'>
                                <LinkS underline="none"
                                    sx={{
                                        float: 'right', fontSize: '16px', color: '#ff5757', marginTop: '7px', '&:hover': { color: 'black' }
                                    }}
                                >
                                    Voir Plus

                                </LinkS>
                            </Link>

                        </Typography>
                        {/* module */}

                        {
                            loadinganneeData ? <WatingAnne /> : erroranneeData ?
                                <>
                                    <Vide />
                                </>
                                :
                                <>

                                    {anneeData.filter(item => item.del !== 1).slice(-4).map(annee => {
                                        return (
                                            <Grid container item xs={12}
                                                sx={{
                                                    p: 1,
                                                    marginBlock: 1 / 2,
                                                    display: 'flex',
                                                    backgroundColor: 'white',
                                                    borderRadius: 1,
                                                    alignItems: 'center',
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
                                                <Link to={"/gold/mesModule/" + annee.annee} >
                                                    <IconButton>
                                                        <FolderIcon className='folderIcon' sx={{ transition: '.3s', color: '#ff5757' }} />
                                                    </IconButton>
                                                </Link>
                                                <Typography variant="h6" sx={{ ml: 2, }}>
                                                    {annee.annee}
                                                </Typography>

                                            </Grid>
                                        );

                                    })}

                                </>


                        }


                    </Grid>
                    {/* fin module */}
                    {/* qcm stat */}
                    <Grid item xs={12} sm={6} md={12} sx={{ p: { sm: 1 }, mt: { xs: 4, sm: 0, md: 4 } }}>
                        <Typography variant="h5" sx={{ fontFamily: 'Bahnschrift SemiBold', mb: 2, paddingInlineEnd: 1, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                            Statistique Qcm
                            <Link to={"/gold/statQuiz"} className='Links'>
                                <LinkS underline="none"
                                    sx={{
                                        float: 'right', fontSize: '16px', color: '#ff5757', marginTop: '7px', '&:hover': { color: 'black' }
                                    }}
                                >
                                    Voir plus
                                </LinkS>
                            </Link>
                        </Typography>
                        <Grid item xs={12}>
                            {loadingModule ? <><WatingChart /></> : <Chart stat={Module} />}
                        </Grid>
                    </Grid>
                    {/* fin qcm stat */}

                </Grid>
            </Grid>


        </Box>

    );
}

export default CoreG;