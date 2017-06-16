import React from 'react'
import {
    Link,
} from 'react-router-dom'
import { connect, Provider } from 'react-redux';

import NavigationModule from "./NavigationModule"

const NavigationLinks = (props) =>{
    console.log(props);
    let modules = props.modules
    let navigation_links = modules.map(({module_id, color, name, topics}) => {
        let module_links = topics.map(object => (
            <Link to={"/M" + module_id + "/" + object.file} key={object.file} className="mdl-navigation__link">{object.file}</Link>
        ));
        return (
            <span key={module_id}>
                <hr className="navbar_hr"/>
                <NavigationModule
                    keyProp={module_id}
                    name={name}
                    color={color}
                    links={module_links}
                />
            </span>
        );
    });

    return <div>{navigation_links}</div>
}


// This function connects React and Redux
function mapStateToProps(application_state){
    // Whatever is returned here will be shown as props inside BookList
    return {
        modules: application_state.modules,
    };
}

export default connect(mapStateToProps)(NavigationLinks);
