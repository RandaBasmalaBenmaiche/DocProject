import React from 'react';
import { Link, useParams } from "react-router-dom";
import { hexToRgb, Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { Link as LinkS } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import SinglePage from './displaCours';
import VdioYoutube from './vdio';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import YouTube from 'react-youtube';
import Player from '../audio/audio';
import samplePDF from "./Sampleee.pdf";
import LaunchIcon from '@mui/icons-material/Launch';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getModuleCoures, reset } from '../../../../features/cours/coursSlice';
import { getModule, reset as resetNodule } from '../../../../features/modules/modulesSlice';
import axios from 'axios';
import { API_BASE, API_ROOT } from '../../../../constants';






export default function Cours() {
  const opts = {
    height: '200',
    width: '100%',
  };
  const params = useParams()
  const userToken = JSON.parse(localStorage.getItem('user'))
  console.log(userToken.token)
  // const [display,setDisplay] = useState(false)
  const [loading, setLoading] = useState(true)
  const [module, setModule] = useState({})
  const [cours, setCours] = useState({})
  const [CoursError, setCoursError] = useState()
  const [ModuleError, setModuleError] = useState()

  const APIcall = async () => {
    await axios.get(`${API_BASE}/coure/` + params.id, { headers: { authorization: `Bearer ${userToken.token}` } }).then(respons => setCours(respons.data)).catch(error => { console.log(error.message); setCoursError(error.message) })
    await axios.get(`${API_BASE}/module/` + params.module, { headers: { authorization: `Bearer ${userToken.token}` } }).then(respons => setModule(respons.data)).catch(error => { console.log(error.message); setModuleError(error.message) })
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
    console.log(params.id)
    console.log(module)
    console.log(cours)
  }, [loading, CoursError, ModuleError, params.id])

  const history = (video, videoTitle,annee, id, cour) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    if (localStorage.getItem('video')) {
      let data = localStorage.getItem('video')
      const newdata = JSON.parse(data)
      const indexId = newdata.findIndex((item) => item.id === video)
      if (indexId != '-1') {
        const indexDate = newdata[indexId].findIndex((item) => item.id === today)
      }
      newdata.push({ id: video,annee:annee, module: id, name: videoTitle, date: today, coure: cour })
      console.log(newdata)
      localStorage.setItem('video', JSON.stringify(newdata))
    } else {
      localStorage.setItem('video', JSON.stringify([{ id: video,annee:annee, module: id, name: videoTitle, date: today, coure: cour }]))
    }
  }
  const historyaud = (audioTitle,annee, id) => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    if (localStorage.getItem('audio')) {
      let data = localStorage.getItem('audio')
      const newdata = JSON.parse(data)
      const indexId = newdata.findIndex((item) => item.data === audioTitle)
      if (indexId != '-1') {
        const indexDate = newdata[indexId].findIndex((item) => item.data === today)
      }
      newdata.push({ module: id,annee:annee, name: audioTitle, date: today })
      console.log(newdata)
      localStorage.setItem('audio', JSON.stringify(newdata))
    } else {
      localStorage.setItem('audio', JSON.stringify([{ module: id,annee:annee, name: audioTitle, date: today }]))
    }
  }

  if (loading) {
    return <p>loading data ...</p>
  }
  return (

    <Box sx={{ flexGrow: 1 }}>

      <Grid container spacing={2} sx={{ display: 'flex', p: 2, paddingBlock: 1 }}>
        <Toolbar />

        <Grid container item md={12} xs={12}   >
          <Grid item sm={12} xs={12}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Link to={"/gold/moduleInfo/" + params.module} className='Links'>
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
                  <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold',paddingBlock: 0, paddingInline: 1.5, borderRadius: 2, transition: '0.3s', '&:hover': { color: '#635985', bgcolor: 'white', boxShadow: '1px 1px 4px rgba(0,0,0,0.15)' }, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                    {module.name}
                  </Typography>
                </LinkS>
              </Link>
              <LinkS
                underline="none"

                sx={{
                  fontFamily: 'Bahnschrift SemiBold',
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
                {cours.name}
                <a href={`${API_ROOT}/uploads/` + cours.file.data} target="_blank" style={{ color: '#ff5757', textDecoration: 'none' }}>

                  <LaunchIcon sx={{ color: '#ff5757', ml: 1 / 2 }} />


                </a>
              </LinkS>

            </Breadcrumbs>
          </Grid>

        </Grid>


        <Grid container item xs={12} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={12} md={8} sx={{ paddingRight: 0, mb: { xs: 4, md: 0 } }}>
            <SinglePage pdf={cours.file.data} />
          </Grid>
          <Grid container item xs={12} sm={12} md={4} sx={{ display: 'block', paddingInline: 2 }} direction='column' spacing={4}
            justifyContent="flex-start"
            alignItems="flex-start"

          >

            <Grid item xs={12} >
              <Typography variant="h5" sx={{fontFamily: 'Bahnschrift SemiBold', mb: 2, '&::first-letter': { backgroundColor: '#ff5757', p: 1 / 2, color: 'white', borderRadius: 1 / 2 } }}>
                Audio
              </Typography>
              <Player onPlay={() => { historyaud(cours.audio.data,module.annee, params.module) }} audio={`${API_ROOT}/uploads/` + cours.audio.data} title="cours" desc="24/10/2023" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontFamily: 'Bahnschrift SemiBold',mt: 2, mb: 2, '&::first-letter': { backgroundColor: '#ff5757', p: 1 / 2, color: 'white', borderRadius: 1 / 2 } }}>
                Védio
              </Typography>
              <Grid item
                sx={{
                  maxHeight: { xs: 'auto', md: '45vh' },
                  overflowY: 'auto',
                  
                  '&::-webkit-scrollbar': {
                    width: '0rem',

                    color: '#ff5757'
                  }
                }}>
                {cours.video.map(video => {
                  return (
                    <>
                      <YouTube onPlay={() => history(video.videoID, video.videoTitle, module.annee, params.module, params.id)} videoId={video.videoID} opts={opts} />
                      <Typography variant="body2" sx={{ fontFamily: 'Bahnschrift SemiBold',mt: 1, mb: 3, fontSize: '20px' }}>
                        {video.videoTitle}
                      </Typography>
                    </>
                  )
                })}
              </Grid>

            </Grid>

          </Grid>
        </Grid>
      </Grid>
    </Box >
  );
}