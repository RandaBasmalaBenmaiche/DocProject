
import * as React from 'react';
import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

import $ from 'jquery';
import "./index.css";






const Propos = ({ reponses, idQestion, appdate, histreponse, corect, typeQ }) => {
    const test = (idReponse) => {
        if ($("#_" + idReponse).hasClass("Selected")) {
            $("#_" + idReponse).removeClass("Selected");
            $("#_" + idReponse).addClass("Simple");
            const secondIndex = appdate.findIndex((item) => item.id === idQestion);
            // // alert(secondIndex);
            let bb = appdate[secondIndex].chek;

            const secondIndexbb = bb.findIndex((item) => item.idProp === idReponse);
            // // alert(secondIndexbb);
            bb.splice(secondIndexbb, 1);
            console.log(appdate);

        } else {
            $("#_" + idReponse).removeClass("Simple");
            $("#_" + idReponse).addClass("Selected");

            const secondIndex = appdate.findIndex((item) => item.id === idQestion);
            // // alert(secondIndex);
            if (secondIndex === 0) {
                // array.push({id:idQestion,chek:[{idProp:idReponse}]});
                let bb = appdate[secondIndex].chek;
                bb.push({ idProp: idReponse });
                // console.log(bb);
                // console.log(array);
            } else if (secondIndex === -1) {
                appdate.push({ id: idQestion, chek: [{ idProp: idReponse }] });
                // console.log(array);
            }


        }
    }
    const [type, settype] = useState('qcm');
    if (typeQ == 'qcs') {
        settype('qcs');
    } else if (typeQ == 'croq') {
        settype('croq');
    } else if (typeQ == 'casclinique') {
        settype('casclinique');
    }
    console.log(idQestion)

    return (
        <div>
          

                    <ListItem className="Simple" key={reponses._id} id={"_" + reponses._id}
                    // onClick={() => {
                    //     test(reponses._id);
                    // }}
                    >
                        <ListItemAvatar >
                            <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.5)' }}>
                                A
                            </Avatar>
                        </ListItemAvatar>
                        {/* <ListItemText primary={reponses.rep} /> */}
                        <ListItemText primary={reponses.rep} />
                    </ListItem>
                   
            
        </div>

    );
}


export default Propos;
