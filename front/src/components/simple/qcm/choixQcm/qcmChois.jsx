
import { Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import PartChek from "./partCheck";
import PartResulta from "./partResult";
import PartLink from "./partLink";
import axios from "axios";
import { useParams } from "react-router-dom";
import { API_BASE } from "../../../../constants";


const QcmChois = () => {
    const token = JSON.parse(localStorage.getItem('user'))
    const params = useParams()
    const [data , setDAta] = useState([])
    const [cours , setCours] = useState([])
    // const [dataforFilter , setDataforFilter] = useState(null)
    const [title , setTitle] = useState('')
    const [coure , setCoure] = useState(null)
    const [type , setType] = useState(null)
    const [annee , setAnnee] = useState([null])
    const [source , setSource] = useState(null)
    const [module , setmodule] = useState({})
    const [loading, setLoading] = useState(true)
    const [Error, setError] = useState()
    const [ErrorC, setErrorC] = useState()
    const ApiCal = async ()=>{
        const config = {
            headers : {
                'authorization' : `Bearer ${token.token}`
            }
        }
        axios.get(`${API_BASE}/sujet/sujetmodul/`+params.id,config).then(res => {
            setDAta(res.data)
        }).catch(error => {
            // console.log(error.message)
            setError(error.message)
        })
        axios.get(`${API_BASE}/coure/couremodule/`+params.id,config).then(res => {
            setCours(res.data)
        }).catch(error => {
            // console.log(error.message)
            setErrorC(error.message)
        })
        axios.get(`${API_BASE}/module/`+params.id,config).then(res => {
            setmodule(res.data)
        }).catch(error => {
            // console.log(error.message)
        })
        setLoading(false)
    }
    useEffect(()=>{
        if(Error){
            console.log(Error)
        }
        ApiCal()
    },[Error, loading])
    if(Error){
        return <p>{Error}</p>
    }
    if(ErrorC){
        return <p>{ErrorC}</p>
    }
    if(loading){
        return <p>loading the data</p>
    }

    const forFilter = (data) =>{
        // setDataforFilter(data)
        setTitle(data.titre)
        setCoure(data.coure)
        setType(data.type !== null ? Object.keys(data.type).filter(key => data.type[key]): [])
        setAnnee(data.annee !== null ? [`${data.annee.fromDate}` , `${data.annee.toDate}`]: [])
        setSource(data.source !== null ? Object.keys(data.source).filter(key => data.source[key]): [])
    }
    // console.log(dataforFilter)
    // console.log('filtred data :')
    // console.log(title)
    // console.log(type)
    // console.log(annee)
    // console.log(source)
    // console.log('---------------')
    return (

        <Box sx={{ flexGrow: 1 }}>

            <Grid container spacing={2} sx={{ display: 'flex', p: 2, paddingBlock: 4 }}>
                <Toolbar />

                <PartLink module={module}/>

                <PartChek funct={forFilter} Cours={cours} Data={data}/>

                <PartResulta titre={title} id={params.id} type={type} coure={coure} annee={annee} source={source} Data={data}/>
            </Grid >
        </Box >

    );
}


export default QcmChois;