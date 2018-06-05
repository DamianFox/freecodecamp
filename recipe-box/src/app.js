import React, { Component } from "react";
import ReactDOM from "react-dom";
import RecipeItems from "./recipeItems";

class Homepage extends Component {

	constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            showModal: false
        }

        this.addRecipe = this.addRecipe.bind(this);
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    componentDidMount = () => {
        document.addEventListener("keydown", this.handleEscPress, false);

        const cachedRecipes = localStorage.getItem('recipes');

        if (cachedRecipes !== null) {
          this.setState({ recipes: JSON.parse(cachedRecipes) });
        }
    }

    componentDidUpdate = () => {
        console.log("sono qui!");
        console.log("this.state", this.state);
        localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
    }
    
    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleEscPress, false);
    }

    handleEscPress = (e) => {
        if(e.keyCode === 27 && this.state.showModal){
            this.hideModal();
        }
    }

    showModal = () => {
        this.setState({ showModal: true });
    }

    hideModal = () => {
        this.setState({ showModal: false });
    }

    addRecipe = (e) => {
        e.preventDefault();
        let recipeName = e.target.recipeName.value;
        let ingrStr = e.target.ingredients.value;
        let ingrArray = this.splitString(ingrStr);

        let newRecipe = {
            name: recipeName, 
            ingredients: ingrArray
        };

        this.setState((prevState) => {
          return { 
            recipes: prevState.recipes.concat(newRecipe),
            showModal: false
          };
        });

        this.hideModal();
        e.target.recipeName.value = "";
        e.target.ingredients.value = "";
    }

    splitString = (str) => {
        return str.split(',');
    }

    render = () => {
        return (
            <div className="container">
            	<div className="row">
                	<h1>Recipe Box</h1>
                </div>
                <div className="row">
                    <button id="show-button" className="btn btn-primary" type="button" onClick={this.showModal}>Add Recipe</button>
                </div>
                <Modal 
                    show={this.state.showModal} 
                    handleClose={this.hideModal} 
                    addRecipe={this.addRecipe}
                    onKeyDown={this.handleEscPress}
                    tabIndex="0">
                    {/*<p>Modal</p>
                    <p>Data</p>*/}
                </Modal>
                <RecipeItems entries={this.state.recipes} />
            </div>
        );
    }
}

const Modal = ({ handleClose, addRecipe, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div className="modal-header">
                    <h5 className="modal-title text-black">Add Recipe</h5>
                    <button 
                        type="button" 
                        className="close" 
                        onClick={handleClose}
                        data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={addRecipe}>
                    <div className="form-group">
                        <label htmlFor="recipe-name">Recipe Name</label>
                        <input type="text" className="form-control" id="recipe-name" name="recipeName" placeholder="Enter name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea 
                            className="form-control" 
                            id="ingredients" 
                            name="ingredients" 
                            rows="3" 
                            placeholder="Enter ingredients, separated by comma">
                        </textarea>
                    </div>
                    <div className="form-group text-right">
                        <button className="btn btn-primary">
                        Add Recipe
                        </button>
                        {/*<button 
                            className="btn btn-secondary"
                            id="close-button"
                            onClick={handleClose}>
                        Close
                        </button>*/}
                    </div>
                </form>
            </section>
        </div>
    );
};

var app = document.getElementById("app");
ReactDOM.render(<Homepage />, app);