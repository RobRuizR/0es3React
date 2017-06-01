import React from 'react';
import showdown from "showdown";
import HtmlToReact, {Parser} from "html-to-react";
import {
    Cell,
    Grid
} from "react-mdl";

import styles from "./Activity.css";

const ActivityPresentation = ({data, title}) => {
    if (!data){
        data = "";
    }

    if(!title){
        title = "";
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
                    <Grid>
                        <Cell col={12} style={{marginTop:"0", marginBottom:"0"}}>
                            <Grid>
                                <Cell col={2}>Nombre:</Cell>
                                <Cell col={10}>
                                    <hr/>
                                </Cell>
                            </Grid>
                        </Cell>
                        <Cell col={4} style={{marginTop:"0", marginBottom:"0"}}>
                            <Grid>
                                <Cell col={4}>Matricula:</Cell>
                                <Cell col={8}>
                                    <hr/>
                                </Cell>
                            </Grid>
                        </Cell>
                        <Cell col={4} style={{marginTop:"0", marginBottom:"0"}}>
                            <Grid>
                                <Cell col={4}>Grupo:</Cell>
                                <Cell col={8}>
                                    <hr/>
                                </Cell>
                            </Grid>
                        </Cell>
                        <Cell col={4} style={{marginTop:"0", marginBottom:"0"}}>
                            <Grid>
                                <Cell col={4}>Fecha:</Cell>
                                <Cell col={8}>
                                    <hr/>
                                </Cell>
                            </Grid>
                        </Cell>
                    </Grid>
                    <Grid>
                        <Cell col={12} style={{textAlign:"center", marginTop:"0", marginBottom:"0"}}>
                            <h3 style={{marginTop:"0", marginBottom:"0"}}>{title}</h3>
                        </Cell>
                    </Grid>
                    <br/>
                    {react_components}
                </div>
            </Cell>
        </Grid>
    );
}

export default ActivityPresentation;
