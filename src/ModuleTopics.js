import React from "react";
import {
    Link
} from 'react-router-dom'
import {
    Button,
    Card,
    CardActions,
    CardText,
    CardTitle,
    Cell,
    Grid,
} from "react-mdl";
import modules from "./data/modules.json";

const ModuleTopics = ({match}) => {
    document.title = modules[match.params.module_id].name + " - Moondo Reyes";

    let sorted_topics = modules[match.params.module_id].topics.sort((el1, el2) => {
        let el1_numbers = el1.file.match(/\d+$/);
        let el2_numbers = el2.file.match(/\d+$/);

        let last_number_el1 = parseInt(el1_numbers[0], 10);
        let last_number_el2 = parseInt(el2_numbers[0], 10);

        return last_number_el1 - last_number_el2;
    });

    const topics = sorted_topics.map(object => (
        <Cell col={3} tablet={4} phone={6} key={object.file}>
            <Card shadow={0}
                style={{width: '100%', height: '320px', margin: 'auto'}}>
                    <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #46B6AC'}}>
                        {object.file}
                    </CardTitle>
                    <CardText>
                        {object.name}
                    </CardText>
                    <CardActions border>
                        <Link to={"/M" + match.params.module_id + "/" + object.file}>
                            <Button colored>Ver contenido</Button>
                        </Link>
                    </CardActions>
            </Card>
        </Cell>
    ));
    return (
        <Grid>
            <Cell col={2}></Cell>
            <Cell col={8}>
                <div className="">
                    <Grid>
                        {topics}
                    </Grid>
                </div>
            </Cell>
        </Grid>
    );
}

export default ModuleTopics;
