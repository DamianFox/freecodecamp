import React, { Component } from "react";
 
class RecipeItems extends Component {
  constructor(props) {
    super(props);
 
    this.createRecipes = this.createRecipes.bind(this);
  }

  createRecipes = (item, i) => {
    return (<div key={i} className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.ingredients}</p>
              </div>
            </div>)
  }

  // delete(key) {
  //   this.props.delete(key);
  // }
 
  render() {
    var recipeEntries = this.props.entries;
    var listItems = recipeEntries.map(this.createRecipes);
 
    return (
      <ul className="ul-list">
          {listItems}
      </ul>
    );
  }
};
 
export default RecipeItems;