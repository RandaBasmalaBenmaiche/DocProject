
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Link } from "react-router-dom";
import Typography from '@mui/material/Typography';
import { Box, Grid } from '@mui/material';
import NavBar from './navBar';
import NavBarMobile from './navBarMobile';
import Sectiona from './sectiona';
import { useState, useEffect } from 'react';
import Sectionb from './sectionb';

import $ from 'jquery';

const Home = () => {
    const [section, setsection] = useState(1);

    const [id_1, setid_1] = useState("Active");
    const [id_2, setid_2] = useState("");




    const Upsection = (x) => {
        setsection(x)
        if (x == 1) {
            setid_1("Active")
        } else {
            setid_1("")
        }
        if (x == 2) {
            setid_2("Active")
        } else {
            setid_2("")
        }

    }



    const SideBare = () => {
        return (
            <Grid container item xs={12} className="SideBare" columnGap={2} flexDirection={'row'} alignContent={'center'} >
                <Grid item onClick={() => Upsection(1)}>
                    <Typography variant="body1" className="ItemSide" id={id_1}>
                        Home
                    </Typography>
                </Grid>
                <Grid item onClick={() => Upsection(2)}  >

                    <Typography variant="body1" className="ItemSide" id={id_2}>
                        À Propos
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography variant="body1" className="ItemSide" id="section_3">
                        Contacts
                    </Typography>
                </Grid>
            </Grid>
        );
    }


    return (
        <Grid container sx={{ minHeight: '100vh' }} className="Home" >
            <div className='Back'></div>
            <Grid container item xs={12} flexDirection={'row'} alignContent={'flex-start'}  >
                {/* <NavBar /> */}
                <NavBarMobile />
                {/* <SideBare /> */}
                <Sectiona />



            </Grid>
            {/* <Grid item xs={12}>
                <Stack spacing={2} direction="row">
                    <Link to={"/simple"} exact className='Links'>
                        <Button variant="text">simple</Button>
                    </Link>
                    <Link to={"/gold"} className='Links'>
                        <Button variant="contained">gold</Button>
                    </Link>
                    <Link to={"/admin"} className='Links'>
                        <Button variant="admin">Outlined</Button>
                    </Link>
                    <Link to={"/login"} className='Links'>
                        <Button variant="admin">login</Button>
                    </Link>
                    <Link to={"/signin"} className='Links'>
                        <Button variant="admin">sign in</Button>
                    </Link>
                </Stack>
            </Grid> */}
        </Grid>

    );
}

export default Home;