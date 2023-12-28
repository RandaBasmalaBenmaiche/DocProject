
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { Link as LinkS } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Typography } from '@mui/material';
const PartLink = ({module}) => {
    return (
                <Grid container item md={12} xs={12}   >
                    <Grid item sm={10} xs={12}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            <Link to={"/simple/moduleInfo/"+module._id}className='Links'>
                            <LinkS
                                    underline="none"

                                    sx={{
                                        //     mr: 2,
                                        //     paddingBlock: 1,
                                        //     paddingInline: 3,
                                        //     borderRadius: 4,
                                        //     fontSize: 12,
                                        //     transition: '0.3s',
                                        //     backgroundColor: '#fbdef2',
                                        color: '#635985',
                                        //     border: '1px solid rgb(252, 252, 252,1)',
                                        //     boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 6px  inset,rgba(0, 0, 0, 0.2) 3px 3px 6px ',
                                        '&:hover': {
                                            color: '#635985',
                                            bgcolor: 'white',
                                        }

                                    }}
                                >
                                    <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 2, borderRadius: 2, transition: '0.3s', '&:hover': { color: '#635985', bgcolor: 'white', boxShadow: '1px 1px 4px rgba(0,0,0,0.15)' }, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                                        {module.name}
                                    </Typography>
                                </LinkS>
                            </Link>
                            <LinkS
                                underline="none"

                                sx={{

                                    paddingBlock: 1,
                                    paddingInline: 1,
                                    fontWeight: 'bold',
                                    borderRadius: 4,
                                    fontSize: 14,
                                    transition: '0.3s',
                                    // backgroundColor: '#fbdef2',
                                    color: '#443C68',
                                    // border: '1px solid rgb(252, 252, 252,1)',
                                    // boxShadow: 'rgba(0, 0, 0, 0.2) 4px 4px 6px  inset,rgba(0, 0, 0, 0.2) 3px 3px 6px ',
                                    '&:hover': {
                                        color: '#443C68',
                                    }

                                }}
                            >
                                Qcm
                            </LinkS>

                        </Breadcrumbs>
                    </Grid>

                </Grid>
    );
}


export default PartLink;