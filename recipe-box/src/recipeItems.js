import React, { Component } from "react";
 
class RecipeItems extends Component {
  constructor(props) {
    super(props);
 
    this.createRecipes = this.createRecipes.bind(this);
  }

  createRecipes = (item, i) => {
    // console.log("item.ingredients", item.ingredients);
    return (<div key={i} className="card">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <ul className="card-text">
                  {item.ingredients.map((element, index) => {
                    return <li key={index}>{element}</li>;
                  })}
                </ul>
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
      <div className="recipe-list">
          {listItems}
      </div>
    );
  }
};
 
export default RecipeItems;