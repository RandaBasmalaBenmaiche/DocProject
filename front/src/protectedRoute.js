import { Route, Redirect } from "react-router-dom";
import * as React from 'react'
import axios from "axios";
const ProtectNormal = ({ path, component, type }) => {
    if (type !== 'normal') {
        alert(type);
        if (type === 'admin') {
            return <Redirect to="/admin" />;
        } else if (type == 'gold') {
            return <Redirect to="/gold" />;
        }
    } else {
        return <Route exact component={component} path={path} />;
    }
}
const ProtectGold = ({ path, component, type }) => {
    if (type !== 'gold') {
        if (type === 'admin') {
            return <Redirect to="/admin" />;
        } else if (type === 'normal') {
            return <Redirect to="/simple" />;
        }
    } else {
        return <Route exact component={component} path={path} />;
    }

}
const ProtectAdmin = ({ path, component, type }) => {
    console.log('type');
    console.log(type);
    if (type !== null) {
        if (type !== 'admin') {
            if (type === 'gold') {
                return <Redirect to="/gold" />;
            } else if (type === 'normal') {
                return <Redirect to="/simple" />;
            } else {
                <Redirect to="/" />
            }
        } else {
            return <Route exact component={component} path={path} />;
        }
    } else {
        <Redirect to="/" />
    }


}





export { ProtectNormal, ProtectGold, ProtectAdmin } 