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

const Utilisateures = () => {
  //token
  const token = JSON.parse(localStorage.getItem('user'))
  //get years
  const [year, setYear] = React.useState([])
  const [loadingYear, setLoadingYear] = React.useState(true)
  const [errorYear, setErrorYear] = React.useState(null)
  //get abonnement type
  const [abonnement, setAbonnement] = React.useState([])
  const [loadingAbonnement, setLoadingAbonnement] = React.useState(true)
  const [errorAbonnement, setErrorAbonnement] = React.useState(null)
  //get user
  const [user, setUser] = React.useState([])
  const [loadingUser, setLoadingUser] = React.useState(true)
  const [errorUser, setErrorUser] = React.useState(null)
  //post user
  const [lastName, setlastName] = React.useState('')
  const [firstName, setfirstName] = React.useState('')
  const [email, setemail] = React.useState('')
  const [annee, setannee] = React.useState('')
  const [password, setpassword] = React.useState('')
  const [gold, setgold] = React.useState('')
  const [successPost, setSuccessPost] = React.useState(null)
  const [loadingPost, setLoadingPost] = React.useState(null)
  const [errorPost, setErrorPost] = React.useState(null)
  //edit user
  const [lastNameUpdate, setlastNameUpdate] = React.useState('')
  const [firstNameUpdate, setfirstNameUpdate] = React.useState('')
  const [emailUpdate, setemailUpdate] = React.useState('')
  const [anneeUpdate, setanneeUpdate] = React.useState('')
  const [passwordUpdate, setpasswordUpdate] = React.useState('')
  const [goldUpdate, setgoldUpdate] = React.useState('')
  const [successUpdate, setSuccessUpdate] = React.useState(null)
  const [loadingUpdatet, setLoadingUpdate] = React.useState(null)
  const [errorUpdatet, setErrorUpdate] = React.useState(null)
  //delete user
  const [successDelete, setSuccessDelete] = React.useState(null)
  const [loadingDelete, setLoadingDelete] = React.useState(null)
  const [errorDelete, setErrorDelete] = React.useState(null)
  // option data
  const [yearFilter, setyearFilter] = React.useState('')
  const [AbonnementFilter, setAbonnementFilter] = React.useState('')

  const handleChangeYearFilter = (e) => {
    setyearFilter(e.target.value)
  }
  const handleChangeAbonnementFilter = (e) => {
    setAbonnementFilter(e.target.value)
  }

  // dialog 
  const [openn, setOpenn] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelet, setOpenDelet] = React.useState(false);
  const [Value, setValue] = React.useState();
  const [id, setId] = React.useState();
  // add user
  const handellastName = (e) => {
    setlastName(e.target.value)
  }
  const handelfirstName = (e) => {
    setfirstName(e.target.value)
  }
  const handelemail = (e) => {
    setemail(e.target.value)
  }
  const handelannee = (e) => {
    setannee(e.target.value)
  }
  const handelpassword = (e) => {
    setpassword(e.target.value)
  }
  const handelgold = (e) => {
    setgold(e.target.value)
  }
  const PostUser = async () => {
    const data = new FormData()
    data.append('lastName', lastName)
    data.append('firstName', firstName)
    data.append('email', email)
    data.append('password', password)
    data.append('annee', annee)
    data.append('gold', gold)

    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }

    await axios.post(`${API_BASE}/user`, data, config).then(res => {
      setSuccessPost(true)
      setLoadingPost(false)
      setErrorPost(false)
      setlastName('')
      setfirstName('')
      setemail('')
      setpassword('')
      setannee('')
      setgold('')
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorPost(error.response.data)
      setSuccessPost(false)
      setLoadingPost(false)
    })
  }
  //edit user
  const handellastNameUpdate = (e) => {
    setlastNameUpdate(e.target.value)
  }
  const handelfirstNameUpdate = (e) => {
    setfirstNameUpdate(e.target.value)
  }
  const handelemailUpdate = (e) => {
    setemailUpdate(e.target.value)
  }
  const handelanneeUpdate = (e) => {
    setanneeUpdate(e.target.value)
  }
  const handelpasswordUpdate = (e) => {
    setpasswordUpdate(e.target.value)
  }
  const handelgoldUpdate = (e) => {
    setgoldUpdate(e.target.value)
  }

  const EditUser = async (last, first, email, password, annee, abb, id) => {
    const data = new FormData()
    data.append('lastName', last)
    data.append('firstName', first)
    data.append('email', email)
    data.append('password', password)
    data.append('annee', annee)
    data.append('gold', abb)
    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }

    await axios.patch(`${API_BASE}/user/` + id, data, config).then(res => {
      setSuccessUpdate(true)
      setLoadingUpdate(false)
      setErrorUpdate(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorUpdate(error.response.data)
      setSuccessUpdate(false)
      setLoadingUpdate(false)
    })
  }

  //delete user
  const DeleteUser = async (id) => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    }

    await axios.delete(`${API_BASE}/user/` + id, config).then(res => {
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
  //post
  const handleClickOpen = () => {
    setOpenn(true);
  };
  const onClickValidPost = () => {
    setLoadingPost(true)
    PostUser()
  }
  const handleClose = () => {
    setSuccessPost(false)
    setLoadingPost(false)
    setErrorPost(false)
    setlastName('')
    setfirstName('')
    setemail('')
    setpassword('')
    setannee('')
    setgold('')
    setOpenn(false);
  };
  //edit
  const handleClickOpenEdit = (last, first, email, password, annee, abb, id) => {
    console.log(last, first, email, password, annee, abb, id)
    setlastNameUpdate(last)
    setfirstNameUpdate(first)
    setemailUpdate(email)
    setpasswordUpdate(password)
    setanneeUpdate(annee)
    setgoldUpdate(abb)
    console.log(anneeUpdate)
    console.log(goldUpdate)
    setId(id);
    setOpenEdit(true);
  };
  const onclickValidEdit = (last, first, email, password, annee, abb, id) => {
    setLoadingUpdate(true)
    EditUser(last, first, email, password, annee, abb, id)
  }
  const handleCloseEdit = () => {
    setSuccessUpdate(false)
    setLoadingUpdate(false)
    setErrorUpdate(false)
    setlastNameUpdate('')
    setfirstNameUpdate('')
    setemailUpdate('')
    setpasswordUpdate('')
    setanneeUpdate('')
    setgoldUpdate('')
    setId('');
    setOpenEdit(false);
  };
  //delete
  const handleClickOpenDelet = (name, id) => {
    setValue(name)
    setId(id)
    setOpenDelet(true);
  };
  const onClickDelete = (id) => {
    setLoadingDelete(true)
    DeleteUser(id)
  }
  const handleCloseDelet = () => {
    setSuccessDelete(false)
    setLoadingDelete(false)
    setErrorDelete(false)
    setValue('')
    setId('')
    setOpenDelet(false);
  };
  //fin dialog
  //fetch data
  const ApiAbbCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    }
    await axios.get(`${API_BASE}/abonnement`, config).then(res => {
      setAbonnement(res.data)
      setErrorAbonnement(false)
      setLoadingAbonnement(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorAbonnement(error.response.data)
      setLoadingAbonnement(false)
    })
  }
  const ApAnniCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    };
    await axios.get(`${API_BASE}/annee`, config).then(res => {
      setYear(res.data)
      setLoadingYear(false)
      setErrorYear(false)
    }).catch(error => {
      console.log(error.response.data)
      setErrorYear(error.response.data)
      setLoadingYear(false)
    })
  }

  const userCall = async (yearFilter, AbonnementFilter) => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    }
    const year = yearFilter ? yearFilter : 'undefined'
    const Abonnement = AbonnementFilter ? AbonnementFilter.toLowerCase() : 'undefined'
    await axios.get(`${API_BASE}/user/userfilter/` + Abonnement + '/' + year, config).then(res => {
      setUser(res.data)
      setLoadingUser(false)
      setErrorUser(false)
    }).catch(error => {
      console.log(error.response.data)
      setErrorUser(error.response.data)
      setLoadingUser(false)
    })
  }
  const WatingAnne = () => {
    return (
      <>
        <Grid xs={12} >
          <Skeleton variant="rectangular" sx={{ width: '100%', mt: -1, height: 50, borderRadius: 1 }} />
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
    ApiAbbCall()
    ApAnniCall()
  }, [])
  React.useEffect(() => {
    userCall(yearFilter, AbonnementFilter)
  }, [AbonnementFilter, yearFilter, successDelete, successPost, successUpdate])

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
              Utilisateurs
            </LinkS>

          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} sm={5} md={4} sx={{ p: 0 }}>
          {
            loadingYear ? <><WatingAnne /></> : errorYear ?
              <>
                {errorYear}
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
                      value={yearFilter}
                      label="annee scolaire"
                      onChange={handleChangeYearFilter}
                    >
                      <MenuItem value={''}>All</MenuItem>
                      {year.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> })}
                    </Select>
                  </FormControl>
                </Grid>
              </>
          }

        </Grid>
        <Grid item xs={12} sm={5} md={4} sx={{ p: 0 }}>
          {
            loadingAbonnement ? <><WatingAnne /></> : errorAbonnement ?
              <>
                {errorAbonnement}
              </>
              :
              <>
                <Grid xs={12} sx={{ bgcolor: 'white' }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Type D'Abonnement</InputLabel>
                    <Select
                      sx={{ bgcolor: 'white' }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={AbonnementFilter}
                      label="Type D'Abonnement"
                      onChange={handleChangeAbonnementFilter}
                    >
                      <MenuItem value={''}>All</MenuItem>
                      {abonnement.filter(item => item.del !== 1).map(abonn => { return <MenuItem key={abonn._id} value={abonn.Type}>{abonn.Type}</MenuItem> })}
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
                Liste Utilisateurs
              </Typography>

            </ListItem>
            {loadingUser ? <><WatingModule /></>
              :
              errorUser ? <>{errorUser}</>
                :
                user.length > 0 ?
                  user.filter(item => item.isAdmin !== true && item.del !== 1).map(user => {
                    return (
                      <ListItem
                        key={user._id}
                        sx={{ paddingInline: 2,fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1, display: { xs: 'block', sm: 'flex' }, '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }, }}
                        secondaryAction={
                          <>
                            <IconButton onClick={() => { handleClickOpenEdit(user.lastName, user.firstName, user.email, user.password, user.annee, user.gold, user._id) }} aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                              <SettingsRoundedIcon />
                            </IconButton>
                            <IconButton onClick={() => { handleClickOpenDelet(user.email, user._id) }} aria-label="delet" sx={{ ml: 2, bgcolor: '#ff3434', color: 'white', transition: '.3s', '&:hover': { color: '#ff3434', bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                              <DeleteForeverRoundedIcon />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemText primaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} secondaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} primary={user.email} secondary="Email" sx={{fontFamily: 'Bahnschrift SemiBold', width: { xs: '50%', sm: '15%' }, mb: { xs: 2, sm: 0 } }} />
                        <ListItemText primaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} secondaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} primary={user.gold === 'normal' ? user.annee :"toute les années"} secondary="Année" sx={{ width: { xs: '50%', sm: '15%' }, mb: { xs: 2, sm: 0 } }} />
                        <ListItemText primaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} secondaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} primary={user.gold ? user.gold : 'Null'} secondary="Type Abonnement" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                        <ListItemText primaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} secondaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} primary={user.Debut[0]+''+user.Debut[1]+''+user.Debut[2]+''+user.Debut[3]+'-'+user.Debut[5]+''+user.Debut[6]+'-'+user.Debut[8]+''+user.Debut[9]} secondary="Date Début" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />
                        <ListItemText primaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} secondaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} primary={user.Fin ? user.Fin : "non abonnée"} secondary="Date Fin" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />

                      </ListItem>
                    )
                  })
                  :
                  <><Alert severity="warning" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>Erreur — Aucun Utilisateurs trouvé!</Alert></>
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
              <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Last Name
              </Typography>
              <TextField onChange={(e) => { handellastName(e) }} value={lastName} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="last name" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                First Name
              </Typography>
              <TextField onChange={(e) => { handelfirstName(e) }} value={firstName} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="first name" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Email
              </Typography>
              <TextField onChange={(e) => { handelemail(e) }} value={email} type='email' sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="email" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Password
              </Typography>
              <TextField onChange={(e) => { handelpassword(e) }} value={password} type='password' sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Année" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Année
              </Typography>
              <FormControl fullWidth>
                {
                  loadingYear ? <>wait for data</> : errorYear ?
                    <>
                      {errorYear}
                    </>
                    :
                    <>
                      <InputLabel id="demo-simple-select-label">annee scolaire</InputLabel>
                      <Select
                        sx={{ bgcolor: 'white', mb: 2 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={annee}
                        label="annee scolaire"
                        onChange={handelannee}
                      >
                        <MenuItem value={''}>All</MenuItem>
                        {year.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> })}
                      </Select>
                    </>
                }
              </FormControl>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Type D'Abonnement
              </Typography>
              <FormControl fullWidth>
                {
                  loadingAbonnement ? <>wait for data</> : errorAbonnement ?
                    <>
                      {errorAbonnement}
                    </>
                    :
                    <>
                      <InputLabel id="demo-simple-select-label">Type D'Abonnement</InputLabel>
                      <Select
                        sx={{ bgcolor: 'white', mb: 2 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={gold}
                        label="Type D'Abonnement"
                        onChange={handelgold}
                      >
                        <MenuItem value={''}>All</MenuItem>
                        {abonnement.filter(item => item.del !== 1).map(abonn => { return <MenuItem key={abonn._id} value={abonn.Type}>{abonn.Type}</MenuItem> })}
                      </Select>
                    </>
                }
              </FormControl>
              {loadingPost ? <LinearProgress color="secondary" /> : null}
              {errorPost ? <Alert sx={{ fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="error">{errorPost}</Alert> : null}
              {successPost ? <Alert sx={{ fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="success">Ce Modules a été modifier avec success</Alert> : null}
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
          {"Modifier Un Utilisateur"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Last Name
              </Typography>
              <TextField onChange={(e) => { handellastNameUpdate(e) }} value={lastNameUpdate} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="last name" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                First Name
              </Typography>
              <TextField onChange={(e) => { handelfirstNameUpdate(e) }} value={firstNameUpdate} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="first name" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Email
              </Typography>
              <TextField onChange={(e) => { handelemailUpdate(e) }} value={emailUpdate} type='email' sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="email" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Password
              </Typography>
              <TextField onChange={(e) => { handelpasswordUpdate(e) }} value={passwordUpdate} type='password' sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Année" />
              {
                goldUpdate == 'normal' ?
                  <>
                    <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                      Année
                    </Typography>
                    <FormControl fullWidth>
                      {
                        loadingYear ? <>wait for data</> : errorYear ?
                          <>
                            {errorYear}
                          </>
                          :

                          <>
                            <InputLabel id="demo-simple-select-label">annee scolaire</InputLabel>
                            <Select
                              sx={{ bgcolor: 'white', mb: 2 }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={anneeUpdate}
                              label="annee scolaire"
                              onChange={handelanneeUpdate}
                            >
                              <MenuItem value={''}>All</MenuItem>
                              {year.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> })}
                            </Select>
                          </>

                      }
                    </FormControl></>
                  : null
              }

              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Type D'Abonnement
              </Typography>
              <FormControl fullWidth>
                {
                  loadingAbonnement ? <>wait for data</> : errorAbonnement ?
                    <>
                      {errorAbonnement}
                    </>
                    :
                    <>
                      <InputLabel id="demo-simple-select-label">Type D'Abonnement</InputLabel>
                      <Select
                        sx={{ bgcolor: 'white', mb: 2 }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={goldUpdate}
                        label="Type D'Abonnement"
                        onChange={handelgoldUpdate}
                        disabled
                      >
                        <MenuItem value={''}>All</MenuItem>
                        {abonnement.filter(item => item.del !== 1).map(abonn => { return <MenuItem key={abonn._id} value={abonn.Type}>{abonn.Type}</MenuItem> })}
                      </Select>
                    </>
                }
              </FormControl>
              {loadingUpdatet ? <LinearProgress color="secondary" /> : null}
              {errorUpdatet ? <Alert sx={{ fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="error">{errorUpdatet}</Alert> : null}
              {successUpdate ? <Alert sx={{ fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="success">Ce Modules a été modifier avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'red' }}>Annuler</Button>
          <Button onClick={() => { onclickValidEdit(lastNameUpdate, firstNameUpdate, emailUpdate, passwordUpdate, anneeUpdate, goldUpdate, id) }} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'green' }}>
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
          {"Supprimer Un Utilisateur"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Email Utilisateur
              </Typography>
              <TextField value={Value} disabled sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="user name" />
              {loadingDelete ? <LinearProgress color="secondary" /> : null}
              {errorDelete ? <Alert sx={{ fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="error">{errorDelete}</Alert> : null}
              {successDelete ? <Alert sx={{ fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="success">ce Modules a été suprimier avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelet} sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'red' }}>Annuler</Button>
          <Button onClick={() => { onClickDelete(id) }} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'green' }}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      {/* fin delet dialog */}
    </Box >

  );
}

export default Utilisateures;
