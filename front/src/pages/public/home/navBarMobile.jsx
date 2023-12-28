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
import SegmentIcon from '@mui/icons-material/Segment';
import { Link } from "react-router-dom";
import Img5 from '../img/logo2.png';
import LoginIcon from '@mui/icons-material/Login';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

const NavBarMobile = (props) => {
    const User = JSON.parse(localStorage.getItem('user'))



    const { window } = props;
    const [open, setOpen] = React.useState(false);


    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);

    };

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;

    return (

        <Grid container item xs={12} sx={{ height: '10vh', zIndex: '1' }}>

            <Grid container item sm={12} md={12} columnGap={2}
                sx={{
                    p: 2,
                    alignItems: 'center',
                    color: 'white'
                }}
            >
                <Grid item md={9} xs={7.6} sx={{ display: { md: 'block', xs: 'none' }, textAlign: 'left', pl: 5, py: 1 }}>
                    <img src={Img5} loading='lazy' height={40} />
                </Grid>
                <Grid item md={8} xs={7.6} sx={{ display: { md: 'none', xs: 'block' }, textAlign: 'left', pl: 5, py: 1 }}>
                    <img src={Img5} loading='lazy' height={30} />
                </Grid>
                {
                    !User ?
                        <>
                            <Grid item md={1} sx={{ display: { md: 'block', xs: 'none' }, textAlign: 'center', transition: '.3s', p: 1 }} className="LinkTo">
                                <Link to={"/Login"} className="linkNav">
                                    <Typography variant="body1" component="h2">
                                        Connexion
                                    </Typography>
                                </Link>
                            </Grid>

                            <Grid item md={1} sx={{ display: { md: 'block', xs: 'none' }, textAlign: 'center', transition: '.3s', p: 1 }} className="LinkToo">
                                <Link to={"/Signin"} className="linkNav">
                                    <Typography variant="body1" component="h2">
                                        Inscreption
                                    </Typography>
                                </Link>
                            </Grid>
                        </>
                        :
                        <Grid item md={2} sx={{ display: { md: 'block', xs: 'none' }, textAlign: 'center', transition: '.3s', p: 1 }} className="LinkTo">
                            <Link to={"/Login"} className="linkNav">
                                <Typography variant="body1" component="h2">
                                    Profile
                                </Typography>
                            </Link>
                        </Grid>
                }

                <Grid item md={1} xs={3.6} sx={{display:{md:'none',xs:'block'}, textAlign: 'center' }}>
                    <Button sx={{ color: 'white', p: 1 }} onClick={toggleDrawer(true)}><SegmentIcon sx={{ mr: 1 }} /> Menu</Button>
                </Grid>
            </Grid>

            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible',


                    },
                }}
            />

            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -(drawerBleeding - 60),
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller />
                    <Typography sx={{ p: 2, color: 'black', fontWeight: 'bold', fontFamily: 'Verdana' }}>Menu</Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        top: drawerBleeding,
                        position: 'absolute',
                        px: 2,
                        pb: 2,
                        height: '100%',
                        width: '100%',
                        overflow: 'auto',
                    }}
                >
                    <Grid container rowGap={2}>
                        {
                            !User ?
                                <>
                                    <Grid item xs={12} sx={{ display: { md: 'none', xs: 'block' }, textAlign: 'center', transition: '.3s', p: 2, bgcolor: 'rgb(13, 39, 66,1)',borderRadius:2 }} >
                                        <Link to={"/Login"} className="linkNav">
                                            <Typography variant="body1" component="h2" sx={{ textAlign: 'left' }}>
                                                <LoginIcon sx={{ marginRight: 3 }} />  Connexion
                                            </Typography>
                                        </Link>
                                    </Grid>

                                    <Grid item xs={12} sx={{ display: { md: 'none', xs: 'block' }, textAlign: 'center', transition: '.3s', p: 2, bgcolor: 'rgb(13, 39, 66,1)',borderRadius:2 }} >
                                        <Link to={"/Signin"} className="linkNav">
                                            <Typography variant="body1" component="h2" sx={{ textAlign: 'left' }}>
                                               <VerifiedUserIcon sx={{ marginRight: 3 }} /> Inscreption
                                            </Typography>
                                        </Link>
                                    </Grid>
                                </>
                                :
                                <Grid item xs={12} sx={{ display: { md: 'none', xs: 'block' }, textAlign: 'center', transition: '.3s', p: 2,bgcolor: 'rgb(13, 39, 66,1)',borderRadius:2  }} >
                                    <Link to={"/Login"} className="linkNav">
                                        <Typography variant="body1" component="h2" sx={{ textAlign: 'left' }}>
                                           <AccountCircleIcon sx={{ marginRight: 3 }} /> Profile
                                        </Typography>
                                    </Link>
                                </Grid>
                        }
                    </Grid>
                </StyledBox>
            </SwipeableDrawer>
        </Grid>
    );
}
NavBarMobile.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default NavBarMobile;
