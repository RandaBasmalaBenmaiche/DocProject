import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import { Typography } from '@mui/material';
import LnksSide from './linksSide';








import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


import AccountCircle from '@mui/icons-material/AccountCircle';

import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from "react-router-dom";
import LnksSideA from './linksSide';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { logOut, reset } from '../../../features/auth/authSlice';
import axios from 'axios';
import { API_BASE } from '../../../constants';
const drawerWidth = 240;

function NavBareA(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };



    const container = window !== undefined ? () => window().document.body : undefined;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    
    const { user } = useSelector((state) => state.auth)
    const location = useHistory()
    const dispatch = useDispatch()

    const userToken = JSON.parse(localStorage.getItem('user'))
    const logou = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${userToken.token}`
            }
        }
        await axios.get(`${API_BASE}/user/logout`, config).then(res => {
            console.log("confirmed logout")
            dispatch(logOut())
            dispatch(reset())
            localStorage.clear()
            location.push('/')
        }).catch(error => {
            console.log(error.message)
        })
    }




    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <Link to={"/admin/profile"} className='Links'>
                <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={logou}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                    <Badge badgeContent={4} color="error">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <p>Messages</p>
            </MenuItem>
            <MenuItem>
                <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                >
                    <Badge badgeContent={17} color="error">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <p>Notifications</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );



    return (
        <div>
            <CssBaseline />
            <AppBar
                elevation={0}
                position="fixed"
                sx={{

                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    ml: { md: `${drawerWidth}px` },
                    color: '#ff5757',
                    backgroundColor: 'rgba(255,255,255,1)',
                    backdropFilter: 'blur(4px)',
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ fontFamily: 'Bahnschrift SemiBold',letterSpacing: 3 }}>
                        MEDRILL Admin
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'flex', md: 'flex' }, pr: 2 }}>

                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}

            <Box
                component="nav"
                sx={{ width: { md: drawerWidth, md: '0' }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* drawer mobile*/}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                       
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Toolbar />

                    <LnksSideA />

                </Drawer>
                {/* fin  drawer mobile*/}


            </Box>
        </div>

    );
}

NavBareA.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default NavBareA;