
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';


import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';



// Import Swiper React components


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import IconButton from '@mui/material/IconButton';
import "./../../../index.css";

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';


import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Charts from './char';




const drawerWidth = 240;


const Chart = ({stat}) => {

    return (

                <Grid item sx={{width:'100%', backgroundColor: '#ff5757', borderRadius: 5, boxShadow: 'rgba(0, 0, 0, 0.2) 8px 8px 10px  ,rgba(0, 0, 0, 0.24) 0px 3px 8px', border: '1px solid rgb(252, 252, 252,1)', }}>
                    <Charts stattt={stat} />
                </Grid>
           
    );
}

export default Chart;