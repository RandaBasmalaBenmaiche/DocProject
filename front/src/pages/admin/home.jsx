

import Box from '@mui/material/Box';
import CoreA from '../../components/admin/homeUser/moduleswip';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



const HomeA = () => {
    
    return (

        <Box sx={{ overflowY: 'hidden', width: '100%' }}>
            <CoreA />
        </Box>


    );
}

export default HomeA;