import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {
    const [pokemon, setPokemon] = useState([]);

    const getPokemon = async (apiURL) => {
        try {
            let rawRes = await axios.get(apiURL);
            return rawRes.data;
        }
        catch (e) {
            if (e.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.error(e.response.data);
                console.error(e.response.status);
                console.error(e.response.headers);
            } else if (e.request) {
                // The request was made but no response was received `error.request` is an instance of XMLHttpRequest
                // in the browser and an instance of http.ClientRequest in node.js
                console.error(e.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error', e.message);
            }
            console.error(e.config);
        }
    }

    const handleOnClick = () => {
        let apiURL = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1130';
        getPokemon(apiURL).then(response => {
            setPokemon([...pokemon, ...response.results]);
        });
    }

    return (
        <div className="App">
            <div>
                <button onClick={handleOnClick}>Fetch Pokémon</button>
            </div>
            <div>
                <ul>
                    {pokemon.length > 0 && pokemon.map((pokemonItem, index) => {
                        return (<li key={index}>{pokemonItem.name}</li>)
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;
