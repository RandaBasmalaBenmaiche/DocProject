import * as React from 'react';
import { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import $ from 'jquery';
import "./index.css";
import { Button, Grid, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
const Croc = ({ index, reponses, idQestion, appdate, histreponse, corect, chekArray, seconds,Vrai,Faux }) => {
    //   croc
    
    const [hist,sethist]= useState(0);
    const [istrue,setistrue]= useState(0);
    const [hasExecuted, setHasExecuted] = useState(false);
    const [isvalide, setisvalide] = useState(0);
    
    const idQestionApdate = appdate.findIndex((item) => item.id === idQestion);
   
    React.useEffect(() => {
        if (idQestionApdate != '-1') {
            const secondIndex = appdate.findIndex((item) => item.id === idQestion);
            
            sethist(1);
           
            let bb = appdate[secondIndex].correction[0]['type'];
            if(bb == 'true'){
                setistrue(1);
               
            }else{
                setistrue(0);
            }
            setHasExecuted(true);
            setisvalide(1);
            
        }else{
            if(histreponse == 'true'){
                sethist(1);
                setistrue(1);
            }else if(histreponse == 'false'){
                sethist(1);
                setistrue(0);
            }
            setHasExecuted(true);
           
        }   


    }, [seconds,hasExecuted]);



    
    const valideFunc = () => {
        setisvalide(1);
    }
    const ReponceCorect = reponses.rep;
    const IdReponceCorect = reponses._id;
    const Notvalide = () => {
        return (
            <Grid container item xs={12} sx={{display:'flex',alignItems:'center'}}>
                <Typography variant="body1" component="h2" sx={{fontFamily: 'Bahnschrift SemiBold',}}>
                    Pour validé votre Réponce
                </Typography>

                <Button variant="contained" color="secondary" sx={{fontFamily: 'Bahnschrift SemiBold',fontSize:12, ml: 2 }} onClick={() => { valideFunc() }}>Validé</Button>

            </Grid>
        )
    }
    const Valide = () => {
        return (
            <Grid container item xs={12}>
                <Grid container item xs={6} sm={10}>
                    <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold',paddingBlock: 0, borderBottom: '2px solid rgba(0,0,0,0.1)', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                        La Réponce :
                    </Typography>
                </Grid>
                <Grid container item xs={6} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                    <IconButton onClick={() => Vrai(IdReponceCorect,idQestion)} sx={{ width: 30, height: 30, opacity: '0.8', ml: 2, color: 'white', bgcolor: 'green', boxShadow: 'none', '&:hover': { bgcolor: 'green', boxShadow: 'none' } }} aria-label="upload picture" component="label">
                        <DoneIcon />
                    </IconButton>
                    <IconButton onClick={() => Faux(IdReponceCorect,idQestion)} sx={{ width: 30, height: 30, opacity: '0.8', ml: 2, color: 'white', bgcolor: 'red', boxShadow: 'none', '&:hover': { bgcolor: 'red', boxShadow: 'none' } }} aria-label="upload picture" component="label">
                        <ClearIcon />
                    </IconButton>

                </Grid>
                <Grid container item xs={12} sx={{ mt: 2 }}>

                </Grid>
                <Grid container item xs={12} sx={{ mt: 1 }}>
                    <Typography variant="body1" component="h2" sx={{fontFamily: 'Bahnschrift SemiBold',}}>
                        {ReponceCorect}
                    </Typography>
                </Grid>

            </Grid>
        );
    }
    const Cheked = () => {
        return (
            <Grid container item xs={12}>
                <Grid container item xs={6} sm={10}>
                    <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold',paddingBlock: 0, borderBottom: '2px solid rgba(0,0,0,0.1)', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                        La Réponce :
                    </Typography>
                </Grid>
                <Grid container item xs={6} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                {
                    istrue == '1'?
                    <IconButton disabled  sx={{ width: 30, height: 30,border:'1px solid green',  ml: 2,  bgcolor: 'green', boxShadow: 'none', '&:hover': { bgcolor: 'green', boxShadow: 'none' } }} aria-label="upload picture" component="label">
                        <DoneIcon sx={{color:'green'}} />
                    </IconButton>
                    :
                    <IconButton disabled  sx={{ width: 30, height: 30,border:'1px solid red', ml: 2,  boxShadow: 'none', '&:hover': { bgcolor: 'red', boxShadow: 'none' } }} aria-label="upload picture" component="label">
                        <ClearIcon sx={{color:'red'}}  />
                    </IconButton>
                }
            

                </Grid>
                <Grid container item xs={12} sx={{ mt: 2 }}>

                </Grid>
                <Grid container item xs={12} sx={{ mt: 1 }}>
                    <Typography variant="body1" component="h2" sx={{fontFamily: 'Bahnschrift SemiBold',}}>
                        {ReponceCorect}
                    </Typography>
                </Grid>

            </Grid>
        );
    }
    // fin croc 




    return (
        <>
            {
                hist == '1' ?
                <Cheked />
                :
                isvalide == '0' ?
                    <Notvalide />
                    :
                    <Valide />
                
            }


        </>
    );
}

export default Croc;