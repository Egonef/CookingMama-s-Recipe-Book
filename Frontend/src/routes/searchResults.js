// src/pages/SearchResults.js
import Navbar from "../components/Navbar";
import RecipeCardAll from "../components/RecipeCardAll";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Searchbar from "../components/Searchbar";
import { Link } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function SearchResults() {
    const query = useQuery();
    const searchTerm = query.get('ingredients');
    const maxReadyTime = query.get('maxReadyTime');
    // const searchTerm =query;
    console.log(searchTerm);
    const [recipes, setRecipes] = useState([]);
    //const location = useLocation();

    const navigate = useNavigate(); // Accede al objeto navigate
    const location = useLocation(); // Accede al objeto location

    const handleBackClick = () => {
        navigate(-1); // Navega hacia atrás en el historial
    };


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/recipes/find?ingredients=${searchTerm}&maxReadyTime=${maxReadyTime}&api=True`);
                setRecipes(response.data);
            } catch (error) {
                console.error("Error fetching recipes:", error);
            }
        };

        fetchRecipes();
    }, [searchTerm]);

    return (
        <div className="bg-[#C3B9AB]">
            <div className="animate-fade-in pl-5">
                <Navbar />
                <div className=" flex flex-row mr-20 py-9 font-[italiana] font-medium text-2xl text text-[#2D3931] ">
                    <Link to={"/recipesHome"} onClick={handleBackClick} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574] h-1/6"
                    >
                        <h1>Volver</h1>
                    </Link>
                </div>
                <div className="flex flex-row justify-evenly items-center flex-wrap gap-x-1 gap-y-4 mt-16 mx-16">
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

