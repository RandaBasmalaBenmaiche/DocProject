
import Grid from '@mui/material/Grid';
// import "./../../../../index.css";
import Charts from './char';

const Chart = ({stat}) => {

    return (

                <Grid item sx={{width:'100%', backgroundColor: 'white', borderRadius: 5, boxShadow: 'rgba(0, 0, 0, 0.01) 8px 8px 10px  inset,rgba(0, 0, 0, 0.24) 0px 3px 8px', border: '2px solid rgb(252, 252, 252,1)', }}>
                    <Charts stattt={stat} />

                </Grid>
           
    );
}

export default Chart;