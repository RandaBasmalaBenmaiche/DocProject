import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link } from 'react-router-dom';

// Import Swiper React components


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import IconButton from '@mui/material/IconButton';
import "./../../../index.css";

import Stack from '@mui/material/Stack';

// menu
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import * as React from 'react';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import InfoIcon from '@mui/icons-material/Info';
import { Typography } from '@mui/material';
// fin menu
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import $, { event } from 'jquery';
import axios from 'axios';
import { grid } from '@mui/system';
import image from './image/videActive.png';




const drawerWidth = 240;


const LestActive = ({ data, Delete }) => {
    const [vide, setVide] = React.useState(false);
    const cours = data.slice(-4).reverse();
    const testVide=()=>{
        if(data[0] == undefined){
           
            setVide(true);
        }else{
            setVide(false);
        }
    }
    
   React.useEffect(() => {
    testVide()
   }, [data]);

    console.log('data[0]')
    console.log(data[0])
    console.log(data[1])
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const Vide = () => {
        return (
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
                    <img src={image} style={{ width: '95%' }} />
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
        )
    }
    return (
        <>
            <Grid item xs={12}>
                <Typography variant="h5" sx={{ fontFamily: 'Bahnschrift SemiBold', mb: 0, paddingInlineEnd: 5, '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                    Dernier Activité
                </Typography>
            </Grid>
            <Grid container item xs={12} columnGap={3} rowGap={1} sx={{
                pt: 2,

            }}>

                {!vide ?
                    cours.map(cour => {
                        return (
                            <Grid item xs={5.5} sm={2.6} md={2.6}
                                sx={{
                                    overflow: 'hidden',
                                    paddingBlock: 4,
                                    backgroundColor: '#fbdef2',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid rgba(245, 245, 245,0)',
                                    borderRadius: 5,
                                    transition: '0.3s',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    boxShadow: 'rgba(0, 0, 0, 0.25) 1.95px 1.95px 2.6px',
                                    '& .option': {
                                        bottom: -60,
                                        transition: '.3s'
                                    },
                                    '&:hover': {
                                        cursor: 'pointer',
                                        border: '2px solid #b33d95',
                                        '& .option': {
                                            bottom: 0,
                                        }
                                    }
                                }}>

                                <IconButton sx={{

                                    border: '0px solid #ff9a57',
                                    mb: 1,
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    }


                                }} aria-label="settings">
                                    <InsertDriveFileIcon
                                        sx={{
                                            color: '#b33d95',
                                            fontSize: 35,
                                        }} />
                                </IconButton>
                                <Typography variant='body1' sx={{
                                    overflow: 'hidden',
                                   
                                    maxHeight: 45,
                                    fontFamily: 'Bahnschrift SemiBold',
                                }} >
                                    {cour.name}
                                </Typography>
                                <Grid className="option" item xs={12}
                                    sx={{
                                        position: 'absolute',
                                        backgroundColor: 'white',
                                        paddingBlock: 1,
                                        width: '100%',
                                        display: 'flex',

                                    }}>
                                    <div style={{ flex: '1 0 50%', borderRight: '1px solid rgba(0,0,0,0.15)', }}>

                                        <IconButton aria-label="delete" id="item" onClick={() => { Delete(cour._id) }}>
                                            <DeleteForeverIcon sx={{ color: '#F55050' }} />
                                        </IconButton>

                                    </div>
                                    <div style={{ flex: '1 0 50%' }}>
                                        <Link to={`/gold/cours/${cour.id}/${cour.module}`}>
                                            <IconButton aria-label="delete" >
                                                <ArrowCircleRightIcon sx={{ color: '#68B984' }} />
                                            </IconButton>
                                        </Link>
                                    </div>
                                </Grid>
                            </Grid>
                        )
                    })
                    :
                    <>
                        <Vide />
                    </>

                }

            </Grid>
        </>







    );
}

export default LestActive;