import React, { Component } from "react";
import ReactDOM from "react-dom";

class Homepage extends Component {

	constructor() {
        super();
        this.state = {
            addRecipe: '',
            showModal: false
        }

        this.addRecipe = this.addRecipe.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
        this.setState({ showModal: true });
    }

    hideModal() {
        this.setState({ showModal: false });
    }

    addRecipe(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="container">
            	<div className="row">
                	<h1>Recipe Box</h1>
                </div>
                <div className="row">
                    <button className="btn btn-primary" type="button" onClick={this.showModal}>Add Recipe</button>
                </div>
                <Modal show={this.state.showModal} handleClose={this.hideModal} >
                    <p>Modal</p>
                    <p>Data</p>
                </Modal>
            </div>
        );
    }
}

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div class="modal-header">
                    <h5 class="modal-title text-black">Add Recipe</h5>
                </div>
                <div className="form-group">
                    <label for="recipe-name">Recipe Name</label>
                    <input type="text" className="form-control" id="recipe-name" placeholder="Enter name" />
                </div>
                <div className="form-group">
                    <label for="ingredients">Ingredients</label>
                    <textarea className="form-control" id="ingredients" rows="3" placeholder="Ingredients"></textarea>
                </div>
                {/*{children}*/}
                <button className="btn btn-secondary"
                onClick={handleClose}
                >
                Close
                </button>
            </section>
        </div>
    );
};

var app = document.getElementById("app");
ReactDOM.render(<Homepage />, app);