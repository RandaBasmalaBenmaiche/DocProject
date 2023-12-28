
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

import { Typography } from '@mui/material';


// fin cordion

const TypeQ = ({ onChange }) => {
    const [qcmChecked, setQcmChecked] = useState(false);
    const [qcsChecked, setQcsChecked] = useState(false);
    const [qrocChecked, setqrocChecked] = useState(false);
    const [casqliniqueChecked, setcasqliniqueChecked] = useState(false);

    const handleqrocChecked = (event) => {
        setqrocChecked(event.target.checked);
        onChange({ qcm: qcmChecked, qcs: qcsChecked, croc: event.target.checked, qlinique: casqliniqueChecked });
    };

    const handlecasqliniqueChange = (event) => {
        setcasqliniqueChecked(event.target.checked);
        onChange({ qcm: qcmChecked, qcs: qcsChecked, croc: qrocChecked, qlinique: event.target.checked });
    };

    const handleQcsChange = (event) => {
        setQcsChecked(event.target.checked);
        onChange({ qcm: qcmChecked, qcs: event.target.checked, croc: qrocChecked, qlinique: casqliniqueChecked });
    };

    const handleQcmChange = (event) => {
        setQcmChecked(event.target.checked);
        onChange({ qcm: event.target.checked, qcs: qcsChecked, croc: qrocChecked, qlinique: casqliniqueChecked });
    };
    return (

        <MenuList sx={{ width: '100%', borderRadius: 2, p: 1 / 2, mb: 2, mt: 1 }}>
            <MenuItem
                sx={{
                    paddingBlock: 1,
                    paddingInline: 0,
                    '&:hover': {
                        backgroundColor: 'transparent',
                    }
                }}
            >
                <Typography variant="h6" sx={{fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, borderRadius: 2, transition: '0.3s', color: '#635985', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                    Type Question
                </Typography>
            </MenuItem>
            <Grid container xs={12} sx={{ display: 'flex', p: 1, backgroundColor: 'white', borderRadius: 2, boxShadow: '3px 3px 6px rgba(0,0,0,0.2)' }}>
                <Grid item xs={4}
                    sx={{
                        display: 'flex',
                        marginBlock: 1,
                        alignItems: 'center !important',
                        '&:hover': { backgroundColor: '#FFC3C3', borderRadius: 2, cursor: 'pointer' }

                    }}>
                    <ListItemIcon>
                        <Checkbox
                            aria-label='Checkbox demo'
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }}
                            name='qcm'
                            checked={qcmChecked}
                            onChange={handleQcmChange}
                        />
                    </ListItemIcon>
                    <ListItemText>QCM</ListItemText>
                </Grid>
                <Grid item xs={4}
                    sx={{
                        display: 'flex',
                        marginBlock: 1,
                        alignItems: 'center !important',
                        '&:hover': { backgroundColor: '#FFC3C3', borderRadius: 2, cursor: 'pointer' }

                    }}>
                    <ListItemIcon>
                        <Checkbox
                            aria-label='Checkbox demo'
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }}
                            name='croc'
                            checked={qrocChecked}
                            onChange={handleqrocChecked}
                        />
                    </ListItemIcon>
                    <ListItemText>CROC</ListItemText>
                </Grid>
                <Grid item xs={4}
                    sx={{
                        display: 'flex',
                        marginBlock: 1,
                        alignItems: 'center !important',
                        '&:hover': { backgroundColor: '#FFC3C3', borderRadius: 2, cursor: 'pointer' }

                    }}>
                    <ListItemIcon>
                        <Checkbox
                            aria-label='Checkbox demo'
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }}
                            name='qlinique'
                            checked={casqliniqueChecked}
                            onChange={handlecasqliniqueChange}
                        />
                    </ListItemIcon>
                    <ListItemText>CAS-QLINIQUE</ListItemText>
                </Grid>
                <Grid item xs={4}
                    sx={{
                        display: 'flex',
                        marginBlock: 1,
                        alignItems: 'center !important',
                        '&:hover': { backgroundColor: '#FFC3C3', borderRadius: 2, cursor: 'pointer' }

                    }}>
                    <ListItemIcon>
                        <Checkbox
                            aria-label='Checkbox demo'
                            sx={{
                                color: pink[800],
                                '&.Mui-checked': {
                                    color: pink[600],
                                },
                            }}
                            name='qcs'
                            checked={qcsChecked}
                            onChange={handleQcsChange}
                        />
                    </ListItemIcon>
                    <ListItemText>QCS</ListItemText>
                </Grid>


            </Grid>
        </MenuList>

    );
}


export default TypeQ;