import { motion } from "framer-motion"
import axios from 'axios'
import React, { useState, useEffect } from 'react';
import Pill from "./pill";
import ExpandedCard from "./ExpandedCard";

export default function RecipeCard( { recipeNumber }) {
    const [recipe, setRecipe] = useState(null)
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {

        axios.get('http://localhost:5000/api/recipes/popular')  // Reemplaza con la URL de tu API
            .then(response => {
                setRecipe(response.data[recipeNumber]);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    const handleClick = () => {
        setExpanded(true);
    }

    const handleClose = () => {
        setExpanded(false);
    }

    return (
        <motion.div whileHover={expanded ? {} : { scale: 1.1 }}  onClick={handleClick} className=" bg-orange-200 relative lg:h-96 lg:w-96  mx-14 my-14 rounded-md ">
            {recipe ? <img src={recipe.image} alt={recipe.title} className="h-3/5 w-full object-cover rounded-t-md" /> : 'Loading...'}
            <div className="p-4">
                {recipe ? <h1 className="  text-[1.6rem]">{recipe.title}</h1> : 'Loading...'}
                {recipe ? <p className="text-[1rem]">Tiempo estimado: {recipe.maxReadyTime} min</p> : 'Loading...'}
                <Pill intolerancia={recipe ? recipe.intolerances : null} />
            </div>
            {expanded && <ExpandedCard recipe={recipe} closeCard={handleClose} />}
        </motion.div>
    )
}