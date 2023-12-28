import { Link } from "react-router-dom";
import { Skeleton, Toolbar } from "@mui/material";
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

const Abonnements = () => {
  //token 
  const token = JSON.parse(localStorage.getItem('user'))
  // get abonnement
  const [abonnement, setAbonnement] = React.useState([])
  const [successGetAbonnemnt, setSuccessGetAbonnemnt] = React.useState(null)
  const [loadingGetAbonnemnt, setLoadingGetAbonnemnt] = React.useState(false)
  const [errorGetAbonnemnt, setErrorGettAbonnemnt] = React.useState(null)

  //post abonnement
  const [abonnementType, setAbonnementType] = React.useState('')
  const [abonnementDuree, setAbonnementDuree] = React.useState('')
  const [abonnementTarif, setAbonnementTarif] = React.useState('')
  const [successPostAbonnemnt, setSuccessPostAbonnemnt] = React.useState(null)
  const [loadingPostAbonnemnt, setLoadingPostAbonnemnt] = React.useState(null)
  const [errorPostAbonnemnt, setErrorPostAbonnemnt] = React.useState(null)
  //update abonnement
  const [abonnementTypeUpdate, setAbonnementTypeUpdate] = React.useState('')
  const [abonnementDureeUpdate, setAbonnementDureeUpdate] = React.useState('')
  const [abonnementTarifUpdate, setAbonnementTarifUpdate] = React.useState('')
  const [successUpdateAbonnemnt, setSuccessUpdateAbonnemnt] = React.useState(null)
  const [loadingUpdateAbonnemnt, setLoadingUpdateAbonnemnt] = React.useState(null)
  const [errorUpdateAbonnemnt, setErrorUpdateAbonnemnt] = React.useState(null)
  //delete abonnement
  const [successDeleteAbonnemnt, setSuccesDeleteAbonnemnt] = React.useState(null)
  const [loadingDeleteAbonnemnt, setLoadingDeleteAbonnemnt] = React.useState(null)
  const [errorDeleteAbonnemnt, setErroDeleteAbonnemnt] = React.useState(null)
  // dialog 
  const [openn, setOpenn] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelet, setOpenDelet] = React.useState(false);
  const [Value, setValue] = React.useState();
  const [id, setId] = React.useState();

  // post data
  const handelAbonnementType = (e) => {
    setAbonnementType(e.target.value)
  }
  const handelAbonnementDuree = (e) => {
    setAbonnementDuree(e.target.value)
  }
  const handelAbonnementTarif = (e) => {
    setAbonnementTarif(e.target.value)
  }

  const PostData = async () => {
    const data = new FormData()
    data.append('type', abonnementType)
    data.append('duree', abonnementDuree)
    data.append('tarif', abonnementTarif)

    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }

    await axios.post(`${API_BASE}/abonnement`, data, config).then(res => {
      setSuccessPostAbonnemnt(true)
      setLoadingPostAbonnemnt(false)
      setErrorPostAbonnemnt(false)
      setAbonnementType('')
      setAbonnementDuree('')
      setAbonnementTarif('')
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorPostAbonnemnt(error.response.data)
      setSuccessPostAbonnemnt(false)
      setLoadingPostAbonnemnt(false)
    })

  }
  // edit data
  const handelUpdateAbonnementType = (e) => {
    setAbonnementTypeUpdate(e.target.value)
  }
  const handelUpdateAbonnementDuree = (e) => {
    setAbonnementDureeUpdate(e.target.value)
  }
  const handelUpdateAbonnementTarif = (e) => {
    setAbonnementTarifUpdate(e.target.value)
  }

  const EditAbonnemnt = async (type, duree, tarif, id) => {
    const data = new FormData()
    data.append('Type', type)
    data.append('Duree', duree)
    data.append('Tarif', tarif)

    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }

    await axios.patch(`${API_BASE}/abonnement/` + id, data, config).then(res => {
      console.log('res')
      setSuccessUpdateAbonnemnt(true)
      setLoadingUpdateAbonnemnt(false)
      setErrorUpdateAbonnemnt(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorUpdateAbonnemnt(error.response.data)
      setSuccessUpdateAbonnemnt(false)
      setLoadingUpdateAbonnemnt(false)
    })

  }

  //delete data
  const DeleteAbonnement = async (id) => {
    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }
    await axios.delete(`${API_BASE}/abonnement/` + id, config).then(res => {
      setSuccesDeleteAbonnemnt(true)
      setLoadingDeleteAbonnemnt(false)
      setErroDeleteAbonnemnt(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErroDeleteAbonnemnt(error.response.data)
      setSuccesDeleteAbonnemnt(false)
      setLoadingDeleteAbonnemnt(false)
    })
  }
  //post
  const handleClickOpen = () => {
    setOpenn(true);
  };
  const onClickValidPost = () => {
    setLoadingPostAbonnemnt(true)
    PostData()
  }
  const handleClose = () => {
    setSuccessPostAbonnemnt(false)
    setLoadingPostAbonnemnt(false)
    setErrorPostAbonnemnt(false)
    setAbonnementType('')
    setAbonnementDuree('')
    setAbonnementTarif('')
    setOpenn(false);
  };
  //edit
  const handleClickOpenEdit = (type, duree, tarif, id) => {
    setAbonnementTypeUpdate(type)
    setAbonnementDureeUpdate(duree)
    setAbonnementTarifUpdate(tarif)
    setId(id);
    setOpenEdit(true);
  };
  const onClickValidEdit = (type, duree, tarif, id) => {
    setLoadingUpdateAbonnemnt(true)
    EditAbonnemnt(type, duree, tarif, id)
  }
  const handleCloseEdit = () => {
    setSuccessUpdateAbonnemnt(false)
    setLoadingUpdateAbonnemnt(false)
    setErrorUpdateAbonnemnt(false)
    setAbonnementTypeUpdate('')
    setAbonnementDureeUpdate('')
    setAbonnementTarifUpdate('')
    setOpenEdit(false);
  };
  //delte
  const handleClickOpenDelet = (type, id) => {
    setValue(type)
    setId(id)
    setOpenDelet(true);
  };
  const onClickValidDelete = (id) => {
    setLoadingDeleteAbonnemnt(true)
    DeleteAbonnement(id)
  }
  const handleCloseDelet = () => {
    setSuccesDeleteAbonnemnt(false)
    setLoadingDeleteAbonnemnt(false)
    setErroDeleteAbonnemnt(false)
    setOpenDelet(false);
  };
  //fin dialog

  //fetch data
  const ApiCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}` 
      }
    };
    await axios.get(`${API_BASE}/abonnement`, config).then(res => {
      setAbonnement(res.data)
      setSuccessGetAbonnemnt(true)
      setErrorGettAbonnemnt(false)
      setLoadingGetAbonnemnt(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorGettAbonnemnt(error.response.data)
      setSuccessGetAbonnemnt(false)
      setLoadingGetAbonnemnt(false)

    })
  }
  const WatingAnne = () => {
    return (
      <>
        <Grid xs={12} >
          <Skeleton sx={{ width: '100%', mt: -2, height: 80, borderRadius: 2 }} />
        </Grid>
      </>
    )
  }
  React.useEffect(() => {
    ApiCall()
  }, [successPostAbonnemnt, successUpdateAbonnemnt, successDeleteAbonnemnt])

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
              Abonnements
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
              <Typography variant="body1" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 1, borderRadius: 2, transition: '0.3s', }}>
                Liste Abonnements
              </Typography>

            </ListItem>
            {loadingGetAbonnemnt ? <><WatingAnne /></>
              :
              errorGetAbonnemnt ? <>{errorGetAbonnemnt}</>
                :
                abonnement.length > 0 ?
                  abonnement.filter(item => item.del !== 1).map(abonn => {
                    return (
                      <ListItem
                        sx={{ paddingInline: 2, paddingBlock: 1, display: { xs: 'block', sm: 'flex' }, '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }, }}
                        secondaryAction={
                          <>
                            <IconButton onClick={() => { handleClickOpenEdit(abonn.Type, abonn.Duree, abonn.Tarif, abonn._id) }} aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                              <SettingsRoundedIcon />
                            </IconButton>
                            <IconButton onClick={() => { handleClickOpenDelet(abonn.Type, abonn._id) }} aria-label="delet" sx={{ ml: 2, bgcolor: '#ff3434', color: 'white', transition: '.3s', '&:hover': { color: '#ff3434', bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                              <DeleteForeverRoundedIcon />
                            </IconButton>
                          </>
                        }
                      >
                        <ListItemText primaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} secondaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} primary={abonn.Type} secondary="Type abonnement" sx={{ width: { xs: '50%', sm: '15%' }, mb: { xs: 2, sm: 0 } }} />
                        <ListItemText primaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} secondaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} primary={abonn.Duree} secondary="Durée" sx={{ width: { xs: '50%', sm: '15%' }, mb: { xs: 2, sm: 0 } }} />
                        <ListItemText primaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} secondaryTypographyProps={{fontFamily: 'Bahnschrift SemiBold',}} primary={`${abonn.Tarif} DA`} secondary="Tarif Abonnement" sx={{ width: { xs: '50%', sm: '20%' }, mb: { xs: 2, sm: 0 } }} />


                      </ListItem>
                    )
                  })
                  :
                  <><Alert severity="warning" sx={{fontFamily: 'Bahnschrift SemiBold',}}>Erreur — Aucun Abonnements trouvé!</Alert></>
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
        <DialogTitle id="alert-dialog-title" sx={{fontFamily: 'Bahnschrift SemiBold',}}>
          {"Ajouter Abonnement"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>

              <Typography variant="h6" sx={{fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Type abonnement
              </Typography>
              <TextField onChange={(e) => { handelAbonnementType(e) }} value={abonnementType} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Type" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold',paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Durée abonnement <small>( jour )</small>
              </Typography>
              <TextField onChange={(e) => { handelAbonnementDuree(e) }} value={abonnementDuree} type={"number"} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Durée" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold',paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Tarif abonnement <small>( DA )</small>
              </Typography>
              <TextField onChange={(e) => { handelAbonnementTarif(e) }} value={abonnementTarif} type={"number"} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Tarif" />
              {loadingPostAbonnemnt ? <LinearProgress color="secondary" /> : null}
              {errorPostAbonnemnt ? <Alert sx={{ fontFamily: 'Bahnschrift SemiBold',mt: 1 }} severity="error">{errorPostAbonnemnt}</Alert> : null}
              {successPostAbonnemnt ? <Alert sx={{ fontFamily: 'Bahnschrift SemiBold',mt: 1 }} severity="success">Ce Abonnement a été ajouter avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ fontFamily: 'Bahnschrift SemiBold',color: 'red' }}>Annuler</Button>
          <Button onClick={onClickValidPost} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold',color: 'green' }}>
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
        <DialogTitle id="alert-dialog-title" sx={{fontFamily: 'Bahnschrift SemiBold',}}>
          {"Modifier Un Utilisateur"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>

              <Typography variant="h6" sx={{fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Type abonnement
              </Typography>
              <TextField onChange={(e) => { handelUpdateAbonnementType(e) }} value={abonnementTypeUpdate} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Type" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold',paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Durée abonnement <small>( jour )</small>
              </Typography>
              <TextField onChange={(e) => { handelUpdateAbonnementDuree(e) }} value={abonnementDureeUpdate} type={"number"} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Durée" />
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold',paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Tarif abonnement <small>( DA )</small>
              </Typography>
              <TextField onChange={(e) => { handelUpdateAbonnementTarif(e) }} value={abonnementTarifUpdate} type={"number"} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Tarif" />
              {loadingUpdateAbonnemnt ? <LinearProgress color="secondary" /> : null}
              {errorUpdateAbonnemnt ? <Alert sx={{fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="error">{errorUpdateAbonnemnt}</Alert> : null}
              {successUpdateAbonnemnt ? <Alert sx={{fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="success">Ce Abonnement a été Modifier avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} sx={{ fontFamily: 'Bahnschrift SemiBold',color: 'red' }}>Annuler</Button>
          <Button onClick={() => { onClickValidEdit(abonnementTypeUpdate, abonnementDureeUpdate, abonnementTarifUpdate, id) }} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold',color: 'green' }}>
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
        <DialogTitle id="alert-dialog-title" sx={{fontFamily: 'Bahnschrift SemiBold',}}>
          {"Supprimer Un Utilisateur"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container xs={12} sx={{ width: 500, display: 'block' }}>

              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold',paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Type abonnement
              </Typography>
              <TextField value={Value} disabled sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Type" />
              {loadingDeleteAbonnemnt ? <LinearProgress color="secondary" /> : null}
              {errorDeleteAbonnemnt ? <Alert sx={{fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="error">{errorDeleteAbonnemnt}</Alert> : null}
              {successDeleteAbonnemnt ? <Alert sx={{fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="success">Ce Modules a été ajouter avec success</Alert> : null}
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelet} sx={{ fontFamily: 'Bahnschrift SemiBold',color: 'red' }}>Annuler</Button>
          <Button onClick={() => { onClickValidDelete(id) }} autoFocus sx={{ fontFamily: 'Bahnschrift SemiBold',color: 'green' }}>
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      {/* fin delet dialog */}
    </Box >

  );
}

export default Abonnements;

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