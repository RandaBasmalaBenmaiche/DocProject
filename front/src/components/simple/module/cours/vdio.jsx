
import * as React from 'react';
import { Typography } from '@mui/material';

import YouTube from 'react-youtube';



const VdioYoutube = () => {


    return (

        <div>
            <YouTube videoId="XLFNcXlWO6Q" />
            <Typography variant="h5" sx={{ mt: 2 }}>
                védio de module 1
            </Typography>
        </div>


    );
}


export default VdioYoutube;