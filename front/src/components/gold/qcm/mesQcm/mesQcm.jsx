import { CircularProgress, FormControl, InputLabel, MenuItem, Select, Skeleton, Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as React from 'react';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import LoginIcon from '@mui/icons-material/Login';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';

import Zoom from '@mui/material/Zoom';
import RuleIcon from '@mui/icons-material/Rule';
import Tooltip from '@mui/material/Tooltip';

import { Link, useHistory } from "react-router-dom";


import { Link as LinkS } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import axios from "axios";
import Alert from '@mui/material/Alert';
import image from '../image/videModules.png';
import { API_BASE } from "../../../../constants";
const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        color: 'rgba(255, 255, 255, 1)',
        boxShadow: theme.shadows[1],
        fontSize: 14,
    },
}));

const MesQcmG = () => {
    const token = JSON.parse(localStorage.getItem('user'))
    const [quiz, setQuiz] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [error, setError] = React.useState(null)
    const location = useHistory()
    const ApiCall = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        await axios.get(`${API_BASE}/quiz/userquiz`, config).then(res => {
            setQuiz(res.data)
            setLoading(false)
            setError(false)
        }).catch(error => {
            setError(error.response.data)
            setLoading(false)
        })
    }

    const [delted, setDeleted] = React.useState(false)

    const deletequiz = async (id) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        await axios.delete(`${API_BASE}/quiz/` + id, config).then(res => {
            alert('the quiz is deleted')
            setDeleted(true)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setDeleted(false)
        })
    }

    const NullModules = () => {
        return (
            <>

                <Grid item xs={12}>
                    <img src={image} style={{ width: '40%', marginInline: '30%', marginBlock: '0.5rem' }} />
                    <Alert severity="error">Désolé   -   Aucun Quiz trouvé !</Alert>
                </Grid>
            </>
        )
    }


    const userToken = JSON.parse(localStorage.getItem('user'))

    const [annee, setAnnee] = React.useState([])
    const [loainganneedata, setLoadinganneeData] = React.useState(true)
    const [erroranneedata, setErroranneeData] = React.useState(null)
    const [year, setYear] = React.useState('')

    const AnneCall = async () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${userToken.token}`
            }
        }
        await axios.get(`${API_BASE}/annee`, config).then(res => { setAnnee(res.data); setLoadinganneeData(false) }).catch(error => { console.log(error.response.data); setErroranneeData(error.response.data); setLoadinganneeData(false) })
    }

    const handleChange = (e) => {
        setYear(e.target.value)
    }

    // module  
    const [loadingmodule, setLoadingmodule] = React.useState(true)
    const [Errormodule, setErrormodule] = React.useState('')
    const [modules, setModules] = React.useState(null)
    const [moduleFilter, setmoduleFilter] = React.useState('')
    const handleChangeModuleFilter = (e) => {
        setmoduleFilter(e.target.value)
    }
    const getModules = () => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/module`, config).then(res => {
            setModules(res.data)
            setLoadingmodule(false)
            setErrormodule(false)
        }).catch(error => {
            console.log(error.message)
            setErrormodule(error.response.data)
            setLoadingmodule(false)
        })
    }
    const Loading = () => {
        return (
            <Grid item xs={12}>
                <CircularProgress color="secondary" />
            </Grid>

        );
    }
    const WatingQcm = () => {
        return (
            <>
                <Grid item xs={12} md={4} sm={6} >
                    <Skeleton variant="rectangular" sx={{ width: '100%', mt: 1, height: 180, borderRadius: 4 }} />
                </Grid>
                <Grid item xs={12} md={4} sm={6} >
                    <Skeleton variant="rectangular" sx={{ width: '100%', mt: 1, height: 180, borderRadius: 4 }} />
                </Grid>
                <Grid item xs={12} md={4} sm={6} >
                    <Skeleton variant="rectangular" sx={{ width: '100%', mt: 1, height: 180, borderRadius: 4 }} />
                </Grid>
                <Grid item xs={12} md={4} sm={6} >
                    <Skeleton variant="rectangular" sx={{ width: '100%', mt: 1, height: 180, borderRadius: 4 }} />
                </Grid>
                <Grid item xs={12} md={4} sm={6} >
                    <Skeleton variant="rectangular" sx={{ width: '100%', mt: 1, height: 180, borderRadius: 4 }} />
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
            </>
        )
    }
    //fin module
    React.useEffect(() => {
        AnneCall()
        getModules()
    }, []);




    React.useEffect(() => {
        if (error) {
            console.log(error)
        }
        ApiCall()
        setDeleted(false)
        console.log(quiz)
    }, [error, delted])

    let correct = 0
    let fals = 0
    let notrep = 0
    if (!loading) {
        correct = quiz.length > 0 ? quiz.map(quiz => quiz.questions.filter(item => item.qs.corection === "true"))[0].length : 0
        fals = quiz.length > 0 ? quiz.map(quiz => quiz.questions.filter(item => item.qs.corection === "False"))[0].length : 0
        notrep = quiz.length > 0 ? quiz.map(quiz => quiz.questions.filter(item => item.qs.corection === "null"))[0].length : 0
        console.log(correct, fals, notrep)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar />
            <Grid container spacing={4} sx={{ display: 'flex', p: 2, paddingBlock: 4, }}>
                <Grid item xs={12} sm={7} md={4}>
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
                                fontFamily: 'Bahnschrift SemiBold',
                                // border: '1px solid rgb(252, 252, 252,1)',
                                // boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 6px  inset,rgba(0, 0, 0, 0.2) 3px 3px 6px ',
                                '&:hover': {
                                    color: '#443C68',
                                }

                            }}
                        >
                            Mes Quiz
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
                <Grid item xs={12} sm={5} md={4} sx={{ p: 0 }}>
                    {
                        loadingmodule ? <><WatingAnne /></> : Errormodule ?
                            <>
                                {Errormodule}
                            </>
                            :
                            <>
                                <Grid xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Module</InputLabel>
                                        <Select
                                            sx={{ bgcolor: 'white' }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={moduleFilter}
                                            label="Module"
                                            onChange={handleChangeModuleFilter}
                                        >
                                            <MenuItem value={''}>All</MenuItem>
                                            {/* filter((item, index) => index === Modulesdata.findIndex(obj => obj.name === item.name)) */}
                                            {modules && year !== '' ? modules.filter(item => item.del !== 1 && item.annee == year).map(module => { return <MenuItem key={module._id} value={module.name}>{module.name}</MenuItem> }) : modules.filter(item => item.del !== 1).map(module => { return <MenuItem key={module._id} value={module.name}>{module.name}</MenuItem> })}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </>
                    }
                </Grid>
                {
                    loading ? <><WatingQcm /></> :
                        quiz.length > 0 ?
                            quiz.filter(item => moduleFilter ? item.module === moduleFilter : item.module).reverse().map(quiz => {
                                return (
                                    <Grid key={quiz._id} item xs={12} md={4} sm={6} >
                                        <Card variant="" sx={{ borderRadius: 4, transition: '.3s', border: '1px solid rgba(0,0,0,0)', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', '&:hover': { boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', border: '1px solid silver' } }}>
                                            <CardContent>
                                                <Typography variant="h5" component="div" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>
                                                    {quiz.titre}
                                                </Typography>
                                                <Typography sx={{ mb: 1, fontSize: 16, fontFamily: 'Bahnschrift SemiBold', }} color="text.secondary">
                                                    {quiz.module} - {quiz.date}
                                                </Typography>
                                                <Typography variant="body2" sx={{ opacity: '0.8', mb: 4, fontFamily: 'Bahnschrift SemiBold', }} color="text.secondary">
                                                    Question : {quiz.annee[0]} {quiz.annee[1]}
                                                </Typography>
                                                <Typography sx={{ display: 'flex' }}>
                                                    <LightTooltip title="Réponse juste" placement="top"
                                                        TransitionComponent={Zoom}
                                                        TransitionProps={{ timeout: 300 }}
                                                    >
                                                        <Avatar sx={{ fontFamily: 'Bahnschrift SemiBold', mr: 2, bgcolor: '#68B984', boxShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>{quiz.questions.filter(item => item.qs.corection === "true").length}</Avatar>
                                                    </LightTooltip>
                                                    <LightTooltip title="Réponse fau" placement="top"
                                                        TransitionComponent={Zoom}
                                                        TransitionProps={{ timeout: 300 }}
                                                    >
                                                        <Avatar sx={{ fontFamily: 'Bahnschrift SemiBold', mr: 2, bgcolor: '#F55050', boxShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>{quiz.questions.filter(item => item.qs.corection === "false").length}</Avatar>
                                                    </LightTooltip>
                                                    <LightTooltip title="Réponse zapé" placement="top"
                                                        TransitionComponent={Zoom}
                                                        TransitionProps={{ timeout: 300 }}
                                                    >
                                                        <Avatar sx={{ fontFamily: 'Bahnschrift SemiBold', mr: 2, boxShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>{quiz.questions.filter(item => item.qs.corection === "null").length}</Avatar>
                                                    </LightTooltip>
                                                </Typography>
                                                <Typography sx={{ display: 'flex', alignItems: 'center', mt: 4, bgcolor: '#EEEEEE', p: 1, borderRadius: 2, boxShadow: '1px 1px 3px rgba(0,0,0,0.3)' }}>
                                                    <Grid item xs={8} sm={9} >
                                                        <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', }} >
                                                            Option
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={2} sm={3}>
                                                        <Avatar sx={{ mr: 2 }}>
                                                            <LightTooltip
                                                                onClick={() => { location.push('/gold/consulteQuize/' + quiz._id) }}
                                                                title="retour" placement="top"
                                                                TransitionComponent={Zoom}
                                                                TransitionProps={{ timeout: 300 }}
                                                            >
                                                                <IconButton sx={{ bgcolor: 'white', color: '#68B984', transition: '.3s', boxShadow: '3px 3px 6px rgba(0,0,0,0.1) inset,1px 1px 3px rgba(0,0,0,0.3)', '&:hover': { bgcolor: '#68B984', color: 'white' } }}>
                                                                    <LoginIcon />
                                                                </IconButton>
                                                            </LightTooltip>
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Avatar sx={{ mr: 2 }}>
                                                            <LightTooltip title="supprimer" placement="top"
                                                                TransitionComponent={Zoom}
                                                                TransitionProps={{ timeout: 300 }}
                                                            >
                                                                <IconButton onClick={() => { deletequiz(quiz._id) }} sx={{ bgcolor: 'white', color: '#F55050', transition: '.3s', boxShadow: '3px 3px 6px rgba(0,0,0,0.1) inset,1px 1px 3px rgba(0,0,0,0.3)', '&:hover': { bgcolor: '#F55050', color: 'white' } }}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </LightTooltip>
                                                        </Avatar>
                                                    </Grid>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                )
                            })
                            : <NullModules />
                }
            </Grid >
        </Box >
    );
}

export default MesQcmG;

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
];