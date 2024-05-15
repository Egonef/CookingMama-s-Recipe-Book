import { motion } from "framer-motion"
import React, { useState, useEffect } from 'react';
import Pill from "./pill";
import axios from 'axios'

export default function ExpadedCard( { recipeNumber, closeCard }) {
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:5000/api/recipes/' + recipeNumber)  // Reemplaza con la URL de tu API
        .then(response => {
            setRecipe(response.data);
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
}, []);


    return (
        <motion.div className=" bg-orange-200 fixed md:top-[3%] md:left-[2%] lg:top-[10%] lg:left-[15%] z-50 md:h-[28rem] md:w-[70rem]  lg:h-[50rem] lg:w-[85rem] rounded-md" >
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