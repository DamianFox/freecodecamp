import React, { Component } from "react";
 
class RecipeItems extends Component {
  constructor(props) {
    super(props);
 
    this.createRecipes = this.createRecipes.bind(this);
  }

  createRecipes = (item, i) => {
    return <li key={i}>{item.name}</li>
  }
 
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