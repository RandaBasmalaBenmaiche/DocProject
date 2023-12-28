import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import LnksSide from './linksSide';

const drawerWidth = 240;

function SideBare(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };



    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
           
            
            <Box
           
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 }}}
                aria-label="mailbox folders"
            >
                {/* drawer mobile*/}
                
                {/* fin  drawer mobile*/}

                {/* drawer pc*/}
                <Drawer
                    variant="permanent"
                    sx={{
                        border:'10px solid black',
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <Toolbar />
                   <LnksSide />
                    
                   
                </Drawer>
                {/* fin drawer pc*/}
            </Box>

        </Box>
    );
}

SideBare.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SideBare;