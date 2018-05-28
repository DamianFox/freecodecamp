import React, { Component } from "react";
import ReactDOM from "react-dom";

class Homepage extends Component {

	constructor() {
        super();
        this.state = {
            addRecipe: ''
        }
        this.addRecipe = this.addRecipe.bind(this);
    }

    addRecipe(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="container">
            	<div className="row">
                	<h1>Recipe Box</h1>
                    <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#addRecipe">Primary</button>
                </div>
            </div>
        );
    }
}

var app = document.getElementById("app");
ReactDOM.render(<Homepage />, app);