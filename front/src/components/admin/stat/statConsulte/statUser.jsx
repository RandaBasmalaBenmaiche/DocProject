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

const StatConsulte = () => {
    const token = JSON.parse(localStorage.getItem('user'))
    const [loadingmodule, setLoadingmodule] = React.useState(true)
    const [Errormodule, setErrormodule] = React.useState('')
    const [modules, setModules] = React.useState(null)
    const [moduleFilter, setmoduleFilter] = React.useState('')
    const handleChangeModuleFilter = (e) => {
        setmoduleFilter(e.target.value)
    }
    //-------------------------------------------------
    const [anneeData, setanneeData] = React.useState(null)
    const [loadinganneeData, setLoadinganneeData] = React.useState(true)
    const [successanneeData, setSuccessanneeData] = React.useState(null)
    const [erroranneeData, setErroranneeData] = React.useState(null)
    const [year, setYear] = React.useState('')
    //-------------------------------------------------
    const [userData, setUserData] = React.useState(null)
    const [loadingUserData, setLoadingUserData] = React.useState(true)
    const [successUserData, setSuccessUserData] = React.useState(null)
    const [errorUserData, setErrorUserData] = React.useState(null)
    const [user, setUser] = React.useState('')
    //------------------
    const [loadingModule, setLoadingModule] = React.useState(true)
    const [ErrorModule, setErrorModule] = React.useState('')
    const [successModule, setSuccessModule] = React.useState(null)
    const [Module, setModule] = React.useState(null)
    const handleChangeYear = (e) => {
        setYear(e.target.value)
    }
    const handleChangeUser = (e) => {
        setUser(e.target.value)
    }
    //-----------------------------------------------
    const [checked, setChecked] = React.useState('jour');

    const handleChange = (event) => {
        setChecked(event.target.value);
    };
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
    const abbCall = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        };
        await axios.get(`${API_BASE}/abonnement`, config).then(res => {
            setUserData(res.data)
            setLoadingUserData(false)
            setSuccessUserData(true)
            setErrorUserData(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setErrorUserData(error.response.data)
            setSuccessUserData(false)
            setLoadingUserData(false)
        })
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
    //fetch data
    const adminConsultStatByTime = (time) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/stat/admin/consult/` + time, config).then(res => {
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
    const adminConsultStatByTimeAndAnnee = (time, year) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/stat/admin/consult/annee/` + time + "/" + year, config).then(res => {
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
    const adminConsultStatByTimeAndModule = (moduleFilter, time) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/stat/admin/consult/module/` + time + "/" + moduleFilter, config).then(res => {
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
    const adminConsultStatByTimeAndType = (time, user) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/stat/admin/consult/user/type/` + time + "/" + user, config).then(res => {
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
    const adminConsultStatByTimeAndModuleAndAnnee = (moduleFilter, time, year) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/stat/admin/consult/module/annee/` + time + "/" + moduleFilter + "/" + year, config).then(res => {
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
    const adminConsultStatByTimeAndModuleAndType = (time, moduleFilter, user) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/stat/admin/consult/module/user/` + time + "/" + moduleFilter + "/" + user, config).then(res => {
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
    const adminConsultStatByTimeAndAnneeAndType = (time, year, user) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/stat/admin/consult/user/annee/` + time + "/" + year + "/" + user, config).then(res => {
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
    const adminConsultStatByTimeAndModuleAndAnneeAndType = (time, moduleFilter, user, year) => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/stat/admin/consult/module/annee/user/` + time + "/" + moduleFilter + "/" + year + "/" + user, config).then(res => {
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
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height: 120, borderRadius: 4 }} />
                </Grid>
                <Grid xs={5.8} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height: 120, borderRadius: 4 }} />
                </Grid>
                
            </>
        )
    }
    const WatingChart = () => {
        return (
            <Grid item container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} xs={12}>
                <CircularProgress color="secondary" sx={{ width: 200, height: 200, bgcolor: 'rgba(0,0,0,0.1)', borderRadius: '50%' }} />
            </Grid>
        );
    }

    React.useEffect(() => {
        getModules()
        ApiCall()
        abbCall()
    }, [])
    React.useEffect(() => {
        if (moduleFilter === '' && year === '' && user === '') {
            adminConsultStatByTime(checked)
        } else if (moduleFilter !== '' && year === '' && user === '') {
            adminConsultStatByTimeAndModule(moduleFilter, checked)
        } else if (moduleFilter === '' && year !== '' && user === '') {
            adminConsultStatByTimeAndAnnee(checked, year)
        } else if (moduleFilter !== '' && year !== '' && user === '') {
            adminConsultStatByTimeAndModuleAndAnnee(moduleFilter, checked, year)
        } else if (moduleFilter === '' && user !== '' && year !== '') {
            adminConsultStatByTimeAndAnneeAndType(checked, year, user)
        } else if (moduleFilter === '' && year === '' && user !== '') {
            adminConsultStatByTimeAndType(checked, user)
        } else if (moduleFilter !== '' && year === '' && user !== '') {
            adminConsultStatByTimeAndModuleAndType(checked, moduleFilter, user)
        } else if (moduleFilter !== '' && year !== '' && user !== '') {
            adminConsultStatByTimeAndModuleAndAnneeAndType(checked, moduleFilter, user, year)
        }
    }, [checked, moduleFilter, year, user])
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
                            Statistique Modules

                        </LinkS>

                    </Breadcrumbs>
                </Grid>
                {/* link */}
                {/* chart & card */}
                <Grid container item xs={12} md={12} sm={12} columnGap={2} rowGap={2} >
                    {/* chart */}
                    <Grid container item xs={12} md={8.7} sx={{ bgcolor: 'white', borderRadius: 6, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
                        {loadingModule ? <><WatingChart /></> : <Chart stat={Module} />}
                    </Grid>
                    {/* chart */}
                    {/* card */}
                    <Grid container xs={12} md={3} sx={{ display: 'block' }}>
                        {/* option */}
                        <Grid container item xs={12} md={12} sx={{ mb: 2, paddingBlock: 1 / 2, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
                            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="h6" sx={{ paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#9c27b0', fontWeight: 'bold' } }}>
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
                                                <Typography variant="h6" sx={{ paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#9c27b0', fontWeight: 'bold' } }}>
                                                    Par Jour
                                                </Typography>
                                            }
                                        />
                                        <FormControlLabel
                                            value="semaine"
                                            onClick={handleChange}
                                            control={<Radio color="secondary" />}
                                            label={
                                                <Typography variant="h6" sx={{ paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#9c27b0', fontWeight: 'bold' } }}>
                                                    Par Semaine
                                                </Typography>
                                            }
                                        />
                                        <FormControlLabel
                                            value="mois"
                                            onClick={handleChange}
                                            control={<Radio color="secondary" />}
                                            label={
                                                <Typography variant="h6" sx={{ paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#9c27b0', fontWeight: 'bold' } }}>
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
                                    <Typography variant="h6" sx={{ paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                        Modules
                                    </Typography>
                                </Grid>
                                <Grid xs={8} sx={{ display: 'flex', pr: 2, }}>
                                    {
                                        loadingmodule ? <><WatingAnne /></> : Errormodule ?
                                            <>
                                                {Errormodule}
                                            </>
                                            :
                                            <>
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
                                                        {modules.filter(item => item.del !== 1).map(module => { return <MenuItem key={module._id} value={module._id}>{module.name}</MenuItem> })}
                                                    </Select>
                                                </FormControl>
                                            </>
                                    }
                                </Grid>

                            </Grid>
                            <Grid container item xs={12} sm={12} sx={{ paddingBlock: 1 / 2, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
                                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
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
                            <Grid container item xs={12} sm={12} sx={{ paddingBlock: 1 / 2, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
                                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Typography variant="h6" sx={{ paddingBlock: 1, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                        User
                                    </Typography>
                                </Grid>
                                <Grid xs={8} sx={{ display: 'flex', pr: 2, }}>
                                    {
                                        loadingUserData ? <><WatingAnne /></> : errorUserData ?
                                            <>
                                                {errorUserData}
                                            </>
                                            :
                                            <>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">user type</InputLabel>
                                                    <Select
                                                        sx={{ bgcolor: 'white' }}
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={user}
                                                        label="user type"
                                                        onChange={handleChangeUser}
                                                    >
                                                        <MenuItem value={''}>All</MenuItem>
                                                        {userData.filter(item => item.del !== 1).map(user => { return <MenuItem key={user._id} value={user.Type}>{user.Type}</MenuItem> })}
                                                    </Select>
                                                </FormControl>
                                            </>
                                    }
                                </Grid>

                            </Grid>
                        </Grid>
                        {/* befor option */}
                        <Grid container xs={12} md={12} columnGap={1} sx={{ mt: 2 }}>
                            {
                                loadingModule ? <><WatingCard /></> : ErrorModule ?
                                    <>
                                        {ErrorModule}
                                    </>
                                    :
                                    <>
                                        <Grid item xs={5.8} sx={{ mb: 1, paddingBlock: 1, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }} >
                                            <Typography variant="h2" sx={{ color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                {successModule ? Module.reduce((acc, curr) => acc + curr.cour, 0) : 0}
                                                <TrendingUpIcon sx={{ position: 'relative', mt: -5, ml: 2, color: '#379237' }} />
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                cours
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={5.8} sx={{ mb: 1, paddingBlock: 1, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }} >
                                            <Typography variant="h2" sx={{ color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                {successModule ? Module.reduce((acc, curr) => acc + curr.video, 0) : 0}
                                                <TrendingUpIcon sx={{ position: 'relative', mt: -5, ml: 2, color: '#379237' }} />
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                video
                                            </Typography>

                                        </Grid>
                                        <Grid item xs={5.8} sx={{ mb: 1, paddingBlock: 1, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }} >
                                            <Typography variant="h2" sx={{ color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                {successModule ? Module.reduce((acc, curr) => acc + curr.audio, 0) : 0}
                                                <TrendingDownIcon sx={{ position: 'relative', mt: -5, ml: 2, color: 'red' }} />
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.8)', paddingInline: 1.5, borderRadius: 2, transition: '0.3s', }}>
                                                audio
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

export default StatConsulte;

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 },
    {
        label: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { label: 'The Good, the Bad and the Ugly', year: 1966 },
    { label: 'Fight Club', year: 1999 },
    {
        label: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        label: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { label: 'Forrest Gump', year: 1994 },
    { label: 'Inception', year: 2010 },
    {
        label: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: 'Goodfellas', year: 1990 },
    { label: 'The Matrix', year: 1999 },
    { label: 'Seven Samurai', year: 1954 },
    {
        label: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { label: 'City of God', year: 2002 },
    { label: 'Se7en', year: 1995 },
    { label: 'The Silence of the Lambs', year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: 'Life Is Beautiful', year: 1997 },
    { label: 'The Usual Suspects', year: 1995 },
    { label: 'Léon: The Professional', year: 1994 },
    { label: 'Spirited Away', year: 2001 },
    { label: 'Saving Private Ryan', year: 1998 },
    { label: 'Once Upon a Time in the West', year: 1968 },
    { label: 'American History X', year: 1998 },
    { label: 'Interstellar', year: 2014 },
    { label: 'Casablanca', year: 1942 },
    { label: 'City Lights', year: 1931 },
    { label: 'Psycho', year: 1960 },
    { label: 'The Green Mile', year: 1999 },
    { label: 'The Intouchables', year: 2011 },
    { label: 'Modern Times', year: 1936 },
    { label: 'Raiders of the Lost Ark', year: 1981 },
    { label: 'Rear Window', year: 1954 },
    { label: 'The Pianist', year: 2002 },
    { label: 'The Departed', year: 2006 },
    { label: 'Terminator 2: Judgment Day', year: 1991 },
    { label: 'Back to the Future', year: 1985 },
    { label: 'Whiplash', year: 2014 },
    { label: 'Gladiator', year: 2000 },
    { label: 'Memento', year: 2000 },
    { label: 'The Prestige', year: 2006 },
    { label: 'The Lion King', year: 1994 },
    { label: 'Apocalypse Now', year: 1979 },
    { label: 'Alien', year: 1979 },
    { label: 'Sunset Boulevard', year: 1950 },
    {
        label: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { label: 'The Great Dictator', year: 1940 },
    { label: 'Cinema Paradiso', year: 1988 },
    { label: 'The Lives of Others', year: 2006 },
    { label: 'Grave of the Fireflies', year: 1988 },
    { label: 'Paths of Glory', year: 1957 },
    { label: 'Django Unchained', year: 2012 },
    { label: 'The Shining', year: 1980 },
    { label: 'WALL·E', year: 2008 },
    { label: 'American Beauty', year: 1999 },
    { label: 'The Dark Knight Rises', year: 2012 },
    { label: 'Princess Mononoke', year: 1997 },
    { label: 'Aliens', year: 1986 },
    { label: 'Oldboy', year: 2003 },
    { label: 'Once Upon a Time in America', year: 1984 },
    { label: 'Witness for the Prosecution', year: 1957 },
    { label: 'Das Boot', year: 1981 },
    { label: 'Citizen Kane', year: 1941 },
    { label: 'North by Northwest', year: 1959 },
    { label: 'Vertigo', year: 1958 },
    {
        label: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { label: 'Reservoir Dogs', year: 1992 },
    { label: 'Braveheart', year: 1995 },
    { label: 'M', year: 1931 },
    { label: 'Requiem for a Dream', year: 2000 },
    { label: 'Amélie', year: 2001 },
    { label: 'A Clockwork Orange', year: 1971 },
    { label: 'Like Stars on Earth', year: 2007 },
    { label: 'Taxi Driver', year: 1976 },
    { label: 'Lawrence of Arabia', year: 1962 },
    { label: 'Double Indemnity', year: 1944 },
    {
        label: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { label: 'Amadeus', year: 1984 },
    { label: 'To Kill a Mockingbird', year: 1962 },
    { label: 'Toy Story 3', year: 2010 },
    { label: 'Logan', year: 2017 },
    { label: 'Full Metal Jacket', year: 1987 },
    { label: 'Dangal', year: 2016 },
    { label: 'The Sting', year: 1973 },
    { label: '2001: A Space Odyssey', year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: 'Toy Story', year: 1995 },
    { label: 'Bicycle Thieves', year: 1948 },
    { label: 'The Kid', year: 1921 },
    { label: 'Inglourious Basterds', year: 2009 },
    { label: 'Snatch', year: 2000 },
    { label: '3 Idiots', year: 2009 },
    { label: 'Monty Python and the Holy Grail', year: 1975 },
];