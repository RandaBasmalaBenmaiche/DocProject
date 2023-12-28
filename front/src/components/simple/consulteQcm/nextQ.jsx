import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';



const NexQ = ({next}) => {
   
    const theme = useTheme();
    

    return (


        <MobileStepper
            sx={{ backgroundColor: 'silver',boxShadow:'0px -3px 6px rgba(0,0,0,0.1)',  borderBottomLeftRadius:4,borderBottomRightRadius:4, color:'black' }}
            variant="text"
            steps={next[0]}
            position="static"
            activeStep={next[1]}
            nextButton={
                <Button
                    sx={{
                        color: '#ff5757',
                        fontWeight:'bold',
                        backgroundColor: 'white',
                        paddingInline: 1,
                        borderRadius: 1,
                        transition:'.3s',
                        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset',
                        '&:hover': {
                            backgroundColor: '#ff5757',
                            color:'white',
                            boxShadow: 'rgba(0, 0, 0, 0.3) 1.95px 1.95px 2.6px inset',
                        }
                    }}
                    size="small"
                    onClick={next[2]}
                    disabled={next[1] === next[0] - 1}
                >
                    Suivante
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                    ) : (
                        <KeyboardArrowRight />
                    )}
                </Button>
            }
            backButton={
                <Button
                    sx={{
                        color: '#ff5757',
                        fontWeight:'bold',
                        backgroundColor: 'white',
                        paddingInline: 1,
                        borderRadius: 1,
                        transition:'.3s',
                        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset',
                        '&:hover': {
                            backgroundColor: '#ff5757',
                            color:'white',
                            boxShadow: 'rgba(0, 0, 0, 0.3) 1.95px 1.95px 2.6px inset',
                        }
                    }}
                    size="small"
                    onClick={next[3]}
                    disabled={next[1] === 0}
                >
                    {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                    ) : (
                        <KeyboardArrowLeft />
                    )}
                    Précédente
                </Button>
            }
        />


    );
}


export default NexQ;
