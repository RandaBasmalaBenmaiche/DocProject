import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import * as React from 'react';

import PartResulta from "./partResult";
import PartLinkModules from "./partLinkModules";
import PartChekModules from "./partCheckmodules";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_BASE } from "../../../../constants";





const QcmChoisModules = () => {

    const token = JSON.parse(localStorage.getItem('user'))
    const [modules , setModules] = React.useState(null)
    const [coure , setCoure] = React.useState(null)
    const [data , setDAta] = React.useState([])
    const [loadingmodule , setLoadingmodule] = React.useState(true)
    const [Errormodule , setErrormodule] = React.useState('')
    const [title , setTitle] = React.useState('')
    const [type , setType] = React.useState(null)
    const [annee , setAnnee] = React.useState([null])
    const [source , setSource] = React.useState(null)
    const [module , setmodules] = React.useState({})
    const [loading, setLoading] = React.useState(true)
    const [Error, setError] = React.useState()

    const getModules = async ()=>{
        await axios.get(`${API_BASE}/module/moduleUser`, { headers: { authorization: `Bearer ${token.token}` } }).then(respons => setModules(respons.data)).catch(error => { console.log(error.message); setErrormodule(error.message) })
        setLoadingmodule(false)
    }
    const ApiCal = async ()=>{
        const config = {
            headers : {
                'authorization' : `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/sujet`,config).then(res => {
            setDAta(res.data)
            setLoading(false)
            setError(false)
        }).catch(error => {
            // console.log(error.message)
            setError(error.response.data)
            setLoading(false)
        })
    }
    React.useEffect(()=>{
        if(Error){
            console.log(Error)
        }
        getModules()
        ApiCal()
        console.log(modules)
    },[Error])
    const forFilter = (data) =>{
        // setDataforFilter(data)
        setmodules(data.module)
        setCoure(data.coure)
        setTitle(data.titre)
        setType(data.type !== null ? Object.keys(data.type).filter(key => data.type[key]): [])
        setAnnee(data.annee !== null ? [`${data.annee.fromDate}` , `${data.annee.toDate}`]: [])
        setSource(data.source !== null ? Object.keys(data.source).filter(key => data.source[key]): [])
    }
    if(loading || loadingmodule){
        return <>loading data</>
    }
    return (

        <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={2} sx={{ display: 'flex', p: 2, paddingBlock: 4 }}>
                <Toolbar />

               <PartLinkModules />
               
                <PartChekModules Data={data} funct={forFilter} loading={loadingmodule} error={Errormodule} module={modules}/>

                <PartResulta titre={title} id={module} coure={coure} type={type} annee={annee} source={source}/>
            </Grid >
        </Box >
);
}


export default QcmChoisModules;