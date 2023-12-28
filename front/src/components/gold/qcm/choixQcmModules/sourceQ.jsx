
import Grid from '@mui/material/Grid';
import * as React from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';



// fin cordion

const SourceQ = ({ data, onChange }) => {
    const [source, setSource] = React.useState([null])
    const [SourceName, setSourceName] = React.useState([null])
    console.log(data)
    React.useEffect(() => {
        setSource(data ? data.map(data => data.source) : null)
    }, [data])
    // console.log(source)

    const [annabaChecked, setannabaChecked] = React.useState(false)
    const [sourceChecked, setsourceChecked] = React.useState(false)
    const handleannabaChange = (event) => {
        setannabaChecked(event.target.checked);
        onChange({annaba: event.target.checked, [SourceName]: sourceChecked  });
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
                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold',paddingBlock: 1 / 2, borderRadius: 2, transition: '0.3s', color: '#635985', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                    Source Questions
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
                            value={annabaChecked}
                            onChange={handleannabaChange}
                        />
                    </ListItemIcon>
                    <ListItemText>annaba</ListItemText>
                </Grid>

                {source ? 
                    source.filter((item, index) => source.indexOf(item) === index && item !== "annaba").map(source => {
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
                                        value={sourceChecked}
                                        onChange={(e)=>{
                                            setsourceChecked(e.target.checked)
                                            setSourceName(source)
                                            onChange({annaba: annabaChecked , [source] : e.target.checked })}}
                                    />
                                </ListItemIcon>
                                <ListItemText>{source}</ListItemText>
                            </Grid>
                        )
                    })
                    : null
                }
            </Grid>
        </MenuList>

    );
}


export default SourceQ;