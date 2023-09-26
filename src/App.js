import React, { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe';


const App = () => {
  const APP_ID = '6e46a29b';
  const APP_KEY = 'd2750ae4633b16d0444b6b03065197cb';
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');
  const [notFound, setNotFound] = useState(false); // State to track not found condition

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    if (data.hits.length === 0) {
      setNotFound(true); // Set notFound state to true when no recipes are found
    } else {
      setRecipes(data.hits);
      setNotFound(false); // Reset notFound state when recipes are found
    }
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };
  
  return (
    <div className="App">
      <h1 className="app-heading">Food Recipe App</h1>
       <form className="search-form" onSubmit={getSearch}>
          <input className="search-bar" type="text" placeholder="Enter your recipe name"  value={search} onChange={updateSearch} />
          <button className="search-button" type="submit">
            Search
          </button>
        </form>
        <div className="recipes">
          {notFound ? ( // Conditional rendering for not found message
            <p>Sorry No recipes found for "{query}" the database will be update the requested recipe </p>
          ) : (
            recipes.map((recipe) => (
              <Recipe
                key={recipe.recipe.label}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
                ingredients={recipe.recipe.ingredients}
              />
            ))
          )}
        </div>
      </div>
      
    );
  };
  
  export default App;
 






 

  
















  
  