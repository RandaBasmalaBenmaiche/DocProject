import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as React from 'react';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';


import "./index.css";
import Propos from './propose';
import Qcm from './questionQcm';
import Qcs from './questionQcs';
import Croc from './questionCroc';
import Clinique from './questionClinique';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Alert } from '@mui/material';



const QuestionCore = ({ question, active, appdate, seconds, Vrai, Faux }) => {


    const questions = question[active].qs.question;
    const reponses = question[active].qs.reponse;
    const idQestion = question[active].id;
    const corect = question[active].qs.corect;
    const histreponse = question[active].qs.corection;
    const type = question[active].type;
    const cheked = question[active].qs.chek;

    // React.useEffect(() => {

    // }, [question])






    return (

        <Box sx={{
            '&::-webkit-scrollbar': {
                width: '0px',
            }, height: {xs:400,sm:510}, maxHeight:{xs:400,sm:510}, overflowY: 'auto', maxWidth: 'auto', width: '100%', p: 2, bgcolor: 'white'
        }}>
            <Grid item sx={{ mb: 2 }}>
                {
                    <div style={{ fontFamily: 'Bahnschrift SemiBold', }}>{questions}</div>
                }



            </Grid>
            <Divider />
            <Grid item container sx={{ mt: 2 }}>

                <List sx={{ width: '100%', }}  >
                    {/* <BoxCore /> */}
                    {
                        histreponse != 'null' ?
                            histreponse == 'true' ?
                                <Alert severity="success" sx={{ fontFamily: 'Bahnschrift SemiBold', mb: 2 }}>Correcte !</Alert>

                                :
                                <Alert severity="error" sx={{ fontFamily: 'Bahnschrift SemiBold', mb: 2 }}>Incorrect !</Alert>
                            : null
                    }
                    {

                        type == "qcm" ?

                            reponses.map((reponse, index) => {
                                return (<Qcm key={index} seconds={seconds} index={index} reponses={reponse} idQestion={idQestion} histreponse={histreponse} corect={corect} appdate={appdate} chekArray={cheked} />)
                            })
                            :
                            type == "qcs" ?
                                reponses.map((reponsess, indexx) => {
                                    return (<Qcs key={indexx}  index={indexx} reponses={reponsess} idQestion={idQestion} histreponse={histreponse} corect={corect} appdate={appdate} chekArray={cheked} />)
                                })
                                :
                                type == "croc" ?
                                    reponses.map((reponse, index) => {
                                        return (<Croc key={index} Vrai={Vrai} Faux={Faux} seconds={seconds} index={index} reponses={reponse} idQestion={idQestion} histreponse={histreponse} corect={corect} appdate={appdate} chekArray={cheked} />)
                                    })
                                    :
                                    type == "clinique" ?
                                        reponses.map((reponse, index) => {
                                            return (<Clinique key={index} Vrai={Vrai} Faux={Faux} seconds={seconds} index={index} reponses={reponse} idQestion={idQestion} histreponse={histreponse} corect={corect} appdate={appdate} chekArray={cheked} />)
                                        })
                                        : null
                    }



                </List>
            </Grid>
        </Box>
    );
}


export default QuestionCore;
