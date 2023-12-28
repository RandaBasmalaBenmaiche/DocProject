import { Link } from "react-router-dom";
import { Hidden, InputLabel, Skeleton, Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';
import { Typography } from '@mui/material';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SourceIcon from '@mui/icons-material/Source';
import IconButton from '@mui/material/IconButton';
// import "./../../modules.css";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

import TextField from '@mui/material/TextField';
import { Link as LinkS } from '@mui/material';


import Breadcrumbs from '@mui/material/Breadcrumbs';
// import "./../../../index.css";
// import img from "./logo192.png";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import axios from "axios";
import { API_BASE } from "../../../../constants";

const CoursA = () => {
  //token 
  const token = JSON.parse(localStorage.getItem('user'))
  // annee data
  const [anneeData, setanneeData] = React.useState(null)
  const [loadinganneeData, setLoadinganneeData] = React.useState(true)
  const [successanneeData, setSuccessanneeData] = React.useState(null)
  const [erroranneeData, setErroranneeData] = React.useState(null)
  // modules data
  const [Modulesdata, setModulesData] = React.useState(null)
  const [loadingModulesData, setLoadingModulesData] = React.useState(true)
  const [successModulesData, setSuccessModulesData] = React.useState(null)
  const [errorModulesData, setErrorModulesData] = React.useState(null)
  //cours data
  const [Coursdata, setCoursData] = React.useState(null)
  const [loadingCoursData, setLoadingCoursData] = React.useState(true)
  const [successCoursData, setSuccessCoursData] = React.useState(null)
  const [errorCoursData, setErrorCoursData] = React.useState(null)

  // module pour option
  const [moduleId, setmoduleId] = React.useState('')
  const [moduleFilterId, setmoduleFilterId] = React.useState(null)
  // Annee pour option
  const [year, setYear] = React.useState('')
  const [anneeScolaire, setanneeScolaire] = React.useState('')
  const handleChangeYear = (e) => {
    setYear(e.target.value)
  }
  const handleChangeAnneeScolaire = (e) => {
    setanneeScolaire(e.target.value)
  }
  const handleChangeModuleId = (e) => {
    setmoduleId(e.target.value)
  }
  const handleChangeModuleFilterId = (e) => {
    setmoduleFilterId(e.target.value)
  }
  // post data
  const [courName, setCourName] = React.useState('')
  const [courDesc, setCourDesc] = React.useState('')
  const [courWilaya, setCourWilaya] = React.useState('')
  const [courAudio, setCourAudio] = React.useState('')
  const [courPdf, setCourPdf] = React.useState('')
  const [courVideo, setCourVideo] = React.useState({ videoID: '', videoTitle: '' })
  const [successPost, setSuccessPost] = React.useState(null)
  const [loadingPost, setLoadingPost] = React.useState(false)
  const [errorPost, setErrorPost] = React.useState(null)
  // edit data
  const [courNameUpdate, setCourNameUpdate] = React.useState('')
  const [courAnneeUpdate, setCourAnneeUpdate] = React.useState('')
  const [courWilayaUpdate, setCourWilayaUpdate] = React.useState('')
  const [courModuleUpdate, setCourModuleUpdate] = React.useState('')
  const [courDescUpdate, setCourDescUpdate] = React.useState('')
  const [courAudioUpdate, setCourAudioUpdate] = React.useState('')
  const [courPdfUpdate, setCourPdfUpdate] = React.useState('')
  const [courVideoUpdate, setCourVideoUpdate] = React.useState('')
  const [successUpdate, setSuccessUpdate] = React.useState(null)
  const [loadingUpdate, setLoadingUpdate] = React.useState(false)
  const [errorUpdate, setErrorUpdate] = React.useState(null)
  //delete data
  const [successDelete, setSuccessDelete] = React.useState(null)
  const [loadingDelete, setLoadingDelete] = React.useState(false)
  const [errorDelete, setErrorDelete] = React.useState(null)

  // dialog 
  const [openn, setOpenn] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelet, setOpenDelet] = React.useState(false);
  const [Value, setValue] = React.useState();
  const [id, setId] = React.useState();
  //post cours
  const handelNameChange = (e) => {
    setCourName(e.target.value)
  }
  const handelDescChange = (e) => {
    setCourDesc(e.target.value)
  }
  const handelWilayaChange = (e) => {
    setCourWilaya(e.target.value)
  }
  const handelAudioChange = (e) => {
    setCourAudio(e.target.files[0])
  }
  const handelPdfChange = (e) => {
    setCourPdf(e.target.files[0])
  }
  const handelVideoIdChange = (e) => {
    setCourVideo({ ...courVideo, videoID: e.target.value })
  }
  const handelVideoNameChange = (e) => {
    setCourVideo({ ...courVideo, videoTitle: e.target.value })
  }
  const AddCours = async () => {
    const data = new FormData()
    data.append('name', courName)
    data.append('module', moduleId)
    data.append('wilaya', courWilaya)
    data.append('annee', anneeScolaire)
    data.append('desc', courDesc)
    data.append('video', JSON.stringify([courVideo]))
    data.append('file', courPdf)
    data.append('audio', courAudio)
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'accept': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }
    await axios.post(`${API_BASE}/coure`, data, config).then(res => {
      setCourName('')
      setCourWilaya('')
      setCourPdf(null)
      setCourAudio(null)
      setCourVideo({ videoID: '', videoTitle: '' })
      setCourDesc('')
      setanneeScolaire('')
      setmoduleId('')
      setSuccessPost(true)
      setErrorPost(false)
      setLoadingPost(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorPost(error.response.data)
      setSuccessPost(false)
      setLoadingPost(false)
    })
  }
  //update cours
  const handelNameUpdateChange = (e) => {
    setCourNameUpdate(e.target.value)
  }
  const handelAnneeUpdateChange = (e) => {
    setCourAnneeUpdate(e.target.value)
  }
  const handelWilayaUpdateChange = (e) => {
    setCourWilayaUpdate(e.target.value)
  }
  const handelModuleUpdateChange = (e) => {
    setCourModuleUpdate(e.target.value)
  }
  const handelDescUpdateChange = (e) => {
    setCourDescUpdate(e.target.value)
  }
  const handelAudioUpdateChange = (e) => {
    setCourAudioUpdate(e.target.files[0])
  }
  const handelPdfUpdateChange = (e) => {
    setCourPdfUpdate(e.target.files[0])
  }
  const handelVideoIdUpdateChange = (e) => {
    setCourVideoUpdate({ ...courVideo, videoID: e.target.value })
  }
  const handelVideoNameUpdateChange = (e) => {
    setCourVideoUpdate({ ...courVideo, videoTitle: e.target.value })
  }
  const EditCour = async (name, annee, wilaya, module, desc, video, file, audio, id) => {
    const data = new FormData()
    data.append('name', name)
    data.append('wilaya', wilaya.toLowerCase())
    data.append('module', module)
    data.append('annee', annee)
    data.append('desc', desc)
    if (video) {
      data.append('video', JSON.stringify([video]))
    }
    if (file) {
      data.append('file', file)
    }
    if (audio) {
      data.append('audio', audio)
    }

    for (var [key, value] of data.entries()) {
      console.log(key, value);
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'accept': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    };
    await axios.patch(`${API_BASE}/coure/` + id, data, config).then(res => {
      setSuccessUpdate(true)
      setErrorUpdate(false)
      setLoadingUpdate(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorUpdate(error.response.data)
      setSuccessUpdate(false)
      setLoadingUpdate(false)
    })
  }

  //delte
  const DeleteCour = async (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${token.token}`
      }
    }
    await axios.delete(`${API_BASE}/coure/` + id, config).then(res => {
      setSuccessDelete(true)
      setLoadingDelete(false)
      setErrorDelete(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorDelete(error.response.data)
      setSuccessDelete(false)
      setLoadingDelete(false)
    })
  }

  //Post
  const handleClickOpen = () => {
    setOpenn(true);
  }
  const onClickValidPost = () => {
    setLoadingPost(true)
    AddCours()
  }
  const handleClose = () => {
    console.log(courVideo)
    setCourName('')
    setCourPdf(null)
    setCourAudio(null)
    setCourVideo({ videoID: '', videoTitle: '' })
    setCourDesc('')
    setanneeScolaire('')
    setmoduleId('')
    setSuccessPost(false)
    setLoadingPost(false)
    setErrorPost(false)
    setOpenn(false);
  }
  //edit
  const handleClickOpenEdit = (name, annee, wilaya, module, desc, videoID, videoTitle, id) => {
    setCourNameUpdate(name)
    setCourWilayaUpdate(wilaya)
    setCourAnneeUpdate(annee)
    setCourModuleUpdate(module)
    setCourDescUpdate(desc)
    setCourVideoUpdate({ videoID: videoID, videoTitle: videoTitle })
    setId(id);
    setOpenEdit(true);
  }
  const onClickValidEdit = (name, annee, wilaya, module, desc, video, file, audio, id) => {
    setLoadingUpdate(true)
    EditCour(name, annee, wilaya, module, desc, video, file, audio, id)
  }
  const handleCloseEdit = () => {
    setCourNameUpdate('')
    setCourAnneeUpdate('')
    setCourModuleUpdate('')
    setCourDescUpdate('')
    setCourVideoUpdate({ videoID: '', videoTitle: '' })
    setId('');
    setSuccessUpdate(false)
    setErrorUpdate(false)
    setLoadingUpdate(false)
    setOpenEdit(false);
  }
  // delete
  const handleClickOpenDelet = (x, y) => {
    setValue(x)
    setId(y)
    setOpenDelet(true);
  }
  const onClickValidDelete = (id) => {
    setLoadingDelete(true)
    DeleteCour(id)
  }
  const handleCloseDelet = () => {
    setValue('')
    setId('')
    setSuccessDelete(false)
    setErrorDelete(false)
    setLoadingDelete(false)
    setOpenDelet(false);
  }
  //fin dialog

  //fetch data
  const ApiCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    };
    await axios.get(`${API_BASE}/annee`, config).then(res => {
      setanneeData(res.data)
      setLoadinganneeData(false)
      setSuccessanneeData(true)
      setErroranneeData(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErroranneeData(error.response.data)
      setSuccessanneeData(false)
      setLoadinganneeData(false)
    })
  }
  const ApiModuleCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    };
    await axios.get(`${API_BASE}/module`, config).then(res => {
      setModulesData(res.data)
      setLoadingModulesData(false)
      setErrorModulesData(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorModulesData(error.response.data)
      setLoadingModulesData(false)
    })
  }
  const CoursFetch = async (moduleId, Annee) => {
    const idmodule = moduleId ? moduleId : 'undefined'
    const annee = Annee ? Annee : 'undefined'
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    };
    await axios.get(`${API_BASE}/coure/couremoduleannee/` + idmodule + '/' + annee, config).then(res => {
      setCoursData(res.data)
      setSuccessCoursData(true)
      setLoadingCoursData(false)
      setErrorCoursData(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data ? error.response.data : null)
      setErrorCoursData(error.response.data)
      setSuccessCoursData(false)
      setLoadingCoursData(false)
    })
  }
  const WatingAnne = () => {
    return (
      <>
        <Grid xs={12} >
          <Skeleton variant="rectangular" sx={{ width: '100%', mt: -1, height: 50, borderRadius: 2 }} />
        </Grid>
      </>
    )
  }
  const WatingModule = () => {
    return (
      <>
        <Grid container item xs={12} columnGap={1} sx={{ px: 2, py: 1 }} >
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
        </Grid>
        <Grid container item xs={12} columnGap={1} sx={{ px: 2, py: 1 }} >
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
        </Grid>
        <Grid container item xs={12} columnGap={1} sx={{ px: 2, py: 1 }} >
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={2.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
        </Grid>

      </>
    )
  }
  React.useEffect(() => {
    ApiCall()
    ApiModuleCall()
  }, [])
  React.useEffect(() => {
    CoursFetch(moduleFilterId, year)
    console.log(Coursdata)
  }, [moduleFilterId, year, successUpdate, successPost, successDelete])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar />
      <Grid container spacing={4} sx={{ display: 'flex', p: 2, paddingBlock: 4, }}>
        <Grid item xs={12} sm={7} md={4}>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link to={"/admin"} className='Links'>
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
                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 1, borderRadius: 2, transition: '0.3s', '&:hover': { color: '#635985', bgcolor: 'white', boxShadow: '1px 1px 4px rgba(0,0,0,0.15)' }, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                  Home
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
              Cours
            </LinkS>

          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} sm={5} md={4} sx={{ p: 0 }}>
          {
            loadinganneeData ? <><WatingAnne /></> : erroranneeData ?
              <>
                {erroranneeData}
              </>
              :
              <>
                <Grid xs={12} sx={{ bgcolor: 'white' }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">annee scolaire</InputLabel>
                    <Select
                      sx={{ bgcolor: 'white' }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={year}
                      label="annee scolaire"
                      onChange={handleChangeYear}
                    >
                      <MenuItem value={''}>All</MenuItem>
                      {anneeData ? anneeData.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> }) : null}
                    </Select>
                  </FormControl>
                </Grid>
              </>
          }

        </Grid>

        <Grid item xs={12} sm={5} md={4} sx={{ p: 0 }}>
          {
            loadingModulesData ? <><WatingAnne /></> : errorModulesData ?
              <>
                {errorModulesData}
              </>
              :
              <>
                <Grid xs={12} sx={{ bgcolor: 'white' }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Module</InputLabel>
                    <Select
                      sx={{ bgcolor: 'white' }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={moduleFilterId}
                      label="Module"
                      onChange={handleChangeModuleFilterId}
                    >
                      <MenuItem value={''}>All</MenuItem>
                      {/* filter((item, index) => index === Modulesdata.findIndex(obj => obj.name === item.name)) */}
                      {Modulesdata ? Modulesdata.filter(item => item.del !== 1).map(module => { return <MenuItem key={module._id} value={module._id}>{module.name}</MenuItem> }) : null}
                    </Select>
                  </FormControl>
                </Grid>
              </>
          }

        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <List sx={{ width: '100%', bgcolor: 'background.paper', p: 0, borderRadius: 2, overflowX: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
            <ListItem
              sx={{ bgcolor: '#ff5757', color: 'white', p: 2 }}
              secondaryAction={
                <IconButton onClick={handleClickOpen} aria-label="comment" sx={{ ml: 2, bgcolor: 'white', color: '#ff5757', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ff5757', boxShadow: 'rgba(0, 0, 0, 0.3) 1.95px 1.95px 2.6px inset' } }}>
                  <NoteAddIcon />
                </IconButton>
              }
            >
              <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 1, borderRadius: 2, transition: '0.3s', }}>
                Liste Cours
              </Typography>

            </ListItem>
            {
              loadingCoursData ? <><WatingModule /></>
                : errorCoursData ? <>{errorCoursData}</>
                  : Coursdata.length > 0 ?
                    Coursdata.filter(item => item.del !== 1).map(cour => {
                      return (
                        <ListItem
                          sx={{ paddingInline: 2, paddingBlock: 2, display: { xs: 'block', sm: 'flex' }, '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }, }}
                          secondaryAction={
                            <>
                              <IconButton onClick={() => { handleClickOpenEdit(cour.name, cour.annee, cour.wilaya, cour.module, cour.desc, cour.video[0].videoID, cour.video[0].videoTitle, cour._id) }} aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                                <SettingsRoundedIcon />
                              </IconButton>
                              <IconButton onClick={() => (handleClickOpenDelet(cour.name, cour._id))} aria-label="delet" sx={{ ml: 2, bgcolor: '#ff3434', color: 'white', transition: '.3s', '&:hover': { color: '#ff3434', bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                                <DeleteForeverRoundedIcon />
                              </IconButton>
                            </>
                          }
                        >
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', textOverflow: 'ellipsis', maxHeight: 25, overflow: 'Hidden' }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={cour.annee} secondary={'Année'} sx={{ width: { xs: '50%', sm: '15%' }, mb: { xs: 2, sm: 0 } }} />
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', textOverflow: 'ellipsis', maxHeight: 25, overflow: 'Hidden' }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondary={`cour titre`} primary={cour.name} sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', textOverflow: 'ellipsis', maxHeight: 25, overflow: 'Hidden' }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondary={`wilaya`} primary={cour.wilaya} sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', textOverflow: 'ellipsis', maxHeight: 25, overflow: 'Hidden' }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondary={`PDF`} primary={cour.file.data} sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', textOverflow: 'ellipsis', maxHeight: 25, overflow: 'Hidden' }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondary={`Audio`} primary={cour.audio.data} sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', textOverflow: 'ellipsis', maxHeight: 25, overflow: 'Hidden' }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondary={`Védio`} primary={cour.video[0].videoTitle} sx={{ width: { xs: '50%', sm: '25%' }, mb: { xs: 2, sm: 0 } }} />
                        </ListItem>
                      )
                    })
                    :
                    <><Alert severity="warning" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>Erreur — Aucun Cour trouvé!</Alert></>
            }

            <Divider />

          </List>
        </Grid>

      </Grid>

      {/* add dialog */}
      <Dialog
        open={openn}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>
          {"Ajouter Cour"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Name
              </Typography>
              <TextField onChange={(e) => { handelNameChange(e) }} value={courName} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Name" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Année
              </Typography>
              <FormControl fullWidth>
                {
                  loadinganneeData ? <>wait for data</> : erroranneeData ?
                    <>
                      {erroranneeData}
                    </>
                    :
                    <>
                      <InputLabel id="demo-simple-select-label">annee scolaire</InputLabel>
                      <Select
                        sx={{ bgcolor: 'white', mb: 2 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={anneeScolaire}
                        label="annee scolaire"
                        onChange={handleChangeAnneeScolaire}
                      >
                        {anneeData ? anneeData.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> }) : null}
                      </Select>
                    </>
                }
              </FormControl>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Wilaya
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Willaya</InputLabel>
                <Select

                  sx={{ bgcolor: 'white', mb: 2 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={courWilaya}
                  label="Module"
                  onChange={(e) => { handelWilayaChange(e) }}
                >
                  <MenuItem value={''} disabled>Willaya</MenuItem>
                  <MenuItem value={'annaba'} >Annaba</MenuItem>
                  <MenuItem value={'setif'} >Sétif</MenuItem>
                </Select>
              </FormControl>
              {/* <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Wilaya
              </Typography>
              <TextField onChange={(e) => { handelWilayaChange(e) }} type={"text"} value={courWilaya} required inputProps={{ accept: ".pdf" }} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="wilaya" /> */}
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Modules
              </Typography>
              <FormControl fullWidth>
                {
                  loadingModulesData ? <>wait for data</> : errorModulesData ?
                    <>
                      {errorModulesData}
                    </>
                    :
                    <>
                      <InputLabel id="demo-simple-select-label">Module</InputLabel>
                      <Select
                        sx={{ bgcolor: 'white', mb: 2 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={moduleId}
                        label="Module"
                        onChange={handleChangeModuleId}
                      >
                        <MenuItem value={''}>All</MenuItem>
                        {/* filter((item, index) => index === Modulesdata.findIndex(obj => obj.name === item.name)) */}
                        {Modulesdata ? Modulesdata.filter(item => item.del !== 1).map(module => { return <MenuItem key={module._id} value={module._id}>{module.name}</MenuItem> }) : null}
                      </Select>
                    </>
                }
              </FormControl>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Description
              </Typography>
              <textarea onChange={(e) => { handelDescChange(e) }} value={courDesc} style={{ marginBottom: '0.5rem', resize: 'none', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh' }} placeholder="Desc ..."></textarea>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Cour
              </Typography>
              <TextField onChange={(e) => { handelPdfChange(e) }} type={"file"} required inputProps={{ accept: ".pdf" }} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="pdf" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Audio
              </Typography>
              <TextField onChange={(e) => { handelAudioChange(e) }} type={"file"} inputProps={{ accept: ".mp3" }} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="audio" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Védio Id
              </Typography>
              <TextField onChange={(e) => { handelVideoIdChange(e) }} value={courVideo.videoID} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Id védio" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Védio name
              </Typography>
              <TextField onChange={(e) => { handelVideoNameChange(e) }} value={courVideo.videoTitle} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Id védio" />
              {loadingPost ? <LinearProgress color="secondary" /> : null}
              {errorPost ? <Alert sx={{ mt: 1 }} severity="error">{errorPost}</Alert> : null}
              {successPost ? <Alert sx={{ mt: 1 }} severity="success">Ce Modules a été ajouter avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'red' }}>Annuler</Button>
          <Button onClick={onClickValidPost} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'green' }}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      {/* fin add dialog */}
      {/* edit dialog */}
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>
          {"Modifier Cour"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Name
              </Typography>
              <TextField onChange={(e) => { handelNameUpdateChange(e) }} value={courNameUpdate} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Id védio" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Année
              </Typography>
              <FormControl fullWidth>
                {
                  loadinganneeData ? <>wait for data</> : erroranneeData ?
                    <>
                      {erroranneeData}
                    </>
                    :
                    <>
                      <InputLabel id="demo-simple-select-label">annee scolaire</InputLabel>
                      <Select
                        sx={{ bgcolor: 'white', mb: 2 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={courAnneeUpdate}
                        label="annee scolaire"
                        onChange={handelAnneeUpdateChange}
                      >
                        {anneeData ? anneeData.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> }) : null}
                      </Select>
                    </>
                }
              </FormControl>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Wilaya
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Willaya</InputLabel>
                <Select

                  sx={{ bgcolor: 'white', mb: 2 }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={courWilaya}
                  label="Module"
                  onChange={(e) => { handelWilayaUpdateChange(e) }}
                >
                  <MenuItem value={''} disabled>Willaya</MenuItem>
                  <MenuItem value={'annaba'} >Annaba</MenuItem>
                  <MenuItem value={'setif'} >Sétif</MenuItem>
                </Select>
              </FormControl>
              {/* <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Wilaya
              </Typography>
              <TextField type={"text"} onChange={(e) => { handelWilayaUpdateChange(e) }} value={courWilayaUpdate} required sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="wilaya" /> */}
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Modules
              </Typography>
              <FormControl fullWidth>
                {
                  loadingModulesData ? <>wait for data</> : errorModulesData ?
                    <>
                      {errorModulesData}
                    </>
                    :
                    <>
                      <InputLabel id="demo-simple-select-label">Module</InputLabel>
                      <Select
                        sx={{ bgcolor: 'white', mb: 2 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={courModuleUpdate}
                        label="Module"
                        onChange={handelModuleUpdateChange}
                      >
                        <MenuItem value={''}>All</MenuItem>
                        {/* filter((item, index) => index === Modulesdata.findIndex(obj => obj.name === item.name)) */}
                        {Modulesdata ? Modulesdata.filter(item => item.del !== 1).map(module => { return <MenuItem key={module._id} value={module._id}>{module.name}</MenuItem> }) : null}
                      </Select>
                    </>
                }
              </FormControl>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Description
              </Typography>
              <textarea onChange={(e) => { handelDescUpdateChange(e) }} value={courDescUpdate} style={{ marginBottom: '0.5rem', resize: 'none', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh' }} placeholder="Question ..."></textarea>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Cour
              </Typography>
              <TextField type={"file"} onChange={(e) => { handelPdfUpdateChange(e) }} required inputProps={{ accept: ".pdf" }} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Année" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Audio
              </Typography>
              <TextField type={"file"} onChange={(e) => { handelAudioUpdateChange(e) }} inputProps={{ accept: ".mp3" }} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Année" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Védio Id
              </Typography>
              <TextField onChange={(e) => { handelVideoIdUpdateChange(e) }} value={courVideoUpdate.videoID} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Id védio" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Védio Name
              </Typography>
              <TextField onChange={(e) => { handelVideoNameUpdateChange(e) }} value={courVideoUpdate.videoTitle} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Id védio" />
              {loadingUpdate ? <LinearProgress color="secondary" /> : null}
              {errorUpdate ? <Alert sx={{ mt: 1 }} severity="error">{errorUpdate}</Alert> : null}
              {successUpdate ? <Alert sx={{ mt: 1 }} severity="success">Ce Modules a été ajouter avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'red' }}>Annuler</Button>
          <Button onClick={() => { onClickValidEdit(courNameUpdate, courAnneeUpdate, courWilayaUpdate, courModuleUpdate, courDescUpdate, courVideoUpdate, courPdfUpdate, courAudioUpdate, id) }} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'green' }}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      {/* fin edit dialog */}
      {/* delet dialog */}
      <Dialog

        open={openDelet}
        onClose={handleCloseDelet}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>
          {"Supprimer Cour"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
              Cour
              </Typography>
              <TextField value={Value} disabled sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Id védio" />
              {loadingDelete ? <LinearProgress color="secondary" /> : null}
              {errorDelete ? <Alert sx={{ mt: 1 }} severity="error">{errorDelete}</Alert> : null}
              {successDelete ? <Alert sx={{ mt: 1 }} severity="success">Ce Modules a été suppremer avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelet} sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'red' }}>Annuler</Button>
          <Button onClick={() => { onClickValidDelete(id) }} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'green' }}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      {/* fin delet dialog */}
    </Box >

  );
}

export default CoursA;