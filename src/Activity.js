import React, {Component} from "react";
import ReactMarkdown from "react-markdown";
import {
    Cell,
    Grid
} from "react-mdl";

import HtmlToReact, {Parser} from "html-to-react";

import showdown from "showdown";
import glob from "glob";

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

    let parser = new Parser();

    var processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

    var instructions = [
        {
            // This is REQUIRED, it tells the parser
            // that we want to insert our React
            // component as a child
            shouldProcessNode: function (node) {
                return node.name === "img" && node.attribs && node.attribs['src'];
            },
            processNode: function (node, children, index) {
                let img = "";
                try {
                    img = require(node.attribs['src']);
                    img = <img src={img} alt={node.attribs['alt']} />
                } catch (exception){
                    console.log("Error on " + node.attribs["src"]);
                } finally {
                    return img;
                }

            }
        },
        {
            // Anything else
            shouldProcessNode: function (node) {
                return true;
            },
            processNode: processNodeDefinitions.processDefaultNode,
        },
    ];

    let react_components = parser.parseWithInstructions(content, () => true, instructions);

    return (
        <Grid style={{background: "#ddd"}}>
            <Cell col={2}></Cell>
            <Cell col={8} style={{background: "#fafafa"}}>
                <div style={{margin: "4em 3em"}}>
                    {react_components}
                </div>
            </Cell>
        </Grid>
    );
};

export default Activity;
