import React, { Component } from "react";
import ReactDOM from "react-dom";

class Homepage extends Component {
    constructor() {
        super();
        this.state = {
            search: ''
        }
        this.getData = this.getData.bind(this);
    }

    getData(e) {
        e.preventDefault();
        var search = e.target.search.value;
        var origin = "origin=*";
        var properties = "format=json&"+origin+"&action=query&generator=search&gsrnamespace=0&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max";
        var wikipediaEndPoint = "https://en.wikipedia.org/w/api.php?"+properties+"&gsrsearch="+search;
        var wikipediaUrl = "https://en.wikipedia.org/?curid=";

        fetch(wikipediaEndPoint)
        .then(data => {
            return data.json();
        }).then(data => {
            var objectList = (data.hasOwnProperty("query")) ? data.query.pages : "";
            var resultRender;

            if(objectList !== "") {
                resultRender = Object.keys(objectList).map(function(key, index) {
                    return (
                        <div className="item" key={objectList[key].pageid}>
                            <a href={wikipediaUrl+objectList[key].pageid}>
                                <h1>{objectList[key].title}</h1>
                                <p>{objectList[key].extract}</p>
                            </a>
                        </div>
                    )
                });
            } else {
                resultRender = (
                        <div className="item" key={1}>
                            <p>No results!</p>
                        </div>
                    )
            }

            this.setState({search: resultRender});
        })
        .catch(error => {
            console.error(error);
        });
    }

    render() {
        return (
            <div className="container">
                <h1>Wikipedia Viewer</h1>
                <a className="random" href="https://en.wikipedia.org/wiki/Special:Random" target="_blank">
                    Click here for a random article
                </a>
                <form onSubmit={this.getData}>
                    <input type="text" id="search" name="search" className="form-control" placeholder="Search Wikipedia" autoComplete="off" />
                </form>
                <div className="items">{this.state.search}</div>
            </div>
        );
    }
}

var app = document.getElementById("app");
ReactDOM.render(<Homepage />, app);