import { Alert, Button, Checkbox, FormControlLabel, FormGroup, Grid, LinearProgress, Radio, RadioGroup, Toolbar, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { API_BASE } from '../../../../constants';
function Editqstt() {
    const user = JSON.parse(localStorage.getItem('user'))
    const location = useHistory()
    const params = useParams()
    const [quiz, setQuiz] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    //update
    const [questionUpdate, setquestionUpdate] = useState(null)
    const [reponseUpdate, setreponseUpdate] = useState(null)
    const [typeUpdate, settypeUpdate] = useState('')
    const [successquesitonUpdate, setsuccessquesitonUpdate] = useState(null)
    const [loadingquestionUpdate, setLoadingquestionUpdate] = useState(false)
    const [errorquestionUpdate, setErrorqestionUpdate] = useState(null)

    const getQuiz = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${user.token}`
            }
        }
        await axios.get(`${API_BASE}/sujet/` + params.id, config).then(res => {
            setQuiz(res.data)
            console.log(res.data)
            setquestionUpdate(res.data.question.filter(item => item._id == params.iDqst)[0].question)
            setreponseUpdate(res.data.question.filter(item => item._id == params.iDqst)[0].reponse)
            settypeUpdate(res.data.question.filter(item => item._id == params.iDqst)[0].sujetType)
            setLoading(false)
            setError(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setError(error.response.data)
            setLoading(false)
        })
    }
    const editQuestion = async (question, type, reponse, id) => {
        const data = new FormData()
        data.append('question', question)
        data.append('sujetType', type)
        data.append('reponse', JSON.stringify(reponse))

        for (var [key, value] of data.entries()) {
            console.log(key, value);
        }

        const config = {
            headers: {
                "content-type": 'application/json',
                'accept': 'application/json',
                'authorization': `Bearer ${user.token}`
            }
        };
        await axios.patch(`${API_BASE}/sujet/updateQuest/` + id, data, config).then(res => {
            setsuccessquesitonUpdate(true)
            setErrorqestionUpdate(false)
            setLoadingquestionUpdate(false)
        }).catch(error => {
            console.log(error.message)
            console.log(error.response.data)
            setErrorqestionUpdate(error.response.data)
            setsuccessquesitonUpdate(false)
            setLoadingquestionUpdate(false)
        })
    }
    // edit
    // const ValidEdit = (question, type, reponse, id) => {
    //     setLoadingquestionUpdate(true)
    //     editQuestion(question, type, reponse, id)
    // }
    // const handleCloseEdit = () => {
    //     setOpenEdit(false);
    //     setLoadingquestionUpdate(null)
    //     errorquestionUpdate(null)
    //     setsuccessquesitonUpdate(null)
    //     setTypeQuestion();
    // };
    //fin dialog

    // nv 

    const [activeStep, setActiveStep] = React.useState(0);

    const [Sauvegarde, setSauvegarde] = React.useState(0);
    const [question, setquestion] = React.useState(0);
    const [isadd, setisadd] = React.useState(0);
    const [TypeQuestion, setTypeQuestion] = React.useState();
    const [TypeQuestionValue, setTypeQuestionValue] = React.useState(null);

    // to add

    const [opentype, setopentype] = React.useState('none');
    const [openQuestion, setopenQuestion] = React.useState('none');
    const [openReponse, setopenReponse] = React.useState('none');
    // to add

    // to add
    let haseroor = [
        {
            has: 'none',
        }
    ];
    let firstelemen = [
        { first: 'none' }
    ]

    let ArrayRadio = [
        {
            rep: '',
            isCorrect: 'false',
        },
        {
            rep: '',
            isCorrect: 'false',
        },
        {
            rep: '',
            isCorrect: 'false',
        },
        {
            rep: '',
            isCorrect: 'false',
        },
        {
            rep: '',
            isCorrect: 'false',
        },
        {
            rep: '',
            isCorrect: 'false',
        },

    ];

    let ArrayChek = [
        {
            rep: '',
            isCorrect: 'false',
        },
        {
            rep: '',
            isCorrect: 'false',
        },
        {
            rep: '',
            isCorrect: 'false',
        },
        {
            rep: '',
            isCorrect: 'false',
        },
        {
            rep: '',
            isCorrect: 'false',
        },
        {
            rep: '',
            isCorrect: 'false',
        },

    ];

    let arraySauvgarder = [
        {
            sujetType: '',
            question: '',
            reponse: [],
        }
    ];
    const Sauvgarder = () => {

        const type = TypeQuestion;

        const qs = arraySauvgarder[0].question;

        if (type == 'qcm') {
            firstelemen[0].first = ArrayChek[0].rep;

        } else if (type == 'qcs') {

            firstelemen[0].first = ArrayRadio[0].rep;

        } else {
            if (arraySauvgarder[0].reponse.length != '0') {
                firstelemen[0].first = arraySauvgarder[0].reponse[0].rep;
            } else {
                firstelemen[0].first = '';
            }

        }

        if (type == null) {
            setopentype('flex');
            return;
        } else {
            setopentype('none');
        }

        if (qs == '') {
            setopenQuestion('flex');

            return;

        } else {
            setopenQuestion('none');
        }

        const rep = firstelemen[0].first;
        if (rep == '') {
            setopenReponse('flex');
            console.log(firstelemen);
            console.log(ArrayChek);
            return;
        } else {
            setopenReponse('none');
        }

        if (type == 'qcm') {
            setopenReponse('flex');

            for (let i = 0; i < ArrayChek.length; i++) {
                if (ArrayChek[i].isCorrect === 'true') {
                    setopenReponse('none');
                    haseroor[0].has = 'yes';
                }
            }
            if (haseroor[0].has == 'none') {
                console.log(haseroor[0].has);
                return;
            }

        } else if (type == 'qcs') {
            setopenReponse('flex');

            for (let i = 0; i < ArrayRadio.length; i++) {
                if (ArrayRadio[i].isCorrect === 'true') {
                    setopenReponse('none');
                    haseroor[0].has = 'yes';
                }
            }
            if (haseroor[0].has == 'none') {


                return;
            }
        } else {
            haseroor[0].has = 'yes';
        }




        if (haseroor[0].has == 'yes') {
            setSauvegarde(1);
            arraySauvgarder[0].sujetType = TypeQuestion;
            if (TypeQuestion == 'qcm') {
                for (let i = 0; i < ArrayChek.length; i++) {
                    if (ArrayChek[i].rep !== '') {

                        arraySauvgarder[0].reponse.push(ArrayChek[i]);
                    }
                }
            } else if (TypeQuestion == 'qcs') {
                for (let i = 0; i < ArrayRadio.length; i++) {
                    if (ArrayRadio[i].rep !== '') {
                        arraySauvgarder[0].reponse.push(ArrayRadio[i]);
                    }
                }
            }
            haseroor[0].has = 'none';
            ArrayRadio = [
                {
                    rep: '',
                    isCorrect: 'false',
                },
                {
                    rep: '',
                    isCorrect: 'false',
                },
                {
                    rep: '',
                    isCorrect: 'false',
                },
                {
                    rep: '',
                    isCorrect: 'false',
                },
                {
                    rep: '',
                    isCorrect: 'false',
                },
                {
                    rep: '',
                    isCorrect: 'false',
                },

            ];

            ArrayChek = [
                {
                    rep: '',
                    isCorrect: 'false',
                },
                {
                    rep: '',
                    isCorrect: 'false',
                },
                {
                    rep: '',
                    isCorrect: 'false',
                },
                {
                    rep: '',
                    isCorrect: 'false',
                },
                {
                    rep: '',
                    isCorrect: 'false',
                },
                {
                    rep: '',
                    isCorrect: 'false',
                },

            ];
        }
        console.log(arraySauvgarder);
        // reponse  -- array
        // editQuestion(questionUpdate, typeUpdate, reponse, params.id)
        const questionarray = arraySauvgarder[0].question;
        setquestionUpdate(questionarray)
        const reponse = arraySauvgarder[0].reponse;

        editQuestion(questionUpdate, typeUpdate, reponse, params.iDqst)
      
        arraySauvgarder = [
            {
                sujetType: '',
                question: '',
                reponse: [],
            }
        ];

        console.log(arraySauvgarder);

    };
    const Type = (typeUpdate) => {
        alert(typeUpdate)
        const value = typeUpdate;
        if (value == 'CAS CLINIQUE') {

            setTypeQuestion('clinique');
            setTypeQuestionValue('CAS CLINIQUE');

        } else if (value == 'QCM') {

            setTypeQuestion('qcm');
            setTypeQuestionValue('QCM');

        } else if (value == 'QCS') {

            setTypeQuestion('qcs');
            setTypeQuestionValue('QCS');

        } else if (value == 'CROC') {

            setTypeQuestion('croc');
            setTypeQuestionValue('CROC');

        }


        ReanderInput();

    };

    const ReanderInput = () => {
        arraySauvgarder[0].question = questionUpdate;
        if (typeUpdate == 'clinique') {

            setTypeQuestion('clinique');
            setTypeQuestionValue('CAS CLINIQUE');

        } else if (typeUpdate == 'qcm') {

            setTypeQuestion('qcm');
            setTypeQuestionValue('QCM');

        } else if (typeUpdate == 'qcs') {

            setTypeQuestion('qcs');
            setTypeQuestionValue('QCS');

        } else if (typeUpdate == 'croc') {

            setTypeQuestion('croc');
            setTypeQuestionValue('CROC');

        }
        return (
            <>

                {typeUpdate == 'qcm' ?
                    <FormCHekbox />
                    : typeUpdate == 'qcs' ?
                        <FormRadio />
                        : typeUpdate == 'croc' ?
                            <FormText />
                            : typeUpdate == 'clinique' ?
                                <FormText />
                                : typeUpdate == '0' ?
                                    null
                                    : null}
            </>
        );
    };

    // to add
    const Upquestion = (x) => {
        setquestionUpdate(x)
        arraySauvgarder[0].question = x;
    }
    const UpValue = (x, y) => {

        if (TypeQuestion == 'qcm') {
            const value = x;
            const id = (y - 1);
            ArrayChek[id].rep = value;

        } else if (TypeQuestion == 'qcs') {
            const value = x;
            const id = (y - 1);
            ArrayRadio[id].rep = value;
        }

    }
    const UpAera = (x) => {
        arraySauvgarder[0].reponse.pop();
        arraySauvgarder[0].reponse.push({ rep: x, isCorrect: "true" });

    }
    const upRadio = (x) => {
        const id = (x - 1);
        ArrayRadio[id].isCorrect = 'true';
        for (let i = 0; i < ArrayRadio.length; i++) {
            if (i !== id) {
                ArrayRadio[i].isCorrect = 'false';
            }
        }

    }
    const upChek = (x, y) => {

        if (y == true) {
            const id = (x - 1);
            ArrayChek[id].isCorrect = 'true';

        } else {
            const id = (x - 1);
            ArrayChek[id].isCorrect = 'false';

        }

    }
    // to add 

    // to uppdate

    // to update

    const FormCHekbox = () => {
        return (
            <FormGroup>

                <LabelChek id={'1'} value={reponseUpdate[0] !== undefined ? reponseUpdate[0].rep : ''} check={reponseUpdate[0] !== undefined ? reponseUpdate[0].isCorrect : ''} />
                <LabelChek id={'2'} value={reponseUpdate[1] !== undefined ? reponseUpdate[1].rep : ''} check={reponseUpdate[1] !== undefined ? reponseUpdate[1].isCorrect : ''} />
                <LabelChek id={'3'} value={reponseUpdate[2] !== undefined ? reponseUpdate[2].rep : ''} check={reponseUpdate[2] !== undefined ? reponseUpdate[2].isCorrect : ''} />
                <LabelChek id={'4'} value={reponseUpdate[3] !== undefined ? reponseUpdate[3].rep : ''} check={reponseUpdate[3] !== undefined ? reponseUpdate[3].isCorrect : ''} />
                <LabelChek id={'5'} value={reponseUpdate[4] !== undefined ? reponseUpdate[4].rep : ''} check={reponseUpdate[4] !== undefined ? reponseUpdate[4].isCorrect : ''} />
                <LabelChek id={'6'} value={reponseUpdate[5] !== undefined ? reponseUpdate[5].rep : ''} check={reponseUpdate[5] !== undefined ? reponseUpdate[5].isCorrect : ''} />
            </FormGroup>
        );
    }
    const LabelChek = ({ id, value, check }) => {
        const idd = id - 1;
        ArrayChek[idd].rep = value;

        if (check === true) {
            ArrayChek[idd].isCorrect = 'true';
        }
        return (
            check === true ?
                <FormControlLabel sx={{ mb: 2 }} control={<Checkbox onChange={(e) => upChek(e.target.value, e.target.checked)} value={id} checked color="success" />} label={<InputText id={id} value={value} />} />
                :
                <FormControlLabel sx={{ mb: 2 }} control={<Checkbox onChange={(e) => upChek(e.target.value, e.target.checked)} value={id} color="success" />} label={<InputText id={id} value={value} />} />
        );
    };

    // to update
    const FormRadio = () => {
        return (
            <FormGroup>
                <RadioGroup
                    onChange={(e, val) => upRadio(val)}
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"
                >

                    <LabelRdio id={'1'} value={reponseUpdate[0] !== undefined ? reponseUpdate[0].rep : ''} check={reponseUpdate[0] !== undefined ? reponseUpdate[0].isCorrect : ''} />
                    <LabelRdio id={'2'} value={reponseUpdate[1] !== undefined ? reponseUpdate[1].rep : ''} check={reponseUpdate[1] !== undefined ? reponseUpdate[1].isCorrect : ''} />
                    <LabelRdio id={'3'} value={reponseUpdate[2] !== undefined ? reponseUpdate[2].rep : ''} check={reponseUpdate[2] !== undefined ? reponseUpdate[2].isCorrect : ''} />
                    <LabelRdio id={'4'} value={reponseUpdate[3] !== undefined ? reponseUpdate[3].rep : ''} check={reponseUpdate[3] !== undefined ? reponseUpdate[3].isCorrect : ''} />
                    <LabelRdio id={'5'} value={reponseUpdate[4] !== undefined ? reponseUpdate[4].rep : ''} check={reponseUpdate[4] !== undefined ? reponseUpdate[4].isCorrect : ''} />
                    <LabelRdio id={'6'} value={reponseUpdate[5] !== undefined ? reponseUpdate[5].rep : ''} check={reponseUpdate[5] !== undefined ? reponseUpdate[5].isCorrect : ''} />
                </RadioGroup>
            </FormGroup>
        );
    };
    const LabelRdio = ({ id, value, check }) => {
        const idd = id - 1;
        ArrayChek[idd].rep = value;

        if (check === true) {
            ArrayChek[idd].isCorrect = 'true';
        }
        return (
            check === true ?
                <FormControlLabel sx={{ mb: 2 }} control={<Radio value={id} checked color="success" />} label={<InputText id={id} value={value} />} />
                :
                <FormControlLabel sx={{ mb: 2 }} control={<Radio value={id} color="success" />} label={<InputText id={id} value={value} />} />
        );
    }

    const InputText = ({ id, value }) => {
        return (
            value ? <>
                <TextField value={value} sx={{ width: { md: 940, xs: 250, sm: 600 }, bgcolor: 'rgba(0,0,0,0.1)' }} placeholder="Réponse" />
                <TextField onChange={(newValue) => UpValue(newValue.target.value, id)} sx={{ mt: 1, width: { md: 940, xs: 250, sm: 600 }, border: '1px solid green', borderRadius: 2 }} placeholder=" Novelle Réponse" />
            </>
                :
                <>
                    <TextField onChange={(newValue) => UpValue(newValue.target.value, id)} sx={{ width: { md: 940, xs: 250, sm: 600 }, border: '1px solid green', borderRadius: 2 }} placeholder="Réponse" />

                </>);
    };
    // to update

    const FormText = () => {

        return (
            <>
                <textarea value={reponseUpdate[0].rep} style={{ resize: 'none', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh', backgroundColor: 'rgba(0,0,0,0.1)' }} placeholder="Réponse ..."></textarea>
                <textarea onChange={(newValue) => UpAera(newValue.target.value)} style={{ marginTop: '1rem', resize: 'none', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh', border: '1px solid green', borderRadius: '5px' }} placeholder="Novelle Réponse ..."></textarea>
            </>
        );
    }

    // to update

    // to update


    //fin nv 
    useEffect(() => {
        getQuiz()

    }, [])

    function redirect() {
        location.push('/admin/editquiz/' + params.id)
    }

    return (
        <>

            <Grid container item xs={12} sx={{ py: 2, px: 4, width: '100%' }}>
                <Toolbar />
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                        Type De Quistion
                    </Typography>

                </Grid>
                <Grid xs={12} >
                    <TextField id="outlined-basic" sx={{ mb: 2, width: '100%', fontFamily: 'Bahnschrift SemiBold', }} value={typeUpdate} disabled />
                    <Alert sx={{ mb: 1, display: opentype }} severity="error">Alert - sélectionnez un type de question !</Alert>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                        Quistion
                    </Typography>

                </Grid>
                <Grid xs={12} >
                    <textarea onChange={(newValue) => Upquestion(newValue.target.value)} value={questionUpdate} style={{ resize: 'none', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh' }} placeholder="Réponse ..."></textarea>
                    <Alert sx={{ mb: 1, display: openQuestion }} severity="error">Alert - le champ de la question est vide !</Alert>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mb: 1, fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                        Réponse
                    </Typography>
                    <Alert sx={{ mb: 1, mt: 1, display: openReponse }} severity="error">Alert - remplir et cocher au moins une réponse !</Alert>
                </Grid>
                {
                    typeUpdate ?
                        <ReanderInput />
                        : null
                }
                <Grid item xs={12}>

                    {loadingquestionUpdate ? <LinearProgress color="secondary" /> : null}
                    {errorquestionUpdate ? <Alert sx={{ mt: 1 }} severity="error">{errorquestionUpdate}</Alert> : null}
                    {successquesitonUpdate ? <Alert sx={{ mt: 1 }} severity="success">Cette question a été modifier avec success</Alert> : null}
                </Grid>
                <Grid item xs={12}>
                {
                    successquesitonUpdate ?
                    <Button variant="outlined" color="secondary" onClick={() => { redirect() }} sx={{ px: 4, mt: 2 }}>
                        Retour
                    </Button>
                    :
                    <Button variant="contained" color="success" onClick={() => { Sauvgarder() }} sx={{ px: 4, mt: 2 }}>
                        Validé
                    </Button>
                }
                    

                </Grid>


            </Grid>
        </>
    )
}

export default Editqstt