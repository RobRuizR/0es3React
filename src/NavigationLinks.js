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
        let sorted_topics =modules[key].topics.sort((el1, el2) => {
            let el1_numbers = el1.file.match(/\d+$/);
            let el2_numbers = el2.file.match(/\d+$/);

            let last_number_el1 = parseInt(el1_numbers[0], 10);
            let last_number_el2 = parseInt(el2_numbers[0], 10);

            return last_number_el1 - last_number_el2;
        });
        let module_links = sorted_topics.map(object => (
            <Link to={"/M" + key + "/" + object.file} key={object.file} className="mdl-navigation__link">{object.file}</Link>
        ));
        return (
            <span key={key}>
                <hr className="navbar_hr"/>
                <Navigation key={key}>
                    <div className="mdl-navigation__link" style={{color:modules[key].color}}>
                        {"Módulo " + (key.startsWith("P")?("Preliminar " + key.match(/\d+/)[0]) : key) + ": " + modules[key].name}
                    </div>
                    {module_links}
                </Navigation>
            </span>
        );
    });

    return <div>{navigation_links}</div>
}


export default NavigationLinks;
