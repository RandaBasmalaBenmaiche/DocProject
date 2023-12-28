
import Grid from '@mui/material/Grid';
import React, { useEffect, useState } from 'react';

import Courss from './cours';
import TypeQ from './typeQ';
import AnneQ from './anneQ';
import SourceQ from './sourceQ';
import PartTitle from './partTitel';


// fin cordion

const PartChek = ({Cours, Data, funct }) => {
    const [partTitleValue, setPartTitleValue] = useState(null);
    const [coureValue, setCoureValue] = useState([]);
    const [typeQValue, setTypeQValue] = useState(null);
    const [anneQValue, setAnneQValue] = useState(null);
    const [sourceQValue, setSourceQValue] = useState([null]);

    const handlePartTitleChange = (value) => {
        setPartTitleValue(value);
    };
    // console.log(partTitleValue)
    const handlecoureChange = (value) => {
        setCoureValue(value)
    }

    const handleTypeQChange = (value) => {
        setTypeQValue(value)
    }
    // console.log(typeQValue)

    const handleAnneQChange = (value) => {
        setAnneQValue(value);
    };
    // console.log(anneQValue)

    const handleSourceQChange = (value) => {
        setSourceQValue(value);
    };
    // console.log(sourceQValue)
    useEffect(() => {
        funct({
            titre: partTitleValue,
            coure: coureValue,
            type: typeQValue,
            annee: anneQValue,
            source: sourceQValue
        })
    }, [anneQValue, partTitleValue, sourceQValue, typeQValue, coureValue])
    return (
        <Grid container item md={8} xs={12} sx={{ p: 0, mt: 2, }}  >
            <PartTitle onChange={handlePartTitleChange} />
            <Courss cours={Cours} data={Data} onChange={handlecoureChange} />
            <TypeQ onChange={handleTypeQChange} />
            <AnneQ onChange={handleAnneQChange} />
            <SourceQ data={Data} onChange={handleSourceQChange} />
        </Grid>

    );
}


export default PartChek;