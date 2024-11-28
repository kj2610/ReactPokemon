import { useEffect, useState } from "react"
import "./index.css"
import { PokemonCards } from "./PokemonCards";
export const Pokemon = () =>{
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inputValue, setinputValue] = useState("")
    const Api = "https://pokeapi.co/api/v2/pokemon?limit=24";
    const fetchPokemonApi = async () =>{
        try {
            const resp = await fetch(Api);
            const data = await resp.json();
            //console.log(data);
            const updatedData = data.results.map(async (curElem) =>{
                const res = await fetch(curElem.url)
                const data = await  res.json();
                return data;
            })
            const updatedResp = await Promise.all(updatedData);
            //console.log(updatedResp);
            setPokemon(updatedResp);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
        
    }
    console.log(pokemon);
    useEffect(() =>{
        fetchPokemonApi();
    },[])

    const searchData =  pokemon.filter((curData)=>curData.name.toLowerCase().includes(inputValue.toLowerCase()))
    
    if(loading) {
        return(
            <div>
                <h1>
                    Loading...
                </h1>
            </div>
        )
    }
    if(error) {
        return(
            <div>
                <h1>
                    {error.message}
                </h1>
            </div>
        )
    }
    return(
        <>
            <section className="container">
                <header>
                    <h1>Lets Catch Pokemon</h1>
                </header>
                <div className="pokemon-info">
                    <input type="text" value={inputValue} onChange={(e) =>setinputValue(e.target.value)}/>
                </div>
                <div>
                    <ul className="cards"> {
                        searchData.map((curData) =>{
                            return <PokemonCards key= {curData.id} pokemonData = {curData}/>
                           
                        })
                        }
                    </ul>
                </div>
            </section>
        </>
    )
}