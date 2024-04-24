import { motion } from "framer-motion"
import axios from 'axios'
import React, { useState, useEffect } from 'react';



export default function RecipeCardTest() {
    const [recipe, setRecipe] = useState(null)

    useEffect(() => {
        axios.get('http://172.21.128.185:5000/api/recipes/')  // Reemplaza con la URL de tu API
            .then(response => {
                setRecipe(response.data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    return (
        <motion.div whileHover={{ scale: 1.1 }} className=" bg-orange-200 relative h-96 sm:w-1/3 md:w-1/4 my-4 mx-2 rounded-md">
            {recipe ? <h1>{recipe.name}</h1> : 'Loading...'}
        </motion.div>
    )
}