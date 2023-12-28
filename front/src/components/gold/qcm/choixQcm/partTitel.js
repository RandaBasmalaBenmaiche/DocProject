
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

const PartTitle = ({onChange}) => {
    const [value , setValue] = useState('')
    const handleChange = (e)=>{
        setValue(e.target.value);
        onChange(e.target.value);
    }
    return (

        <MenuList sx={{ width: '100%', borderRadius: 2,p:1/2,mb:2,mt:1 }}>
           <MenuItem
                sx={{
                    paddingBlock: 1,
                    paddingInline: 0,
                    '&:hover': {
                        backgroundColor: 'transparent',
                    }
                }}
            >
                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold',paddingBlock: 1 / 2, borderRadius: 2, transition: '0.3s',color: '#635985',  '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                    Titre De Qcm
                </Typography>
            </MenuItem>
            <Grid container xs={12} sx={{ display: 'flex', p: 1,backgroundColor: 'white', borderRadius: 2,boxShadow:'3px 3px 6px rgba(0,0,0,0.2)' }}>
                <Grid item xs={12}
                    sx={{
                        display: 'flex',
                        marginBlock: 1,
                        alignItems: 'center !important',
                        '&:hover': { backgroundColor: '#FFC3C3', borderRadius: 2, cursor: 'pointer' }

                    }}>
                    <input type="text" required placeholder='Titre ....' value={value} onChange={handleChange} style={{width:'100%',padding:'0.5rem',border:'0px solid silver',borderRadius:'5px',}} />
                </Grid>
                


            </Grid>
        </MenuList>

    );
}


export default PartTitle;