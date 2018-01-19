import React, { Component } from "react";
import ReactDOM from "react-dom";
// import axios from 'axios';

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			search: ''
		}
		this.getData = this.getData.bind(this);
	}

  	getData(e) {
        e.preventDefault();
        var search = e.target.search.value;
        var wikipediaUrl = "https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+search;

    	fetch(wikipediaUrl)
    	.then(data => {
    		return data.json();
    	}).then(data => {
            console.log(data.query.pages);
            var objectList = data.query.pages;

    		let resultList = Object.keys(objectList).map(function(key, index) {
                console.log(objectList[key].title);
                return (
                    <li key={key}>{objectList[key].title}</li>
                )
            });

    		this.setState({search: resultList});
    	})
  	}

	render() {
	    return (
			<div className="container">
	    		<h1>Wikipedia Viewer</h1>
	    		<form onSubmit={this.getData}>
	    			<input type="text" id="search" name="search" placeholder="Search Wikipedia" />
	    			{/*<input type="submit" value="Click" />*/}
	    			<button>Click</button>
	    		</form>
	    		<ul>{this.state.search}</ul>
			</div>
		);
  	}
}

var app = document.getElementById("app");
ReactDOM.render(<Homepage />, app);