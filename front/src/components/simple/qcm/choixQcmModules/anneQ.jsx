
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { FormControl, InputLabel, Select, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


// fin cordion

const AnneQ = ({ onChange }) => {
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const Year = new Date().getFullYear();
    const arrayLength = Year - 2012;
    const handleFromDateChange = (e) => {
        setFromDate(e.target.value);
        onChange({ fromDate: e.target.value, toDate })
    };

    const handleToDateChange = (e) => {
        setToDate(e.target.value);
        onChange({ fromDate, toDate: e.target.value })
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
                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, borderRadius: 2, transition: '0.3s', color: '#635985', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                    Année
                </Typography>
            </MenuItem>

            <Grid container xs={12} sx={{ display: 'flex', p: 2, borderRadius: 2, bgcolor: 'white', boxShadow: '3px 3px 6px rgba(0,0,0,0.2)' }}>
                <Grid item xs={12} sm={6}
                    sx={{
                        display: 'flex',
                        p: 1 / 2,
                        alignItems: 'center !important',

                    }}>
                    <ListItemText sx={{ flex: '1 0 30%' }}>De </ListItemText>
                    <ListItemIcon sx={{ flex: '1 0 70%', mr: 1 / 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">annee</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="annee"
                                value={fromDate}
                                onChange={handleFromDateChange}
                            >
                                {Array.from({ length: arrayLength+1 }, (_, i) => i + 2012).map((year) => (
                                    <MenuItem  value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItemIcon>

                </Grid>
                <Grid item sm={6} xs={12}
                    sx={{
                        display: 'flex',
                        p: 1 / 2,
                        alignItems: 'center !important',

                    }}>
                    <ListItemText sx={{ flex: '1 0 30%' }}>Jusqu'à</ListItemText>
                    <ListItemIcon sx={{ flex: '1 0 70%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">annee</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="annee"
                                value={toDate}
                                onChange={handleToDateChange}
                            >
                                {Array.from({ length: arrayLength+1 }, (_, i) => i + 2012).map((year) => (
                                    <MenuItem  value={year}>{year}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </ListItemIcon>

                </Grid>
            </Grid>


        </MenuList>
    );
}


export default AnneQ;