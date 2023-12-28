import Home from "./home";
import Box from '@mui/material/Box';
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom';
import Module from "../../components/simple/module/modules";
import Navbar from "../../components/simple/usesAll/navBare";
import SideBare from "../../components/simple/usesAll/sideBare";
import InfoModule from "../../components/simple/module/moduleInfo";
import QcmChois from "../../components/simple/qcm/choixQcm/qcmChois";
import ConsulteQsm from "../../components/simple/consulteQcm/consulteQcm";
import QcmChoisModules from "../../components/simple/qcm/choixQcmModules/qcmChoisModules";
import MesQcm from "../../components/simple/qcm/mesQcm/mesQcm";
import VdioPlayer from "../../components/simple/module/vdio/vdioPlayer";

import AudioPlayer from "../../components/simple/module/audio/playerAudio";
import Cours from "../../components/simple/module/cours/cours";
import StatQuiz from "../../components/simple/qcm/statQcm/statQuiz";
import Profil from "../../components/simple/profile/profile";
import StatModules from "../../components/simple/module/statModule/statModules";
import Public from "../public/public";
import HomeG from "../gold/home";
import NavBareG from "../../components/gold/usesAll/navBare";
import SideBareG from "../../components/gold/usesAll/sideBare";
import QcmChoisModulesG from "../../components/gold/qcm/choixQcmModules/qcmChoisModules";
import MesQcmG from "../../components/gold/qcm/mesQcm/mesQcm";
import StatQuizG from "../../components/gold/qcm/statQcm/statQuiz";
import StatModulesG from "../../components/gold/module/statModule/statModules";
import ModulesG from "../../components/gold/module/modules";
import InfoModuleG from "../../components/gold/module/moduleInfo";
import CoursG from "../../components/gold/module/cours/cours";
import QcmChoisG from "../../components/gold/qcm/choixQcm/qcmChois";
import ProfilG from "../../components/gold/profile/profile";
import ConsulteQsmG from "../../components/gold/consulteQcm/consulteQcm";

import SideBareA from "../../components/admin/usesAll/sideBare";
import NavBareA from "../../components/admin/usesAll/navBare";







import HomeA from "../admin/home";
import Annees from "../../components/admin/folders/annees/annee";
import Modules from "../../components/admin/folders/module/modules";
import CoursA from "../../components/admin/folders/cours/cours";
import Utilisateures from "../../components/admin/folders/utulisateure/utilisateures";
import Abonnements from "../../components/admin/folders/abonnements/abonnements";
import EditQuiz from "../../components/admin/folders/quiz/editQuiz";
import Quiz from "../../components/admin/folders/quiz/quiz";
import AddQuiz from "../../components/admin/folders/quiz/addQuiz";
import Login from "../public/login";
import Signin from "../public/signin";
import StatUser from "../../components/admin/stat/statUser/statUser";
import StatTrafic from "../../components/admin/stat/statTrafic/statUser";
import StatConsulte from "../../components/admin/stat/statConsulte/statUser";
const Index = () => {

    return (
        <Router>
            <Switch>

                <Route exact path="/">
                    <Public />
                </Route>
                {/* to appdate */}
                <Route  path="/Login">
                    <Login />
                </Route>
                <Route  path="/signin">
                    <Signin />
                </Route>
                {/* to appdate */}

                <Route path="/simple">
                    <Box sx={{ display: 'flex', overflow: 'hidden', }}>
                        <Navbar />
                        <SideBare />
                        <Switch >
                            <Route exact path="/simple">
                                <Home />
                            </Route>
                            <Route path="/simple/mesModule">
                                <Module />
                            </Route>
                            <Route path="/simple/moduleInfo">
                                <InfoModule />
                            </Route>
                            <Route path="/simple/QuizeCM">
                                <QcmChoisModules />
                            </Route>
                            <Route path="/simple/QuizeC">
                                <QcmChois />
                            </Route>
                            <Route path="/simple/consulteQuize">
                                <ConsulteQsm />
                            </Route>
                            <Route path="/simple/mesQuize">
                                <MesQcm />
                            </Route>

                            <Route path="/simple/cours">
                                <Cours />
                            </Route>
                            <Route path="/simple/statQuiz">
                                <StatQuiz />
                            </Route>
                            <Route path="/simple/profile">
                                <Profil />
                            </Route>
                            <Route path="/simple/statModules">
                                <StatModules />
                            </Route>
                        </Switch>




                    </Box>
                </Route>
                <Route path="/gold">
                    <Box sx={{ display: 'flex', overflow: 'hidden', }}>
                        <NavBareG />
                        <SideBareG />
                        <Switch >
                            <Route exact path="/gold">
                                <HomeG />
                            </Route>
                            <Route path="/gold/mesModule">
                                <ModulesG />
                            </Route>
                            <Route path="/gold/moduleInfo">
                                <InfoModuleG />
                            </Route>
                            <Route path="/gold/QuizeCM">
                                <QcmChoisModulesG />
                            </Route>
                            <Route path="/gold/QuizeC">
                                <QcmChoisG />
                            </Route>
                            <Route path="/gold/consulteQuize">
                                <ConsulteQsmG />
                            </Route>
                            <Route path="/gold/mesQuize">
                                <MesQcmG />
                            </Route>

                            <Route path="/gold/cours">
                                <CoursG />
                            </Route>
                            <Route path="/gold/statQuiz">
                                <StatQuizG />
                            </Route>
                            <Route path="/gold/profile">
                                <ProfilG />
                            </Route>
                            <Route path="/gold/statModules">
                                <StatModulesG />
                            </Route>
                        </Switch>




                    </Box>
                </Route>
                <Route path="/admin">
                    <Box sx={{ display: 'flex', overflow: 'hidden', }}>
                        <NavBareA />
                        <SideBareA />

                        <Switch >
                            {/* to appdate */}
                            <Route exact path="/admin">
                                <HomeA />
                            </Route>
                            <Route path="/admin/annees">
                                <Annees />
                            </Route>
                            <Route path="/admin/modules">
                                <Modules />
                            </Route>
                            <Route path="/admin/cours">
                                <CoursA />
                            </Route>
                            <Route path="/admin/users">
                                <Utilisateures />
                            </Route>
                            <Route path="/admin/abonnements">
                                <Abonnements />
                            </Route>
                            <Route path="/admin/Quiz">
                                <Quiz />
                            </Route>
                            <Route path="/admin/addQuiz">
                                <AddQuiz />
                            </Route>
                            <Route path="/admin/editQuiz">
                                <EditQuiz />
                            </Route>
                            {/* to appdate */}
                            <Route path="/admin/statUser">
                                <StatUser />
                            </Route>
                            <Route path="/admin/statTrafic">
                                <StatTrafic />
                            </Route>
                            <Route path="/admin/statconsulte">
                                <StatConsulte />
                            </Route>
                            {/* to appdate */}
                        </Switch>




                    </Box>
                </Route>
            </Switch>
        </Router>
    );
}

export default Index;