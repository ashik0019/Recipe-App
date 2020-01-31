import React, {useEffect, useState} from 'react';
import Recipe from "./Recipe";
import "./App.css"
const App = () => {
  const APP_ID = '05bfdcb5';
  const APP_KEY = 'dcca437421e909d3190bae8ff030de44';
  const exampleReq = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`;
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect( () => {
    getRecipes();
  }, [query]);
  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await  response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value)
  }
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

    return (
        <div className="App">
          <form className='search-form' onSubmit={getSearch}>
            <input type="text" className='search-bar' value={search} onChange={updateSearch}/>
            <button className='search-button' type='submit'>Search</button>
          </form>
          <div className='recipes'>
            {recipes.map(recipe => (
                <Recipe
                    key={recipe.recipe.label}
                    title={recipe.recipe.label}
                    calories={recipe.recipe.calories}
                    image={recipe.recipe.image}
                    ingredients={recipe.recipe.ingredients}
                />
            ))}
          </div>

        </div>
    );
};

export default App;