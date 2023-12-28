
import { Link } from "react-router-dom";
import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import { Typography } from '@mui/material';
import { Link as LinkS } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SourceIcon from '@mui/icons-material/Source';
import IconButton from '@mui/material/IconButton';
// import "./../../modules.css";

import Breadcrumbs from '@mui/material/Breadcrumbs';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import YouTube from 'react-youtube';
import VdioY from "./vdio";

// corion


// fin cordion

const VdioPlayer = () => {


    return (

        <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={2} sx={{ display: 'flex', p: 2, paddingBlock: 4 }}>
                <Toolbar />




                <Grid container item md={12} xs={12}   >
                    <Grid item sm={10} xs={12}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            <Link to={"/gold/mesModule"} className='Links'>
                                <LinkS
                                    underline="none"

                                    sx={{
                                        mr: 2,
                                        paddingBlock: 1,
                                        paddingInline: 3,
                                        borderRadius: 4,
                                        fontSize: 12,
                                        transition: '0.3s',
                                        backgroundColor: '#fbdef2',
                                        color: '#635985',
                                        border: '1px solid rgb(252, 252, 252,1)',
                                        boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 6px  inset,rgba(0, 0, 0, 0.2) 3px 3px 6px ',
                                        '&:hover': {
                                            color: '#635985',
                                        }

                                    }}
                                >
                                    Modules
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
                                Module name
                            </LinkS>

                        </Breadcrumbs>
                    </Grid>

                </Grid>
                <Toolbar />
                <Grid xs={12} sx={{ display: 'block', justifyContent: 'center' ,paddingInline:'25%'}}>
                   <VdioY />
                </Grid>

            </Grid>
        </Box >

    );
}


export default VdioPlayer;