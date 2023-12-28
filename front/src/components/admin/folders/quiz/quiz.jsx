import { Link } from "react-router-dom";
import { InputLabel, Skeleton, Toolbar } from "@mui/material";
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

const Quiz = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [quiz, setQuiz] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState(null)
  const [module, setModule] = React.useState(null)
  const [loadingmodule, setLoadingModule] = React.useState(true)
  const [errormodule, setErrorModule] = React.useState(null)
  // annee data
  const [anneeData, setanneeData] = React.useState(null)
  const [loadinganneeData, setLoadinganneeData] = React.useState(true)
  const [successanneeData, setSuccessanneeData] = React.useState(null)
  const [erroranneeData, setErroranneeData] = React.useState(null)

  const [year, setYear] = React.useState('')
  const handleChangeYear = (e) => {
    setYear(e.target.value)
  }
  const [moduleFilterId, setmoduleFilterId] = React.useState(null)
  const handleChangeModuleFilterId = (e) => {
    setmoduleFilterId(e.target.value)
  }
  const ApiCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${user.token}`
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
  const modules = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    }
    await axios.get(`${API_BASE}/module`, config).then(res => {
      setModule(res.data)
      setLoadingModule(false)
      setErrorModule(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorModule(error.response.data)
      setLoadingModule(false)
    })
  }
  const [cour , setCoure] = React.useState([])
  const [Loadingcour , setLoadingCoure] = React.useState([])
  const [Errorcour , setErrorCoure] = React.useState([])
  const coure = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    }
    await axios.get(`${API_BASE}/coure`, config).then(res => {
      setCoure(res.data)
      setLoadingCoure(false)
      setErrorCoure(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorCoure(error.response.data)
      setLoadingCoure(false)
    })
  }
  const getQuiz = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    }
    await axios.get(`${API_BASE}/sujet`, config).then(res => {
      setQuiz(res.data)
      setLoading(false)
      setError(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setError(error.response.data)
      setLoading(false)
    })
  }
  const [successDelete, setSuccessDelete] = React.useState(null)
  const [loadingDelete, setLoadingDelete] = React.useState(false)
  const [errorDelete, setErrorDelete] = React.useState(null)
  const DeleteCour = async (id) => {
    const config = {
      headers: {
        authorization: `Bearer ${user.token}`
      }
    }
    await axios.delete(`${API_BASE}/sujet/` + id, config).then(res => {
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
  // dialog 
  const [openn, setOpenn] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelet, setOpenDelet] = React.useState(false);
  const [Value, setValue] = React.useState();
  const [Value1, setValue1] = React.useState();
  const [Value2, setValue2] = React.useState();
  const [Value3, setValue3] = React.useState();
  const [Id, setId] = React.useState();

  // delete
  const handleClickOpenDelet = (x, q, w, r, y) => {
    setValue(x)
    setValue1(q)
    setValue2(w)
    setValue3(r)
    console.log(x, q, w, r)
    setId(y)
    setOpenDelet(true);
  }
  const onClickValidDelete = (id) => {
    setLoadingDelete(true)
    DeleteCour(id)
  }
  const handleCloseDelet = () => {
    setValue('')
    setValue1('')
    setValue2('')
    setValue3('')
    setId('')
    setSuccessDelete(false)
    setErrorDelete(false)
    setLoadingDelete(false)
    setOpenDelet(false);
  }
  //fin dialog
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
    getQuiz()
    ApiCall()
    modules()
    coure()
  }, [error, successDelete, year, moduleFilterId])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar />
      <Grid container spacing={4} sx={{ display: 'flex', p: 2, paddingBlock: 4, }}>
        <Grid item xs={12} sm={12} md={12}>
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
              Quiz
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
            loadingmodule ? <><WatingAnne /></> : errormodule ?
              <>
                {errormodule}
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
                      {module ? module.filter(item => item.del !== 1).map(module => { return <MenuItem key={module._id} value={module._id}>{module.name}</MenuItem> }) : null}
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
                <Link to={"/admin/addQuiz"} className='Links'>
                  <IconButton aria-label="comment" sx={{ ml: 2, bgcolor: 'white', color: '#ff5757', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ff5757', boxShadow: 'rgba(0, 0, 0, 0.3) 1.95px 1.95px 2.6px inset' } }}>
                    <NoteAddIcon />
                  </IconButton>
                </Link>
              }
            >
              <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 1, borderRadius: 2, transition: '0.3s', }}>
                Liste Quiz
              </Typography>

            </ListItem>
            {
              loading ? <p><WatingModule /></p> :
                error ? <>{error}</> :
                  quiz.length > 0 ?
                  year == '' && moduleFilterId == null ?
                    quiz.filter(item => item.del !== 1).map(quiz => {
                      return (
                        <ListItem
                          sx={{ paddingInline: 2, paddingBlock: 2, display: { xs: 'block', sm: 'flex' }, '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }, }}
                          secondaryAction={
                            <>
                              <Link to={`/admin/editquiz/${quiz._id}`} className='Links'>
                                <IconButton aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                                  <SettingsRoundedIcon />
                                </IconButton>
                              </Link>
                              <IconButton onClick={() => (handleClickOpenDelet(quiz.name, quiz.question.length, quiz.annee, module.filter(item => item._id === quiz.module)[0].name, quiz._id))} aria-label="delet" sx={{ ml: 2, bgcolor: '#ff3434', color: 'white', transition: '.3s', '&:hover': { color: '#ff3434', bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                                <DeleteForeverRoundedIcon />
                              </IconButton>
                            </>
                          }
                        >
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quiz.name} secondary="Quiz" sx={{ width: { xs: '50%', sm: '15%' }, mb: { xs: 2, sm: 0 } }} />
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quiz.question.filter(item => item.del !== 1).length} secondary="Question" sx={{ width: { xs: '50%', sm: '15%' }, mb: { xs: 2, sm: 0 } }} />
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quiz.annee} secondary="Année" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          {loadingmodule ? '' :
                            <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={module.filter(item => item._id === quiz.module)[0].name} secondary="Module" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          }
                          {Loadingcour ? '' :
                            <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={cour.filter(item => item._id === quiz.coure)[0].name} secondary="Coure" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          }
                        </ListItem>
                      )
                    })
                    :
                    year != '' && moduleFilterId == null ?
                    quiz.filter(item => item.del !== 1 && item.annee  == year).map(quiz => {
                      return (
                        <ListItem
                          sx={{ paddingInline: 2, paddingBlock: 2, display: { xs: 'block', sm: 'flex' }, '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }, }}
                          secondaryAction={
                            <>
                              <Link to={`/admin/editquiz/${quiz._id}`} className='Links'>
                                <IconButton aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                                  <SettingsRoundedIcon />
                                </IconButton>
                              </Link>
                              <IconButton onClick={() => (handleClickOpenDelet(quiz.name, quiz.question.length, quiz.annee, module.filter(item => item._id === quiz.module)[0].name, quiz._id))} aria-label="delet" sx={{ ml: 2, bgcolor: '#ff3434', color: 'white', transition: '.3s', '&:hover': { color: '#ff3434', bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                                <DeleteForeverRoundedIcon />
                              </IconButton>
                            </>
                          }
                        >
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quiz.name} secondary="Quiz" sx={{ width: { xs: '50%', sm: '15%' }, mb: { xs: 2, sm: 0 } }} />
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quiz.question.filter(item => item.del !== 1).length} secondary="Question" sx={{ width: { xs: '50%', sm: '15%' }, mb: { xs: 2, sm: 0 } }} />
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quiz.annee} secondary="Année" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          {loadingmodule ? '' :
                            <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={module.filter(item => item._id === quiz.module)[0].name} secondary="Module" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          }
                          {Loadingcour ? '' :
                            <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={cour.filter(item => item._id === quiz.coure)[0].name} secondary="Coure" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          }
                        </ListItem>
                      )
                    })
                    :
                    year == '' && moduleFilterId !== null ? 
                    quiz.filter(item => item.del !== 1 && item.module  == moduleFilterId).map(quiz => {
                      return (
                        <ListItem
                          sx={{ paddingInline: 2, paddingBlock: 2, display: { xs: 'block', sm: 'flex' }, '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }, }}
                          secondaryAction={
                            <>
                              <Link to={`/admin/editquiz/${quiz._id}`} className='Links'>
                                <IconButton aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                                  <SettingsRoundedIcon />
                                </IconButton>
                              </Link>
                              <IconButton onClick={() => (handleClickOpenDelet(quiz.name, quiz.question.length, quiz.annee, module.filter(item => item._id === quiz.module)[0].name, quiz._id))} aria-label="delet" sx={{ ml: 2, bgcolor: '#ff3434', color: 'white', transition: '.3s', '&:hover': { color: '#ff3434', bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                                <DeleteForeverRoundedIcon />
                              </IconButton>
                            </>
                          }
                        >
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quiz.name} secondary="Quiz" sx={{ width: { xs: '50%', sm: '15%' }, mb: { xs: 2, sm: 0 } }} />
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quiz.question.filter(item => item.del !== 1).length} secondary="Question" sx={{ width: { xs: '50%', sm: '15%' }, mb: { xs: 2, sm: 0 } }} />
                          <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quiz.annee} secondary="Année" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          {loadingmodule ? '' :
                            <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={module.filter(item => item._id === quiz.module)[0].name} secondary="Module" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          }
                          {Loadingcour ? '' :
                            <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={cour.filter(item => item._id === quiz.coure)[0].name} secondary="Coure" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                          }
                        </ListItem>
                      )
                    })
                    :
                    <><Alert severity="warning" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>Erreur — Aucun Quiz trouvé!</Alert></>
                    :
                    <><Alert severity="warning" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>Erreur — Aucun Quiz trouvé!</Alert></>
            }
            <Divider />

          </List>
        </Grid>

      </Grid>

      <Dialog
        open={openDelet}
        onClose={handleCloseDelet}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Supprimer Un Utilisateur"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>

              <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Quiz
              </Typography>
              <TextField disabled value={Value} sx={{ width: '100%', mb: 2 }} id="outlined-basic" />
              <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Question <small>( nomber )</small>
              </Typography>
              <TextField disabled value={Value1} sx={{ width: '100%', mb: 2 }} id="outlined-basic" />
              <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Année
              </Typography>
              <TextField disabled value={Value2} sx={{ width: '100%', mb: 2 }} id="outlined-basic" />
              <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Modules
              </Typography>
              <TextField disabled value={Value3} sx={{ width: '100%', mb: 2 }} id="outlined-basic" />
              {loadingDelete ? <LinearProgress color="secondary" /> : null}
              {errorDelete ? <Alert sx={{ mt: 1 }} severity="error">{errorDelete}</Alert> : null}
              {successDelete ? <Alert sx={{ mt: 1 }} severity="success">Ce Modules a été ajouter avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelet} sx={{ color: 'red' }}>Annuler</Button>
          <Button onClick={() => { onClickValidDelete(Id) }} autoFocus sx={{ color: 'green' }}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      {/* fin delet dialog */}
    </Box >

  );
}

export default Quiz;

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];