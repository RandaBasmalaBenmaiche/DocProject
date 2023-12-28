import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Grid } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import GppGoodIcon from '@mui/icons-material/GppGood';
import Img1 from '../img/img1.jpg';
import Img2 from '../img/img2.jpg';
import Img3 from '../img/img3.jpg';
import Img4 from '../img/img4.jpg';
import Img5 from '../img/img5.jpg';
import Img from '../img/test.png';

import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

const Sectionb = () => {

    return (
        <Grid container item xs={12} sx={{ top: '10vh', zIndex: '1', }} className="SectionA" flexDirection={'row'} alignContent={'flex-start'}>


            <Grid item md={12} sx={{ textAlign: 'left', px: 7, py: 0, height: '10vh', bgcolor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', borderRadius: 2 }}>
                <Typography variant="h4" sx={{ color: 'white', mt: 2, lineHeight: 1.5, fontWeight: 'bold' }} className="heading">
                    <b className='soulign' style={{paddingLeft:'1rem',paddingRight:'2rem',paddingBlock:'0.7rem'}}>À Propos</b>
                </Typography>

            </Grid>
            <Grid container item xs={12} columnGap={3} justifyContent="center" sx={{ px: 7, py: 5, textAlign: 'left', height: '85vh', bgcolor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', borderRadius: 2 }}>

                <Grid item xs={2.8} className="AboutCard"  >
                    <div className='BackCard'>
                    <Typography variant="body1" sx={{textAlign:'center', color: 'black', mx: 2, my: 1, fontFamily: 'Bahnschrift SemiBold', opacity: '0.9' }} >
                        Retrouve Plus de 60k Question
                    </Typography>
                    </div>
                    <img src={Img} loading='lazy' />
                    {/* <HelpRoundedIcon sx={{width:70,height:70, color:'#0d2742'}}/> */}
                    <Typography variant="h5" sx={{ color: 'black', mx: 2, fontWeight: 'bold', fontFamily: 'Bahnschrift SemiBold ' }} >
                        Questions
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'black', mx: 2, my: 1, fontFamily: 'Bahnschrift SemiBold', opacity: '0.8' }} >
                    Retrouve toutes les idées possibles  Retrouve toutes 
                    </Typography>
                </Grid>
                <Grid item xs={2.8} className="AboutCard"  >
                    <div className='BackCard'>
                    <Typography variant="body1" sx={{textAlign:'center', color: 'black', mx: 2, my: 1, fontFamily: 'Bahnschrift SemiBold', opacity: '0.9' }} >
                        Retrouve Plus de 60k Question
                    </Typography>
                    </div>
                    <img src={Img} loading='lazy' />
                    {/* <HelpRoundedIcon sx={{width:70,height:70, color:'#0d2742'}}/> */}
                    <Typography variant="h5" sx={{ color: 'black', mx: 2, fontWeight: 'bold', fontFamily: 'Bahnschrift SemiBold ' }} >
                        Questions
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'black', mx: 2, my: 1, fontFamily: 'Bahnschrift SemiBold', opacity: '0.8' }} >
                    Retrouve toutes les idées possibles  Retrouve toutes 
                    </Typography>
                </Grid>
                <Grid item xs={2.8} className="AboutCard"  >
                    <div className='BackCard'>
                    <Typography variant="body1" sx={{textAlign:'center', color: 'black', mx: 2, my: 1, fontFamily: 'Bahnschrift SemiBold', opacity: '0.9' }} >
                        Retrouve Plus de 60k Question
                    </Typography>
                    </div>
                    <img src={Img} loading='lazy' />
                    {/* <HelpRoundedIcon sx={{width:70,height:70, color:'#0d2742'}}/> */}
                    <Typography variant="h5" sx={{ color: 'black', mx: 2, fontWeight: 'bold', fontFamily: 'Bahnschrift SemiBold ' }} >
                        Questions
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'black', mx: 2, my: 1, fontFamily: 'Bahnschrift SemiBold', opacity: '0.8' }} >
                    Retrouve toutes les idées possibles  Retrouve toutes 
                    </Typography>
                </Grid>
                <Grid item xs={2.8} className="AboutCard"  >
                    <div className='BackCard'>
                    <Typography variant="body1" sx={{textAlign:'center', color: 'black', mx: 2, my: 1, fontFamily: 'Bahnschrift SemiBold', opacity: '0.9' }} >
                        Retrouve Plus de 60k Question
                    </Typography>
                    </div>
                    <img src={Img} loading='lazy' />
                    {/* <HelpRoundedIcon sx={{width:70,height:70, color:'#0d2742'}}/> */}
                    <Typography variant="h5" sx={{ color: 'black', mx: 2, fontWeight: 'bold', fontFamily: 'Bahnschrift SemiBold ' }} >
                        Questions
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'black', mx: 2, my: 1, fontFamily: 'Bahnschrift SemiBold', opacity: '0.8' }} >
                    Retrouve toutes les idées possibles  Retrouve toutes 
                    </Typography>
                </Grid>


            </Grid>

        </Grid>



    );
}

export default Sectionb;
const itemData = [
    {
        img: Img1,
        title: 'Bed',
    },
    {
        img: Img2,
        title: 'Bed',
    },
    {
        img: Img3,
        title: 'Bed',
    },
    {
        img: Img4,
        title: 'Bed',
    },
    {
        img: Img5,
        title: 'Bed',
    },
];