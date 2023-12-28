import Grid from '@mui/material/Grid';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

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





const drawerWidth = 240;


const LestActive = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const delet = ()=>{
        $('#item').parent().parent().parent().css("display","none");
    }



    return (




        <>
            <Grid item xs={12}>
                <Typography variant="h5" sx={{ mb: 0, paddingInlineEnd: 5, '&::first-letter': { color: '#b33d95', fontWeight: 'bold' } }}>
                    Dernier Activité  
                </Typography>
            </Grid>
            <Grid container item xs={12} columnGap={3} rowGap={1} sx={{
                pt: 2,
            }}>
                <Grid  item xs={5.5} sm={2} md={2}
                    sx={{
                        overflow: 'hidden',
                        paddingBlock: 4,
                        backgroundColor: '#fbdef2',
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(245, 245, 245,1)',
                        borderRadius: 5,
                        transition: '0.3s',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 6px  inset,rgba(0, 0, 0, 0.05) 3px 3px 6px ',
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
                    <Typography sx={{ fontSize: 16, fontWeight: '600' }} >
                        Cours 1
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

                            <IconButton aria-label="delete" id="item"  onClick={delet}>
                                <DeleteForeverIcon sx={{ color: '#F55050' }} />
                            </IconButton>

                        </div>
                        <div style={{ flex: '1 0 50%' }}>
                            <IconButton aria-label="delete" >
                                <ArrowCircleRightIcon sx={{ color: '#68B984' }} />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={5.5} sm={2} md={2}
                    sx={{
                        overflow: 'hidden',
                        paddingBlock: 4,
                        backgroundColor: '#fbdef2',
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(245, 245, 245,1)',
                        borderRadius: 5,
                        transition: '0.3s',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 6px  inset,rgba(0, 0, 0, 0.05) 3px 3px 6px ',
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
                    <Typography sx={{ fontSize: 16, fontWeight: '600' }} >
                        Cours 1
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

                            <IconButton aria-label="delete" >
                                <DeleteForeverIcon sx={{ color: '#F55050' }} />
                            </IconButton>

                        </div>
                        <div style={{ flex: '1 0 50%' }}>
                            <IconButton aria-label="delete" >
                                <ArrowCircleRightIcon sx={{ color: '#68B984' }} />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={5.5} sm={2} md={2}
                    sx={{
                        overflow: 'hidden',
                        paddingBlock: 4,
                        backgroundColor: '#fbdef2',
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(245, 245, 245,1)',
                        borderRadius: 5,
                        transition: '0.3s',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 6px  inset,rgba(0, 0, 0, 0.05) 3px 3px 6px ',
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
                    <Typography sx={{ fontSize: 16, fontWeight: '600' }} >
                        Cours 1
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

                            <IconButton aria-label="delete" >
                                <DeleteForeverIcon sx={{ color: '#F55050' }} />
                            </IconButton>

                        </div>
                        <div style={{ flex: '1 0 50%' }}>
                            <IconButton aria-label="delete" >
                                <ArrowCircleRightIcon sx={{ color: '#68B984' }} />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                <Grid item xs={5.5} sm={2} md={2}
                    sx={{
                        overflow: 'hidden',
                        paddingBlock: 4,
                        backgroundColor: '#fbdef2',
                        alignItems: 'center',
                        textAlign: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(245, 245, 245,1)',
                        borderRadius: 5,
                        transition: '0.3s',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 6px  inset,rgba(0, 0, 0, 0.05) 3px 3px 6px ',
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
                    <Typography sx={{ fontSize: 16, fontWeight: '600' }} >
                        Cours 1
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

                            <IconButton aria-label="delete" >
                                <DeleteForeverIcon sx={{ color: '#F55050' }} />
                            </IconButton>

                        </div>
                        <div style={{ flex: '1 0 50%' }}>
                            <IconButton aria-label="delete" >
                                <ArrowCircleRightIcon sx={{ color: '#68B984' }} />
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>


            </Grid>
        </>







    );
}

export default LestActive;