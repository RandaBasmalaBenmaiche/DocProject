import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as React from 'react';


import Typography from '@mui/material/Typography';

import NexQ from "./nextQ";
import QuestionCore from "./questionCore";
import QuestionTete from "./questionTete";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';

import Zoom from '@mui/material/Zoom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import RuleIcon from '@mui/icons-material/Rule';

import PauseIcon from '@mui/icons-material/Pause';
import Tooltip from '@mui/material/Tooltip';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

import Image from './image/first.png';
import Imagee from './image/finish.png';
import TimerComponent from "./timerComponent ";
import { API_BASE } from "../../../constants";

let appdate = []
const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))
    (({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: 'rgba(0,0,0,0.7)',
            color: 'rgba(255, 255, 255, 1)',
            boxShadow: theme.shadows[1],
            fontSize: 14,
        },
    }));


const Alert = React.forwardRef(function alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ConsulteQsmG = () => {
    const token = JSON.parse(localStorage.getItem('user'))
    // get data
    const params = useParams()
    const [steps, setSteps] = React.useState([
        {
            id: '',
            type: '',
            qs: {
                question: '',
                reponse: [],
                corect: [],
                chek: [],
                corection: 'null',
                time: null,
            },
        },
    ])
    const [loading, setLoading] = React.useState(true)
    const [Error, setError] = React.useState(null)
    const [saveError, setSaveError] = React.useState(null)
    const [saveLoading, setSaveLoading] = React.useState(null)
    const ApiCall = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${token.token}`
            }
        }
        await axios.get(`${API_BASE}/quiz/` + params.id, config).then(res => {
            setSteps(res.data.questions)
            setLoading(false)
            setError(false)
        }).catch(error => {
            setError(error.response.data)
            setLoading(true)
        })
    }
    const saveData = async () => {
        // const data = new FormData()
        // data.append('id', appdate[0].id)
        // data.append('corection', appdate[0].correction[0].type)
        // data.append('chek', JSON.stringify(appdate[0].chek))
        // data.append('time', appdate[0].time[0].tim)
        // for (var [key, value] of data.entries()) { 
        //     console.log(key, value);
        //   }
        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token.token}`
            }
        }
        await axios.patch(`${API_BASE}/quiz/` + params.id, appdate, config).then(res => {
            setSaveLoading(false)
            setSaveError(false)
            appdate = []
        }).catch(error => {
            setSaveError(error.response.data)
            setSaveLoading(true)
        })
    }
    // save and exit
    const location = useHistory()
    const saveDataAndExit = async () => {
        const config = {
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token.token}`
            }
        }
        await axios.patch(`${API_BASE}/quiz/` + params.id, appdate, config).then(res => {
            setSaveLoading(false)
            setSaveError(false)
            appdate = []
            appdate.pop()
            console.log('appdate')
            console.log(appdate)
            location.push('/gold/mesQuize')
        }).catch(error => {
            setSaveError(error.response.data)
            setSaveLoading(true)
        })
    }
    React.useEffect(() => {
        // console.log('api call :')
        // console.log(params.id)
        if (Error) {
            console.log(Error)
        }
        ApiCall()
        // console.log(steps)
    }, [Error])
    //------------------------------------
    const [activeStep, setActiveStep] = React.useState(0);
    const [heightt, setheightt] = React.useState(120);
    const [rotation, setrotation] = React.useState('rotate(0deg)');
    const maxSteps = steps.length;
    // partie tete
    let questionactive = steps[activeStep];
    const type = steps[activeStep].type;
    const [open, setOpen] = React.useState(false);
    const [first, setfirst] = React.useState(true);
    const [finish, setfinish] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const [iscorect, setiscorect] = React.useState(null);

    // croc test 
    const Vrai = (x, y) => {
        const idReponse = x;
        const idQestion = y;
        appdate.push({ id: idQestion, chek: [{ idProp: idReponse }], correction: [{ type: 'true' }], time: [{ tim: JSON.parse(localStorage.getItem('seconds')) }] });
        console.log(appdate);
        handleNext();
    }
    const Faux = (x, y) => {
        const idReponse = x;
        const idQestion = y;
        appdate.push({ id: idQestion, chek: [{ idProp: idReponse }], correction: [{ type: 'false' }], time: [{ tim: JSON.parse(localStorage.getItem('seconds')) }] });
        console.log(appdate);
        handleNext();
    }
    // fin croc test
    const TestRepons = () => {
        console.log('seconds test');
        console.log(seconds);
        setIsActive(false);
        const idQuestion = questionactive.id;
        const secondIndex = appdate.findIndex((item) => item.id === idQuestion);
        const HistChek = questionactive.qs.corection;

        if (secondIndex != '-1') {
            if (type == 'qcs') {
                let bb = appdate[secondIndex].chek;
                const id = bb[0]['idProp'];
                let corect = steps[activeStep].qs.corect;
                const idIndex = corect.findIndex((item) => item.id === id);
                if (idIndex != '-1') {
                    let app = appdate[secondIndex].correction;
                    app.pop();
                    app.push({ type: 'true' });

                    let apptime = appdate[secondIndex].time;
                    apptime.pop();
                    apptime.push({ tim: JSON.parse(localStorage.getItem('seconds')) });
                    console.log(appdate[secondIndex]);

                } else {
                    let app = appdate[secondIndex].correction;
                    app.pop();
                    app.push({ type: 'false' });

                    let apptime = appdate[secondIndex].time;
                    apptime.pop();
                    apptime.push({ tim: JSON.parse(localStorage.getItem('seconds')) });
                    console.log(appdate[secondIndex]);

                }
                handleNext();
            } else if (type == 'qcm') {

                const chek = [];
                const corectprop = [];
                let bb = appdate[secondIndex].chek;
                const id = bb[0]['idProp'];
                let corect = steps[activeStep].qs.corect;
                for (let i = 0; i < bb.length; i++) {
                    chek.push(bb[i]['idProp'])
                }
                for (let i = 0; i < corect.length; i++) {
                    corectprop.push(corect[i]['id'])
                }
                // // alert(chek);
                // // alert(iscorect);

                // // alert('chek.length'+chek.length);
                for (let i = 0; i < chek.length; i++) {
                    const corectprp = chek[i];
                    // alert('corectprp :' + corectprp);
                    const iscorectt = corectprop.includes(corectprp);
                    // alert('iscorectt : ' + iscorectt);
                    if (iscorectt == false) {
                        setiscorect(false);
                        let bb = appdate[secondIndex].correction;
                        bb.push({ type: 'false' });

                        let apptime = appdate[secondIndex].time;
                        apptime.pop();
                        apptime.push({ tim: JSON.parse(localStorage.getItem('seconds')) });
                        handleNext();

                        return;
                    }
                }
                if (iscorect == null) {
                    appdate[secondIndex].correction.push({ type: 'true' });
                    let apptime = appdate[secondIndex].time;
                    apptime.pop();
                    apptime.push({ tim: JSON.parse(localStorage.getItem('seconds')) });
                    handleNext();
                    // console.log(appdate[secondIndex]);
                    // // alert(iscorect);
                }



                // const idIndex = corect.findIndex((item) => item.id === id);
                // if (idIndex != '-1') {
                //     let app = appdate[secondIndex].correction;
                //     app.pop();
                //     app.push({type: 'true'});

                //     let apptime = appdate[secondIndex].time;
                //     apptime.pop();
                //     apptime.push({tim: seconds});
                //     console.log(appdate[secondIndex]);

                // } else {
                //     let app = appdate[secondIndex].correction;
                //     app.pop();
                //     app.push({ type: 'false'});

                //     let apptime = appdate[secondIndex].time;
                //     apptime.pop();
                //     apptime.push({tim: seconds});
                //     console.log(appdate[secondIndex]);

                // }
                // handleNext();
            }

        } else if (HistChek != 'null') {
            if ((activeStep + 1) < maxSteps) {
                handleNext();
            }
        } else {
            setOpen(true);
        }
    }
    // fin partie tete

    const handleNext = () => {
        setSeconds(0);
       
        setIsActive(true);
        if (activeStep == (maxSteps - 1)) {
            setfinish(true)
        } else {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        }
    };

    const handleBack = () => {
        setSeconds(0);
        setIsActive(true);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const height = () => {
        if (heightt === 120) {
            setheightt('auto');
            setrotation('rotate(180deg)');
        } else {
            setrotation('rotate(0deg)');
            setheightt(120);
        }

    }
    // timer
    const [seconds, setSeconds] = React.useState(0);
    const [secondshist, setSecondshist] = React.useState(0);
    const [histsecend, sethistsecend] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);
    const [blocktimer, setblocktimer] = React.useState(false);
    const [appdateitem, setappdateitemm] = React.useState(false);
    const [activechek, setactivechek] = React.useState(true);

    function bloked() {
        // // alert('bloked actived');
        setblocktimer(true);
        setIsActive(false);
        setactivechek(false);

    }
    function appsecend(x) {
        const secondIndex = x
        let time = appdate[secondIndex].time[0].tim;
        setSecondshist(time);
        sethistsecend(true);
        console.log('time second');
        console.log(time);
    }
    function appsecendHist(x) {
        const activeStep = x
        const time = steps[activeStep].qs.time;
        setSecondshist(time);
        sethistsecend(true);
        console.log('time second hist');
        console.log(time);
    }
    function disbloked() {
        // // alert('disbloked actived');
        setblocktimer(false);
        setIsActive(true);
        setactivechek(true);
    }

    React.useEffect(() => {
        const histreponse = steps[activeStep].qs.corection;
        const idQuestion = questionactive.id;
        const secondIndex = appdate.findIndex((item) => item.id === idQuestion);



        // console.log('setappdateitem :' + appdateitem);

        // console.log('hist ' + histreponse);
        // console.log('chek ' + secondIndex);
        console.log(histreponse);
        if (histreponse != 'null') {
            bloked();
            appsecendHist(activeStep);
            return;
        }else{
            setSecondshist(0)
        }
        if (secondIndex != '-1') {
            let corection = appdate[secondIndex].correction;
            // console.log('corectionobject :' + corection[0]);
            if (corection.length != 0) {
                if (corection[0].type == 'true' || corection[0].type == 'false') {
                    bloked();
                    appsecend(secondIndex);
                }else{
                    setSecondshist(0)
                }

                // console.log('appdateitem if : ' + appdateitem);
            } else {
                disbloked();
            }
        } else {
            disbloked();
        }


    }, [activeStep,loading]);

    function toggle() {
        if (blocktimer == false) {
            setIsActive(!isActive);
        }

    }

    function reset() {
        setSeconds(0);
        setIsActive(false);
    }
    const Start = () => {
       if(!histsecend){
        setSeconds(0);
       }
        setfirst(false);
    }
    const First = () => {
        return (
            <Box sx={{
                '&::-webkit-scrollbar': {
                    width: '0px',
                }, borderRadius: 4, height: { md: 600, sm: 630 }, maxHeight: { md: 600, sm: 630 }, overflowY: 'auto', maxWidth: 'auto', width: '100%', p: 4, bgcolor: 'white'
            }}>
                <img src={Image} style={{ width: '70%', marginInline: '15%' }} />
                <Alert severity="info" onClick={() => Start()} sx={{ fontFamily: 'Bahnschrift SemiBold', '&:hover': { cursor: 'pointer' } }}>Click Ici Pour commencer ce quiz</Alert>
            </Box>
        );
    }
    const Finish = () => {
        return (
            <Box sx={{
                '&::-webkit-scrollbar': {
                    width: '0px',
                }, borderRadius: 4, height: 600, maxHeight: 600, overflowY: 'auto', maxWidth: 'auto', width: '100%', p: 4, bgcolor: 'white'
            }}>
                <img src={Imagee} style={{ width: '70%', marginInline: '15%' }} />
                <Alert severity="success" onClick={saveDataAndExit} sx={{ fontFamily: 'Bahnschrift SemiBold', '&:hover': { cursor: 'pointer' } }}>Click Ici Pour Sauvegarder et Quitter</Alert>
            </Box>
        );
    }
    const valueofsecends= (sc)=>{
        setSeconds(sc);
        console.log(seconds)
    }
    // React.useEffect(() => {
    //     let intervalId;

    //     if (isActive) {
    //         intervalId = setInterval(() => {
    //             setSeconds(seconds => seconds + 1);
    //         }, 1000);
    //     }

    //     return () => clearInterval(intervalId);
    // }, [isActive]);
    const cont = [];
    const bgcolor = '';
    const DivNumber = () => {

        for (let i = 0; i < steps.length; i++) {
            if (steps[i].qs.corection === 'true') {
                cont.push('#68B984');
            } else if (steps[i].qs.corection === 'false') {
                cont.push('#F55050');
            } else {
                cont.push('silver');
            }
        }

        return (
            cont.map((corect, index) => {

                return (
                    <Grid item xs={2} sx={{ mb: 2 }}>
                        <Avatar onClick={() => changeSteps(index)} sx={{ bgcolor: corect, opacity: '0.6', transition: '.3s', '&:hover': { cursor: 'pointer', opacity: '1', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>{index + 1}</Avatar>
                    </Grid>
                )
            })
        );

    }
    const changeSteps = (x) => {
        setSeconds(0)
        setActiveStep(x);
    }

    // fin timer
    // if (loading) {
    //     return <p>loading data...</p>
    // }
    return (
        <>
            {loading ? <>loading data</> :
                <Box sx={{ flexGrow: 1 }}>

                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', p: 2, paddingBlock: 4 }}>
                        <Grid item container xs={12} md={8} sx={{ flexGrow: 1, }}>
                            <Toolbar />
                            <Grid item xs={12} sx={{ flexGrow: 0, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: 4 }}>
                                {/* <QuestionTete active={activeStep} question={steps} appdate={appdate} /> */}

                                {
                                    first ?
                                        <First />
                                        :
                                        finish ?
                                            <Finish />
                                            : <>
                                                <Paper
                                                    square
                                                    elevation={2}
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        paddingBlock: 1,
                                                        pl: 2,
                                                        bgcolor: 'silver',
                                                        color: 'white',
                                                        borderTopLeftRadius: 4,
                                                        borderTopRightRadius: 4,
                                                    }}
                                                >
                                                    <Grid container item xs={12} sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Grid item xs={12} sm={6}>
                                                            <Typography sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'black', fontWeight: 'bold' }}>Question {(activeStep + 1)}
                                                                <Chip label={type} sx={{ fontFamily: 'Bahnschrift SemiBold', color: '#ff5757', boxShadow: ' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px ', bgcolor: 'white', p: 1 / 2, ml: 1, height: 25, }} />
                                                            </Typography>
                                                        </Grid>
                                                        <Grid container item xs={12} sm={6} sx={{ mt: { xs: 2, sm: 0 } }}>
                                                            <Grid item xs={5.8} sx={{ textAlign: { sm: 'right', xs: 'center' }, paddingInline: 1, }}>

                                                                {activechek == true ?
                                                                    type == 'qcm' || type == 'qcs' ?
                                                                        <LightTooltip title="consulter le quiz" placement="top"
                                                                            TransitionComponent={Zoom}
                                                                            TransitionProps={{ timeout: 300 }}
                                                                        >


                                                                            <IconButton aria-label="delete" onClick={() => TestRepons()}
                                                                                sx={{
                                                                                    marginInline: 1,
                                                                                    color: '#ff5757',
                                                                                    bgcolor: 'white',
                                                                                    transition: '.3s',
                                                                                    boxShadow: '1px 1px 3px rgba(0,0,0,0.3) inset,1px 1px 2px rgba(0,0,0,0.3)',
                                                                                    '&:hover': {
                                                                                        bgcolor: '#ff5757',
                                                                                        color: 'white',
                                                                                    }
                                                                                }}>
                                                                                <RuleIcon />
                                                                            </IconButton>



                                                                        </LightTooltip>
                                                                        : null : null
                                                                }



                                                                {blocktimer == false ?
                                                                    <IconButton aria-label="delete"
                                                                        onClick={toggle}
                                                                        sx={{
                                                                            marginInline: 1,
                                                                            color: '#ff5757',
                                                                            bgcolor: 'white',
                                                                            transition: '.3s',
                                                                            boxShadow: '1px 1px 3px rgba(0,0,0,0.3) inset,1px 1px 2px rgba(0,0,0,0.3)',
                                                                            '&:hover': {
                                                                                bgcolor: '#ff5757',
                                                                                color: 'white',
                                                                            }
                                                                        }}>

                                                                        {
                                                                            isActive ?
                                                                                <LightTooltip title="pause" placement="top"
                                                                                    TransitionComponent={Zoom}
                                                                                    TransitionProps={{ timeout: 300 }}>
                                                                                    <PauseIcon />
                                                                                </LightTooltip>
                                                                                :
                                                                                <LightTooltip title="Play" placement="top"
                                                                                    TransitionComponent={Zoom}
                                                                                    TransitionProps={{ timeout: 300 }}>
                                                                                    <PlayArrowIcon />
                                                                                </LightTooltip>

                                                                        }

                                                                    </IconButton>
                                                                    : null
                                                                }

                                                            </Grid>
                                                            <Grid item xs={5.8} sx={{ boxShadow: '3px 3px 4px rgba(0,0,0,0.1) ', bgcolor: 'white', p: 1 / 2, color: 'black', textAlign: 'center', mr: 1, borderRadius: 2, }}>
                                                                <LightTooltip title="Temps passé" placement="top"
                                                                    TransitionComponent={Zoom}
                                                                    TransitionProps={{ timeout: 300 }}>
                                                                    <Typography variant="h5" component="h2" sx={{ fontFamily: 'Bahnschrift SemiBold', letterSpacing: 2, color: '#ff5757', fontWeight: 'bold' }}>
                                                                      {secondshist !== 0 ? secondshist : <><TimerComponent isActive={isActive} stepss={activeStep} /></>}
                                                                        <small>s</small>
                                                                    </Typography>
                                                                </LightTooltip>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                                                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                                                            Selectionez ou moins une proposition !
                                                        </Alert>
                                                    </Snackbar>
                                                </Paper>

                                                <QuestionCore Vrai={Vrai} Faux={Faux} question={steps} active={activeStep} appdate={appdate}  />
                                                <NexQ next={[maxSteps, activeStep, handleNext, handleBack]} />
                                            </>}
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} md={4} sm={8} sx={{ flexGrow: 1 }}>

                            <Grid item xs={12} sx={{ flexGrow: 1, }}>
                                <Toolbar />
                                <Grid item container xs={12} sm={12} md={12} sx={{ p: 2, flexGrow: 0, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                    <Typography variant="h5">Avancement</Typography>

                                    <Grid
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        item container xs={12}
                                        sx={{ pt: 2, maxHeight: heightt, height: heightt, transition: '.3s all', overflowY: 'hidden' }}>
                                        <DivNumber />
                                    </Grid>
                                    <Grid item container xs={12} sx={{ pt: 2, display: 'flex', justifyContent: 'center' }}>
                                        <IconButton aria-label="delete" onClick={height} sx={{ transform: rotation, transition: '.3s all' }}>
                                            <KeyboardDoubleArrowDownIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} sm={12} md={12} sx={{ mt: 2, p: 2, flexGrow: 0, bgcolor: 'white', borderRadius: 2, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                                    <Grid
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        item container xs={8}
                                        sx={{ transition: '.3s all', overflowY: 'hidden' }}>
                                        <Typography variant="h5">Options</Typography>
                                    </Grid>
                                    <Grid
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        item container xs={2}
                                        sx={{ transition: '.3s all', }}>

                                        <LightTooltip title="Sauvegarder" placement="top"
                                            TransitionComponent={Zoom}
                                            TransitionProps={{ timeout: 300 }}
                                        >

                                            <IconButton aria-label="delete"
                                                onClick={saveData}
                                                sx={{
                                                    marginInline: 1,
                                                    color: '#68B984',
                                                    bgcolor: 'white',
                                                    transition: '.3s',
                                                    boxShadow: '1px 1px 3px rgba(0,0,0,0.3) inset,1px 1px 2px rgba(0,0,0,0.3)',
                                                    '&:hover': {
                                                        bgcolor: '#68B984',
                                                        color: 'white',
                                                    }
                                                }}>
                                                <SaveAltIcon />
                                            </IconButton>
                                        </LightTooltip>

                                    </Grid>
                                    <Grid
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="flex-start"
                                        item container xs={2}
                                        sx={{ transition: '.3s all', }}>

                                        <LightTooltip title="Sauvegarder et Quitter" placement="top"
                                            TransitionComponent={Zoom}
                                            TransitionProps={{ timeout: 300 }}
                                        >

                                            <IconButton aria-label="delete"
                                                onClick={saveDataAndExit}
                                                sx={{
                                                    marginInline: 1,
                                                    color: '#F55050',
                                                    bgcolor: 'white',
                                                    transition: '.3s',
                                                    boxShadow: '1px 1px 3px rgba(0,0,0,0.3) inset,1px 1px 2px rgba(0,0,0,0.3)',
                                                    '&:hover': {
                                                        bgcolor: '#F55050',
                                                        color: 'white',
                                                    }
                                                }}>
                                                <LogoutIcon />
                                            </IconButton>
                                        </LightTooltip>

                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid >
                </Box >}
        </>
    );
}


export default ConsulteQsmG;
