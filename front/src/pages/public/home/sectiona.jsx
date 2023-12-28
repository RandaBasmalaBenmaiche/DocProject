import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Grid } from '@mui/material';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import GppGoodIcon from '@mui/icons-material/GppGood';
import Img1 from '../img/img1.jpg';
import Img2 from '../img/img2.jpg';
import image2 from '../img/image2.png';
import image1 from '../img/image1.png';
import Img5 from '../img/img5.jpg';
// import Logo from '../img/logo2.png';
import logof from '../img/logof2.png';
import { Link } from "react-router-dom";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import Avatar from '@mui/material/Avatar';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';
import CopyrightIcon from '@mui/icons-material/Copyright';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ArticleIcon from '@mui/icons-material/Article';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import InsightsIcon from '@mui/icons-material/Insights';
import HistoryIcon from '@mui/icons-material/History';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import TopicIcon from '@mui/icons-material/Topic';
import StarRateIcon from '@mui/icons-material/StarRate';
import StarHalfIcon from '@mui/icons-material/StarHalf';
const Sectiona = () => {

    return (
        <>

            <Grid container item xs={12} sx={{ top: '10vh', zIndex: '1' }} className="SectionA" flexDirection={'row'} alignContent={'flex-start'}>
                <Grid container item sm={12} md={12} columnGap={2}
                    sx={{
                        p: 2,
                        alignItems: 'center',
                        color: 'white'
                    }}
                >
                    <Grid item md={7} sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'left', p: 5, height: '85vh', bgcolor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', borderRadius: 2 }}>
                        <Typography variant="h3" sx={{ mt: 2, lineHeight: 1.5, fontWeight: 'bold', }} className="heading">
                            Accédez à une expérience d’apprentissage inégalée avec notre <b className='soulign'>plateforme</b> complète
                        </Typography>
                        <Typography variant="h6" component="h2" sx={{ mt: 5, lineHeight: 1.5, opacity: '0.8', maxWidth: '90%' }}>
                            Optimisez votre temps d’étude grâce à notre plateforme regroupant tous les cours, QCMs et explications vocales des professeurs, pour un accès facile et pratique à toutes les ressources dont vous avez besoin sur une seule et même plateforme !
                        </Typography>
                        <Button className='BtnInscreption' sx={{ px: 3, py: 1.5, mt: 13 }}>
                            <Link to={"/SignIn"} className="links" >
                                <Typography variant="body1" component="h2" className='Text'>
                                    commencez votre essai gratuite
                                </Typography>
                            </Link>
                            <GppGoodIcon sx={{ ml: 2 }} className='Icon' />
                        </Button>
                    </Grid>
                    <Grid item md={7} sx={{ display: { xs: 'block', md: 'none' }, textAlign: 'left', p: 2, pt: 7, height: '85vh', bgcolor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', borderRadius: 2 }}>
                        <Typography variant="h5" sx={{ mt: 2, lineHeight: 1.5, fontWeight: 'bold', }} className="heading">
                            Accédez à une expérience d’apprentissage inégalée avec notre <b className='soulign'>plateforme</b> complète
                        </Typography>
                        <Typography variant="body1" component="h2" sx={{ mt: 3, lineHeight: 1.5, opacity: '0.8', maxWidth: '90%' }}>
                            Optimisez votre temps d’étude grâce à notre plateforme regroupant tous les cours, QCMs et explications vocales des professeurs, pour un accès facile et pratique à toutes les ressources dont vous avez besoin sur une seule et même plateforme !
                        </Typography>
                        <Button className='BtnInscreption' sx={{ px: 3, py: 1.5, mt: 7 }}>
                            <Link to={"/SignIn"} className="links" >
                                <Typography variant="body1" component="h2" className='Text'>
                                    commencez votre essai gratuite
                                </Typography>
                            </Link>
                            <GppGoodIcon sx={{ ml: 2 }} className='Icon' />
                        </Button>
                    </Grid>
                    <Grid container item md={4.8} sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'left', p: 5, height: '85vh', bgcolor: 'rgba(0,0,0,0)', backdropFilter: 'blur(0px)', borderRadius: 2 }}>
                        <Grid item xs={12} className='GridImage'>
                            <img src={Img5} className='Image' loading='lazy' />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ top: '', zIndex: '1' }} className="Sectionb" flexDirection={'row'} alignContent={'flex-start'}>
                <Grid container item sm={12} md={12} columnGap={8} rowGap={4}
                    sx={{

                        p: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white ',
                        backgroundColor: 'rgb(13, 39, 66,0.9)'
                    }}
                >
                    <Grid item xs={12} sx={{ textAlign: 'center', px: { md: '20%', xs: '2%' }, py: { md: 7, xs: 3 } }}>
                        <h1>The must-have learning and teaching engine for health education students and faculty</h1>
                    </Grid>
                    <Grid className='GridB' item md={3} xs={12} sx={{ bgcolor: 'white', color: '#0d2742 ', textAlign: 'center', borderRadius: 7, overflow: 'hidden' }}>
                        <img src={Img1} style={{ width: '100%' }} />
                        <Grid item xs={12} sx={{ textAlign: 'center', position: 'relative', zIndex: '2' }} className='GridInfo'>
                            <Typography variant="h5" sx={{ color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', mt: 2, mb: 2, fontWeight: 'bold' }} className="heading">
                                Bank QCM
                            </Typography>
                            <Typography variant="body1" sx={{ px: 8, fontFamily: 'Bahnschrift SemiBold', mt: 0, fontWeight: 'bold' }} className="heading">
                                50k Quiz interactifs avec possibilité de filtrer les questions par module, cours et année.
                            </Typography>
                            <Button variant="contained" sx={{ fontFamily: 'Bahnschrift SemiBold', my: 2, mt: 7, px: 4, py: 1.5, bgcolor: '#ff5757', transition: '.3s', '&:hover': { bgcolor: '#0d2742', boxShadow: '3px 3px 6px rgba(,0,0,0.3) inset', cursor: 'pointer' } }}>Commencez Votre Essai</Button>
                        </Grid>
                    </Grid>
                    <Grid className='GridB' item md={3} xs={12} sx={{ bgcolor: 'white', color: '#0d2742 ', textAlign: 'center', borderRadius: 7, overflow: 'hidden' }}>
                        <img src={image1} style={{ width: '100%' }} />
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" sx={{ color: '#ff5757', mt: 2, mb: 2, fontWeight: 'bold' }} className="heading">
                                vidéo et enregistrements
                            </Typography>
                            <Typography variant="body1" sx={{ px: 8, mt: 0, fontWeight: 'bold' }} className="heading">
                                Accédez aux cours intégrés avec les enregistrements vocaux des professeurs et les meilleures vidéos Youtube.
                            </Typography>
                            <Button variant="contained" sx={{ fontFamily: 'Bahnschrift SemiBold', my: 2, mt: 7, px: 4, py: 1.5, bgcolor: '#ff5757', transition: '.3s', '&:hover': { bgcolor: '#0d2742', boxShadow: '3px 3px 6px rgba(,0,0,0.3) inset', cursor: 'pointer' } }}>Commencez Votre Essai</Button>
                        </Grid>
                    </Grid>
                    <Grid className='GridB' item md={3} xs={12} sx={{ bgcolor: 'white', color: '#0d2742 ', textAlign: 'center', borderRadius: 7, overflow: 'hidden' }}>
                        <img src={image2} style={{ width: '100%' }} />
                        <Grid item xs={12} sx={{ textAlign: 'center' }}>
                            <Typography variant="h5" sx={{ color: '#ff5757', textAlign: 'center', mt: 2, mb: 2, fontWeight: 'bold' }} className="heading">
                                Stastique
                            </Typography>
                            <Typography variant="body1" sx={{ px: 8, mt: 0, fontWeight: 'bold' }} className="heading">
                                Apprentissage personnalisé avec suivi de progrès et recommandations personnalisées
                            </Typography>
                            <Button variant="contained" sx={{ fontFamily: 'Bahnschrift SemiBold', my: 2, mt: 7, px: 4, py: 1.5, bgcolor: '#ff5757', transition: '.3s', '&:hover': { bgcolor: '#0d2742', boxShadow: '3px 3px 6px rgba(,0,0,0.3) inset', cursor: 'pointer' } }}>Commencez Votre Essai</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ top: '', zIndex: '1' }} className="Sectionb" flexDirection={'row'} alignContent={'flex-start'}>
                <Grid container item sm={12} md={12} columnGap={8}
                    sx={{

                        p: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white ',
                        backgroundColor: 'rgb(13, 39, 66,0.9)'
                    }}
                >
                    <Grid item xs={12} sx={{ textAlign: 'center', px: { md: '20%', xs: '5%' }, py: { md: 7, xs: 3 } }}>
                        <h1>The must-have learning and teaching engine for health education students and faculty</h1>
                    </Grid>
                    <Grid item md={8} xs={12} sx={{ bgcolor: 'white', height: { md: '80vh', xs: '25vh' }, borderRadius: 7 }}>

                    </Grid>
                    <Grid item md={3} xs={12} sx={{ mt: { xs: 4, md: 0 } }}>
                        <Grid item xs={12} >
                            <Grid sx={{ width: '80%', mb: 2, px: 2, py: 2, borderRadius: 7, overflow: 'hidden', bgcolor: 'white', textAlign: 'left', }}>
                                <Typography variant="h5" sx={{ color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                                    Cour
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#0d2742', fontFamily: 'Bahnschrift SemiBold', mt: 0, fontWeight: 'bold' }} className="heading">
                                    50k Quiz interactifs avec possibilité de filtrer les questions par module, cours et année.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <Grid sx={{ ml: '20%', width: '80%', mb: 2, px: 2, py: 2, borderRadius: 7, overflow: 'hidden', bgcolor: 'white', textAlign: 'left', }}>
                                <Typography variant="h5" sx={{ color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                                    Audio
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#0d2742', fontFamily: 'Bahnschrift SemiBold', mt: 0, fontWeight: 'bold' }} className="heading">
                                    50k Quiz interactifs avec possibilité de filtrer les questions par module, cours et année.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <Grid sx={{ width: '80%', mb: 2, px: 2, py: 2, borderRadius: 7, overflow: 'hidden', bgcolor: 'white', textAlign: 'left', }}>
                                <Typography variant="h5" sx={{ color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                                    Vidéos
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#0d2742', fontFamily: 'Bahnschrift SemiBold', mt: 0, fontWeight: 'bold' }} className="heading">
                                    50k Quiz interactifs avec possibilité de filtrer les questions par module, cours et année.
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} >
                            <Grid sx={{ ml: '20%', width: '80%', mb: 2, px: 2, py: 2, borderRadius: 7, overflow: 'hidden', bgcolor: 'white', textAlign: 'left', }}>
                                <Typography variant="h5" sx={{ color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                                    Quize
                                </Typography>
                                <Typography variant="body1" sx={{ color: '#0d2742', fontFamily: 'Bahnschrift SemiBold', mt: 0, fontWeight: 'bold' }} className="heading">
                                    50k Quiz interactifs avec possibilité de filtrer les questions par module, cours et année.
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* <Button variant="contained" sx={{ fontFamily: 'Bahnschrift SemiBold',my: 2, mt: 7,px:4,py:1.5,bgcolor:'#ff5757',transition:'.3s', '&:hover':{bgcolor:'#0d2742',boxShadow:'3px 3px 6px rgba(,0,0,0.3) inset',cursor:'pointer'} }}>Commencez Votre Essai</Button> */}

                    </Grid>


                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ zIndex: '1' }} className="Sectionb" flexDirection={'row'} alignContent={'flex-start'}>
                <Grid container item sm={12} md={12} columnGap={3} rowGap={2}
                    sx={{
                        minHeight: '100vh',
                        bgcolor: 'white',
                        p: 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'rgb(13, 39, 66,1) ',
                        // backgroundColor: 'rgb(13, 39, 66,0.9)'
                    }}
                >
                    <Grid item xs={12} sx={{ textAlign: 'center', px: '0%', py: 2, mb: 4 }}>
                        <h1>Fonctionnalités</h1>
                    </Grid>
                    <Grid md={2.6} xs={12} sx={{ '&:hover': { md: { bgcolor: 'rgb(13, 39, 66,1) ', '& .YouTubeIcon': { color: 'white', ml: '80%' }, '& #TEXT': { color: 'white', mt: -5 }, '& #TEXTT': { color: 'white' } } }, transition: '.3s', border: '1px solid silver', p: 2, borderRadius: 2 }}>
                        <YouTubeIcon className='YouTubeIcon' sx={{ transition: '.3s', fontSize: 50, color: '#FF5757' }} />
                        <Typography Id='TEXT' variant="h5" sx={{ transition: '.3s', mt: 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Vidéo
                        </Typography>
                        <Typography Id='TEXTT' variant="body1" sx={{ transition: '.3s', opacity: '0.8', mt: 1 / 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Cours
                        </Typography>
                    </Grid>

                    <Grid md={2.6} xs={12} sx={{ '&:hover': { md: { bgcolor: 'rgb(13, 39, 66,1) ', '& .YouTubeIcon': { color: 'white', ml: '80%' }, '& #TEXT': { color: 'white', mt: -5 }, '& #TEXTT': { color: 'white' } } }, transition: '.3s', border: '1px solid silver', p: 2, borderRadius: 2 }}>
                        <ArticleIcon className='YouTubeIcon' sx={{ transition: '.3s', fontSize: 50, color: '#FF5757' }} />
                        <Typography Id='TEXT' variant="h5" sx={{ transition: '.3s', mt: 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Cours
                        </Typography>
                        <Typography Id='TEXTT' variant="body1" sx={{ transition: '.3s', opacity: '0.8', mt: 1 / 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Cours
                        </Typography>
                    </Grid>
                    <Grid md={2.6} xs={12} sx={{ '&:hover': { md: { bgcolor: 'rgb(13, 39, 66,1) ', '& .YouTubeIcon': { color: 'white', ml: '80%' }, '& #TEXT': { color: 'white', mt: -5 }, '& #TEXTT': { color: 'white' } } }, transition: '.3s', border: '1px solid silver', p: 2, borderRadius: 2 }}>
                        <GraphicEqIcon className='YouTubeIcon' sx={{ transition: '.3s', fontSize: 50, color: '#FF5757' }} />
                        <Typography Id='TEXT' variant="h5" sx={{ transition: '.3s', mt: 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Enregistrement
                        </Typography>
                        <Typography Id='TEXTT' variant="body1" sx={{ transition: '.3s', opacity: '0.8', mt: 1 / 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Cours
                        </Typography>
                    </Grid>
                    <Grid md={2.6} xs={12} sx={{ '&:hover': { md: { bgcolor: 'rgb(13, 39, 66,1) ', '& .YouTubeIcon': { color: 'white', ml: '85%', }, '& #TEXT': { color: 'white', mt: -5, }, '& #TEXTT': { color: 'white' } } }, transition: '.3s', border: '1px solid silver', p: 2, borderRadius: 2 }}>
                        <InsightsIcon className='YouTubeIcon' sx={{ transition: '.3s', fontSize: 50, color: '#FF5757' }} />
                        <Typography Id='TEXT' variant="h5" sx={{ transition: '.5s', mt: 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Statistiques Module
                        </Typography>
                        <Typography Id='TEXTT' variant="body1" sx={{ transition: '.3s', opacity: '0.8', mt: 1 / 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Cours
                        </Typography>
                    </Grid>
                    <Grid md={2.6} xs={12} sx={{ '&:hover': { md: { bgcolor: 'rgb(13, 39, 66,1) ', '& .YouTubeIcon': { color: 'white', ml: '80%' }, '& #TEXT': { color: 'white', mt: -5 }, '& #TEXTT': { color: 'white' } } }, transition: '.3s', border: '1px solid silver', p: 2, borderRadius: 2 }}>
                        <TopicIcon className='YouTubeIcon' sx={{ transition: '.3s', fontSize: 50, color: '#FF5757' }} />
                        <Typography Id='TEXT' variant="h5" sx={{ transition: '.3s', mt: 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Modules
                        </Typography>
                        <Typography Id='TEXTT' variant="body1" sx={{ transition: '.3s', opacity: '0.8', mt: 1 / 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Cours
                        </Typography>
                    </Grid>
                    <Grid md={2.6} xs={12} sx={{ '&:hover': { md: { bgcolor: 'rgb(13, 39, 66,1) ', '& .YouTubeIcon': { color: 'white', ml: '80%' }, '& #TEXT': { color: 'white', mt: -5 }, '& #TEXTT': { color: 'white' } } }, transition: '.3s', border: '1px solid silver', p: 2, borderRadius: 2 }}>
                        <HelpCenterIcon className='YouTubeIcon' sx={{ transition: '.3s', fontSize: 50, color: '#FF5757' }} />
                        <Typography Id='TEXT' variant="h5" sx={{ transition: '.3s', mt: 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Questions
                        </Typography>
                        <Typography Id='TEXTT' variant="body1" sx={{ transition: '.3s', opacity: '0.8', mt: 1 / 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Cours
                        </Typography>
                    </Grid>
                    <Grid md={2.6} xs={12} sx={{ '&:hover': { md: { bgcolor: 'rgb(13, 39, 66,1) ', '& .YouTubeIcon': { color: 'white', ml: '80%' }, '& #TEXT': { color: 'white', mt: -5 }, '& #TEXTT': { color: 'white' } } }, transition: '.3s', border: '1px solid silver', p: 2, borderRadius: 2 }}>
                        <HistoryIcon className='YouTubeIcon' sx={{ transition: '.3s', fontSize: 50, color: '#FF5757' }} />
                        <Typography Id='TEXT' variant="h5" sx={{ transition: '.3s', mt: 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Historique
                        </Typography>
                        <Typography Id='TEXTT' variant="body1" sx={{ transition: '.3s', opacity: '0.8', mt: 1 / 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Cours
                        </Typography>
                    </Grid>
                    <Grid md={2.6} xs={12} sx={{ '&:hover': { md: { bgcolor: 'rgb(13, 39, 66,1) ', '& .YouTubeIcon': { color: 'white', ml: '80%' }, '& #TEXT': { color: 'white', mt: -5, }, '& #TEXTT': { color: 'white' } } }, transition: '.3s', border: '1px solid silver', p: 2, borderRadius: 2 }}>
                        <InsightsIcon className='YouTubeIcon' sx={{ transition: '.3s', fontSize: 50, color: '#FF5757' }} />
                        <Typography Id='TEXT' variant="h5" sx={{ transition: '.5s', mt: 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Statistiques Sujet
                        </Typography>
                        <Typography Id='TEXTT' variant="body1" sx={{ transition: '.3s', opacity: '0.8', mt: 1 / 2, color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                            Cours
                        </Typography>
                    </Grid>








                    {/* <Button variant="outlined" color='secondary' sx={{ fontFamily: 'Bahnschrift SemiBold', fontSize: 20, px: 4, py: 2, color: 'rgb(13, 39, 66,1)' }}
                    // endIcon={<PlayCircleFilledWhiteIcon  />}
                    >
                        commencez votre essai gratuite
                    </Button> */}
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ top: '', zIndex: '1' }} className="Sectionb" flexDirection={'row'} alignContent={'flex-start'}>
                <Grid container item sm={12} md={12} columnGap={6} rowGap={8}
                    sx={{

                        p: 4,
                        paddingBlockEnd: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white ',
                        backgroundColor: 'rgb(13, 39, 66,0.9)'
                    }}
                >
                    <Grid item xs={12} sx={{ textAlign: 'center', px: { md: '20%', xs: '5%' }, py: { md: 7, xs: 3 } }}>
                        <h1>The must-have learning and teaching engine for health education students and faculty</h1>
                    </Grid>
                    <Grid md={3.6} xs={12} sx={{ '&:hover': { '& .Star': { display: 'block' } }, position: 'relative' }}>
                        <Grid xs={12} sx={{ px: 4, py: 2, borderRadius: 7, textAlign: 'center', backdropFilter: 'blur(4px)', bgcolor: 'rgba(255,255,255,1)' }}>
                            <FormatQuoteIcon sx={{ color: '#ff5757', fontSize: 30, mb: 2 }} />
                            <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                                Thank you for your review. We're glad you had a good experience, and hope to see you again soon! Thank you very much for your generous review.
                            </Typography>
                            <Grid xs={12} sx={{ mt: 2, p: 2, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                                <Avatar src={image1} sx={{ width: 50, height: 50 }} />
                            </Grid>
                            <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                                Anis Thr
                            </Typography>
                        </Grid>
                        <Grid xs={12} className='Star' sx={{ transition: '.3s', display: { md: 'none', xs: 'block' }, textAlign: 'right', pr: 4, pt: 1, position: 'absolute', bottom: '-27px', right: 0 }}>
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                        </Grid>

                    </Grid>
                    <Grid md={3.6} xs={12} sx={{ '&:hover': { '& .Star': { display: 'block' } }, position: 'relative' }}>
                        <Grid xs={12} sx={{ px: 4, py: 2, borderRadius: 7, textAlign: 'center', backdropFilter: 'blur(4px)', bgcolor: 'rgba(255,255,255,1)' }}>
                            <FormatQuoteIcon sx={{ color: '#ff5757', fontSize: 30, mb: 2 }} />
                            <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                                Thank you for your review. We're glad you had a good experience, and hope to see you again soon! Thank you very much for your generous review.
                            </Typography>
                            <Grid xs={12} sx={{ mt: 2, p: 2, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                                <Avatar src={image1} sx={{ width: 50, height: 50 }} />
                            </Grid>
                            <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                                Anis Thr
                            </Typography>
                        </Grid>
                        <Grid xs={12} className='Star' sx={{ transition: '.3s', display: { md: 'none', xs: 'block' }, textAlign: 'right', pr: 4, pt: 1, position: 'absolute', bottom: '-27px', right: 0 }}>
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarHalfIcon sx={{ color: '#FFD93D' }} />
                        </Grid>

                    </Grid>
                    <Grid md={3.6} xs={12} sx={{ '&:hover': { '& .Star': { display: 'block' } }, position: 'relative' }}>
                        <Grid xs={12} sx={{ px: 4, py: 2, borderRadius: 7, textAlign: 'center', backdropFilter: 'blur(4px)', bgcolor: 'rgba(255,255,255,1)' }}>
                            <FormatQuoteIcon sx={{ color: '#ff5757', fontSize: 30, mb: 2 }} />
                            <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                                Thank you for your review. We're glad you had a good experience, and hope to see you again soon! Thank you very much for your generous review.
                            </Typography>
                            <Grid xs={12} sx={{ mt: 2, p: 2, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                                <Avatar src={image1} sx={{ width: 50, height: 50 }} />
                            </Grid>
                            <Typography variant="body1" sx={{ color: 'black', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} className="heading">
                                Anis Thr
                            </Typography>
                        </Grid>
                        <Grid xs={12} className='Star' sx={{ transition: '.3s', display: { md: 'none', xs: 'block' }, textAlign: 'right', pr: 4, pt: 1, position: 'absolute', bottom: '-27px', right: 0 }}>
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                            <StarRateIcon sx={{ color: '#FFD93D' }} />
                        </Grid>

                    </Grid>

                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ zIndex: '1' }} className="Sectionb" flexDirection={'row'} alignContent={'flex-start'}>
                <Grid container item sm={12} md={12} columnGap={8}
                    sx={{
                        minHeight: '50vh',
                        bgcolor: 'white',
                        p: { md: 10, xs: 5 },
                        py: { xs: 15, md: 10 },
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'rgb(13, 39, 66,1) ',
                        // backgroundColor: 'rgb(13, 39, 66,0.9)'
                    }}
                >
                    <Grid item xs={12} sx={{ textAlign: 'center', px: { md: '10%', xs: '2%' }, py: { md: 7, xs: 3 }, m: { md: 6, xs: 2 } }}>
                        <Typography variant="h3" sx={{ fontFamily: 'Bahnschrift SemiBold', display: { md: 'block', xs: 'none' } }} >
                            The must-have learning and teaching engine for health education students and faculty
                        </Typography>
                        <Typography variant="h5" sx={{ fontFamily: 'Bahnschrift SemiBold', display: { md: 'none', xs: 'block' } }} >
                            The must-have learning and teaching engine for health education students and faculty
                        </Typography>

                    </Grid>
                    <Button variant="outlined" color='secondary' sx={{ fontFamily: 'Bahnschrift SemiBold', fontSize: 20, px: 4, py: 2, color: 'rgb(13, 39, 66,1)' }}
                    // endIcon={<PlayCircleFilledWhiteIcon  />}
                    >
                        commencez votre essai gratuite
                    </Button>
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ top: '', zIndex: '1' }} className="Sectionb" flexDirection={'row'} alignContent={'flex-start'}>
                <Grid container sm={12} md={12} columnGap={6} rowGap={4}
                    sx={{

                        p: 4,
                        paddingBlockEnd: 20,
                        justifyContent: 'left',
                        alignItems: 'top',
                        color: 'white ',
                        backgroundColor: 'rgb(13, 39, 66,0.9)'
                    }}
                >
                    <Grid item xs={12} sx={{ textAlign: 'center', px: '0', mt: 5, mb: 2, fontFamily: 'Bahnschrift SemiBold', }}>
                        <h1>FAQ ?</h1>
                    </Grid>
                    <Grid md={3.6} xs={12} className='FAQS' >

                        <Typography className="QST" variant="body1" sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }, bgcolor: 'rgba(0,0,0,0.3)', px: 1, py: 2, mb: 2, paddingBottom: 5, color: 'white', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            <FormatQuoteIcon sx={{ color: '#ff5757', fontSize: 30, mb: 2 }} /> Qu'est-ce que DoctiDox ?
                        </Typography>
                        <Typography variant="body2" sx={{ bgcolor: 'white', p: 2, color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            DoctiDox est une plateforme en ligne complète conçue pour soutenir les étudiants en médecine dans leurs études. Elle offre un accès à une large gamme de ressources, y compris des QCM, des cours, des enregistrements des professeurs et des vidéos YouTube sélectionnées, le tout dans un emplacement pratique.
                        </Typography>

                    </Grid>
                    <Grid md={3.6} xs={12} className='FAQS' >

                        <Typography className="QST" variant="body1" sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }, bgcolor: 'rgba(0,0,0,0.3)', px: 1, py: 2, mb: 2, color: 'white', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            <FormatQuoteIcon sx={{ color: '#ff5757', fontSize: 30, mb: 2 }} /> Comment puis-je accéder au contenu sur DoctiDox ?
                        </Typography>
                        <Typography variant="body2" sx={{ bgcolor: 'white', p: 2, color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            Pour accéder au contenu sur DoctiDox, vous devez créer un compte et souscrire à l'un de nos plans. Une fois abonné, vous aurez un accès complet aux ressources en fonction de votre plan sélectionné.
                        </Typography>

                    </Grid>
                    <Grid md={3.6} xs={12} className='FAQS' >

                        <Typography className="QST" variant="body1" sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }, bgcolor: 'rgba(0,0,0,0.3)', px: 1, py: 2, mb: 2, color: 'white', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            <FormatQuoteIcon sx={{ color: '#ff5757', fontSize: 30, mb: 2 }} /> Les QCM sur DoctiDox sont-ils à jour et pertinents ?
                        </Typography>
                        <Typography variant="body2" sx={{ bgcolor: 'white', p: 2, color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            Oui, les QCM sur DoctiDox sont soigneusement sélectionnés et régulièrement mis à jour pour assurer leur pertinence avec les programmes d'études actuels. Vous aurez accès à des questions actualisées pour vous aider à vous préparer efficacement.
                        </Typography>

                    </Grid>
                    <Grid md={3.6} xs={12} className='FAQS' >

                        <Typography className="QST" variant="body1" sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }, bgcolor: 'rgba(0,0,0,0.3)', px: 1, py: 2, mb: 2, color: 'white', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            <FormatQuoteIcon sx={{ color: '#ff5757', fontSize: 30, mb: 2 }} /> Est-ce que j'aurai encore besoin de rechercher des enregistrements et des ressources sur Telegram et d'autres plateformes externes ?
                        </Typography>
                        <Typography variant="body2" sx={{ bgcolor: 'white', p: 2, color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            Non, avec DoctiDox, vous n'aurez plus besoin de perdre du temps à chercher des enregistrements vocaux et des ressources sur Telegram ou d'autres plateformes externes. Tout est regroupé au même endroit sur la plateforme DoctiDox, ce qui vous permet d'accéder facilement aux enregistrements des professeurs, aux vidéos YouTube pertinents et aux autres ressources nécessaires pour vos études médicales.
                        </Typography>

                    </Grid>
                    <Grid md={3.6} xs={12} className='FAQS' >

                        <Typography className="QST" variant="body1" sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }, bgcolor: 'rgba(0,0,0,0.3)', px: 1, py: 2, mb: 2, paddingBottom: 5, color: 'white', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            <FormatQuoteIcon sx={{ color: '#ff5757', fontSize: 30, mb: 2 }} /> Est-ce que DoctiDox offre des cours pour toutes les années d'études en médecine ?
                        </Typography>
                        <Typography variant="body2" sx={{ bgcolor: 'white', p: 2, color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            Oui, DoctiDox propose des cours couvrant toutes les années d'études en médecine. Vous pourrez accéder aux cours spécifiques à votre année d'étude et explorer les sujets de manière approfondie.
                        </Typography>

                    </Grid>
                    <Grid md={3.6} xs={12} className='FAQS' >

                        <Typography className="QST" variant="body1" sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }, bgcolor: 'rgba(0,0,0,0.3)', px: 1, py: 2, mb: 2, paddingBottom: 7, color: 'white', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            <FormatQuoteIcon sx={{ color: '#ff5757', fontSize: 30, mb: 2 }} /> Comment puis-je filtrer les QCM sur DoctiDox ?
                        </Typography>
                        <Typography variant="body2" sx={{ bgcolor: 'white', p: 2, color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            Sur DoctiDox, vous pouvez filtrer les QCM par module, cours et année d'étude. Cela vous permet de cibler spécifiquement les questions qui correspondent à vos besoins d'apprentissage.
                        </Typography>

                    </Grid>
                    <Grid md={3.6} xs={12} className='FAQS' >

                        <Typography className="QST" variant="body1" sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }, bgcolor: 'rgba(0,0,0,0.3)', px: 1, py: 2, mb: 2, color: 'white', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            <FormatQuoteIcon sx={{ color: '#ff5757', fontSize: 30, mb: 2 }} />
                            Est-ce que DoctiDox propose un support client en cas de problème technique ?
                        </Typography>
                        <Typography variant="body2" sx={{ bgcolor: 'white', p: 2, color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            Oui, nous avons une équipe de support client dédiée pour vous aider en cas de problème technique ou si vous avez des questions. Vous pouvez nous contacter par email ou insta et nous ferons de notre mieux pour vous assister.
                        </Typography>

                    </Grid>
                    <Grid md={3.6} xs={12} className='FAQS' >

                        <Typography className="QST" variant="body1" sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' }, bgcolor: 'rgba(0,0,0,0.3)', px: 1, py: 2, mb: 2, color: 'white', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            <FormatQuoteIcon sx={{ color: '#ff5757', fontSize: 30, mb: 2 }} />
                            Puis-je utiliser DoctiDox sur mon appareil   mobile ?
                        </Typography>
                        <Typography variant="body2" sx={{ bgcolor: 'white', p: 2, color: '#ff5757', fontFamily: 'Bahnschrift SemiBold', fontWeight: 'bold' }} >
                            Oui, DoctiDox est compatible avec les appareils mobiles. Vous pouvez accéder à la plateforme et profiter de ses fonctionnalités sur votre smartphone
                        </Typography>

                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xs={12} sx={{ top: '', zIndex: '1' }} className="Sectionb" flexDirection={'row'} alignContent={'flex-start'}>
                <Grid container item sm={12} md={12} columnGap={4} rowGap={4}
                    sx={{
                        py: 4,
                        px: { md: 10, xs: 4 },

                        justifyContent: 'left',
                        alignItems: 'center',

                        backgroundColor: 'white'
                    }}
                >
                    <Grid item md={3.6} xs={5.4} sx={{ textAlign: 'left', px: 2, mt: 5, mb: 2, fontFamily: 'Bahnschrift SemiBold', }}>
                        <Typography variant="h6" sx={{ p: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                            Pages
                        </Typography>
                        <Typography variant="body2" sx={{ p: 1 / 2, px: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                            Accueil
                        </Typography>
                        <Typography variant="body2" sx={{ p: 1 / 2, px: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                            Fonctionnalités
                        </Typography>
                    </Grid>
                    <Grid item md={3.6} xs={5.} sx={{ textAlign: 'left', px: 2, mt: 5, mb: 2, fontFamily: 'Bahnschrift SemiBold', }}>
                        <Typography variant="h6" sx={{ p: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                            Pages
                        </Typography>
                        <Typography variant="body2" sx={{ p: 1 / 2, px: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                            Accueil
                        </Typography>
                        <Typography variant="body2" sx={{ p: 1 / 2, px: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                            Option
                        </Typography>
                    </Grid>
                    <Grid container item md={3.6} xs={12} sx={{ textAlign: 'left', px: 2, mt: 5, mb: 2, fontFamily: 'Bahnschrift SemiBold', }}>


                        <Grid xs={12} md={12}>
                            <Typography variant="h6" sx={{ color: 'rgb(13, 39, 66,1) ', p: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                                Contacts
                            </Typography>
                        </Grid>
                        <Grid xs={6} md={12}>
                            <Typography variant="body2" sx={{ '&:hover': { color: '#FF5757', cursor: 'pointer', px: 2 }, transition: '.3s', color: 'rgb(13, 39, 66,1) ', p: 1, px: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                                <FacebookIcon sx={{ mr: 2 }} /> Facebook
                            </Typography>
                        </Grid>
                        <Grid xs={6} md={12}>
                            <Typography variant="body2" sx={{ '&:hover': { color: '#FF5757', cursor: 'pointer', px: 2 }, transition: '.3s', color: 'rgb(13, 39, 66,1) ', p: 1, px: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                                <TwitterIcon sx={{ mr: 2 }} /> Twitter
                            </Typography>
                        </Grid>
                        <Grid xs={6} md={12}>
                            <Typography variant="body2" sx={{ '&:hover': { color: '#FF5757', cursor: 'pointer', px: 2 }, transition: '.3s', color: 'rgb(13, 39, 66,1) ', p: 1, px: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                                <InstagramIcon sx={{ mr: 2 }} /> Instagram
                            </Typography>
                        </Grid>
                        <Grid xs={6} md={12}>
                            <Typography variant="body2" sx={{ '&:hover': { color: '#FF5757', cursor: 'pointer', px: 2 }, transition: '.3s', color: 'rgb(13, 39, 66,1) ', p: 1, px: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                                <WhatsAppIcon sx={{ mr: 2 }} /> WhatsApp
                            </Typography>
                        </Grid>
                        <Grid xs={6} md={12}>
                            <Typography variant="body2" sx={{ '&:hover': { color: '#FF5757', cursor: 'pointer', px: 2 }, transition: '.3s', color: 'rgb(13, 39, 66,1) ', p: 1, px: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                                <AttachEmailIcon sx={{ mr: 2 }} /> Email
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid xs={12} sx={{ textAlign: 'center',display:{md:'flex',xs:'block'},alignItems:'center',justifyContent:'center' }}>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgb(13, 39, 66,1) ', p: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                            © 2023 DOCTIDOX All rights reserved.
                        </Typography>
                        <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgb(13, 39, 66,1) ', p: 1, fontFamily: 'Bahnschrift SemiBold', }} >
                           <b>Developed by </b><img src={logof} style={{ width: '3rem', marginLeft: '0.5rem', marginRight: '0.5rem' }} /> 'S
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export default Sectiona;
