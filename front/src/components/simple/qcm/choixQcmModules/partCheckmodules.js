
import Grid from '@mui/material/Grid';
import * as React from 'react';

import Courss from './cours';
import TypeQ from './typeQ';
import AnneQ from './anneQ';
import SourceQ from './sourceQ';
import PartTitle from './partTitel';
import PartModules from './partModules';


// fin cordion

const PartChekModules = ({Data, funct, loading , error, module}) => {
    const [partTitleValue, setPartTitleValue] = React.useState(null);
    const [partTitleModule, setPartModuleModule] = React.useState(null);
    const [typeQValue, setTypeQValue] = React.useState(null);
    const [coureValue, setCoureValue] = React.useState([]);
    const [anneQValue, setAnneQValue] = React.useState(null);
    const [sourceQValue, setSourceQValue] = React.useState([null]);
    const handlePartTitleChange = (value) => {
        setPartTitleValue(value);
    };
    const handlecoureChange = (value) => {
        setCoureValue(value)
    }
    const handlePartModuleChange = (value) => {
        setPartModuleModule(value);
    };
    const handleTypeQChange = (value) => {
        setTypeQValue(value)
    }
    const handleAnneQChange = (value) => {
        setAnneQValue(value);
    };
    const handleSourceQChange = (value) => {
        setSourceQValue(value);
    };

    React.useEffect(() => {
        funct({
            module: partTitleModule,
            titre: partTitleValue,
            coure: coureValue,
            type: typeQValue,
            annee: anneQValue,
            source: sourceQValue
        })
    }, [anneQValue, partTitleModule, partTitleValue, sourceQValue, typeQValue, coureValue])
    return (



        <Grid container item md={8} xs={12} sx={{ p: 0, mt: 2, }}  >
            <PartTitle onChange={handlePartTitleChange} />
            <PartModules onChange={handlePartModuleChange} loading={loading} error={error} modules={module}/>
            <Courss data={Data} onChange={handlecoureChange} modules={partTitleModule}/>
            <TypeQ onChange={handleTypeQChange} />
            <AnneQ onChange={handleAnneQChange} />
            <SourceQ data={Data} onChange={handleSourceQChange} />
        </Grid>




    );
}


export default PartChekModules;