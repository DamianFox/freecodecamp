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
                    <button type='button' onClick={this.showModal}>Add Recipe</button>
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
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';

    return (
        <div className={showHideClassName}>
                <section className='modal-main'>
                    {children}
                    <button
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