import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Link as LinkS } from '@mui/material';
const NavBar = () => {
    return (
        <Grid container item sm={12} md={12}
            sx={{
                p: 2,
                alignItems: 'center',
                bgcolor: 'rgba(197,61,149,0.1)',
            }}
        >
            <Grid item md={9} sx={{ textAlign: 'left', pl: 5 }}>
                <h4>home page</h4>
            </Grid>
            <Link to={"/Login"} className='Links'>
                    
                    <h6>Connexion</h6>
               
            </Link>
            <Grid item md={1} sx={{ textAlign: 'left' }}>
                
            </Grid>

            <Grid item md={1} sx={{ textAlign: 'left' }}>
                <h6>Inscreption</h6>
            </Grid>
            <Grid item md={1} sx={{ textAlign: 'left' }}>
                <h6>Tarif</h6>
            </Grid>
        </Grid>
    );
}

export default NavBar;