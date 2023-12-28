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

import LogIN from "../../components/LogIn";
import { useHistory, withRouter } from 'react-router-dom'
import HomeA from "../admin/home";
import Annees from "../../components/admin/folders/annees/annee";
import Modules from "../../components/admin/folders/module/modules";
import CoursA from "../../components/admin/folders/cours/cours";
import Utilisateures from "../../components/admin/folders/utulisateure/utilisateures";
import Abonnements from "../../components/admin/folders/abonnements/abonnements";
import EditQuiz from "../../components/admin/folders/quiz/editQuiz";
import Quiz from "../../components/admin/folders/quiz/quiz";
import AddQuiz from "../../components/admin/folders/quiz/addQuiz";
import SideBareA from "../../components/admin/usesAll/sideBare";
import NavBareA from "../../components/admin/usesAll/navBare";
import Login from "../public/login";
import StatUser from "../../components/admin/stat/statUser/statUser";
import StatTrafic from "../../components/admin/stat/statTrafic/statUser";
import StatConsulte from "../../components/admin/stat/statConsulte/statUser";
import ProfilA from "../../components/admin/profile/profile";
import SignIn from "../public/SignIn";
import Experi from "../public/abb";
import Forget from "../public/Forget";

import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { ProtectNormal, ProtectGold, ProtectAdmin, ProtectAdminHome } from "../../protectedRoute";
import Editqstt from "../../components/admin/folders/quiz/Editqst";
import { useSelector } from "react-redux";
import { API_BASE } from "../../constants";
const Index = () => {
    const { isLoading, isError, isSuccess, message, type, user } = useSelector((state) => state.auth)
    // let user = JSON.parse(localStorage.getItem('user'))
    const [User, setUser] = useState(null)
    const [loadingUser, setLoadingUser] = useState(true)
    const [errorUser, setErrorUser] = useState(null)
    const [Gold, setGold] = useState(null)
    const [Isadmin, setIsadmin] = useState(null)
    console.log(user)
    
    


    const getUser = async () => {
        const config = {
            headers: {
                'authorization': `Bearer ${user.token}`
            }
        }
        await axios.get(`${API_BASE}/user/profile`, config).then(res => {
            // console.log('res.data')
            // console.log(res.data)
            setUser(res.data)
            setLoadingUser(false)
            setErrorUser(false)

        }).catch(error => {
            setGold(User.gold)
            setIsadmin(User.isAdmin)
            console.log(error.message)
            console.log(error.response.data)
            setLoadingUser(false)
            setErrorUser(error.response.data)
        })
    }

    useEffect(() => {
        if (user) {
            getUser()
        }
    }, [])

    if (errorUser) {
        console.log(errorUser)
    }
    console.log(Gold)
    console.log(Isadmin)


    return (
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

                


                <Route path="/simple">
                    <Box sx={{ display: 'flex', overflow: 'hidden', }}>
                        <Navbar />
                        <SideBare />
                        <Switch >
                            {loadingUser ? null :
                                <>
                                    <ProtectNormal path="/simple" component={Home} abb={Gold} admin={Isadmin} />
                                    <ProtectNormal path="/simple/mesModule" component={Module} abb={Gold} admin={Isadmin} />
                                    <ProtectNormal path="/simple/moduleInfo/:id" component={InfoModule} abb={Gold} admin={Isadmin} />
                                    <ProtectNormal path="/simple/QuizeCM" component={QcmChoisModules} abb={Gold} admin={Isadmin} />
                                    <ProtectNormal path="/simple/QuizeC/:id" component={QcmChois} abb={Gold} admin={Isadmin} />
                                    <ProtectNormal path="/simple/consulteQuize/:id" component={ConsulteQsm} abb={Gold} admin={Isadmin} />
                                    <ProtectNormal path="/simple/mesQuize" component={MesQcm} abb={Gold} admin={Isadmin} />
                                    <ProtectNormal path="/simple/cours/:id/:module" component={Cours} abb={Gold} admin={Isadmin} />
                                    <ProtectNormal path="/simple/statQuiz" component={StatQuiz} abb={Gold} admin={Isadmin} />
                                    <ProtectNormal path="/simple/profile" component={Profil} abb={Gold} admin={Isadmin} />
                                    <ProtectNormal path="/simple/statModules" component={StatModules} abb={Gold} admin={Isadmin} />
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
                            {loadingUser ? null :
                                <>
                                    <ProtectGold path="/gold" component={HomeG} abb={Gold} admin={Isadmin} />
                                    <ProtectGold path="/gold/mesModules" component={ModulesG} abb={Gold} admin={Isadmin} />
                                    <ProtectGold path="/gold/moduleInfo/:id" component={InfoModuleG} abb={Gold} admin={Isadmin} />
                                    <ProtectGold path="/gold/QuizeCM" component={QcmChoisModulesG} abb={Gold} admin={Isadmin} />
                                    <ProtectGold path="/gold/QuizeC/:id" component={QcmChoisG} abb={Gold} admin={Isadmin} />
                                    <ProtectGold path="/gold/consulteQuize/:id" component={ConsulteQsmG} abb={Gold} admin={Isadmin} />
                                    <ProtectGold path="/gold/mesQuize" component={MesQcmG} abb={Gold} admin={Isadmin} />
                                    <ProtectGold path="/gold/cours/:id/:module" component={CoursG} abb={Gold} admin={Isadmin} />
                                    <ProtectGold path="/gold/statQuiz" component={StatQuizG} abb={Gold} admin={Isadmin} />
                                    <ProtectGold path="/gold/profile" component={ProfilG} abb={Gold} admin={Isadmin} />
                                    <ProtectGold path="/gold/statModules" component={StatModulesG} abb={Gold} admin={Isadmin} />
                                    <ProtectGold path="/gold/mesModule/:annee" component={ModulesG} abb={Gold} admin={Isadmin} />
                                </>
                            }
                        </Switch>



                    </Box>
                </Route>
                {/* <Route path="/admin">
                    <Box sx={{ display: 'flex', overflow: 'hidden', }}>
                        {loadingUser ? null :

                            <>
                                <NavBareA />
                                <SideBareA />
                                <Switch >

                                    
                                    <ProtectAdmin path="/admin" component={HomeA} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/profile" component={ProfilA} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/annees" component={<Annees />} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/modules" component={<Modules />} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/cours" component={<CoursA />} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/users" component={<Utilisateures />} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/abonnements" component={<Abonnements />} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/Quiz" component={<Quiz />} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/addQuiz" component={<AddQuiz />} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/editQuiz/:id" component={<EditQuiz />} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/editQst/:id/:iDqst" component={<Editqstt />} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/statUser" component={<StatUser />} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/statTrafic" component={<StatTrafic />} abb={Gold} admin={Isadmin} />
                                    <ProtectAdmin path="/admin/statconsulte" component={<StatConsulte />} abb={Gold} admin={Isadmin} />
                                   
                                </Switch>
                            </>
                        }
                    </Box>
                </Route> */}


            </Switch>
        </Router>
    );
}

export default Index;
