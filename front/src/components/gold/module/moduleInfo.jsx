
import { Link, useParams } from "react-router-dom";
import { Skeleton, Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Link as LinkS } from '@mui/material';

import IconButton from '@mui/material/IconButton';
// import "./../../modules.css";

import Breadcrumbs from '@mui/material/Breadcrumbs';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Chip from '@mui/material/Chip';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import img from "./logo192.png";
import axios from "axios";
import { API_BASE, API_ROOT } from "../../../constants";


const InfoModuleG = () => {
    const userToken = JSON.parse(localStorage.getItem('user'))
    console.log(userToken.token)

    const [loading, setLoading] = useState(true)
    const [module, setModule] = useState({})
    const [cours, setCours] = useState([])
    const [CoursError, setCoursError] = useState()
    const [ModuleError, setModuleError] = useState()
    const params = useParams()

    const APIcall = async () => {
        await axios.get(`${API_BASE}/coure/couremodule/` + params.id, { headers: { authorization: `Bearer ${userToken.token}` } }).then(respons => setCours(respons.data)).catch(error => { console.log(error.message); setCoursError(error.message) })
        await axios.get(`${API_BASE}/module/` + params.id, { headers: { authorization: `Bearer ${userToken.token}` } }).then(respons => setModule(respons.data)).catch(error => { console.log(error.message); setModuleError(error.message) })
        setLoading(false)
    }


    console.log('render')
    useEffect(() => {
        console.log('in use effect')
        if (CoursError) {
            console.log(CoursError)
        }
        if (ModuleError) {
            console.log(ModuleError)
        }

        APIcall()
        console.log('before api call')

        console.log('after apicall')
        console.log(params.id)
        console.log(module)
        console.log(cours)

    }, [loading, CoursError, ModuleError, params.id])

    const history = (id,name,annee,Id) => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;
        
        if (localStorage.getItem('cours')) {
            let data = localStorage.getItem('cours')
            const newdata = JSON.parse(data)
            newdata.push({id : id,annee:annee, module:Id, name: name, date : today})
            console.log(newdata)
            localStorage.setItem('cours',JSON.stringify(newdata))
        } else {
            localStorage.setItem('cours',JSON.stringify([{id : id,annee:annee, module:Id, name: name, date : today}]))
        }
    }

    // if (loading) {
    //     return <p>loading data ...</p>
    // }
    const WatingCard = () => {
        return (
            <>
                <Grid item xs={12} sm={5.9} md={3.9} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height:150, borderRadius: 4 }} />
                </Grid>
                <Grid item xs={12} sm={5.9} md={3.9} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height:150, borderRadius: 4 }} />
                </Grid>
                <Grid item xs={12} sm={5.9} md={3.9} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height:150, borderRadius: 4 }} />
                </Grid>
                <Grid item xs={12} sm={5.9} md={3.9} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height:150, borderRadius: 4 }} />
                </Grid>
                <Grid item xs={12} sm={5.9} md={3.9} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height:150, borderRadius: 4 }} />
                </Grid>
                <Grid item xs={12} sm={5.9} md={3.9} >
                    <Skeleton variant="rectangular" sx={{ mb: 1, width: '100%', mt: 0, height:150, borderRadius: 4 }} />
                </Grid>
            </>
        )
    }
    const CourCard = ({ cours }) => {
        return (
            <Grid container item xs={12} sm={5.9} md={3.9}
                sx={{
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: 'white',
                    p: 1,
                    borderRadius: 5,
                    transition:'.3s',
                    border:"1px solid transparent",
                    boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                   
                    '& .icons': {

                        top: '-60px',
                        transition: '.3s',
                    },
                    '&:hover': {
                        boxShadow: " rgba(0, 0, 0, 0.3) 1.95px 1.95px 2.6px",border:"1px solid silver",
                        '& .icons': {

                            top: '-5px',
                        }
                    },

                }}>

                <Grid item xs={4} sx={{ p: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                    <img
                        style={{ borderRadius: '50%',width:'100%' }}
                        // height={100}
                        // width={100}
                        src={`${API_ROOT}/uploads/` + module.file.data}
                        alt={cours.name}
                        loading="lazy"
                    />
                </Grid>
                <Grid xs={8} sx={{ p: 1 / 2 }}>
                    <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold','&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                        {cours.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'Bahnschrift SemiBold',opacity: '0.8', minHeight: 75, maxHeight: 75, maxWidth: '90%', overflow: 'hidden' }}>
                        {cours.desc}
                    </Typography>
                    <div>
                        {cours.file ? <Chip label="PDF" sx={{ fontFamily: 'Bahnschrift SemiBold',color: '#443C68', fontWeight: '400', mr: 1, paddingInline: 1 / 2, maxHeight: 25, boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px " }} /> : null}
                        {cours.video[0] != null ? <Chip label="Védio" sx={{ fontFamily: 'Bahnschrift SemiBold',color: '#443C68', fontWeight: '400', mr: 1, paddingInline: 1 / 2, maxHeight: 25, boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px " }} /> : null}
                        {cours.audio ? <Chip label="Audio" sx={{ fontFamily: 'Bahnschrift SemiBold',color: '#443C68', fontWeight: '400', mr: 1, paddingInline: 1 / 2, maxHeight: 25, boxShadow: " rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px " }} /> : null}
                    </div>

                </Grid>
                <div className="icons"
                    style={{
                        borderBottomLeftRadius: '5px',
                        position: 'absolute',
                        width: 'auto',
                        height: 'auto',
                        backgroundColor: 'transparent',
                        display: 'flex',
                        padding: '0.5rem',

                        right: 0
                    }}>
                    <Link to={"/gold/cours/" + cours._id +"/"+ params.id} className='Links'>
                        <IconButton onClick={()=>history(cours._id, cours.name,module.annee, params.id)} sx={{ textAlign: 'center' }} >
                            <TextSnippetIcon sx={{ fontSize: 30, color: '#ff5757' }} />
                        </IconButton>
                    </Link>
                </div>
            </Grid>
        );
    }

    return (

        <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={2} sx={{ display: 'flex', p: 2, paddingBlock: 4 }}>
                <Toolbar />




                <Grid container item md={12} xs={12}   >
                    <Grid item md={10} sm={8} xs={6}>

                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            <Link to={"/gold/mesModules/"} className='Links'>
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
                                    <Typography variant="h6" sx={{fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 2, borderRadius: 2, transition: '0.3s', '&:hover': { color: '#635985', bgcolor: 'white', boxShadow: '1px 1px 4px rgba(0,0,0,0.15)' }, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                        Modules
                                    </Typography>
                                </LinkS>
                            </Link>
                            <LinkS
                                underline="none"

                                sx={{
                                    display: { xs: 'none', sm: 'inline-block' },
                                    fontFamily: 'Bahnschrift SemiBold',
                                    paddingInline: 1,
                                    fontWeight: 'bold',
                                    borderRadius: 4,
                                    fontSize: 18,
                                    transition: '0.3s',
                                    // backgroundColor: '#fbdef2',
                                    color: '#443C68',
                                    // border: '1px solid rgb(252, 252, 252,1)',
                                    // boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 6px  inset,rgba(0, 0, 0, 0.2) 3px 3px 6px ',

                                    '&:hover': {
                                        color: '#443C68',
                                    },


                                }}
                            >
                                {module.name}
                            </LinkS>

                        </Breadcrumbs>
                    </Grid>
                    <Grid item md={2} sm={4} xs={6}>
                        <Link to={"/gold/QuizeC/"+module._id} className='Links'>
                            <IconButton


                                sx={{
                                    paddingInline: 2,
                                    float: 'right',
                                    fontSize: 14,
                                    borderRadius: 2,
                                    fontWeight: '600',
                                    transition: '0.5s',
                                    backgroundColor: ' #443C68',
                                    color: 'white',
                                    fontFamily: 'Bahnschrift SemiBold',
                                    border: '1px solid rgb(252, 252, 252,1)',
                                    boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 6px  inset,rgba(0, 0, 0, 0.1) 3px 3px 6px ',
                                    '&:hover': {
                                        color: '#635985',
                                        backgroundColor: ' #ffe4e4',
                                        boxShadow: 'rgba(0, 0, 0, 0.2) 2px 2px 6px  inset,rgba(0, 0, 0, 0.1) 3px 3px 6px ',

                                    }
                                }}
                                variant="contained">
                                <AddIcon sx={{fontFamily: 'Bahnschrift SemiBold', mr: 1 }} />Ajouter QCM
                            </IconButton>
                        </Link>
                    </Grid>
                </Grid>

                <Grid container item columnGap={1} rowGap={3} md={12} xs={12} sx={{ p: 0, mt: 2 }}  >
                    {/* cours */}
                    {loading?<><WatingCard /></>:cours.filter(item => item.del !== 1).map(cours =><CourCard cours={cours} />)}
                    {/* fin cours */}

                </Grid>
            </Grid>
        </Box >

    );
}


export default InfoModuleG;