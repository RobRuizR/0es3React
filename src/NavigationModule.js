import React, {Component} from 'react';
import {
    Navigation
} from "react-mdl";

import styles from "./NavigationModule.css";

class NavigationModule extends Component {
    constructor(props){
        super(props);

        this.state = {
            open: false,
        }
        this.key = props.keyProp;
        this.name = props.name;
        this.color = props.color;
        this.links = props.links;

        this.showLinks = this.showLinks.bind(this);
    }

    showLinks(){
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }

    render (){
        return (
            <Navigation key={this.key} style={{paddingTop:0}}>
                <div className="mdl-navigation__link content-grid mdl-grid" style={{color:this.color}} onClick={this.showLinks}>
                    {"Módulo " + (this.key.startsWith("P")?("Preliminar " + this.key.match(/\d+/)[0]) : this.key) + ": " + this.name}
                </div>
                {this.state.open?this.links: ""}
            </Navigation>
        );
    }
}

export default NavigationModule;
