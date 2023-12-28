import { Link, useParams, useHistory } from "react-router-dom";
import { InputLabel, Skeleton, Toolbar } from "@mui/material";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { CardActionArea } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import SourceIcon from '@mui/icons-material/Source';
import IconButton from '@mui/material/IconButton';
// import "./../../modules.css";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

import TextField from '@mui/material/TextField';
import { Link as LinkS } from '@mui/material';


import Breadcrumbs from '@mui/material/Breadcrumbs';
// import "./../../../index.css";
// import img from "./logo192.png";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import FormGroup from '@mui/material/FormGroup';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import { Opacity } from "@mui/icons-material";
import axios from "axios";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { API_BASE } from "../../../../constants";
const EditQuiz = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const location = useHistory()
  const params = useParams()
  const [quiz, setQuiz] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  //questions of quiz
  const [question, setquestion] = useState(null)
  const [loadingquestion, setLoadingquestion] = useState(true)
  const [errorquestion, setErrorqestion] = useState(null)
  //update
  const [questionUpdate, setquestionUpdate] = useState(null)
  const [reponseUpdate, setreponseUpdate] = useState(null)
  const [typeUpdate, settypeUpdate] = useState('')
  const [successquesitonUpdate, setsuccessquesitonUpdate] = useState(null)
  const [loadingquestionUpdate, setLoadingquestionUpdate] = useState(false)
  const [errorquestionUpdate, setErrorqestionUpdate] = useState(null)
  const handleChangeType = (e) => {
    settypeUpdate(e.target.value)
  }
  //delete
  const [questionDelete, setquestionDelete] = useState(null)
  const [loadingquestionDelete, setLoadingquestionDelete] = useState(true)
  const [errorquestionDelete, setErrorqestionDelete] = useState(null)
  // annee data
  const [anneeData, setanneeData] = React.useState(null)
  const [loadinganneeData, setLoadinganneeData] = React.useState(true)
  const [successanneeData, setSuccessanneeData] = React.useState(null)
  const [erroranneeData, setErroranneeData] = React.useState(null)
  // modules data
  const [Modulesdata, setModulesData] = React.useState(null)
  const [loadingModulesData, setLoadingModulesData] = React.useState(true)
  const [successModulesData, setSuccessModulesData] = React.useState(null)
  const [errorModulesData, setErrorModulesData] = React.useState(null)
  const [moduleId, setmoduleId] = React.useState('')
  const [quizName, setquizName] = React.useState('')
  const [quizSource, setquizSource] = React.useState('')
  const [year, setYear] = React.useState('')

  const handleChangeYear = (e) => {
    setYear(e.target.value)
  }
  const handleChangemoduleId = (e) => {
    setmoduleId(e.target.value)
  }
  const handelChangeQuizname = (e) => {
    setquizName(e.target.value)
  }
  const handleChangeSource = (e) => {
    setquizSource(e.target.value)
  }
  const getQuiz = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    }
    await axios.get(`${API_BASE}/sujet/` + params.id, config).then(res => {
      setQuiz(res.data)
      setYear(res.data.annee)
      setmoduleId(res.data.module)
      setCoureName(res.data.coure)
      setquizName(res.data.name)
      setquizSource(res.data.source)
      setLoading(false)
      setError(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setError(error.response.data)
      setLoading(false)
    })
  }
  const ApiCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    };
    await axios.get(`${API_BASE}/annee`, config).then(res => {
      setanneeData(res.data)
      setLoadinganneeData(false)
      setSuccessanneeData(true)
      setErroranneeData(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErroranneeData(error.response.data)
      setSuccessanneeData(false)
      setLoadinganneeData(false)
    })
  }
  const ApiModuleCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    };
    await axios.get(`${API_BASE}/module`, config).then(res => {
      setModulesData(res.data)
      setLoadingModulesData(false)
      setErrorModulesData(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorModulesData(error.response.data)
      setLoadingModulesData(false)
    })
  }
  const [coure, setCoure] = React.useState([])
  const [coureName, setCoureName] = React.useState('')
  const [Loadingcoure, setLoadingCoure] = React.useState(true)
  const [Errorcoure, setErrorCoure] = React.useState(false)
  const handleChangeCoure = (e) => {
    setCoureName(e.target.value)
  }
  const ApiCoureCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    }
    await axios.get(`${API_BASE}/coure`, config).then(res => {
      setCoure(res.data)
      setLoadingCoure(false)
      setErrorCoure(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorCoure(error.response.data)
      setLoadingCoure(false)
    })
  }
  const [successUpdate, setSuccessUpdate] = React.useState(null)
  const [loadingUpdate, setLoadingUpdate] = React.useState(false)
  const [errorUpdate, setErrorUpdate] = React.useState(null)
  const updateQuiz = async (quiz, module, coure, annee, source, id) => {
    const data = new FormData()
    data.append('name', quiz)
    data.append('module', module)
    data.append('coure', coure)
    data.append('annee', annee)
    data.append('source', source)

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
    await axios.patch(`${API_BASE}/sujet/update/` + id, data, config).then(res => {
      setSuccessUpdate(true)
      setErrorUpdate(false)
      setLoadingUpdate(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorUpdate(error.response.data)
      setSuccessUpdate(false)
      setLoadingUpdate(false)
    })
  }
  const handelquestionchange = (e) => {
    setquestionUpdate(e.target.value)
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
  //type
  const [TypeQuestion, setTypeQuestion] = React.useState();
  const [TypeQuestionValue, setTypeQuestionValue] = React.useState(null);
  const [opentype, setopentype] = React.useState('none');
  const [openQuestion, setopenQuestion] = React.useState('none');
  const [openReponse, setopenReponse] = React.useState('none');
  const [open, setopen] = React.useState('none');
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
  const [successAdd, setSuccessAdd] = React.useState(null)
  const [loadingAdd, setLoadingAdd] = React.useState(null)
  const [errorAdd, setErrorAdd] = React.useState(null)
  const [Id, setId] = React.useState();
  const AddQustion = async (data, id) => {
    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${user.token}`
      }
    }
    console.log('update done')
    await axios.patch(`${API_BASE}/sujet/` + id, data, config).then(res => {
      setSuccessAdd(true)
      setLoadingAdd(false)
      setErrorAdd(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorAdd(error.response.data)
      setSuccessAdd(false)
      setLoadingAdd(false)
    })
  }
  const Sauvgarder = () => {

    const type = TypeQuestion;
    console.log('TypeQuestion');
    console.log(TypeQuestion);

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
    console.log('firstelemen[0].first');
    console.log(firstelemen[0].first);
    if (type == null) {
      setopentype('flex');
      return;
    } else {
      setopentype('none');
    }

    if (qs == '') {
      setopenQuestion('flex');
      console.log('qs vide');
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

    console.log('rep');
    console.log(rep);

    if (type == 'qcm') {
      setopenReponse('flex');

      for (let i = 0; i < ArrayChek.length; i++) {
        if (ArrayChek[i].isCorrect === 'true') {
          setopenReponse('none');
          haseroor[0].has = 'yes';
        }
      }
      if (haseroor[0].has == 'none') {
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
    console.log('arraySauvgarder');
    console.log(arraySauvgarder);
    setLoadingAdd(true)
    AddQustion(arraySauvgarder, Id)
    arraySauvgarder = [
      {
        sujetType: '',
        question: '',
        reponse: [],
      }
    ];

    console.log(arraySauvgarder);

  };

  const Type = (x) => {
    const value = x.year;
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
    return (
      <>

        {TypeQuestion == 'qcm' ?
          <FormCHekbox />
          : TypeQuestion == 'qcs' ?
            <FormRadio />
            : TypeQuestion == 'croc' ?
              <FormText />
              : TypeQuestion == 'clinique' ?
                <FormText />
                : TypeQuestion == '0' ?
                  null
                  : null}
      </>
    );
  };

  // to add
  const Upquestion = (x) => {
    arraySauvgarder[0].question = x;
  }
  const UpValue = (x, y) => {
    if (TypeQuestion == 'qcm') {
      const value = x;
      const id = (y - 1);
      ArrayChek[id].rep = value;
      console.log(value);
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
  const InputText = ({ id }) => {
    return (
      <TextField onChange={(newValue) => UpValue(newValue.target.value, id)} sx={{ width: { md: 940, xs: 250, sm: 600 } }} placeholder="Réponse" />
    );
  };
  // to update

  const FormCHekbox = () => {
    return (
      <FormGroup>
        <LabelChek id={'1'} />
        <LabelChek id={'2'} />
        <LabelChek id={'3'} />
        <LabelChek id={'4'} />
        <LabelChek id={'5'} />
        <LabelChek id={'6'} />
      </FormGroup>
    );
  }

  // to update
  const FormRadio = () => {
    return (
      <FormGroup>
        <RadioGroup
          onChange={(e, val) => upRadio(val)}
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <LabelRdio id={'1'} />
          <LabelRdio id={'2'} />
          <LabelRdio id={'3'} />
          <LabelRdio id={'4'} />
          <LabelRdio id={'5'} />
          <LabelRdio id={'6'} />
        </RadioGroup>
      </FormGroup>
    );
  };
  // to update

  const FormText = () => {
    return (
      <textarea onChange={(newValue) => UpAera(newValue.target.value)} style={{ resize: 'none', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh' }} placeholder="Réponse ..."></textarea>
    );
  }

  // to update
  const LabelChek = ({ id }) => {
    return (
      <FormControlLabel sx={{ mb: 2 }} control={<Checkbox onChange={(e) => upChek(e.target.value, e.target.checked)} value={id} color="success" />} label={<InputText id={id} />} />
    );
  };
  // to update

  const LabelRdio = ({ id }) => {
    return (
      <FormControlLabel sx={{ mb: 2 }} control={<Radio value={id} color="success" />} label={<InputText id={id} />} />
    );
  }
  // fin type
  // dialog 
  const [openn, setOpenn] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelet, setOpenDelet] = React.useState(false);
  const [Value, setValue] = React.useState();


  // post
  const handleClickOpen = (id) => {
    setOpenn(true);
    setId(id)
    setTypeQuestion();
  };

  const handleClose = () => {
    setOpenn(false);
    setTypeQuestion();
    setId()
    setSuccessAdd(false)
    setLoadingAdd(false)
    setErrorAdd(false)
  };

  // edit
  const handleClickOpenEdit = (quest, sujetType, reponse, id) => {
    setquestionUpdate(quest)
    setreponseUpdate(reponse);
    console.log(reponse)
    settypeUpdate(sujetType)
    setTypeQuestion(sujetType)
    setId(id);
    setOpenEdit(true);
  };
  const ValidEdit = (question, type, reponse, id) => {
    setLoadingquestionUpdate(true)
    editQuestion(question, type, reponse, id)
  }
  const handleCloseEdit = () => {
    setOpenEdit(false);
    setLoadingquestionUpdate(null)
    errorquestionUpdate(null)
    setsuccessquesitonUpdate(null)
    setTypeQuestion();
  };
  // delete

  //delete
  const [successDeleteQest, setSuccessDeleteQest] = React.useState(null)
  const [loadingDeleteQest, setLoadingDeleteQest] = React.useState(false)
  const [errorDeleteQest, setErrorDeleteQest] = React.useState(null)
  const [questionID, setquestionID] = React.useState('');
  const [Qs, setQs] = React.useState('');
  const deleteqest = async (id, qestId, position) => {
    const config = {
      headers: {
        'authorization': `Bearer ${user.token}`
      }
    };
    await axios.delete(`${API_BASE}/sujet/delquest/` + id + "/" + qestId + "/" + position, config).then(res => {
      // setModulesData(res.data)
      setSuccessDeleteQest(true)
      setLoadingDeleteQest(false)
      setErrorDeleteQest(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorDeleteQest(error.response.data)
      setSuccessDeleteQest(false)
      setLoadingDeleteQest(false)
    })
  }
  const [position, setposition] = React.useState();
  const handleClickOpenDelet = (id, qestId, index, Qs) => {
    setOpenDelet(true);
    setId(id);
    setposition(index)
    setquestionID(qestId)
    setQs(Qs)
  };
  const validDelete = (id, qestId, position) => {
    setLoadingDeleteQest(true)
    deleteqest(id, qestId, position)
  }
  const handleCloseDelet = () => {
    setOpenDelet(false);
    setSuccessDeleteQest(false)
    setLoadingDeleteQest(false)
    setErrorDeleteQest(false)
    setQs('')
  };
  //fin dialog
  const WatingAnne = () => {
    return (
      <>
        <Grid xs={12} >
          <Skeleton sx={{ width: '100%', mt: -2, height: 80, borderRadius: 2 }} />
        </Grid>
      </>
    )
  }
  useEffect(() => {
    getQuiz()
    ApiCall()
    ApiModuleCall()
    ApiCoureCall()
  }, [successUpdate, successquesitonUpdate, successDeleteQest])
  if (loading) {
    return <>waiting data</>
  }
  const Icon = () => {
    return(
      open === 'none' ?
      <IconButton onClick={()=>{setopen('flex')}} aria-label="comment" sx={{transition:'.3s', ml: 2, bgcolor: 'white', color: '#ff5757', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ff5757', boxShadow: 'rgba(0, 0, 0, 0.3) 1.95px 1.95px 2.6px inset' } }}>
        <ExpandMoreIcon />
      </IconButton>
      :
      <IconButton onClick={()=>{setopen('none')}} aria-label="comment" sx={{transition:'.3s', ml: 2, bgcolor: 'white', color: '#ff5757', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ff5757', boxShadow: 'rgba(0, 0, 0, 0.3) 1.95px 1.95px 2.6px inset' } }}>
        <ExpandLessIcon />
      </IconButton>
    )
    
}
return (
  <Box sx={{ flexGrow: 1 }}>
    <Toolbar />
    <Grid container item spacing={4} sx={{ display: 'flex', p: 2, paddingBlock: 4, }}>
      <Grid container item xs={12} sm={12} md={12}>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link to={"/admin"} className='Links'>
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
              <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 1, borderRadius: 2, transition: '0.3s', '&:hover': { color: '#635985', bgcolor: 'white', boxShadow: '1px 1px 4px rgba(0,0,0,0.15)' }, '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Home
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
            {quiz.name}
          </LinkS>
        </Breadcrumbs>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <List sx={{ width: { xs: '96%', sm: '100%', md: '100%' }, bgcolor: 'background.paper', p: 0, borderRadius: 2, overflowX: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
          <ListItem
            sx={{ bgcolor: '#b33d95', color: 'white', p: 2 }}
            secondaryAction={<Icon />}>
            <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
              Parametre de quiz
            </Typography>

          </ListItem>
          <ListItem
            sx={{ transition:'.3s',paddingInline: 2, paddingBlock: 1, display: { xs: 'block', sm: open }, '&:hover': { bgcolor: 'rgba(0,0,0,0.0)' }, }}
          >
            {/* modifier */}
            <Grid container xs={12} columnGap={4} sx={{ p: 0 }}>
              <Grid container item xs={10} md={5.8} sx={{ width: '20rem', display: 'block' }}>

                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                  Quiz
                </Typography>
                <TextField sx={{ width: '100%', mb: 2 }} onChange={(e) => { handelChangeQuizname(e) }} value={quizName} />

              </Grid>
              <Grid container item xs={10} md={5.8} sx={{ width: 'auto', display: 'block' }}>

                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                  Module
                </Typography>
                {
                  loadingModulesData ? <><WatingAnne /></> : errorModulesData ?
                    <>
                      {errorModulesData}
                    </>
                    :
                    <>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Module</InputLabel>
                        <Select
                          sx={{ bgcolor: 'white', mb: 2 }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={moduleId}
                          label="Module"
                          onChange={handleChangemoduleId}
                        >
                          <MenuItem value={''}>All</MenuItem>
                          {/* filter((item, index) => index === Modulesdata.findIndex(obj => obj.name === item.name)) */}
                          {Modulesdata.filter(item => item.del !== 1).map(module => { return <MenuItem key={module._id} value={module._id}>{module.name}</MenuItem> })}
                        </Select>
                      </FormControl>
                    </>
                }

              </Grid>
              <Grid container item xs={10} md={5.8} sx={{ width: 'auto', display: 'block' }}>

              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Coure
              </Typography>
              <>selectioner le module avant</>
              {
                Loadingcoure ? <><WatingAnne /></> : Errorcoure ?
                  <>
                    {Errorcoure}
                  </>
                  :
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Coure</InputLabel>
                        <Select
                          sx={{ bgcolor: 'white', mb: 2 }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={coureName}
                          label="Coure"
                          onChange={handleChangeCoure}
                        >
                          <MenuItem value={''}>All</MenuItem>
                          {/* filter((item, index) => index === Modulesdata.findIndex(obj => obj.name === item.name)) */}
                          {coure ? coure.filter(item => item.del !== 1 && item.module == moduleId).map(coure => { return <MenuItem key={coure._id} value={coure._id}>{coure.name} - {coure.wilaya}</MenuItem> }) : null}
                        </Select>
                    </FormControl>
                  </>
              }
              </Grid>

              <Grid container item xs={10} md={5.8} sx={{ width: 'auto', display: 'block' }}>

                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                  Année
                </Typography>
                {
                  loadinganneeData ? <><WatingAnne /></> : erroranneeData ?
                    <>
                      {erroranneeData}
                    </>
                    :
                    <>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">annee scolaire</InputLabel>
                        <Select
                          sx={{ bgcolor: 'white', mb: 2 }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={year}
                          label="annee scolaire"
                          onChange={handleChangeYear}
                        >
                          <MenuItem value={''}>All</MenuItem>
                          {anneeData.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> })}
                        </Select>
                      </FormControl>
                    </>
                }

              </Grid>
              <Grid container item xs={10} md={5.8} sx={{ width: 'auto', display: 'block' }}>

                <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                  Source
                </Typography>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Source</InputLabel>
                  <Select
                    sx={{ bgcolor: 'white', mb: 2 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={quizSource}
                    label="Source"
                    onChange={handleChangeSource}
                  >
                    <MenuItem value={'annaba'}>externat Annaba</MenuItem>
                    <MenuItem value={'externat'}>externat</MenuItem>
                  </Select>
                </FormControl>

              </Grid>
              <Grid container item xs={10} md={5.8} sx={{ width: 'auto', display: 'block' }}>
                {loadingUpdate ? <LinearProgress color="secondary" /> : null}
                {errorUpdate ? <Alert sx={{ mt: 1 }} severity="error">{errorUpdate}</Alert> : null}
                {successUpdate ? <Alert sx={{ mt: 1 }} severity="success">Ce Quiz a été modifier avec success</Alert> : null}
                <Button onClick={() => { updateQuiz(quizName, moduleId, coureName, year, quizSource, params.id) }} variant="contained" sx={{ mt: 2, bgcolor: '#a2428a', opacity: '0.5', transition: '.3s', '&:hover': { opacity: '1', bgcolor: '#a2428a' } }}>Modifier</Button>

              </Grid>
            </Grid>
            {/* fin modifier */}
          </ListItem>
          <Divider />

        </List>
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <List sx={{ width: { xs: '96%', sm: '100%', md: '100%' }, bgcolor: 'background.paper', p: 0, borderRadius: 2, overflowX: 'hidden', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}>
          <ListItem
            sx={{ bgcolor: '#ff5757', color: 'white', p: 2 }}
            secondaryAction={
              <IconButton onClick={() => { handleClickOpen(params.id) }} aria-label="comment" sx={{ ml: 2, bgcolor: 'white', color: '#ff5757', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ff5757', boxShadow: 'rgba(0, 0, 0, 0.3) 1.95px 1.95px 2.6px inset' } }}>
                <NoteAddIcon />
              </IconButton>
            }
          >
            <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 1, borderRadius: 2, transition: '0.3s', }}>
              {loading ? null : quiz.name}
            </Typography>
          </ListItem>
          {loading ? <p>waiting for data</p> :
            error ? <p>{error}</p> :
              quiz !== null ?
                quiz.question.filter(item => item.del !== 1).map((quest, index) => {
                  return (
                    <ListItem
                      sx={{ paddingInline: 2, paddingBlock: 1, display: { xs: 'block', sm: 'flex' }, '&:hover': { bgcolor: 'rgba(0,0,0,0.05)' }, }}
                      secondaryAction={
                        <>
                          <IconButton onClick={() => { location.push('/admin/editQst/' + params.id + '/' + quest._id) }} aria-label="edit" sx={{ ml: 2, bgcolor: '#ffb313', color: 'white', transition: '.3s', '&:hover': { bgcolor: 'white', color: '#ffb313', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                            <SettingsRoundedIcon />
                          </IconButton>
                          <IconButton onClick={() => { handleClickOpenDelet(params.id, quest._id, index, `question ${index + 1}`) }} aria-label="delet" sx={{ ml: 2, bgcolor: '#ff3434', color: 'white', transition: '.3s', '&:hover': { color: '#ff3434', bgcolor: 'white', boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px inset,rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' } }}>
                            <DeleteForeverRoundedIcon />
                          </IconButton>
                        </>
                      }
                    >
                      <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={`question ${index + 1}`} secondary="Question" sx={{ width: { xs: '50%', sm: '25%' }, mb: { xs: 2, sm: 0 } }} />
                      <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quest.sujetType} secondary="Type" sx={{ width: { xs: '50%', sm: '5%' }, mb: { xs: 2, sm: 0 } }} />
                      <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quest.reponse.length} secondary="Proposition" sx={{ width: { xs: '50%', sm: '5%' }, mb: { xs: 2, sm: 0 } }} />
                      <ListItemText primaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} secondaryTypographyProps={{ fontFamily: 'Bahnschrift SemiBold', }} primary={quest.reponse.filter(item => item.isCorrect === true).length} secondary="Corecte" sx={{ width: { xs: '50%', sm: '5%' }, mb: { xs: 2, sm: 0 } }} />

                    </ListItem>
                  )
                })
                :
                <>nothing to show try to add questions first ?</>
          }


          <Divider />

        </List>
      </Grid>

    </Grid>

    {/* add dialog */}
    <Dialog
      open={openn}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Ajouter Question"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container xs={12} sx={{ width: 500, display: 'block' }}>

            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
              Type
            </Typography>
            <Autocomplete
              onChange={(event, value) => Type(value)}
              id="combo-box-demo"
              options={QuestionType}
              sx={{ width: '100%', mb: 2, }}
              renderInput={(params) => <TextField {...params} />}
            />
            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
              Question
            </Typography>
            <textarea value={arraySauvgarder[0].question[0]} onChange={(newValue) => Upquestion(newValue.target.value)} style={{ resize: 'none', marginBottom: '1rem', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh' }} placeholder="Réponse ..."></textarea>


            <ReanderInput />
            {loadingAdd ? <LinearProgress color="secondary" /> : null}
            {errorAdd ? <Alert sx={{ mt: 1 }} severity="error">{errorAdd}</Alert> : null}
            {successAdd ? <Alert sx={{ mt: 1 }} severity="success">Ce question a été ajouter avec success</Alert> : null}
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: 'red' }}>Annuler</Button>
        <Button onClick={() => { Sauvgarder() }} autoFocus sx={{ color: 'green' }}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
    {/* fin add dialog */}
    {/* edit dialog */}
    <Dialog
      open={openEdit}
      onClose={handleCloseEdit}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Modifier Une Question"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container xs={12} sx={{ width: 500, display: 'block' }}>

            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
              Question
            </Typography>
            <textarea style={{ resize: 'none', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh' }} onChange={(e) => { handelquestionchange(e) }} value={questionUpdate} placeholder={questionUpdate}></textarea>
            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
              Type
            </Typography>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                sx={{ bgcolor: 'white' }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={typeUpdate}
                label="Type"
                onChange={handleChangeType}
              >
                <MenuItem value={'qcm'}>QCM</MenuItem>
                <MenuItem value={'qcs'}>QCS</MenuItem>
                <MenuItem value={'croc'}>CROC</MenuItem>
                <MenuItem value={'clinique'}>CAS CLINIQUE</MenuItem>
              </Select>
            </FormControl>
            <ReanderInput />
            {loadingquestionUpdate ? <LinearProgress color="secondary" /> : null}
            {errorquestionUpdate ? <Alert sx={{ mt: 1 }} severity="error">{errorquestionUpdate}</Alert> : null}
            {successquesitonUpdate ? <Alert sx={{ mt: 1 }} severity="success">Ce Modules a été ajouter avec success</Alert> : null}
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseEdit} sx={{ color: 'red' }}>Annuler</Button>
        <Button onClick={() => { ValidEdit(questionUpdate, typeUpdate, reponseUpdate, Id) }} autoFocus sx={{ color: 'green' }}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
    {/* fin edit dialog */}
    {/* delet dialog */}
    <Dialog
      open={openDelet}
      onClose={handleCloseDelet}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Supprimer Un Utilisateur"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container xs={12} sx={{ width: 500, display: 'block' }}>

            <Typography variant="h6" sx={{ paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
              Question
            </Typography>
            <textarea value={Qs} disabled style={{ resize: 'none', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh' }} placeholder="Réponse ..."></textarea>
            {loadingDeleteQest ? <LinearProgress color="secondary" /> : null}
            {errorDeleteQest ? <Alert sx={{ mt: 1 }} severity="error">{errorDeleteQest}</Alert> : null}
            {successDeleteQest ? <Alert sx={{ mt: 1 }} severity="success">Ce Modules a été suppremer avec success</Alert> : null}
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDelet} sx={{ color: 'red' }}>Annuler</Button>
        <Button onClick={() => { validDelete(Id, questionID, position) }} autoFocus sx={{ color: 'green' }}>
          Valider
        </Button>
      </DialogActions>
    </Dialog>
    {/* fin delet dialog */}
  </Box >

);
}

export default EditQuiz;

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
];
const QuestionType = [
  { label: 'QCM', year: 'QCM' },
  { label: 'QCS', year: 'QCS' },
  { label: 'CROC', year: 'CROC' },
  { label: 'CAS CLINIQUE', year: 'CAS CLINIQUE' },
];