import React, {
    Component
} from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route,
} from 'react-router-dom'
import {
    Button,
    Card,
    CardActions,
    CardText,
    CardTitle,
    Cell,
    Content,
    Drawer,
    Grid,
    Header,
    Layout,
    Navigation
} from "react-mdl";

import ModuleTopics from "./ModuleTopics";
import Activity from "./Activity";

import modules from "./data/modules.json";
let image = require("./content/dog.png");

let sorted_module_keys = Object.keys(modules).sort((a, b) => {
    if (a.startsWith("P")){
        if(!b.startsWith("P")){
            return 100;
        }

        return parseInt(a.match(/\d+/)[0]) - parseInt(a.match(/\d+/)[0]);
    }
    return b.startsWith("P")? 1: parseInt(a) - parseInt(b);
});

const root_link = <Link to="/">Moondo Reyes</Link>;
const App = () => {
    let img = <img src={image} />
    let modules_cards_html = sorted_module_keys.map((key) => {
        return (
            <Cell col={3} tablet={4} phone={6} key={key}>
                <Card shadow={0}
                    style={{width: '100%', height: '320px', margin: 'auto'}}>
                        <CardTitle expand style={{color: '#fff', backgroundImage: img, background: 'bottom right 15% no-repeat #46B6AC'}}>
                            {"Módulo " + (key.startsWith("P")?("Preliminar " + key.match(/\d+/)[0]) : key)}
                        </CardTitle>
                        <CardText>
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

    const NavigationLinks = sorted_module_keys.map((key) => {
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


    return (
        <Router>
            <div className="demo-big-content">
                <Layout>
                    <Header title={root_link} className="root_link_title" scroll>
                    </Header>
                    <Drawer title={root_link} className="root_link_title">
                        {NavigationLinks}
                    </Drawer>
                    <Content>
                        <Route exact path="/" render={() => (
                            <Grid>
                                <Cell col={2}></Cell>
                                <Cell col={8}>
                                    <Grid>
                                        {modules_cards_html}
                                    </Grid>
                                </Cell>
                            </Grid>

                        )}/>
                        <Route exact path="/M:module_id" component={ModuleTopics}/>
                        <Route exact path="/M:module_id/:topic_id" component={Activity}/>
                    </Content>
                </Layout>
            </div>
        </Router>
    );
};


export default App;
