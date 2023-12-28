import { CircularProgress, InputLabel, MenuItem, Select, Skeleton, Toolbar } from "@mui/material";
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

import { Link as LinkS } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from "react-router-dom";

import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Chart from "./charts";
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TaskIcon from '@mui/icons-material/Task';
import axios from "axios";
import { ArrowRight } from "@mui/icons-material";
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

const StatModulesG = () => {
    const token = JSON.parse(localStorage.getItem('user'))
    //-------------------------------------------------
    const [anneeData, setanneeData] = React.useState(null)
    const [loadinganneeData, setLoadinganneeData] = React.useState(true)
    const [successanneeData, setSuccessanneeData] = React.useState(null)
    const [erroranneeData, setErroranneeData] = React.useState(null)
    const [year, setYear] = React.useState('')
    const handleChangeYear = (e) => {
        setYear(e.target.value)
    }
    //------------------
    const [Users, setUsers] = React.useState(null)
    const [loadingUsers, setLoadingUsers] = React.useState(true)
    const [ErrorUsers, setErrorUsers] = React.useState('')
    const [successUsers, setSuccessUsers] = React.useState(null)
    //-----------------------------------------------
    const [checked, setChecked] = React.useState('jour');

    const handleChange = (event) => {
        setChecked(event.target.value);
    };
    console.log(checked)
    //--------------------------------------
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
    //fetch data
    const GetUserStatBytime = (time) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/stat/admin/users/` + time, config).then(res => {
            setUsers(res.data)
            setLoadingUsers(false)
            setErrorUsers(false)
            setSuccessUsers(true)
        }).catch(error => {
            console.log(error.message)
            setErrorUsers(error.response.data)
            setLoadingUsers(false)
            setSuccessUsers(false)
        })
    }
    const GetUserStatByTimeAndAnnee = (time, year) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/stat/admin/users/annee/` + time + "/" + year, config).then(res => {
            setUsers(res.data)
            setLoadingUsers(false)
            setErrorUsers(false)
            setSuccessUsers(true)
        }).catch(error => {
            console.log(error.message)
            setErrorUsers(error.response.data)
            setLoadingUsers(false)
            setSuccessUsers(false)
        })
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
                <Grid xs={5.8} >
                    <Skeleton variant="rectangular" sx={{ mb:1,width: '100%', mt: 0, height: 120, borderRadius: 4}} />
                </Grid>
                <Grid xs={5.8} >
                    <Skeleton variant="rectangular" sx={{ mb:1,width: '100%', mt: 0, height: 120, borderRadius: 4}} />
                </Grid>
                <Grid xs={5.8} >
                    <Skeleton variant="rectangular" sx={{ mb:1,width: '100%', mt: 0, height: 120, borderRadius: 4}} />
                </Grid>
            </>
        )
    }
    const WatingChart=()=>{
        return(
            <Grid item container sx={{display:'flex',alignItems:'center',justifyContent:'center'}} xs={12}>
            <CircularProgress color="secondary" sx={{width:200,height:200,bgcolor:'rgba(0,0,0,0.1)',borderRadius:'50%'}} />
            </Grid>
        );
    }

    React.useEffect(() => {
        ApiCall()
    }, [])
    React.useEffect(() => {
        if (year === '') {
            GetUserStatBytime(checked)
        } else if (year !== '') {
            GetUserStatByTimeAndAnnee(checked, year)
        }
    }, [checked, year])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Toolbar />
            <Grid container spacing={4} sx={{ display: 'flex', p: 2, paddingBlock: 4, }}>
                {/* link */}
                <Grid item xs={12}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link to={"/gold"} className='Links'>
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
                                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 0, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&:hover': { color: '#635985', bgcolor: 'white', boxShadow: '1px 1px 4px rgba(0,0,0,0.15)' }, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                    Home
                                </Typography>
                            </LinkS>
                        </Link>
                        <LinkS
                            underline="none"

                            sx={{
                                fontFamily: 'Bahnschrift SemiBold',
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
                            Statistique Modules

                        </LinkS>

                    </Breadcrumbs>
                </Grid>
                {/* link */}
                {/* chart & card */}
                <Grid container item xs={12} md={12} sm={12} columnGap={2} rowGap={2} >
                    {/* chart */}
                    <Grid container item xs={12} md={8.7} sx={{ bgcolor: 'white', borderRadius: 6, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
                        {loadingUsers ? <><WatingChart /></> : <Chart users={Users} />}
                    </Grid>
                    {/* chart */}
                    {/* card */}
                    <Grid container xs={12} md={3} sx={{ display: 'block' }}>
                        {/* option */}
                        <Grid container item xs={12} md={12} sx={{ mb: 2, paddingBlock: 1 / 2, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#9c27b0', fontWeight: 'bold' } }}>
                                    Option
                                </Typography>
                            </Grid>
                            <Grid xs={8} sx={{ display: 'flex', alignItems: 'center' }}>
                                <FormControl>
                                    <RadioGroup
                                        defaultValue="jour"
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                    >

                                        <FormControlLabel
                                            value="jour"
                                            onClick={handleChange}
                                            control={<Radio color="secondary" />}
                                            label={
                                                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#9c27b0', fontWeight: 'bold' } }}>
                                                    Par Jour
                                                </Typography>
                                            }
                                        />
                                        <FormControlLabel
                                            value="semaine"
                                            onClick={handleChange}
                                            control={<Radio color="secondary" />}
                                            label={
                                                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#9c27b0', fontWeight: 'bold' } }}>
                                                    Par Semaine
                                                </Typography>
                                            }
                                        />
                                        <FormControlLabel
                                            value="mois"
                                            onClick={handleChange}
                                            control={<Radio color="secondary" />}
                                            label={
                                                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#9c27b0', fontWeight: 'bold' } }}>
                                                    Par Mois
                                                </Typography>
                                            }
                                        />

                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {/* option */}
                        {/* befor option */}
                        <Grid container item xs={12} md={12} columnGap={3} rowGap={2}>
                            {/* type */}
                            <Grid container item xs={12} sm={12} sx={{ paddingBlock: 1 / 2, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
                                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                        Annee
                                    </Typography>
                                </Grid>
                                <Grid xs={8} sx={{ display: 'flex', pr: 2, }}>
                                    {
                                        loadinganneeData ? <><WatingAnne /></> : erroranneeData ?
                                            <>
                                                {erroranneeData}
                                            </>
                                            :
                                            <>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">annee scolaire</InputLabel>
                                                    <Select
                                                        sx={{ bgcolor: 'white' }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={year}
                                                        label="annee scolaire"
                                                        onChange={handleChangeYear}
                                                    >
                                                        <MenuItem value={''}>All</MenuItem>
                                                        {anneeData.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> })}
                                                    </Select>
                                                </FormControl>
                                            </>
                                    }
                                </Grid>

                            </Grid>
                            {/* type */}

                        </Grid>
                        {/* befor option */}
                        <Grid container xs={12} md={12} columnGap={1} sx={{ mt: 2 }}>
                            {
                                loadingUsers ? <><WatingCard /></> : ErrorUsers ?
                                    <>
                                        {ErrorUsers}
                                    </>
                                    :
                                    <>
                                        <Grid item xs={5.8} sx={{ mb: 1, paddingBlock: 1, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }} >
                                            <Typography variant="h2" sx={{ color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                {successUsers ? Users.reduce((acc, user) => acc + user.goldUser, 0) : 0}
                                                <TrendingUpIcon sx={{ position: 'relative', mt: -5, ml: 2, color: '#379237' }} />
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold', color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                Gold User
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={5.8} sx={{ mb: 1, paddingBlock: 1, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }} >
                                            <Typography variant="h2" sx={{ color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                {successUsers ? Users.reduce((acc, user) => acc + user.normalUser, 0) : 0}
                                                <TrendingUpIcon sx={{ position: 'relative', mt: -5, ml: 2, color: '#379237' }} />
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold', color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                Normal User
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={5.8} sx={{ mb: 1, paddingBlock: 1, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }} >
                                            <Typography variant="h2" sx={{ color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                {successUsers ? Users.reduce((acc, user) => acc + user.testUser, 0) : 0}
                                                <TrendingDownIcon sx={{ position: 'relative', mt: -5, ml: 2, color: 'red' }} />
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold', color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                Test User
                                            </Typography>

                                        </Grid>

                                    </>
                            }
                        </Grid>
                    </Grid>
                    {/* card */}
                </Grid>
                {/* chart & card */}
            </Grid >
        </Box >
    );
}

export default StatModulesG;