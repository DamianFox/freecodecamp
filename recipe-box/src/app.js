import React, { Component } from "react";
import ReactDOM from "react-dom";
import RecipeItems from "./recipeItems";

class Homepage extends Component {

	constructor(props) {
    super(props);
    this.state = {
        recipes: [],
        showModal: false,
        showEditModal: false,
        recipeToEditName: '',
        recipeToEditIngr: ''
    }

    this.addRecipe = this.addRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.showModal = this.showModal.bind(this);
    this.showEditModal = this.showEditModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.hideEditModal = this.hideEditModal.bind(this);
  }

    componentDidMount = () => {
      document.addEventListener("keydown", this.handleEscPress, false);

      const cachedRecipes = localStorage.getItem('recipes');

      if (cachedRecipes !== null) {
        this.setState({ recipes: JSON.parse(cachedRecipes) });
      }
    }

    componentDidUpdate = () => {
      localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
    }
    
    componentWillUnmount = () => {
      document.removeEventListener("keydown", this.handleEscPress, false);
    }

    handleEscPress = (e) => {
      if(e.keyCode === 27 && this.state.showModal){
          this.hideModal();
          this.hideEditModal();
      }
    }

    showModal = () => {
      this.setState({ showModal: true });
    }

    hideModal = () => {
      this.setState({ showModal: false });
    }

    showEditModal = (item) => {
      let name = item.name;
      let ingredients = item.ingredients;
      let key = item.key;
      let ingrStr = ingredients.join(", ");

      this.setState({ 
          showEditModal: true,
          recipeToEditKey: key,
          recipeToEditName: name,
          recipeToEditIngr: ingrStr,
      });
    }

    hideEditModal = () => {
      this.setState({ showEditModal: false });
    }

    addRecipe = (e) => {
      e.preventDefault();
      let recipeName = e.target.recipeName.value;
      let ingrStr = e.target.ingredients.value;
      if (recipeName !== "" && ingrStr !== "") {
        let ingrArray = this.splitString(ingrStr);
        let newRecipe = {
            key: Date.now(),
            name: recipeName, 
            ingredients: ingrArray
        };

        this.setState((prevState) => {
          return { 
            recipes: prevState.recipes.concat(newRecipe),
            showModal: false
          };
        });
          
        e.target.recipeName.value = "";
        e.target.ingredients.value = "";
      }
    }

    deleteRecipe = (key) => {
      let filteredRecipes = this.state.recipes.filter(function (recipe) {
        return (recipe.key !== key);
      });
     
      this.setState({
        recipes: filteredRecipes
      });
    }

    editRecipe = (e) => {
      e.preventDefault();
      let recipeKey = e.target.recipeKey.value;
      let recipeName = e.target.recipeName.value;
      let ingrStr = e.target.ingredients.value;
      let ingrArray = this.splitString(ingrStr);
      let recipesState = this.state.recipes;
      
      for(let r in recipesState){
        Object.keys(recipesState[r]).map(function(objectKey, index) {
          if(recipesState[r][objectKey] == recipeKey){
            recipesState[r].name = recipeName;
            recipesState[r].ingredients = ingrArray;
          }
        });
      }

      this.setState((prevState) => {
        return { 
          recipes: recipesState,
          showEditModal: false
        };
      });
    }

    splitString = (str) => {
      return str.split(',');
    }

    onChangeTextArea = (e) => {
      if(e.target.name === "recipeName"){
        this.setState({ recipeToEditName : e.target.value })
      }
      if(e.target.name === "ingredients"){
        this.setState({ recipeToEditIngr : e.target.value })
      }
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
          </Modal>
          <EditModal 
            show={this.state.showEditModal} 
            handleClose={this.hideEditModal} 
            editRecipe={this.editRecipe}
            onKeyDown={this.handleEscPress}
            onChange={this.onChangeTextArea}
            state={this.state}
            tabIndex="0">
          </EditModal>
          <RecipeItems 
            entries={this.state.recipes} 
            delete={this.deleteRecipe} 
            showEditModal={this.showEditModal} />
        </div>
      );
    }
}

const Modal = ({ handleClose, addRecipe, show }) => {
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
                </div>
            </form>
        </section>
    </div>
  );
};

const EditModal = ({ handleClose, editRecipe, show, state, onChange }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
        <section className="modal-main">
            <div className="modal-header">
                <h5 className="modal-title text-black">Edit Recipe</h5>
                <button 
                    type="button" 
                    className="close" 
                    onClick={handleClose}
                    data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form onSubmit={editRecipe}>
                <div className="form-group">
                    <label htmlFor="recipe-name">Recipe Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="recipe-name" name="recipeName" 
                        placeholder="Enter name"
                        onChange={onChange}
                        value={state.recipeToEditName || ''} />
                    <input 
                        type="hidden" 
                        id="recipe-key" name="recipeKey" 
                        placeholder="Enter name"
                        value={state.recipeToEditKey || ''} />
                </div>
                <div className="form-group">
                    <label htmlFor="ingredients">Ingredients</label>
                    <textarea 
                        className="form-control" 
                        id="ingredients" 
                        name="ingredients" 
                        rows="3" 
                        placeholder="Enter ingredients, separated by comma"
                        onChange={onChange}
                        value={state.recipeToEditIngr || ''} >
                    </textarea>
                </div>
                <div className="form-group text-right">
                    <button className="btn btn-primary">
                        Edit Recipe
                    </button>
                </div>
            </form>
        </section>
    </div>
  );
};

var app = document.getElementById("app");
ReactDOM.render(<Homepage />, app);