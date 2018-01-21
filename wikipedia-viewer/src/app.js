import React, { Component } from "react";
import ReactDOM from "react-dom";
// import axios from 'axios';

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
        var wikipediaEndPoint = "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&gsrnamespace=0&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+search;
        var wikipediaUrl = "https://en.wikipedia.org/?curid=";

    	fetch(wikipediaEndPoint)
    	.then(data => {
    		return data.json();
    	}).then(data => {
            var objectList = (data.hasOwnProperty("query")) ? data.query.pages : "";
            let resultList;

            if(objectList !== ""){
                resultList = Object.keys(objectList).map(function(key, index) {
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
                resultList = (function() {
                    return (
                        <div className="item" key={1}>
                            <p>No results!</p>
                        </div>
                    )
                })();
            }

    		this.setState({search: resultList});
    	})
  	}

	render() {
	    return (
			<div className="container">
	    		<h1>Wikipedia Viewer</h1>
	    		<form onSubmit={this.getData}>
	    			<input type="text" id="search" name="search" placeholder="Search Wikipedia" />
	    			<button>Click</button>
	    		</form>
	    		<div className="items">{this.state.search}</div>
			</div>
		);
  	}
}

var app = document.getElementById("app");
ReactDOM.render(<Homepage />, app);
