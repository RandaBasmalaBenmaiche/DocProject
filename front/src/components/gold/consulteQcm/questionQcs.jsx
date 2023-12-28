import * as React from 'react';
import { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import $ from 'jquery';
import "./index.css";
import QuestionTete from './questionTete';


const Qcs = ({ index, reponses, idQestion, appdate, histreponse, corect, chekArray, seconds }) => {

    const test = (idReponse) => {

        if ($("#_" + idReponse).hasClass("Selected")) {
            $("#_" + idReponse).removeClass("Selected");
            $("#_" + idReponse).addClass("Simple");
            const secondIndex = appdate.findIndex((item) => item.id === idQestion);

            let bb = appdate[secondIndex].chek;

            const secondIndexbb = bb.findIndex((item) => item.idProp === idReponse);
            appdate.pop(appdate[secondIndexbb]);
            console.log(appdate);
            // bb.splice(secondIndexbb, 1);


        } else {
            $("#_" + idReponse).removeClass("Simple");
            $("#_" + idReponse).addClass("Selected");
            const secondIndex = appdate.findIndex((item) => item.id === idQestion);

            if (secondIndex != '-1') {
                let bb = appdate[secondIndex].chek;
                if (bb[0] == null) {
                    bb.push({ idProp: idReponse });
                } else {
                    let id = bb[0]['idProp'];
                    $("#_" + id).removeClass("Selected");
                    $("#_" + id).addClass("Simple");
                    bb.pop(bb[0]['idProp']);
                    bb.push({ idProp: idReponse });
                }
                console.log(appdate);
            } else if (secondIndex == '-1') {
                appdate.push({ id: idQestion, chek: [{ idProp: idReponse }], correction: [], time: [] });
                console.log(appdate);
            }


        }
    }

    let arraycorect = corect;
    const idQestionApdate = appdate.findIndex((item) => item.id === idQestion);



    const [hasExecuted, setHasExecuted] = useState(false);
    const [reparray, setreparray] = useState(-1);

    const [chekiscorect, setchekiscorect] = useState(0);
    const [chekproposition, setchekproposition] = useState(0);

    useEffect(() => {
        if (idQestionApdate != '-1') {
          
            
            const secondIndex = appdate.findIndex((item) => item.id === idQestion);
            let bb = appdate[secondIndex].chek;
           
            const trepinarray = bb.findIndex((item) => item.idProp == reponses._id);
            setreparray(trepinarray);
            // // alert(reponses._id +' /find: '+trepinarray);
            if (trepinarray != '-1') {
                let corectarray = appdate[secondIndex].correction;

                if (corectarray[0] != null) {
                    setchekproposition(1);
                    if (corectarray[0].type == 'true') {
                        setchekiscorect(1);
                    } else {
                        setchekiscorect(-1);
                    }
                }
            } else {
                let corectarray = appdate[secondIndex].correction;
                if (corectarray[0] != null) {
                    setchekproposition(1);

                    const chekk = [];
                    // // alert('eles');
                    const idThisProp = reponses._id;
                    // alert('id:' +idThisProp);

                    for (let i = 0; i < corect.length; i++) {
                        chekk.push(corect[i]['id']);
                    }
                    // // alert(chekk);
                    const isinclude = chekk.includes(idThisProp);
                    // // alert(isinclude);
                    if (isinclude == true) {
                        // alert(isinclude);
                        setchekiscorect(1);
                    } else {
                        // alert(isinclude);
                        setchekiscorect(-1);
                    }
                }
            }
            // console.log('etat :'+trepinarray);
            // console.log('etat :'+reponses._id);
            setHasExecuted(true);
        }
    }, [seconds, hasExecuted]);




    const ischeked = chekArray.findIndex((item) => item.id === reponses._id);
    
    // console.log(ischeked);

    const [hasExecutedd, setHasExecutedd] = useState(false);
    const [ischekedd, setischekedd] = useState();
    const [iscorect, setiscorect] = useState(-1);

    useEffect(() => {
        if (ischeked != '-1') {
            setischekedd(ischeked);
            const tru = arraycorect.findIndex((item) => item.id === reponses._id);
            setiscorect(tru);
           
            setHasExecutedd(true);
            // console.log('istrue' + tru)
            console.log([{idrepons:reponses._id,ischeked:ischekedd,tru:iscorect}])
        }else{
            setischekedd(ischeked);
           
            // console.log('arraycorect');
            // console.log(arraycorect);
            // console.log('reponses._id');
            // console.log(reponses._id);
            const tru = arraycorect.findIndex((item) => item.id === reponses._id);
            
            // console.log(tru);
            setiscorect(tru);
            console.log([{idrepons:reponses._id,ischeked:ischekedd,tru:iscorect}])
            // alert(iscorect);
            
            setHasExecutedd(true);
        }
    }, [ischeked, hasExecutedd]);




    const Cliked = () => {
        return (

            <ListItem className="Simple" key={reponses._id} id={"_" + reponses._id}
                onClick={() => {
                    test(reponses._id);
                }}
            >
                <ListItemAvatar >
                    <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
                        {index + 1}
                    </Avatar>
                </ListItemAvatar>
                {/* <ListItemText primary={reponses.rep} /> */}
                <ListItemText primary={reponses.rep} />
            </ListItem>
        )
    }
    const Selected = () => {
        return (<>

            <ListItem className="Selected" key={reponses._id} id={"_" + reponses._id}
                onClick={() => {
                    test(reponses._id);
                }}
            >
                <ListItemAvatar >
                    <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
                        {index + 1}
                    </Avatar>
                </ListItemAvatar>
                {/* <ListItemText primary={reponses.rep} /> */}
                <ListItemText primary={reponses.rep} />
            </ListItem>
        </>);
    }
    const NotCliked = () => {
        return (
            <ListItem className="Simple" key={reponses._id} id={"_" + reponses._id}

            >
                <ListItemAvatar >
                    <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
                        {index + 1}
                    </Avatar>
                </ListItemAvatar>
                {/* <ListItemText primary={reponses.rep} /> */}
                <ListItemText primary={reponses.rep} />
            </ListItem>
        )
    }
    const TrueR = () => {
        return (
            <ListItem className="truer" key={reponses._id} id={"_" + reponses._id}

            >
                <ListItemAvatar >
                    <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
                        {index + 1}
                    </Avatar>
                </ListItemAvatar>
                {/* <ListItemText primary={reponses.rep} /> */}
                <ListItemText primary={reponses.rep} />
            </ListItem>
        )
    }
    const FalseR = () => {
        return (
            <ListItem className="falser" key={reponses._id} id={"_" + reponses._id}

            >
                <ListItemAvatar >
                    <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
                        {index + 1}
                    </Avatar>
                </ListItemAvatar>
                {/* <ListItemText primary={reponses.rep} /> */}
                <ListItemText primary={reponses.rep} />
            </ListItem>
        )
    }

    return (
        <div>
            {
                histreponse == 'null' ?
                    idQestionApdate != '-1' ?
                        reparray != '-1' ?
                            chekproposition != '0' ?
                                chekiscorect == '1' ?
                                    <TrueR />
                                    :
                                    chekiscorect == '-1' ?
                                        <FalseR />
                                        :
                                        <NotCliked />
                                :
                                <Selected />
                            :

                            chekproposition != '0' ?
                                chekiscorect == '1' ?
                                    <TrueR />
                                    :
                                    <NotCliked />
                                :
                                <Cliked />
                        :
                        <Cliked />
                    :
                    histreponse != 'null' ?
                        ischeked != '-1' ?
                            iscorect != '-1' ?
                                <TrueR />
                            :
                                <FalseR />
                        : 
                        iscorect != '-1' ?
                                <TrueR />
                            :
                            <NotCliked />
                        :
                            <NotCliked />
                    


            }

        </div>

    );
}





export default Qcs;