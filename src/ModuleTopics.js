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
    const topics = modules[match.params.module_id].topics.map(object => (
        <Cell col={3} tablet={4} phone={6} key={object.file}>
            <Card shadow={0}
                style={{width: '100%', height: '320px', margin: 'auto'}}>
                    <CardTitle expand style={{color: '#fff', background: 'url(http://www.getmdl.io/assets/demos/dog.png) bottom right 15% no-repeat #46B6AC'}}>
                        {object.file}
                    </CardTitle>
                    <CardText>
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
