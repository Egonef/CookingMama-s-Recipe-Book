import { motion } from "framer-motion"
//import axios from 'axios'
import React, { useState, useEffect } from 'react';
import recipeData from './dabate.json';
import Pill from "./pill";

export default function ExpadedCard( { recipeNumber, closeCard }) {
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        /*
        axios.get('http://localhost:5000/api/recipes/popular')  // Reemplaza con la URL de tu API
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        */
        console.log(recipeNumber);
        setRecipe(recipeData.Recipe[recipeNumber])
    }, []);


    return (
        <motion.div className=" bg-orange-200 fixed top-[3%] left-[2%] z-50 lg:h-[32rem] lg:w-[79rem] rounded-md">
            <button className="absolute top-0 right-0 p-2" onClick={closeCard}>X</button>
            {recipe ? <img src={recipe.image} alt={recipe.title} className="h-3/5 w-full object-cover rounded-t-md" /> : 'Loading...'}
            <div className="p-4">
                {recipe ? <h1 className="  text-[1.6rem]">{recipe.title}</h1> : 'Loading...'}
                {recipe ? <p className="text-[1rem]">Tiempo estimado: {recipe.maxReadyTime} min</p> : 'Loading...'}
                <Pill intolerancia={recipe ? recipe.intolerances : null} />
            </div>
        </motion.div>
    )
}