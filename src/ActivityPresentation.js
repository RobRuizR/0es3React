import React from 'react';
import showdown from "showdown";
import HtmlToReact, {Parser} from "html-to-react";
import ReactMarkdown from "react-markdown";
import {
    Cell,
    Grid
} from "react-mdl";

const ActivityPresentation = ({data}) => {
    if (!data){
        data = "";
    }
    let converter = new showdown.Converter();
    let content = converter.makeHtml(data);
    let parser = new Parser();
    let processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
    var instructions = [
        {
            shouldProcessNode: function (node) {
                return node.name === "img" && node.attribs && node.attribs['src'];
            },
            processNode: function (node, children, index) {
                let img = "";
                try {
                    img = require(node.attribs['src']);
                    img = <img src={img} style={{maxWidth:"100%"}} alt={node.attribs['alt']} />
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
        <Grid style={{background: "#ddd", textAlign:"justify"}}>
            <Cell col={2}></Cell>
            <Cell col={8} style={{background: "#fafafa"}}>
                <div style={{margin: "4em 5em"}}>
                    {react_components}
                </div>
            </Cell>
        </Grid>
    );
}

export default ActivityPresentation;
