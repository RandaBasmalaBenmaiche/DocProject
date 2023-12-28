
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

import { Typography } from '@mui/material';


// fin cordion

const Cours = ({ cours, data, onChange }) => {
    console.log('data from coure component')
    console.log(data)
    console.log('data from coure component courssssss')
    console.log(cours)
    console.log('filtred data from coure component ')
    let check = []
    cours.forEach(c => {
        data.forEach(d => {
            if (d.coure == c._id) {
                check.push({ id: d.coure, name: c.name })
            }
        })
    })
    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    const handleCheckboxChange = (event) => {
        const checkboxValue = event.target.value;
        const isChecked = event.target.checked;
      
        let updatedCheckboxes;
        if (isChecked) {
          updatedCheckboxes = [...selectedCheckboxes, checkboxValue];
        } else {
          updatedCheckboxes = selectedCheckboxes.filter((value) => value !== checkboxValue);
        }
        setSelectedCheckboxes(updatedCheckboxes);
        onChange(updatedCheckboxes);
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
                <Typography variant="h6" sx={{ paddingBlock: 1 / 2, borderRadius: 2, transition: '0.3s', color: '#635985', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                    Coure
                </Typography>
            </MenuItem>
            <Grid container xs={12} sx={{ display: 'flex', p: 1, backgroundColor: 'white', borderRadius: 2, boxShadow: '3px 3px 6px rgba(0,0,0,0.2)' }}>
                {check.length > 0 ? check.map(check => {
                    return (
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
                                    name='coure'
                                    value={check.id}
                                    checked={selectedCheckboxes.includes(check.id)}
                                    onChange={handleCheckboxChange}
                                />
                            </ListItemIcon>
                            <ListItemText>{check.name}</ListItemText>
                        </Grid>
                    )
                })
            :
            <p>no data found</p>
            }
            </Grid>
        </MenuList>

    );
}


export default Cours;