import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { FormControl, InputLabel, LinearProgress, MenuItem, Select, Skeleton, Toolbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { API_BASE } from '../../../../constants';
const steps = [
  {
    label: 'Parametre de Quiz',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: 'Parametre de Quiz',
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },

];
const AddQuiz = () => {
  const token = JSON.parse(localStorage.getItem('user'))
  // annee data
  const [anneeData, setanneeData] = React.useState(null)
  const [loadinganneeData, setLoadinganneeData] = React.useState(true)
  const [successanneeData, setSuccessanneeData] = React.useState(null)
  const [erroranneeData, setErroranneeData] = React.useState(null)
  const [year, setYear] = React.useState('')
  const handleChangeYear = (e) => {
    setYear(e.target.value)
  }
  // modules data
  const [Modules, setModulesData] = React.useState([])
  const [loadingModules, setLoadingModulesData] = React.useState(true)
  const [successModules, setSuccessModulesData] = React.useState(null)
  const [errorModules, setErrorModulesData] = React.useState(null)
  const [moduleFilter, setmoduleFilter] = React.useState('')
  const [source, setSource] = React.useState('')
  const [annee, setAnnee] = React.useState('')
  const [name, setName] = React.useState('')
  const handleChangeModuleFilter = (e) => {
    setmoduleFilter(e.target.value)
  }
  const handleChangeSource = (e) => {
    setSource(e.target.value)
  }
  const handleChangeName = (e) => {
    setName(e.target.value)
  }
  const handleChangeAnnee = (e) => {
    setAnnee(e.target.value)
  }
  const ApiModuleCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
      }
    }
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
        'authorization': `Bearer ${token.token}`
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
  const [successPost, setSuccessPost] = React.useState(null)
  const [loadingPost, setLoadingPost] = React.useState(null)
  const [errorPost, setErrorPost] = React.useState(null)
  const [successEdit, setSuccessEdit] = React.useState(null)
  const [loadingEdit, setLoadingEdit] = React.useState(null)
  const [errorEdit, setErrorEdit] = React.useState(null)
  const addQuestion = async () => {
    const data = new FormData()
    data.append('name', name)
    data.append('date', annee)
    data.append('coure', coureName)
    data.append('annee', year)
    data.append('source', source)
    data.append('module', moduleFilter)

    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }
    console.log('done')
    await axios.post(`${API_BASE}/sujet`, data, config).then(res => {
      localStorage.setItem('sujetId', JSON.stringify(res.data))
      setSuccessPost(true)
      setLoadingPost(false)
      setErrorPost(false)
      isAdd()
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorPost(error.response.data)
      setSuccessPost(false)
      setLoadingPost(false)
    })
  }
  const editQustion = async (data, id) => {
    const config = {
      headers: {
        'content-type': 'application/json',
        'authorization': `Bearer ${token.token}`
      }
    }
    console.log('update done')
    await axios.patch(`${API_BASE}/sujet/` + id, data, config).then(res => {
      setSuccessEdit(true)
      setLoadingEdit(false)
      setErrorEdit(false)
    }).catch(error => {
      console.log(error.message)
      console.log(error.response.data)
      setErrorEdit(error.response.data)
      setSuccessEdit(false)
      setLoadingEdit(false)
    })
  }

  const ApiCall = async () => {
    const config = {
      headers: {
        'authorization': `Bearer ${token.token}`
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
  const WatingAnne = () => {
    return (
      <>
        <Grid xs={12} >
          <Skeleton sx={{ width: '100%', mt: -2, height: 80, borderRadius: 2 }} />
        </Grid>
      </>
    )
  }

  React.useEffect(() => {
    ApiModuleCall()
    ApiCall()
    ApiCoureCall()
  }, [])
  //-------------------------------------------------------------------
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const [Sauvegarde, setSauvegarde] = React.useState(0);
  const [question, setquestion] = React.useState(0);
  const [isadd, setisadd] = React.useState(0);
  const [TypeQuestion, setTypeQuestion] = React.useState();
  const [TypeQuestionValue, setTypeQuestionValue] = React.useState(null);
  const maxSteps = steps.length;
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
  // to add
  const navig = useHistory()
  const goback = () => {
    navig.push('/admin/Quiz')
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // to update
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
    editQustion(arraySauvgarder, JSON.parse(localStorage.getItem('sujetId')))
    arraySauvgarder = [
      {
        sujetType: '',
        question: '',
        reponse: [],
      }
    ];
    
    
    console.log(arraySauvgarder);
    setTypeQuestion('');
  };
  // to update

  const isAdd = () => {
    setisadd(1);
    setquestion(1);
  }

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

  return (
    <Box sx={{ maxWidth: '100%', flexGrow: 1, p: { xs: 1, sm: 4 }, }}>
      <Toolbar />
      <Paper
        square
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: 50,
          pl: 2,
          bgcolor: 'black',
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          color: 'white',

        }}
      >
        <Typography sx={{ fontFamily: 'Bahnschrift SemiBold', }}>{steps[activeStep].label}</Typography>
      </Paper>
      <Box sx={{ boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', maxHeight: { xs: 'auto', md: '67vh' }, overflowY: "auto", maxWidth: '100%', width: '100%', p: 4, bgcolor: 'white' }} >

        {
          activeStep == '0' ?
            //prev
            <>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Titre
              </Typography>
              {successPost ?
                <TextField disabled onChange={(e) => { handleChangeName(e) }} value={name} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Titre" />
                :
                <TextField onChange={(e) => { handleChangeName(e) }} value={name} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Titre" />
              }
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Modules
              </Typography>
              {
                loadingModules ? <><WatingAnne /></> : errorModules ?
                  <>
                    {errorModules}
                  </>
                  :
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Module</InputLabel>
                      {successPost ?
                        <Select
                          disabled
                          sx={{ bgcolor: 'white', mb: 2 }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={moduleFilter}
                          label="Module"
                          onChange={handleChangeModuleFilter}
                        >
                          <MenuItem value={''}>All</MenuItem>
                          {/* filter((item, index) => index === Modulesdata.findIndex(obj => obj.name === item.name)) */}
                          {Modules ? Modules.filter(item => item.del !== 1).map(module => { return <MenuItem key={module._id} value={module._id}>{module.name}</MenuItem> }) : null}
                        </Select>
                        :
                        <Select
                          sx={{ bgcolor: 'white', mb: 2 }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={moduleFilter}
                          label="Module"
                          onChange={handleChangeModuleFilter}
                        >
                          <MenuItem value={''}>All</MenuItem>
                          {/* filter((item, index) => index === Modulesdata.findIndex(obj => obj.name === item.name)) */}
                          {Modules ? Modules.filter(item => item.del !== 1).map(module => { return <MenuItem key={module._id} value={module._id}>{module.name}</MenuItem> }) : null}
                        </Select>
                      }
                    </FormControl>
                  </>
              }
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Cour
              </Typography>
              {/* <>selectioner le module avant</> */}
              {
                Loadingcoure ? <><WatingAnne /></> : Errorcoure ?
                  <>
                    {Errorcoure}
                  </>
                  :
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Cour</InputLabel>
                      {successPost ?
                        <Select
                          disabled
                          sx={{ bgcolor: 'white', mb: 2 }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={coureName}
                          label="Coure"
                          onChange={handleChangeCoure}
                        >
                          <MenuItem value={''}>All</MenuItem>
                          {/* filter((item, index) => index === Modulesdata.findIndex(obj => obj.name === item.name)) */}
                          {coure ? coure.filter(item => item.del !== 1 && item.module == moduleFilter).map(coure => { return <MenuItem key={coure._id} value={coure._id}>{coure.name} - {coure.wilaya}</MenuItem> }) : null}
                        </Select>
                        :
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
                          {coure ? coure.filter(item => item.del !== 1 && item.module == moduleFilter).map(coure => { return <MenuItem key={coure._id} value={coure._id}>{coure.name} - {coure.wilaya}</MenuItem> }) : null}
                        </Select>
                      }
                    </FormControl>
                  </>
              }
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Année Scolaire
              </Typography>
              {
                loadinganneeData ? <><WatingAnne /></> : erroranneeData ?
                  <>
                    {erroranneeData}
                  </>
                  :
                  <>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Année Scolaire</InputLabel>
                      {successPost ?
                        <Select
                          disabled
                          sx={{ bgcolor: 'white', mb: 2 }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={year}
                          label="Année Scolaire"
                          onChange={handleChangeYear}
                        >
                          <MenuItem value={''}>All</MenuItem>
                          {anneeData ? anneeData.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> }) : null}
                        </Select>
                        :
                        <Select
                          sx={{ bgcolor: 'white', mb: 2 }}
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={year}
                          label="Année Scolaire"
                          onChange={handleChangeYear}
                        >
                          <MenuItem value={''}>All</MenuItem>
                          {anneeData ? anneeData.filter(item => item.del !== 1).map(annee => { return <MenuItem key={annee._id} value={annee.annee}>{annee.annee}</MenuItem> }) : null}
                        </Select>
                      }
                    </FormControl>
                  </>
              }
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Année
              </Typography>
              {successPost ?
                <TextField disabled onChange={(e) => { handleChangeAnnee(e) }} value={annee} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Année" />
                :
                <TextField onChange={(e) => { handleChangeAnnee(e) }} value={annee} sx={{ width: '100%', mb: 2 }} id="outlined-basic" placeholder="Année" />
              }
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Source
              </Typography>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Source</InputLabel>
                {successPost ?
                  <Select
                    disabled
                    sx={{ bgcolor: 'white', mb: 2 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={source}
                    label="Source"
                    onChange={handleChangeSource}
                  >
                    <MenuItem value={'annaba'}>externat Annaba</MenuItem>
                    <MenuItem value={'externat'}>externat</MenuItem>
                  </Select>
                  :
                  <Select

                    sx={{ bgcolor: 'white', mb: 2 }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={source}
                    label="Source"
                    onChange={handleChangeSource}
                  >
                    <MenuItem value={'annaba'}>externat Annaba</MenuItem>
                    <MenuItem value={'externat'}>externat</MenuItem>
                  </Select>
                }
              </FormControl>
              {
                isadd != 0 ?
                  Sauvegarde != 0 ?
                    <Button onClick={() => goback()} variant="contained" sx={{ float: 'left', mt: 3, fontFamily: 'Bahnschrift SemiBold', mb: 1, bgcolor: '#FF5D5D', '&:hover': { bgcolor: 'red' } }}>Sauvegarder Et Quitter</Button>
                    :
                    <>
                      {loadingPost ? <LinearProgress color="secondary" /> : null}

                      {successPost ? <Alert sx={{ fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="success">Ce Quiz information a été ajouter avec success</Alert> : null}
                      <Alert severity="warning" sx={{ fontFamily: 'Bahnschrift SemiBold', }}>Aucune Question Ajouter Dans Ce Quiz ! attention de refrecher la page pour ne perd pas ls information. clicker sur next pour ajouter ls question.</Alert>
                    </>
                  :
                  <>
                    <div style={{ display: 'block' }}>
                      {errorPost ? <Alert sx={{ fontFamily: 'Bahnschrift SemiBold', mt: 1 }} severity="error">{errorPost}</Alert> : null}
                      <Button onClick={() => {
                        addQuestion();

                      }} variant="contained" sx={{ fontFamily: 'Bahnschrift SemiBold', float: 'left', mt: 3, mb: 2, bgcolor: '#54B435', '&:hover': { bgcolor: 'green' } }}>Ajouter Quiz</Button>


                    </div>
                  </>
              }
            </>
            :
            //next
            <>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Type De Quistion
              </Typography>
              <Autocomplete
                onChange={(event, value) => Type(value)}
                id="combo-box-demo"
                options={QuestionType}
                sx={{ width: '100%', mb: 2 }}
                defaultValue=''
                renderInput={(params) => <TextField {...params} label={TypeQuestion} />}
              />
              <Alert sx={{ mb: 1, display: opentype }} severity="error">Alert - sélectionnez un type de question !</Alert>

              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Quistion
              </Typography>
              <textarea value={arraySauvgarder[0].question[0]} onChange={(newValue) => Upquestion(newValue.target.value)} style={{ marginBottom: '0.5rem', resize: 'none', width: '100%', padding: '0.5rem', borderRadius: '5px', height: '20vh' }} placeholder="Question ..."></textarea>
              <Alert sx={{ mb: 1, display: openQuestion }} severity="error">Alert - le champ de la question est vide !</Alert>
              <Typography variant="h6" sx={{ fontFamily: 'Bahnschrift SemiBold', paddingBlock: 1 / 2, paddingInline: 0, borderRadius: 2, transition: '0.3s', '&::first-letter': { color: '#ff5757', fontWeight: 'bold' } }}>
                Réponses
              </Typography>
              <Alert sx={{ mb: 1, display: openReponse }} severity="error">Alert - remplir et cocher au moins une réponse !</Alert>
              <ReanderInput />

              {
                question != 0 ?
                  <Button onClick={() => { Sauvgarder() }} variant="contained" sx={{ float: 'left', mt: 3, bgcolor: '#54B435', '&:hover': { bgcolor: 'green' } }}>Ajouter Question</Button>
                  : null
              }

            </>
        }

      </Box>
      <MobileStepper
        variant="text"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{ boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px', }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </Box>

  )
}

export default AddQuiz;

const QuestionType = [
  { label: 'QCM', year: 'QCM' },
  { label: 'QCS', year: 'QCS' },
  { label: 'CROC', year: 'CROC' },
  { label: 'CAS CLINIQUE', year: 'CAS CLINIQUE' },
]