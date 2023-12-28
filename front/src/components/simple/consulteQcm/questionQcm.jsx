import * as React from 'react';
import { useState, useEffect } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import $ from 'jquery';
import "./index.css";


const Qcm = ({ index, reponses,  idQestion, appdate, histreponse, corect, chekArray, seconds }) => {
    // console.log(reponses)
    const test = (idReponse) => {
        if ($("#_" + idReponse).hasClass("Selected")) {
            $("#_" + idReponse).removeClass("Selected");
            $("#_" + idReponse).addClass("Simple");
            const secondIndex = appdate.findIndex((item) => item.id === idQestion);

            let bb = appdate[secondIndex].chek;
            const lenth = appdate[secondIndex].chek.length;
            // alert(lenth);
            const secondIndexbb = bb.findIndex((item) => item.idProp === idReponse);
            if (lenth == 1) {
                // alert(lenth);
                appdate.pop(appdate[secondIndex]);
                console.log(appdate);
            } else {
                bb.splice(secondIndexbb, 1);
                console.log(appdate);
            }


        } else {
            $("#_" + idReponse).removeClass("Simple");
            $("#_" + idReponse).addClass("Selected");

            const secondIndex = appdate.findIndex((item) => item.id === idQestion);

            if (secondIndex != '-1') {

                let bb = appdate[secondIndex].chek;
                bb.push({ idProp: idReponse });
                console.log(bb);
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
    const [thiscorect, setthiscorect] = useState(false);

    useEffect(() => {
        if (idQestionApdate != '-1') {
            const secondIndex = appdate.findIndex((item) => item.id === idQestion);
            let bb = appdate[secondIndex].chek;

            const trepinarray = bb.findIndex((item) => item.idProp == reponses._id);
            setreparray(trepinarray);

            if (trepinarray != '-1') {
                let corectarray = appdate[secondIndex].correction;

                if (corectarray[0] != null) {
                    setchekproposition(1);

                    // let corectprop = 
                    if (corectarray[0].type == 'true') {
                        setchekiscorect(1);
                    } else {

                        const chekk = [];
                        let bbb = appdate[secondIndex].chek[trepinarray]['idProp'];
                        console.log('this prop ' + bbb);


                        // console.log('array corect : '+ corect[1]['id'] );
                        for (let i = 0; i < corect.length; i++) {
                            chekk.push(corect[i]['id']);

                        }
                        console.log(chekk);
                        const include = chekk.includes(bbb);

                        if (include == true) {
                            setchekiscorect(1);
                        } else {
                            setchekiscorect(-1);
                        }






                    }
                }
            } else {
                let corectarray = appdate[secondIndex].correction;
                if (corectarray[0] != null) {
                    setchekproposition(1);

                    const chekk = [];
                    // // alert('eles');
                    const idThisProp = reponses._id;
                    // // alert('id:' +idThisProp);

                    for (let i = 0; i < corect.length; i++) {
                        chekk.push(corect[i]['id']);
                    }
                    // // alert(chekk);
                    const isinclude = chekk.includes(idThisProp);
                    // // alert(isinclude);
                    if (isinclude == true) {
                        // // alert(isinclude);
                        setchekiscorect(1);
                    } else {
                        setchekiscorect(-1);
                    }
                }

            }
            // console.log('etat :'+trepinarray);
            // console.log('etat :'+reponses._id);
            setHasExecuted(true);
        }else{
           
        }
    }, [seconds, hasExecuted]);

    const ischeked = chekArray.findIndex((item) => item.id === reponses._id);
    console.log(ischeked);

    const [hasExecutedd, setHasExecutedd] = useState(false);
    const [iscorect, setiscorect] = useState(-1);

    useEffect(() => {
        if (ischeked != '-1') {
            const tru = arraycorect.findIndex((item) => item.id === reponses._id);
            setiscorect(tru);
            setHasExecutedd(true);
            console.log('istrue' + tru)
        }else{
            const tru = arraycorect.findIndex((item) => item.id === reponses._id);
            setiscorect(tru);
            setHasExecutedd(true);
            console.log('istrue' + tru)
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
                    : null


            }

        </div>

    );
}





export default Qcm;