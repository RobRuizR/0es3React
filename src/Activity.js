import React, {Component} from "react";
import ReactMarkdown from "react-markdown";
import MarkdownToHTML from "react-markdown-to-html";

import showdown from "showdown";

const Activity = ({match}) => {
    let module_id = match.params.module_id
    let topic_id = match.params.topic_id;

    let file_content = require("./content/" + module_id + "/" + topic_id + "/" + topic_id + ".md");
    file_content = file_content.replace("data:text/x-markdown;base64,", "");

    let decoded_file_content = decodeURIComponent(Array.prototype.map.call(atob(file_content), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    let converter = new showdown.Converter();
    let content = converter.makeHtml(decoded_file_content);

    return (
        <div dangerouslySetInnerHTML={{__html:content}} />
    );
};

export default Activity;
