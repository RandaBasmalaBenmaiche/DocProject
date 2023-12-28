import { Link } from "react-router-dom";
import { Toolbar } from "@mui/material";
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



const Annees = () => {
  //token
  const token = JSON.parse(localStorage.getItem('user'))
  //data
  const [data, setData] = React.useState([])
  const [loaingdata, setLoadingData] = React.useState(true)
  const [errordata, setErrorData] = React.useState(null)
  //post data
  const [annee, setAnnee] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const [success, setSuccess] = React.useState(null)
  //updating data
  const [anneeUpdate, setAnneeUpdate] = React.useState('')
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
  const [Value, setValue] = React.useState('');
  const [id, setID] = React.useState('');

  //functions
  const handelChange = (e) => {
    setAnnee(e.target.value)
    console.log(annee)
  }
  // post annee
  const PostAnnee = async () => {
    const data = {
      annee: annee
    }
    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }
    await axios.post(`${API_BASE}/annee`, data, config).then(res => {
      setAnnee('')
      setLoading(false)
      setSuccess(true)
      setError(null)
    }).catch(error => {
      console.log(error.response.data);
      setError(error.response.data);
      setSuccess(false);
      setLoading(false)
    })
  }

  // edit annee
  const handleChangeUpdate = (e) => {
    setAnneeUpdate(e.target.value)
  }
  const EditAnnee = async (id) => {
    const data = {
      annee: anneeUpdate
    }
    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }
    await axios.patch(`${API_BASE}/annee/` + id, data, config).then(res => {
      setLoadingUpdate(false)
      setSuccessUpdate(true)
      setErrorUpdate(null)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorUpdate(error.response.data)
      setSuccessUpdate(false)
      setLoadingUpdate(false)
    })
  }

  // delete annee
  const DeleteAnnee = async (id) => {
    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }
    await axios.delete(`${API_BASE}/annee/` + id, config).then(res => {
      setLoadingDelete(false)
      setSuccessDelete(true)
      setErrorDelete(null)
      console.log('delted success')
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorDelete(error.response.data)
      setSuccessDelete(false)
      setLoadingDelete(false)
    })
  }
  // add
  // onclick open add 
  const handleClickOpen = () => {
    setOpenn(true);
  };
  const onClickValid = () => {
    setLoading(true)
    PostAnnee()
  }
  // on close add dialog
  const handleClose = () => {
    setLoading(false)
    setSuccess(false)
    setAnnee('')
    setError(null)
    setOpenn(false);
  }
  // edit 
  //open edit
  const handleClickOpenEdit = (x, y) => {
    setAnneeUpdate(x)
    setID(y)
    console.log(y)
    setOpenEdit(true);
  };
  const onClickValidUpdate = (id) => {
    setLoadingDelete(true)
    EditAnnee(id)
  }
  //close edit
  const handleCloseEdit = () => {
    setLoadingUpdate(false)
    setSuccessUpdate(false)
    setAnneeUpdate('')
    setErrorUpdate(null)
    setOpenEdit(false);
  };
  //delete
  // open delete
  const handleClickOpenDelet = (x, y) => {
    setValue(x)
    setID(y)
    console.log(y)
    setOpenDelet(true);
  };
  const onClickValidDelet = (id) => {
    setLoadingDelete(true)
    DeleteAnnee(id)
  }
  // close delete
  const handleCloseDelet = () => {
    setSuccessDelete(false)
    setValue('')
    setErrorDelete(null)
    setOpenDelet(false);
  };
  //fin dialog

  // fetching data
  const ApiCall = async () => {
    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }
    await axios.get(`${API_BASE}/annee`, config).then(res => { setData(res.data); setLoadingData(false) }).catch(error => { console.log(error.response.data); setErrorData(error.response.data); setLoadingData(false) })
  }
  const WatingAnne = () => {
    return (
      <>
        <Grid container item xs={12} columnGap={2} sx={{ px: 2, py: 1 }} >
          <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
        </Grid>
        <Grid container item xs={12} columnGap={2} sx={{ px: 2, py: 1 }} >
          <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
        </Grid>
        <Grid container item xs={12} columnGap={2} sx={{ px: 2, py: 1 }} >
          <Skeleton variant="rectangular" sx={{ width: '100%', height: 35, borderRadius: 2 }} />
        </Grid>
      </>
    )
  }
  React.useEffect(() => {
    console.log('start fetching')
    ApiCall()
    console.log(data)
  }, [successdelete, successupdate, success])

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar />
      <Grid container spacing={4} sx={{ display: 'flex', p: 2, paddingBlock: 4, }}>
        <Grid item xs={12} sm={7} md={8}>
          <Breadcrumbs separator="›" aria-label="breadcrumb" sx={{ fontFamily: 'Bahnschrift SemiBold' }}>
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
              Années
            </LinkS>

          </Breadcrumbs>
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
              <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 1, borderRadius: 2, transition: '0.3s' }}>
                Liste Années
              </Typography>
              {/* <ListItemText primary={`Liste Années`} sx={{fontFamily:'Bahnschrift SemiBold'}} /> */}
            </ListItem>
            {
              loaingdata ? <><WatingAnne /></> : errordata ?
                <><Alert severity="warning" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>Erreur — Aucun Année trouvé!</Alert></>
                : data.length > 0 ?
                  data.filter(item => item.del !== 1).map(data => {
                    return <ListItem sx={{ paddingInline: 2, paddingBlock: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }, }}
                      secondaryAction={
                        <>
                          <IconButton onClick={() => { handleClickOpenEdit(data.annee, data._id) }} aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                            <SettingsRoundedIcon />
                          </IconButton>
                          <IconButton onClick={() => { handleClickOpenDelet(data.annee, data._id) }} aria-label="delet" sx={{ ml: 2, bgcolor: '#ff3434', color: 'white', transition: '.3s', '&:hover': { color: '#ff3434', bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                            <DeleteForeverRoundedIcon />
                          </IconButton>
                        </>
                      }
                    >
                      <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 1, borderRadius: 2, transition: '0.3s' }}>
                        {data.annee}
                      </Typography>

                    </ListItem>
                  })
                  :
                  <><Alert severity="warning" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>Erreur — Aucun Année trouvé!</Alert></>
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
          {"Ajouter Etudiants"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Année
              </Typography>
              <TextField onChange={(e) => { handelChange(e) }} value={annee} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Année" />
              {loading ? <LinearProgress color="secondary" /> : null}
              {error ? <Alert sx={{ mt: 1 }} severity="error">{error}</Alert> : null}
              {success ? <Alert sx={{ mt: 1 }} severity="success">cette Année a été ajouter avec success</Alert> : null}
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
              <TextField onChange={(e) => { handleChangeUpdate(e) }} value={anneeUpdate} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Année" />
              {loadingupdate ? <LinearProgress color="secondary" /> : null}
              {errorupdate ? <Alert sx={{ mt: 1 }} severity="error">{errorupdate}</Alert> : null}
              {successupdate ? <Alert sx={{ mt: 1 }} severity="success">cette Année a été modifier avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'red' }}>Annuler</Button>
          <Button onClick={() => { onClickValidUpdate(id) }} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'green' }}>
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
          {"Supprimer Une Année Scolaire"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Année
              </Typography>
              <TextField sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Année" value={Value} disabled />
              {loadingdelete ? <LinearProgress color="secondary" /> : null}
              {errordelete ? <Alert sx={{ mt: 1 }} severity="error">Cette Année contient des modules <br />malheureusement vous pouvez pas la supprimer !</Alert> : null}
              {successdelete ? <Alert sx={{ mt: 1 }} severity="success">cette Année a été supprimer avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelet} sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'red' }}>Annuler</Button>
          <Button onClick={() => { onClickValidDelet(id) }} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold', color: 'green' }}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      {/* fin delet dialog */}
    </Box >

  );
}

export default Annees;
