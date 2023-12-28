import { useEffect, useState } from "react";
import Index from "./pages/simple";

import Home from "./pages/simple/home";
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import Module from "./components/simple/module/modules";
import Navbar from "./components/simple/usesAll/navBare";
import SideBare from "./components/simple/usesAll/sideBare";
import InfoModule from "./components/simple/module/moduleInfo";
import QcmChois from "./components/simple/qcm/choixQcm/qcmChois";
import ConsulteQsm from "./components/simple/consulteQcm/consulteQcm";
import QcmChoisModules from "./components/simple/qcm/choixQcmModules/qcmChoisModules";
import MesQcm from "./components/simple/qcm/mesQcm/mesQcm";
import VdioPlayer from "./components/simple/module/vdio/vdioPlayer";

import AudioPlayer from "./components/simple/module/audio/playerAudio";
import Cours from "./components/simple/module/cours/cours";
import StatQuiz from "./components/simple/qcm/statQcm/statQuiz";
import Profil from "./components/simple/profile/profile";
import StatModules from "./components/simple/module/statModule/statModules";
import Public from "./pages/public/public";
import HomeG from "./pages/gold/home";
import NavBareG from "./components/gold/usesAll/navBare";
import SideBareG from "./components/gold/usesAll/sideBare";
import QcmChoisModulesG from "./components/gold/qcm/choixQcmModules/qcmChoisModules";
import MesQcmG from "./components/gold/qcm/mesQcm/mesQcm";
import StatQuizG from "./components/gold/qcm/statQcm/statQuiz";
import StatModulesG from "./components/gold/module/statModule/statModules";
import ModulesG from "./components/gold/module/modules";
import InfoModuleG from "./components/gold/module/moduleInfo";
import CoursG from "./components/gold/module/cours/cours";
import QcmChoisG from "./components/gold/qcm/choixQcm/qcmChois";
import ProfilG from "./components/gold/profile/profile";
import ConsulteQsmG from "./components/gold/consulteQcm/consulteQcm";


import { useHistory, withRouter } from 'react-router-dom'
import HomeA from "./pages/admin/home";
import Annees from "./components/admin/folders/annees/annee";
import Modules from "./components/admin/folders/module/modules";
import CoursA from "./components/admin/folders/cours/cours";
import Utilisateures from "./components/admin/folders/utulisateure/utilisateures";
import Abonnements from "./components/admin/folders/abonnements/abonnements";
import EditQuiz from "./components/admin/folders/quiz/editQuiz";
import Quiz from "./components/admin/folders/quiz/quiz";
import AddQuiz from "./components/admin/folders/quiz/addQuiz";
import SideBareA from "./components/admin/usesAll/sideBare";
import NavBareA from "./components/admin/usesAll/navBare";
import Login from "./pages/public/login";
import StatUser from "./components/admin/stat/statUser/statUser";
import StatTrafic from "./components/admin/stat/statTrafic/statUser";
import StatConsulte from "./components/admin/stat/statConsulte/statUser";
import ProfilA from "./components/admin/profile/profile";
import SignIn from "./pages/public/SignIn";
import Experi from "./pages/public/abb";
import Forget from "./pages/public/Forget";
import * as React from 'react';

import axios from "axios";
import { Redirect } from 'react-router-dom';
import { ProtectNormal, ProtectGold, ProtectAdmin, ProtectAdminHome } from "./protectedRoute";
import Editqstt from "./components/admin/folders/quiz/Editqst";
import { useSelector } from "react-redux";



function App() {
  // index 
  // let user = JSON.parse(localStorage.getItem('user'))
  const [User, setUser] = React.useState(null)
  const [loadingUser, setloadingUser] = React.useState(true)
  const [errorUser, setErrorUser] = React.useState(null)
  const [steps, setsteps] = React.useState(false)
  let data = [];

  const { type, user, message } = useSelector((state) => state.auth)
  console.log(type);
  return (
    <div className="App" style={{ backgroundColor: '#f7f7f7 ', minHeight: '100vh' }}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Public />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/Forget">
            <Forget />
          </Route>
          <Route path="/expire/:text">
            <Experi />
          </Route>
          <Route path="/SignIn">
            <SignIn />
          </Route>
          <Route path="/admin">
            <Box sx={{ display: 'flex', overflow: 'hidden', }}>
              <NavBareA />
              <SideBareA />
              <Switch >
                {type === null ? <Redirect to="/" /> :
                  <>
                    <ProtectAdmin path="/admin" component={HomeA} type={type} />
                    <ProtectAdmin path="/admin/profile" component={ProfilA} type={type} />
                    <ProtectAdmin path="/admin/annees" component={Annees} type={type} />
                    <ProtectAdmin path="/admin/modules" component={Modules} type={type} />
                    <ProtectAdmin path="/admin/cours" component={CoursA} type={type} />
                    <ProtectAdmin path="/admin/users" component={Utilisateures} type={type} />
                    <ProtectAdmin path="/admin/abonnements" component={Abonnements} type={type} />
                    <ProtectAdmin path="/admin/Quiz" component={Quiz} type={type} />
                    <ProtectAdmin path="/admin/addQuiz" component={AddQuiz} type={type} />
                    <ProtectAdmin path="/admin/editQuiz/:id" component={EditQuiz} type={type} />
                    <ProtectAdmin path="/admin/editQst/:id/:iDqst" component={Editqstt} type={type} />
                    <ProtectAdmin path="/admin/statUser" component={StatUser} type={type} />
                    <ProtectAdmin path="/admin/statTrafic" component={StatTrafic} type={type} />
                    <ProtectAdmin path="/admin/statconsulte" component={StatConsulte} type={type} />
                  </>
                }
              </Switch>

            </Box>
          </Route>

          <Route path="/simple">
            <Box sx={{ display: 'flex', overflow: 'hidden', }}>
              <Navbar />
              <SideBare />
              <Switch >
                {type === null ? <Redirect to="/" /> :
                  <>
                    <ProtectNormal path="/simple" component={Home} type={type} />
                    <ProtectNormal path="/simple/mesModule" component={Module} type={type} />
                    <ProtectNormal path="/simple/moduleInfo/:id" component={InfoModule} type={type} />
                    <ProtectNormal path="/simple/QuizeCM" component={QcmChoisModules} type={type} />
                    <ProtectNormal path="/simple/QuizeC/:id" component={QcmChois} type={type} />
                    <ProtectNormal path="/simple/consulteQuize/:id" component={ConsulteQsm} type={type} />
                    <ProtectNormal path="/simple/mesQuize" component={MesQcm} type={type} />
                    <ProtectNormal path="/simple/cours/:id/:module" component={Cours} type={type} />
                    <ProtectNormal path="/simple/statQuiz" component={StatQuiz} type={type} />
                    <ProtectNormal path="/simple/profile" component={Profil} type={type} />
                    <ProtectNormal path="/simple/statModules" component={StatModules} type={type} />

                  </>
                }
              </Switch>
            </Box>

          </Route>

          <Route path="/gold">
            <Box sx={{ display: 'flex', overflow: 'hidden', }}>
              <NavBareG />
              <SideBareG />

              <Switch >
                {type === null ? <Redirect to="/" /> :
                  <>
                    <ProtectGold path="/gold" component={HomeG} type={type} />
                    <ProtectGold path="/gold/mesModules" component={ModulesG} type={type} />
                    <ProtectGold path="/gold/moduleInfo/:id" component={InfoModuleG} type={type} />
                    <ProtectGold path="/gold/QuizeCM" component={QcmChoisModulesG} type={type} />
                    <ProtectGold path="/gold/QuizeC/:id" component={QcmChoisG} type={type} />
                    <ProtectGold path="/gold/consulteQuize/:id" component={ConsulteQsmG} type={type} />
                    <ProtectGold path="/gold/mesQuize" component={MesQcmG} type={type} />
                    <ProtectGold path="/gold/cours/:id/:module" component={CoursG} type={type} />
                    <ProtectGold path="/gold/statQuiz" component={StatQuizG} type={type} />
                    <ProtectGold path="/gold/profile" component={ProfilG} type={type} />
                    <ProtectGold path="/gold/statModules" component={StatModulesG} type={type} />
                    <ProtectGold path="/gold/mesModule/:annee" component={ModulesG} type={type} />
                  </>
                }
              </Switch>



            </Box>
          </Route>
          {/*
           */}
        </Switch>

      </Router>
    </div >
  );
}

export default App;

{/* to appdate */ }
{/*  */ }
{/* {/* to appdate */ }
