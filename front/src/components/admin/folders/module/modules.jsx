import { Link } from "react-router-dom";
import { InputLabel, Toolbar } from "@mui/material";
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
import Skeleton from '@mui/material/Skeleton';
import { API_BASE } from "../../../../constants";

const Modules = () => {
  //token
  const token = JSON.parse(localStorage.getItem('user'))
  //data
  const [refrech, setRefrech] = React.useState(0)
  const [data, setData] = React.useState(null)
  const [loadingData, setLoadingData] = React.useState(true)
  const [successData, setSuccessData] = React.useState(null)
  const [errorData, setErrorData] = React.useState(null)
  // modules data
  const [Modulesdata, setModulesData] = React.useState([])
  const [loadingModulesData, setLoadingModulesData] = React.useState(true)
  const [successModulesData, setSuccessModulesData] = React.useState(null)
  const [errorModulesData, setErrorModulesData] = React.useState(null)
  // Annee pour option
  const [year, setYear] = React.useState('')
  const [anneeScolaire, setanneeScolaire] = React.useState('')
  const handleChangeYear = (e) => {
    setYear(e.target.value)
  }
  const handleChangeAnneeScolaire = (e) => {
    setanneeScolaire(e.target.value)
  }
  // module
  const [moduleName, setModuleName] = React.useState('')
  const [imageModule, setImageModule] = React.useState(null)
  const [descModule, setDescModule] = React.useState('')
  const [loadingModule, setLoadingModule] = React.useState(false)
  const [successModule, setSuccessModule] = React.useState(null)
  const [errorModule, setErrorModule] = React.useState(null)
  //updating data
  const [anneeScolaireUpdate, setanneeScolaireUpdate] = React.useState('')
  const [moduleNameUpdate, setModuleNameUpdate] = React.useState('')
  const [imageModuleUpdate, setImageModuleUpdate] = React.useState(null)
  const [descModuleUpdate, setDescModuleUpdate] = React.useState('')
  const [loadingupdate, setLoadingUpdate] = React.useState(false)
  const [errorupdate, setErrorUpdate] = React.useState(null)
  const [successupdate, setSuccessUpdate] = React.useState(null)
  //delete data
  const [loadingdelete, setLoadingDelete] = React.useState(false)
  const [errordelete, setErrorDelete] = React.useState(null)
  const [successdelete, setSuccessDelete] = React.useState(null)
  // dialog 
  const [openn, setOpenn] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelet, setOpenDelet] = React.useState(false);
  const [Value, setValue] = React.useState();
  const [id, setId] = React.useState();

  // post module
  const handelChangeModule = (e) => {
    setModuleName(e.target.value)
  }
  const handelChangeModuleImage = (e) => {
    setImageModule(e.target.files[0])
  }
  const handelChangeModuleDesc = (e) => {
    setDescModule(e.target.value)
  }
  const postModule = async () => {
    const data = new FormData()
    data.append('annee', anneeScolaire)
    data.append('name', moduleName)
    data.append('file', imageModule)
    data.append('desc', descModule)

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'authorization': `Bearer ${token.token}`
      }
    }

    await axios.post(`${API_BASE}/module`, data, config).then(res => {
      setSuccessModule(true)
      // setRefrech(refrech => refrech + 1)
      setLoadingModule(false)
      setErrorModule(false)
      setImageModule(null)
      setanneeScolaire('')
      setModuleName('')
      setDescModule('')
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorModule(error.response.data)
      setSuccessModule(false)
      setLoadingModule(false)
    })
  }
  const handleChangeAnneeScolaireUpdate = (e) => {
    setanneeScolaireUpdate(e.target.value)
  }
  const handelChangeModuleUpdate = (e) => {
    setModuleNameUpdate(e.target.value)
  }
  const handelChangeModuleImageUpdate = (e) => {
    setImageModuleUpdate(e.target.files[0])
  }
  const handelChangeModuleDescUpdate = (e) => {
    setDescModuleUpdate(e.target.value)
  }
  const UpdateModule = async (annee, name, file, desc, id) => {
    const data = new FormData();
    data.append('annee', annee);
    data.append('name', name);
    data.append('desc', desc);
    if (file) {
      data.append('file', file);
    }
    for (var [key, value] of data.entries()) {
      console.log(key, value);
    }
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'authorization': `Bearer ${token.token}`
      }
    }
    await axios.patch(`${API_BASE}/module/` + id, data, config).then(res => {
      // console.log(data)
      setLoadingUpdate(false)
      // setRefrech(refrech => refrech + 1)
      setSuccessUpdate(true)
      setErrorUpdate(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorUpdate(error.response.data)
      setSuccessUpdate(false)
      setLoadingUpdate(false)
    })
  }

  const DeleteModule = async (id) => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    }
    await axios.delete(`${API_BASE}/module/` + id, config).then(res => {
      setLoadingDelete(false)
      setRefrech(refrech => refrech + 1)
      setSuccessDelete(true)
      setErrorDelete(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorDelete(error.response.data)
      setSuccessDelete(false)
      setLoadingDelete(false)
    })
  }
  //open
  const handleClickOpen = () => {
    setOpenn(true);
  };
  const onClickValid = () => {
    setLoadingModule(true)
    postModule()
  }
  const handleClose = () => {
    setModuleName('')
    setanneeScolaire('')
    setImageModule(null)
    setDescModule('')
    setSuccessModule(false)
    setSuccessModule(false)
    setLoadingModule(false)
    setErrorModule(false)
    setOpenn(false);
  };

  //edit
  const handleClickOpenEdit = (annee, name, desc, id) => {
    setModuleNameUpdate(name)
    setanneeScolaireUpdate(annee)
    setDescModuleUpdate(desc)
    setId(id);
    setOpenEdit(true);
  };
  const onClickValidEdit = (annee, name, file, desc, id) => {
    setLoadingUpdate(true)
    UpdateModule(annee, name, file, desc, id)
  }
  const handleCloseEdit = () => {
    setModuleNameUpdate('')
    setanneeScolaireUpdate('')
    setImageModuleUpdate(null)
    setDescModuleUpdate('')
    setSuccessUpdate(false)
    setLoadingUpdate(false)
    setErrorUpdate(false)
    setOpenEdit(false);
  };
  //delte
  const handleClickOpenDelet = (x, y) => {
    setValue(x);
    setId(y);
    setOpenDelet(true);
  };
  const onClickValidDelte = (id) => {
    setLoadingDelete(true)
    console.log(id)
    DeleteModule(id)
  };
  const handleCloseDelet = () => {
    setValue('')
    setSuccessDelete(false)
    setErrorDelete(false)
    setOpenDelet(false);
  };
  //fin dialog

  //fetch data
  const ApiCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    }
    await axios.get(`${API_BASE}/annee`, config).then(res => {
      setData(res.data)
      setLoadingData(false)
      setSuccessData(true)
      setErrorData(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorData(error.response.data)
      setSuccessData(false)
      setLoadingData(false)
    })
  }
  const ApiModuleCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    }
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

  const ApiModuleYearCall = async (year) => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    }
    await axios.get(`${API_BASE}/module/admin/annee/` + year, config).then(res => {
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
          <Grid container item xs={5.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={5.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
        </Grid>
        <Grid container item xs={12} columnGap={1} sx={{ px: 2, py: 1 }} >
          <Grid container item xs={5.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={5.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
        </Grid>
        <Grid container item xs={12} columnGap={1} sx={{ px: 2, py: 1 }} >
          <Grid container item xs={5.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
          <Grid container item xs={5.8} sx={{ px: 2, py: 1 }} >
            <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
          </Grid>
        </Grid>

      </>
    )
  }
  React.useEffect(() => {
    ApiCall()
  }, [])

  React.useEffect(() => {
    console.log(refrech)
    if (year === '') {
      ApiModuleCall()
    } else {
      ApiModuleYearCall(year)
    }
    console.log('called api')
  }, [year, refrech, successModule, successdelete, successupdate])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar />
      <Grid container spacing={4} sx={{ display: 'flex', p: 2, paddingBlock: 4, }}>
        <Grid item xs={12} sm={7} md={8}>
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
              Modules
            </LinkS>

          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} sm={5} md={4} sx={{ p: 0 }}>
          {
            loadingData ? <><WatingAnne /></> : errorData ?
              <>
                {errorData}
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
                      {data.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> })}
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
                Liste Modules
              </Typography>

            </ListItem>
            {
              loadingModulesData ? <><WatingModule /></> : errorModulesData ?
                <>{errorModulesData}</>
                :
                Modulesdata.length > 0 ?
                  Modulesdata.filter(item => item.del !== 1).map(module => {
                    return (
                      <ListItem
                        key={module._id}
                        sx={{ paddingInline: 2, paddingBlock: 2, display: { xs: 'block', sm: 'flex' }, '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }, }}
                        secondaryAction={
                          <>
                            <IconButton onClick={() => { handleClickOpenEdit(module.annee, module.name, module.desc, module._id) }} aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                              <SettingsRoundedIcon />
                            </IconButton>
                            <IconButton onClick={() => { handleClickOpenDelet(module.name, module._id) }} aria-label="delet" sx={{ ml: 2, bgcolor: '#ff3434', color: 'white', transition: '.3s', '&:hover': { color: '#ff3434', bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                              <DeleteForeverRoundedIcon />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemText primaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} secondaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} primary={module.annee} secondary="Année" sx={{ width: '30%' }} />
                        <ListItemText primaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} secondaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} primary={module.name} secondary="module name" sx={{ width: '70%' }} />
                      </ListItem>
                    )
                  })
                  :
                  <><Alert severity="warning" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>Erreur — Aucun module trouvé!</Alert></>
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
          {"Ajouter Modules"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Année
              </Typography>
              <FormControl fullWidth>
                {
                  loadingData ? <>wait for data</> : errorData ?
                    <>
                      {errorData}
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
                        {data.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> })}
                      </Select>
                    </>
                }
              </FormControl>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Modules
              </Typography>
              <TextField onChange={(e) => { handelChangeModule(e) }} value={moduleName} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Année" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Image
              </Typography>
              <TextField type={"file"} onChange={(e) => { handelChangeModuleImage(e) }} required inputProps={{ accept: ".pdf" }} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Année" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Description
              </Typography>
              <textarea onChange={(e) => { handelChangeModuleDesc(e) }} value={descModule} style={{ marginBottom: '0.5rem', resize: 'none', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh' }} placeholder="Question ..."></textarea>
              {loadingModule ? <LinearProgress color="secondary" /> : null}
              {errorModule ? <Alert sx={{ mt: 1 }} severity="error">{errorModule}</Alert> : null}
              {successModule ? <Alert sx={{ mt: 1 }} severity="success">Ce Modules a été ajouter avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'red' }}>Annuler</Button>
          <Button onClick={onClickValid} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'green' }}>
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
          {"Modifier Une Année Scolaire"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Année
              </Typography>
              <FormControl fullWidth>
                {
                  loadingData ? <>wait for data</> : errorData ?
                    <>
                      {errorData}
                    </>
                    :
                    <>
                      <InputLabel id="demo-simple-select-label">annee scolaire</InputLabel>
                      <Select
                        sx={{ bgcolor: 'white', mb: 2 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={anneeScolaireUpdate}
                        label="annee scolaire"
                        onChange={handleChangeAnneeScolaireUpdate}
                      >
                        {data.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> })}
                      </Select>
                    </>
                }
              </FormControl>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Modules
              </Typography>
              <TextField sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="module name" onChange={(e) => { handelChangeModuleUpdate(e) }} value={moduleNameUpdate} />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Image
              </Typography>
              <TextField type={"file"} onChange={(e) => { handelChangeModuleImageUpdate(e) }} required inputProps={{ accept: ".pdf" }} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="imagr" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Description
              </Typography>
              <textarea onChange={(e) => { handelChangeModuleDescUpdate(e) }} value={descModuleUpdate} style={{ marginBottom: '0.5rem', resize: 'none', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh' }} placeholder="Question ..."></textarea>
              {loadingupdate ? <LinearProgress color="secondary" /> : null}
              {errorupdate ? <Alert sx={{ mt: 1 }} severity="error">Ce Modules Existe Déjà malheureusement !</Alert> : null}
              {successupdate ? <Alert sx={{ mt: 1 }} severity="success">ce Modules a été modifier avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'red' }}>Annuler</Button>
          <Button onClick={() => { onClickValidEdit(anneeScolaireUpdate, moduleNameUpdate, imageModuleUpdate, descModuleUpdate, id) }} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'green' }}>
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
          {"Supprimer Une Module"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Modules
              </Typography>
              <TextField sx={{ width: '100%', mb: 2 }} value={Value} id="outlined-basic" placeholder="Année" disabled />
              {loadingdelete ? <LinearProgress color="secondary" /> : null}
              {/* Ce Modules contient des Cours et audio et védio <br />malheureusement vous pouvez pas la supprimer ! */}
              {errordelete ? <Alert sx={{ mt: 1 }} severity="error">{errordelete}</Alert> : null}
              {successdelete ? <Alert sx={{ mt: 1 }} severity="success">Ce Modules a été supprimer avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelet} sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'red' }}>Annuler</Button>
          <Button onClick={() => { onClickValidDelte(id) }} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'green' }}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      {/* fin delet dialog */}
    </Box >

  );
}

export default Modules;

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