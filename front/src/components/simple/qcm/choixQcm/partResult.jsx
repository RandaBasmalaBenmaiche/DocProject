import Grid from '@mui/material/Grid';
import * as React from 'react';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { tooltipClasses } from '@mui/material/Tooltip';
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';
import { API_BASE } from '../../../../constants';

const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 14,
    },
}));

const PartResulta = ({ type, coure, annee, source, id, titre }) => {
    const token = JSON.parse(localStorage.getItem('user'))
    const [filtred, setFiltred] = React.useState(null)
    const [loading, setLoading] = React.useState(true)
    const [Error, setError] = React.useState(null)
    let startYear = ''
    let endYear = ''
    const filtredData = (Id, Titre, Coure, Type, Year, Source) => {
        const config = {
            headers : {
                'authorization' : `Bearer ${token.token}`
            }
        }
            startYear = Array.isArray(Year) ? Year[0] : 'undefined'
            endYear = Array.isArray(Year) ? Year[1] : 'undefined'
            axios.get(`http://localhost:5000/api/sujet/sujetmodule/${Id}/${Titre}/${startYear}/${endYear}/${coure}/${Type}/${Source}`,config).then(res => {
                setFiltred(res.data); 
                setLoading(false)
                setError(false) }
                ).catch(error => { 
                    console.log(error.message); 
                    console.log(error.response.data); 
                    setError(error.response.data)
                    setLoading(true) }
                    )
    }
    React.useEffect(() => {
        if (Error) {
            console.log(Error)
        }
        if (id  && type !== 'undefined' && annee !== 'undefined' && source !== 'undefined') {
        filtredData(id, titre, coure, type, annee, source)
        console.log('filtred :')
    }
    console.log('-------------')
}, [id, annee, source, type, coure])
console.log(filtred)

    const location = useHistory()
    const saveData = async () => {
        const config = {
            headers : {
                'authorization' : `Bearer ${token.token}`
            }
        }
        await axios.post(`${API_BASE}/quiz`, filtred,config).then(res => location.push(`/simple/consulteQuize/${res.data._id}`)).catch(error => console.log(error.message))
    }
    return (
        <Grid container item md={4} xs={12} sx={{ p: 0, mt: 3, }}  >
            <Grid container xs={12} sx={{ maxHeight: 130, boxShadow: '2px 2px 4px rgba(0,0,0,0.2)', display: 'block', p: 1, mb: 1, backgroundColor: '#635985', borderRadius: 2 }}>
                <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', paddingInline: 1, paddingBlock: 1, }}>
                    <Typography variant="h6" sx={{ p: 0, color: 'white', flex: '1 0 85%', }}>
                        Question
                    </Typography>
                    <Link onClick={saveData} className='Links'>
                        <LightTooltip title="consulter le quiz" placement="left">
                            <IconButton aria-label="delete" sx={{ backgroundColor: 'white', color: '#393053', '&:hover': { backgroundColor: 'white' } }}>
                                <NoteAddIcon />
                            </IconButton>
                        </LightTooltip>
                    </Link>
                </Grid>
                <Grid container xs={12} sx={{ display: 'block', backgroundColor: 'white', borderRadius: 2, overflow: 'hidden', mt: 2 }}>
                    <Grid xs={12} sx={{ display: 'flex', alignItems: 'center', paddingInline: 1, paddingBlock: 1 / 2, '&:hover': { backgroundColor: '#F5F5F5' } }}>
                        <Typography variant="h6" sx={{}}>
                            {loading ?
                                <> entrer tous les donnee svp</>
                                :
                                filtred !== null ? filtred.questions.length : 0
                            }
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}


export default PartResulta;