import React from "react";
import {
    Button,
    Card,
    CardActions,
    CardText,
    CardTitle,
    Cell,
    Grid,
} from "react-mdl";
import {
    Link,
} from 'react-router-dom'

import modules from "./data/modules.json";

const ModuleCards = (props) => {
    let sorted_module_keys = Object.keys(modules).sort((a, b) => {
        if (a.startsWith("P")){
            if(!b.startsWith("P")){
                return -1;
            }
            console.log(a + " " + b);
            return parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]);
        }
        return b.startsWith("P")? 1: parseInt(a) - parseInt(b);
    });
    console.log(sorted_module_keys);

    let modules_cards_html = sorted_module_keys.map((key) => {
        let url = null;
        let current_module = modules[key];
        let image = require("./content/P2/MP2.2/CiudadSostenible.jpg");
        url = image;
        // let background_with_image = "url(" + url + ") bottom right 15% no-repeat #46B6AC" ;
        let background = "bottom right 15% no-repeat " + (!current_module.color ? "#46B6AC" : current_module.color);
        return (
            <Cell col={3} tablet={4} phone={6} key={key}>
                <Card shadow={0}
                    style={{width: '100%', height: '320px', margin: 'auto'}}>
                        <CardTitle expand style={{color: '#fff', background}}>
                            {"Módulo " + (key.startsWith("P")?("Preliminar " + key.match(/\d+/)[0]) : key)}
                        </CardTitle>
                        <CardText>
                            {current_module.name}
                        </CardText>
                        <CardActions border>
                            <Link to={"/M" + key}>
                                <Button colored>Ver contenido</Button>
                            </Link>
                        </CardActions>
                </Card>
            </Cell>
        );
    });

    return (
        <Grid>
            <Cell col={2}></Cell>
            <Cell col={8}>
                <Grid>
                    {modules_cards_html}
                </Grid>
            </Cell>
        </Grid>
    )
}

export default ModuleCards;
