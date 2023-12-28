
import Grid from '@mui/material/Grid';
import * as React from 'react';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TextField from '@mui/material/TextField';
import { FormControl, InputLabel, Select, Typography } from '@mui/material';
import axios from 'axios';
import { API_BASE } from '../../../../constants';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// fin cordion

const PartModules = ({ onChange, loading, error, modules }) => {
  const [moduleFilterId, setmoduleFilterId] = React.useState('')
  const handleChangeModuleFilterId = (e) => {
    setmoduleFilterId(e.target.value)
    onChange(e.target.value)
  }
  const userToken = JSON.parse(localStorage.getItem('user'))

  const [annee, setAnnee] = React.useState([])
  const [loainganneedata, setLoadinganneeData] = React.useState(true)
  const [erroranneedata, setErroranneeData] = React.useState(null)
  const [year, setYear] = React.useState('')

  const ApiCall = async () => {
    const config = {
        headers: {
            'content-type': 'application/json',
            'authorization': `Bearer ${userToken.token}`
        }
    }
    await axios.get(`${API_BASE}/annee`, config).then(res => { setAnnee(res.data); setLoadinganneeData(false) }).catch(error => { console.log(error.response.data); setErroranneeData(error.response.data); setLoadinganneeData(false) })
}

const handleChange = (e) => {
  setYear(e.target.value)
}

React.useEffect(() => {
  ApiCall()
}, []);

  return (
    <>
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
        <Grid container xs={12} sx={{ display: 'flex', p: 1, backgroundColor: 'white', borderRadius: 2, boxShadow: '3px 3px 6px rgba(0,0,0,0.2)' }}>
          <Grid item xs={12}
            sx={{
              display: 'flex',
              marginBlock: 1,
              alignItems: 'center !important',


            }}>
            <FormControl fullWidth>
              {
                loainganneedata ? <>wait for data</> : erroranneedata ?
                  <>
                    {erroranneedata}
                  </>
                  :
                  <>
                    <InputLabel id="demo-simple-select-label">annee scolaire</InputLabel>
                    <Select
                      sx={{ bgcolor: 'white' }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={year}
                      label="annee scolaire"
                      onChange={handleChange}
                    >
                      <MenuItem value={''}>All</MenuItem>
                      {annee.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> })}
                    </Select>
                  </>
              }
            </FormControl>
          </Grid>



        </Grid>
      </MenuList>

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
            Modules
          </Typography>
        </MenuItem>
        <Grid container xs={12} sx={{ display: 'flex', p: 1, backgroundColor: 'white', borderRadius: 2, boxShadow: '3px 3px 6px rgba(0,0,0,0.2)' }}>
          <Grid item xs={12}
            sx={{
              display: 'flex',
              marginBlock: 1,
              alignItems: 'center !important',


            }}>
            <FormControl fullWidth>
              {
                loading ? <>wait for data</> : error ?
                  <>
                    {error}
                  </>
                  :
                  <>
                    <InputLabel id="demo-simple-select-label">Module</InputLabel>
                    <Select
                      sx={{ bgcolor: 'white' }}
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={moduleFilterId}
                      label="Module"
                      onChange={handleChangeModuleFilterId}
                    >
                      <MenuItem value={''}>All</MenuItem>
                      {/* filter((item, index) => index === Modulesdata.findIndex(obj => obj.name === item.name)) */}
                      {modules && year !== '' ? modules.filter(item => item.del !== 1 && item.annee == year).map(module => { return <MenuItem key={module._id} value={module._id}>{module.name}</MenuItem> }) : modules.filter(item => item.del !== 1 ).map(module => { return <MenuItem key={module._id} value={module._id}>{module.name}</MenuItem> })}
                    </Select>
                  </>
              }
            </FormControl>
          </Grid>



        </Grid>
      </MenuList>
    </>
  );
}


export default PartModules;

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];