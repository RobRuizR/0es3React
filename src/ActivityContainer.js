import React, {Component} from "react";
import ActivityPresentation from "./ActivityPresentation";
import modules from "./data/modules.json";

class ActivityContainer extends Component {
    constructor(props){
        super(props);

        let module_id = props.match.params.module_id;
        let topic_id = props.match.params.topic_id;
        let page_title = modules[module_id].topics.find(element => element.file === topic_id).name;

        this.state = {
            file_markdown: null,
            topic_id,
            page_title
        }

        document.title = page_title + " - Moondo Reyes";

        this.file_content = require("./content/" + module_id + "/" + topic_id + "/" + topic_id + ".md");

        this.getFileContent = this.getFileContent.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(this.state.topic_id !== nextProps.match.params.topic_id){
            let module_id = nextProps.match.params.module_id;
            let topic_id = nextProps.match.params.topic_id;
            let page_title = modules[module_id].topics.find(element => element.file === topic_id).name;

            this.setState({
                file_markdown: null,
                page_title,
                topic_id
            });

            this.file_content = require("./content/" + module_id + "/" + topic_id + "/" + topic_id + ".md");
        }
    }


    getFileContent(){
        if(this.file_content.startsWith("data:text/x-markdown;base64,")){
            this.file_content = this.file_content.replace("data:text/x-markdown;base64,", "");
            let decoded_file_content = decodeURIComponent(Array.prototype.map.call(atob(this.file_content), function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            // This is not an error, as strange as it might look. If this is not
            // done, react will try to update the state in an async manner
            // while its child ActivityPresentation is being constructed.
            // To avoid this, state is changed directly.
            this.state.file_markdown = decoded_file_content;
        } else {
            let self = this;
            fetch(this.file_content).then(resp => {
                return resp.text();
            }).then(data => {
                let decoded_file_content = data;
                self.setState({file_markdown: decoded_file_content});
            });
        }
    }

    render(){
        if(!this.state.file_markdown) {
            this.getFileContent();
        }

        return <ActivityPresentation
            data={this.state.file_markdown}
            title={this.state.page_title}
        />
    }

}

export default ActivityContainer;
