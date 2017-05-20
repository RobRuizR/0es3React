import React, {
    Component
} from 'react'
import {
    BrowserRouter as Router,
    Link,
    Route,
} from 'react-router-dom'
import {
    Content,
    Drawer,
    Header,
    Layout
} from "react-mdl";

import ActivityContainer from "./ActivityContainer";
import ModuleCards from "./ModuleCards";
import ModuleTopics from "./ModuleTopics";
import NavigationLinks from "./NavigationLinks";

class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            color: "rgb(63,81,181)"
        }

        this.handleColor = this.handleColor.bind(this);
    }

    handleColor(color){
        this.setState({color});
    }

    render(){
        const root_link = <Link to="/">Moondo Reyes</Link>;

        return (
            <Router>
                <div className="demo-big-content">
                    <Layout>
                        <Header title={root_link} className="root_link_title" scroll></Header>
                        <Drawer title={root_link} className="root_link_title">
                            <NavigationLinks />
                        </Drawer>
                        <Content>
                            <Route exact path="/" component={ModuleCards}/>
                            <Route exact path="/M:module_id" component={ModuleTopics} />
                            <Route exact path="/M:module_id/:topic_id" component={ActivityContainer} />
                        </Content>
                    </Layout>
                </div>
            </Router>
        );
    }
};


export default App;
