import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { regester, reset } from '../../features/auth/authSlice';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useEffect } from 'react';


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Alert, Toolbar, Typography } from '@mui/material';
import "./style.css";
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Image from './back.png'
import { width } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE } from '../../constants';

export default function SignIn() {
  const location = useHistory()
  const [type, settype] = useState('password');
  const ChangeType = () => {
    if (type == 'password') {
      settype('text');
    } else {
      settype('password');
    }
  }
  const [value, setvalue] = React.useState('');
  const [valuaenne, setvalueanne] = React.useState('');

  const handleChange = (event) => {
    setvalue(event.target.value);
  };
  const handleChangeAnne = (event) => {
    setvalueanne(event.target.value);
  };
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

  const onSubmit = data => {
    dispatch(regester(data))
    location.push('/Login')
    console.log(data)
  }
  const [abonnement, setAbonnement] = React.useState([])
  const [successGetAbonnemnt, setSuccessGetAbonnemnt] = React.useState(null)
  const [loadingGetAbonnemnt, setLoadingGetAbonnemnt] = React.useState(false)
  const [errorGetAbonnemnt, setErrorGettAbonnemnt] = React.useState(null)

  const ApiCall = async () => {

    await axios.get(`${API_BASE}/abonnement`).then(res => {
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
  const [data, setData] = React.useState([])
  const [loaingdata, setLoadingData] = React.useState(true)
  const [errordata, setErrorData] = React.useState(null)
  const [willaya, setwillaya] = React.useState('')
  const AnneCall = async () => {

    await axios.get(`${API_BASE}/annee`).then(res => { setData(res.data); setLoadingData(false) }).catch(error => { console.log(error.response.data); setErrorData(error.response.data); setLoadingData(false) })
  }

  useEffect(() => {

    if (isError) {
      alert(message)
    }
    ApiCall()
    dispatch(reset())
    AnneCall()
  }, [user, isError, isSuccess, message, location, dispatch])

  if (isLoading) {
    return <p>loading ...</p>
  }
  return (
    <Grid container sx={{ bgcolor: 'white', minHeight: '100vh', maxHeight: '100vh', overflow: 'hidden' }}>
      {/* <Toolbar /> */}
      <Grid container item xs={12} sm={12} md={6} className="Login"
        sx={{

          minHeight: '100vh',
          bgcolor: 'rgba(255,255,255,1)',
          backdropFilter: 'blur(4px)',

          position: 'relative',
          zIndex: 0,
          p: { xs: 3, sm: 10, md: 7 },
        }}>
        <Grid item xs={12} flexDirection={'top'} direction={'row'} >
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <MonitorHeartIcon sx={{ mr: 2, color: '#0a0a58' }} />
            <Typography variant="h5" sx={{ color: '#0a0a58', fontWeight: 'bold', fontFamily: 'Bahnschrift SemiBold' }}>
              MedLife
            </Typography>
          </Grid>
          <Grid container item xs={12} >
            <Grid item xs={12} sx={{ display: 'block' }}>
              <Typography variant="h3" sx={{ fontFamily: 'Comic Sans MS', textAlign: 'center', color: '#1b1b2d', fontWeight: 'bold', }}>
                Welcom
              </Typography>

            </Grid>

          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container item xs={12} sx={{ px: { xs: 0, sm: 5 }, bgcolor: 'white', mt: 7, }}>
              <Grid item xs={12} sx={{ p: 1, borderRadius: 5, mb: 0 }}>
                <TextField {...register("email")} type={'email'} id="outlined-basic" placeholder="Email " variant="outlined" sx={{ width: '100%', boxShadow: '2px 2px 4px rgba(0,0,0,0.1)', borderRadius: 0, }} />
              </Grid>
              <Grid item xs={12} sx={{ p: 1, borderRadius: 5, mb: 0 }}>
                <TextField {...register("userName")} type={'text'} id="outlined-basic" placeholder="Nom D'utulisateure" variant="outlined" sx={{ width: '100%', boxShadow: '2px 2px 4px rgba(0,0,0,0.1)', borderRadius: 0, }} />
              </Grid>
              <Grid item xs={12} sx={{ p: 1, borderRadius: 5, mb: 0 }}>
                <FormControl fullWidth >
                  <Select
                    {...register("wilaya")}
                    required
                    value={willaya}
                    onChange={(e)=>{setwillaya(e.target.value)}}
                    displayEmpty
                    defaultValue=''
                    inputProps={{ 'aria-label': 'Without label' }}
                  >

                    <MenuItem value="">
                      <em>Willaya</em>
                    </MenuItem>
                    <MenuItem value="annaba">
                      <em>Annaba</em>
                    </MenuItem>
                    <MenuItem value="setif">
                      <em>Sétif</em>
                    </MenuItem>
                  </Select>
                </FormControl>
                {/* <TextField  type={'text'} id="outlined-basic" placeholder="Votre wilaya d'etud" variant="outlined" sx={{ width: '100%', boxShadow: '2px 2px 4px rgba(0,0,0,0.1)', borderRadius: 0, }} /> */}
              </Grid>
              <Grid item xs={12} sx={{ bgcolor: 'white', mt: 0, p: 1, }}>

                <div style={{ position: 'relative' }}>
                  <TextField {...register("password")} type={type} id="outlined-basic" placeholder=' Mot De Passe' variant="outlined" sx={{ width: '100%' }} />
                  {
                    type == 'password' ?
                      <IconButton onClick={() => ChangeType()} aria-label="delete" sx={{ color: '#1d1e6b', position: 'absolute', top: '0.5rem', right: '10px' }}>
                        <RemoveRedEyeIcon />
                      </IconButton>
                      :
                      <IconButton onClick={() => ChangeType()} aria-label="delete" sx={{ color: '#1d1e6b', position: 'absolute', top: '0.5rem', right: '10px' }}>
                        <VisibilityOffIcon />
                      </IconButton>

                  }


                </div>
              </Grid>
              <Grid item xs={6} sx={{ bgcolor: 'white', mt: 0, p: 1, }}>
                <FormControl fullWidth >
                  <Select
                    {...register("gold", { required: true })}
                    required
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    defaultValue=''
                    inputProps={{ 'aria-label': 'Without label' }}
                  >

                    <MenuItem value="">
                      <em>Abonnement</em>
                    </MenuItem>
                    {loadingGetAbonnemnt ? <>waiting for data !</>
                      :
                      errorGetAbonnemnt ? <>{errorGetAbonnemnt}</>
                        :
                        abonnement.length > 0 ?

                          abonnement.filter(item => item.del !== 1).map(abonn => {
                            return (
                              abonn.Type == 'gold' ?
                                <MenuItem value={abonn.Type}>{abonn.Type}<em style={{ marginRight: '0.5rem', marginLeft: '0.3rem' }}>({abonn.Duree} Jour) </em>/<b style={{ marginLeft: '0.5rem' }}> {abonn.Tarif} DA </b></MenuItem>
                                : <MenuItem value='normal'>{abonn.Type}<em style={{ marginRight: '0.5rem', marginLeft: '0.3rem' }}>({abonn.Duree} Jour) </em>/<b style={{ marginLeft: '0.5rem' }}> {abonn.Tarif} DA </b></MenuItem>
                            )
                          })


                          :
                          null}


                  </Select>

                </FormControl>

              </Grid>
              {value != '' ?
                value != 'gold' ?
                  <>
                    <Grid item xs={6} sx={{ bgcolor: 'white', mt: 0, p: 1, }}>
                      <FormControl fullWidth >
                        <Select
                          {...register("annee", { required: true })}
                          required
                          value={valuaenne}
                          onChange={handleChangeAnne}
                          displayEmpty
                          defaultValue=''
                          inputProps={{ 'aria-label': 'Without label' }}
                        >

                          <MenuItem value="">
                            <em>Année</em>
                          </MenuItem>
                          {
                            loaingdata ? <p>waiting for data ...</p> : errordata ?
                              <><Alert severity="warning" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>Erreur — Aucun Année trouvé!</Alert></>
                              : data.length > 0 ?
                                data.filter(item => item.del !== 1).map(data => {
                                  return (
                                    <MenuItem value={data.annee}>{data.annee}</MenuItem>
                                  );
                                })
                                : null
                          }


                        </Select>

                      </FormControl>

                    </Grid>
                  </>
                  : null
                : null
              }


              <Grid item xs={12} sx={{ mt: 2, p: 1, borderRadius: 5, display: { md: 'flex', xs: 'block' }, alignItems: 'center', }}>
                <Button type='submit' variant="contained" sx={{ py: 2, bgcolor: '#1d1e6b', width: { md: '100%', xs: '100%' }, '&:hover': { bgcolor: '#ff5757', } }}>
                  Commencer votre période d'essai
                </Button>
              </Grid>
              <Grid item xs={8} sx={{ mx: 12, mt: 2, mb: { xs: 0, sm: 1 } }} className='HR'></Grid>
              <Grid item xs={12} sx={{ mt: { xs: 0, sm: 2 }, p: 1, borderRadius: 5, display: { md: 'flex', xs: 'flex' }, justifyContent: 'center' }}>
                <Typography variant="body2" sx={{ mr: { md: 0, xs: 1 / 2 }, mt: { xs: 0, md: -2 }, mb: { xs: 1, md: 0 }, color: 'silver', textDecoration: 'solid' }}>
                  Vous Avez deja un compet
                </Typography>
                <Link to={"/Login"} className="linkNav">
                  <Typography variant="body2" sx={{ ml: { md: 1, xs: 1 / 2 }, mt: { xs: 0, md: -2 }, mb: { xs: 1, md: 0 }, color: '#1d1e6b', textDecoration: 'solid' }}>
                    Connexion !
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </form>

        </Grid>
      </Grid>
      <Grid container item md={6} sx={{ display: { xs: 'none', md: 'flex' }, minHeight: '100vh', maxHeight: '100vh', bgcolor: 'transparent', paddingInline: 2, paddingBlock: 2 }}>
        <Grid container item xs={12} className='containerA' sx={{ paddingInline: 4, paddingBlock: 8 }}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', maxHeight: 50, }}>
            <MonitorHeartIcon sx={{ mr: 2, color: 'white' }} />
            <Typography variant="h5" sx={{ color: 'white' }}>
              MedLife
            </Typography>
          </Grid>
          <img src={Image} style={{ width: '100%' }} loading="lazy" />
        </Grid>
      </Grid>


    </Grid>
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input {...register("firstName")} type='text' placeholder='first name' required />
    //   <input {...register("lastName")} type='text' placeholder='last name' required />
    //   <input {...register("userName")} type='text' placeholder='user name' required />
    //   <input {...register("email")} type='email' placeholder='email' required />
    //   <input {...register("adresse")} type='text' placeholder='adresse' required />
    //   <input {...register("telephone")} type='number' placeholder='num de telephone' required />
    //   <input {...register("annee")} type='text' placeholder='annee' required />
    //   <input {...register("password")} type='password' placeholder='password' required />
    //   <input type="submit" />
    // </form>
  );
}