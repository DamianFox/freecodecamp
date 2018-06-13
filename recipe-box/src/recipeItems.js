import React, { Component } from "react";
 
class RecipeItems extends Component {
  constructor(props) {
    super(props);
 
    this.createRecipes = this.createRecipes.bind(this);
  }

  createRecipes = (item) => {
    return (<div key={item.key} className="card">
              <button 
                  className="close"
                  onClick={() => this.delete(item.key)}
                  aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
              <button 
                  className="edit"
                  onClick={() => this.showEditModal(item)}
                  aria-label="Edit">
                  <span aria-hidden="true">&#9998;</span>
              </button>
              <div className="card-body" onClick={() => this.edit(item)}>
                <h5 className="card-title">{item.name}</h5>
                <ul className="card-text ingredients-list">
                  {item.ingredients.map((element, index) => {
                    return <li key={index}>{element}</li>;
                  })}
                </ul>
              </div>
            </div>)
  }

  delete = (key) => {
    this.props.delete(key);
  }

  showEditModal = (item) => {
    this.props.showEditModal(item);
  }
 
  render() {
    var recipeEntries = this.props.entries;
    var listItems = recipeEntries.map(this.createRecipes);
 
    return (
      <div className="recipe-list">
        {listItems}
      </div>
    );
  }
};
 
export default RecipeItems;