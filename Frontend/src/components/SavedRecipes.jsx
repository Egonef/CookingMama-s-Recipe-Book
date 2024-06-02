
// src/pages/SavedRecipes.js
import RecipeCardAll from "../components/RecipeCardAll";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SavedRecipes() {


    const [logedIn, setLogedIn] = useState(false);
    const [recipes, setRecipes] = useState([]);
    //const location = useLocation();

    useEffect(() => {
        axios.get('http://localhost:5000/api/users/status', {withCredentials: true,})
                .then(response => {
                    if (response.data.loggedIn === true) {
                        setLogedIn(true)
                        const userId = response.data.user._id;
                        console.log("valor del id user en response: " + userId)
                        console.log("Procedemos a sacar sus recetas guardadas")
                        // Ahora usa 'userId' en lugar de 'user'
                        axios.get(`http://localhost:5000/api/recipes/saved?userID=${userId}`)  // Reemplaza con la URL de tu API
                            .then(response => {
                                console.log(response.data)
                                setRecipes(response.data);
                            })
                            .catch(error => {
                                console.error('There was an error!', error);
                            });
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
    }, []);

    return (
        <div className="bg-[#C3B9AB]">
            <div className="animate-fade-in">
                <div className="flex flex-row justify-evenly items-center flex-wrap gap-x-1 gap-y-4 mt-16 mx-16 overflow-auto">
                {recipes && recipes.length > 0 ? (
                    recipes.map((recipe, i) => <RecipeCardAll key={i} recipe={recipe} />)
                ) : (
                    <p>No recipes found</p>
                )}
                </div>
            </div>
        </div>
    );
}
