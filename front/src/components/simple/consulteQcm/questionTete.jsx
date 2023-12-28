import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as React from 'react';
import Zoom from '@mui/material/Zoom';

import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import RuleIcon from '@mui/icons-material/Rule';
import Tooltip from '@mui/material/Tooltip';
import PauseIcon from '@mui/icons-material/Pause';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

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



const Alert = React.forwardRef(function  alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const QuestionTete = ({ active, question, appdate }) => {

    let questionactive = question[active];
    const type = question[active].type;
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const TestRepons = () => {

        const idQuestion = questionactive.id;
        const secondIndex = appdate.findIndex((item) => item.id === idQuestion);

        if (secondIndex != '-1') {
            if (type == 'qcs') {
                let bb = appdate[secondIndex].chek;
                const id = bb[0]['idProp'];
                let corect = question[active].qs.corect;
                const idIndex = corect.findIndex((item) => item.id === id);
                if (idIndex != '-1') {
                    let app = appdate[secondIndex].correction;
                    app.pop();
                    app.push({ type: 'true' });
                    console.log(appdate);
                } else {
                    let app = appdate[secondIndex].correction;
                    app.pop();
                    app.push({ type: 'false' });
                    console.log(appdate);
                }
            }

        } else {
            setOpen(true);

        }
    }



    return (
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
            <Grid item sx={{ flex: '1 2 50%', }}>
                <Typography sx={{ color: 'black', fontWeight: 'bold' }}>Question {(active + 1)}
                    <Chip label={type} sx={{ color: '#ff5757', boxShadow: ' rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset', bgcolor: 'white', p: 1 / 2, ml: 1, height: 25, fontWeight: 'bold' }} />
                </Typography>
            </Grid>
            <Grid item sx={{ flex: '1 1 35%', textAlign: 'right', paddingInline: 1, }}>
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
                <LightTooltip title="pause" placement="top"
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 300 }}>

                    <IconButton aria-label="delete"
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
                        <PauseIcon />
                    </IconButton>
                </LightTooltip>
            </Grid>
            <Grid item sx={{ boxShadow: '1px 1px 6px rgba(0,0,0,0.3) inset', flex: '1 1 14%', bgcolor: 'white', p: 1 / 2, color: 'black', textAlign: 'center', mr: 1, borderRadius: 2, }}>
                <LightTooltip title="Temps passé" placement="top"
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 300 }}>
                    <Typography variant="h5" component="h2" sx={{ letterSpacing: 2, color: '#ff5757', fontWeight: 'bold' }}>
                       
                    </Typography>
                </LightTooltip>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    Selectionez ou moins une proposition !
                </Alert>
            </Snackbar>
        </Paper>
    );
}


export default QuestionTete;
