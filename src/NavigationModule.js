import React, {Component} from 'react';
import {
    IconToggle,
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

    showLinks(event){
        if(event){
            event.preventDefault();
        }
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }

    render (){
        return (
            <Navigation key={this.key} style={{paddingTop:0}}>
                <div className="mdl-navigation__link content-grid mdl-grid" style={{color:this.color}} onClick={this.showLinks}>
                    <table>
                        <thead>
                            <tr>
                                <td className="module_name">{"Módulo " + (this.key.startsWith("P")?("Preliminar " + this.key.match(/\d+/)[0]) : this.key) + ": " + this.name}</td>
                                <td className="is_open"><IconToggle name={this.state.open?"keyboard_arrow_down":"keyboard_arrow_right"} /></td>
                            </tr>
                        </thead>
                    </table>
                </div>
                {this.state.open?this.links: ""}
            </Navigation>
        );
    }
}

export default NavigationModule;
