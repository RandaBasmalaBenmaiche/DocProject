import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WindowIcon from '@mui/icons-material/Window';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Typography } from '@mui/material';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useState } from 'react';
import { Link } from "react-router-dom";
import FolderIcon from '@mui/icons-material/Folder';
import SettingsIcon from '@mui/icons-material/Settings';
import '../../../index.css';



const LnksSideA = () => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    const [openc, setOpenc] = useState(true);

    const handleClickc = () => {
        setOpenc(!openc);
    };

    const [opencc, setOpencc] = useState(true);

    const handleClickcc = () => {
        setOpencc(!opencc);
    };
    return (
        // <Link to={"/gold"} statQuiz
        <List className='likSide'
            sx={{
                maxHeight:'95vh',
                overflowY:'auto',
            }}>

            <ListItem disablePadding>
                <Link to={"/admin"} className='Links'>
                    <ListItemButton
                        sx={{
                            transition: '0.3s',
                            borderLeft: '0px solid transparent',
                            marginBottom: 0,
                            // '&:hover': {
                            //     backgroundColor: 'rgba(179, 61, 149, 0.1)',
                            //     borderLeft: '5px solid rgba(179, 61, 149, 1)',
                            //     "& .Iconn .Icon": {
                            //         backgroundColor: 'white',
                            //     }

                            // }, '&:focus': {
                            //     backgroundColor: 'rgba(179, 61, 149, 0.1)',
                            //     borderLeft: '5px solid rgba(179, 61, 149, 1)',
                            //     "& .Icon": {
                            //         backgroundColor: 'white',

                            //     }
                            // }
                        }}>
                        <ListItemIcon className="Iconn">
                            <WindowIcon className="Icon" sx={{
                                color: '#b33d95',
                                transition: '0.3s',
                                // backgroundColor: 'rgba(244, 226, 239,0.6)',
                                // border: '2px solid rgba(179, 61, 149, 0.5)',
                                p: 1,
                                fontSize: 35,
                                borderRadius: 50,
                            }} />
                        </ListItemIcon>
                        <Typography sx={{
                            fontWeight: 'bold',
                            width: 210,
                            pt: 0,
                            pl: 1.5,
                            transition: '0.3s',
                            pb: 0,
                            fontFamily: 'Bahnschrift SemiBold'
                        }}>
                            Home
                        </Typography>
                    </ListItemButton>
                </Link>
            </ListItem>


            <ListItemButton
                sx={{
                    transition: '0.3s',
                    '&:hover': {
                        backgroundColor: 'rgba(179, 61, 149, 0)',
                    },

                }}
                onClick={handleClick} >
                <FolderIcon className="Icon" sx={{
                    fontWeight: 'bold',
                    color: 'silver',

                    p: 1,
                    transition: '0.5s',
                    fontSize: 35,
                    borderRadius: 50,
                    mr: 0,

                }} />
                <Typography sx={{
                    width: 210,
                    pt: 1,
                    pl: 0,
                    pb: 1,
                    color: 'silver',
                    fontFamily: 'Bahnschrift SemiBold',
                    borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}>
                    Folders
                </Typography>
                {/* {open ? <ExpandLess sx={{ color: '#b33d95' }} /> : <ExpandMore sx={{ color: '#b33d95' }} />} */}
            </ListItemButton>

            <Collapse in="open" timeout="auto" unmountOnExit
                sx={{
                    pl: 1.5,
                }} >
                <Link to={"/admin/annees"} className='Links'>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{
                                maxWidth: '95%',
                                transition: '0.3s',
                                borderRadius: '10px',
                                marginBottom: 1,
                                '&:hover': {

                                    borderRadius: '20px',
                                }
                            }}>
                            <ListItemIcon>
                                <FolderIcon sx={{
                                    color: '#ff5757',
                                    // backgroundColor: '#ffdddd',
                                    // border: '1px solid rgba(255, 87, 87,0.3)',
                                    p: 1,
                                    fontSize: 35,
                                    borderRadius: 50,

                                }} />
                            </ListItemIcon>
                            <Typography sx={{
                                fontWeight: 'bold',
                                width: 160,
                                pt: 1,
                                pl: 0,
                                pb: 1,
                                fontFamily: 'Bahnschrift SemiBold'
                            }}>
                                Années Quiz
                            </Typography>
                            {/* <ListItemText primary={'Années'} /> */}
                        </ListItemButton>

                    </ListItem>
                </Link>
                <Link to={"/admin/modules"} className='Links'>
                    <ListItem disablePadding>
                        <ListItemButton
                            sx={{
                                maxWidth: '95%',
                                transition: '0.3s',
                                borderRadius: '10px',
                                marginBottom: 1,
                                '&:hover': {

                                    borderRadius: '20px',
                                }
                            }}>
                            <ListItemIcon>
                                <FolderIcon
                                    sx={{
                                        color: '#ff5757',
                                        // backgroundColor: '#ffdddd',
                                        // border: '1px solid rgba(255, 87, 87,0.3)',
                                        p: 1,
                                        fontSize: 35,
                                        borderRadius: 50,
                                    }} />
                            </ListItemIcon>
                            <Typography sx={{
                                fontWeight: 'bold',
                                width: 160,
                                pt: 1,
                                pl: 0,
                                pb: 1,
                                fontFamily: 'Bahnschrift SemiBold'
                            }}>
                                Modules
                            </Typography>
                            {/* <ListItemText primary={'Modules'} /> */}
                        </ListItemButton>

                    </ListItem>
                </Link>
                <Link to={"/admin/cours"} className='Links'>
                    <ListItem disablePadding>
                        <ListItemButton sx={{
                            maxWidth: '95%',
                            transition: '0.3s',
                            borderRadius: '10px',
                            marginBottom: 1,
                            '&:hover': {

                                borderRadius: '20px',
                            }
                        }}>
                            <ListItemIcon>
                                <FolderIcon sx={{
                                    color: '#ff5757',
                                    p: 1,
                                    fontSize: 35,
                                }} />
                            </ListItemIcon>
                            <Typography sx={{
                                fontWeight: 'bold',
                                width: 160,
                                pt: 1,
                                pl: 0,
                                pb: 1,
                                fontFamily: 'Bahnschrift SemiBold'
                            }}>
                                Cours
                            </Typography>
                            {/* <ListItemText primary={'Cours'} /> */}
                        </ListItemButton>

                    </ListItem>
                </Link>
                <Link to={"/admin/Quiz"} className='Links'>
                    <ListItem disablePadding>
                        <ListItemButton sx={{
                            maxWidth: '95%',
                            transition: '0.3s',
                            borderRadius: '10px',
                            marginBottom: 1,
                            '&:hover': {

                                borderRadius: '20px',
                            }
                        }}>
                            <ListItemIcon>
                                <FolderIcon sx={{
                                    color: '#ff5757',
                                    p: 1,
                                    fontSize: 35,
                                }} />
                            </ListItemIcon>
                            <Typography sx={{
                                fontWeight: 'bold',
                                width: 160,
                                pt: 1,
                                pl: 0,
                                pb: 1,
                                fontFamily: 'Bahnschrift SemiBold'
                            }}>
                                Quiz
                            </Typography>
                            {/* <ListItemText primary={'Quiz'} /> */}
                        </ListItemButton>

                    </ListItem>
                </Link>
            </Collapse>


            <ListItemButton
                sx={{
                    transition: '0.3s',
                    '&:hover': {
                        backgroundColor: 'rgba(179, 61, 149, 0)',
                    },
                }}
                onClick={handleClickc} >
                <SettingsIcon className="Icon" sx={{
                    fontWeight: 'bold',
                    color: 'silver',

                    p: 1,
                    transition: '0.5s',
                    fontSize: 35,
                    borderRadius: 50,
                    mr: 0,

                }} />
                <Typography sx={{
                    width: 210,
                    pt: 1,
                    pl: 0,
                    pb: 1,
                    color: 'silver',
                    fontFamily: 'Bahnschrift SemiBold',
                    borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}>
                    Paramètres
                </Typography>
                {/* {openc ? <ExpandLess sx={{ color: '#b33d95' }} /> : <ExpandMore sx={{ color: '#b33d95' }} />} */}
            </ListItemButton>

            <Collapse in="open" timeout="auto" unmountOnExit
                sx={{
                    pl: 1.5,
                }} >
                <Link to={"/admin/abonnements"} className='Links'>
                    <ListItem disablePadding>
                        <ListItemButton sx={{
                            maxWidth: '95%',
                            transition: '0.3s',
                            borderRadius: '10px',
                            marginBottom: 1,
                            '&:hover': {

                                borderRadius: '20px',
                            }
                        }}>
                            <ListItemIcon>
                                <SettingsIcon sx={{
                                    color: '#ff5757',

                                    p: 1,
                                    fontSize: 35,

                                }} />
                            </ListItemIcon>
                            <Typography sx={{
                                fontWeight: 'bold',
                                width: 160,
                                pt: 1,
                                pl: 0,
                                pb: 1,
                                fontFamily: 'Bahnschrift SemiBold'
                            }}>
                                Abonnements
                            </Typography>
                            {/* <ListItemText primary={'Abonnements'} /> */}
                        </ListItemButton>

                    </ListItem>
                </Link>
                <Link to={"/admin/users"} className='Links'>
                    <ListItem disablePadding>
                        <ListItemButton sx={{
                            maxWidth: '95%',
                            transition: '0.3s',
                            borderRadius: '10px',
                            marginBottom: 1,
                            '&:hover': {

                                borderRadius: '20px',
                            }
                        }}>
                            <ListItemIcon>
                                <SettingsIcon sx={{
                                    color: '#ff5757',

                                    p: 1,
                                    fontSize: 35,

                                }} />
                            </ListItemIcon>
                            <Typography sx={{
                                fontWeight: 'bold',
                                width: 160,
                                pt: 1,
                                pl: 0,
                                pb: 1,
                                fontFamily: 'Bahnschrift SemiBold'
                            }}>
                                Utilisateures
                            </Typography>
                            {/* <ListItemText primary={'Utilisateures'} /> */}
                        </ListItemButton>

                    </ListItem>
                </Link>

            </Collapse>


            <ListItemButton
                sx={{
                    transition: '0.3s',
                    '&:hover': {
                        backgroundColor: 'rgba(179, 61, 149, 0)',
                    },
                }}
                onClick={handleClickcc} >
                <InsertChartIcon className="Icon" sx={{
                    fontWeight: 'bold',
                    color: 'silver',

                    p: 1,
                    transition: '0.5s',
                    fontSize: 35,
                    borderRadius: 50,
                    mr: 0,

                }} />
                <Typography sx={{
                    width: 210,
                    pt: 1,
                    pl: 0,
                    pb: 1,
                    color: 'silver',
                    fontFamily: 'Bahnschrift SemiBold',
                    borderBottom: '1px solid rgba(0,0,0,0.1)'
                }}>
                    Statistiques
                </Typography>
                {/* {opencc ? <ExpandLess sx={{ color: '#b33d95' }} /> : <ExpandMore sx={{ color: '#b33d95' }} />} */}
            </ListItemButton>

            <Collapse in="open" timeout="auto" unmountOnExit
                sx={{
                    pl: 1.5,
                }} >
                <Link to={"/admin/statUser"} className='Links'>
                    <ListItem disablePadding>
                        <ListItemButton sx={{
                            maxWidth: '95%',
                            transition: '0.3s',
                            borderRadius: '10px',
                            marginBottom: 1,
                            '&:hover': {

                                borderRadius: '20px',
                            }
                        }}>
                            <ListItemIcon>
                                <InsertChartIcon sx={{
                                    color: '#ff5757',

                                    p: 1,
                                    fontSize: 35,

                                }} />
                            </ListItemIcon>
                            <Typography sx={{
                                fontWeight: 'bold',
                                width: 160,
                                pt: 1,
                                pl: 0,
                                pb: 1,
                                fontFamily: 'Bahnschrift SemiBold'
                            }}>
                                Utilisateurs
                            </Typography>
                            {/* <ListItemText primary={'Utilisateurs'} /> */}
                        </ListItemButton>

                    </ListItem>
                </Link>
                <Link to={"/admin/statTrafic"} className='Links'>
                    <ListItem disablePadding>
                        <ListItemButton sx={{
                            maxWidth: '95%',
                            transition: '0.3s',
                            borderRadius: '10px',
                            marginBottom: 1,
                            '&:hover': {

                                borderRadius: '20px',
                            }
                        }}>
                            <ListItemIcon>
                                <InsertChartIcon sx={{
                                    color: '#ff5757',

                                    p: 1,
                                    fontSize: 35,

                                }} />
                            </ListItemIcon>
                            <Typography sx={{
                                fontWeight: 'bold',
                                width: 160,
                                pt: 1,
                                pl: 0,
                                pb: 1,
                                fontFamily: 'Bahnschrift SemiBold'
                            }}>
                                Trafic
                            </Typography>
                            {/* <ListItemText primary={'Trafic'} /> */}
                        </ListItemButton>

                    </ListItem>
                </Link>
                <Link to={"/admin/statconsulte"} className='Links'>
                    <ListItem disablePadding>
                        <ListItemButton sx={{
                            maxWidth: '95%',
                            transition: '0.3s',
                            borderRadius: '10px',
                            marginBottom: 1,
                            '&:hover': {

                                borderRadius: '20px',
                            }
                        }}>
                            <ListItemIcon>
                                <InsertChartIcon sx={{
                                    color: '#ff5757',

                                    p: 1,
                                    fontSize: 35,

                                }} />
                            </ListItemIcon>
                            <Typography sx={{
                                fontWeight: 'bold',
                                width: 160,
                                pt: 1,
                                pl: 0,
                                pb: 1,
                                fontFamily: 'Bahnschrift SemiBold'
                            }}>
                                Consultations
                            </Typography>
                            {/* <ListItemText primary={'Consultations'} /> */}
                        </ListItemButton>

                    </ListItem>
                </Link>


            </Collapse>




        </List >
    );
}

export default LnksSideA;