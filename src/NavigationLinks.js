import React from 'react'
import {
    Link,
} from 'react-router-dom'
import {
    Navigation
} from "react-mdl";

import modules from "./data/modules.json";

const NavigationLinks = ({props}) =>{
    let sorted_module_keys = Object.keys(modules).sort((a, b) => {
        if (a.startsWith("P")){
            if(!b.startsWith("P")){
                return -1;
            }
            return parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10);
        }
        return b.startsWith("P")? 1: parseInt(a, 10) - parseInt(b, 10);
    });

    let navigation_links = sorted_module_keys.map((key) => {
        let module_links = modules[key].topics.map(object => (
            <Link to={"/M" + key + "/" + object.file} key={object.file} className="mdl-navigation__link">{object.file}</Link>
        ));
        return (
            <span key={key}>
                <hr className="navbar_hr"/>
                <Navigation key={key}>
                    <div className="mdl-navigation__link">
                        {"Módulo " + (key.startsWith("P")?("Preliminar " + key.match(/\d+/)[0]) : key)}
                    </div>
                    {module_links}
                </Navigation>
            </span>
        );
    });

    return <div>{navigation_links}</div>
}


export default NavigationLinks;
