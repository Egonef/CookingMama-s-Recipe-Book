import { motion } from "framer-motion"
import React, { useState } from 'react';
import Pill from "./pill";
import ExpandedCard from "./ExpandedCard";

export default function RecipeCardAll( { recipe }) {
    const [expanded, setExpanded] = useState(false);
    const [expandControl, setExpandControl] = useState(false);

    useState(() => {
        //console.log(recipe)
    })


    const handleClick = () => {
        if (expandControl === false) {
            //console.log(expandControl)
            setExpanded(true);
            setExpandControl(true);
            //console.log(expandControl)
            //console.log("Tarjeta abierta")
        }
    }

    const handleClose = async () => {
        //console.log(expandControl)
        setExpanded(false);
        //console.log("Tarjeta cerrada")
        setExpandControl(false);
    }

    return (
        <motion.div whileHover={expanded ? {} : { scale: 1.1 }}  onClick={handleClick} className=" bg-orange-200 relative lg:h-96 lg:w-96  mx-14 my-14 rounded-md ">
            {recipe ? <img src={recipe.image} alt={recipe.title} className="h-3/5 w-full object-cover rounded-t-md" /> : 'Loading...'}
            <div className="p-4">
                {recipe ? <h1 className="  text-[1.6rem]">{recipe.title.length > 26 ? recipe.title.substring(0, 26) + '...' : recipe.title}</h1> : 'Loading...'}
                {recipe ? <p className="text-[1rem]">Tiempo estimado: {recipe.maxReadyTime} min</p> : 'Loading...'}
                {recipe.intolerances !== "" ? <Pill intolerancia={recipe ? recipe.intolerances : null} /> : <Pill intolerancia={"Sin intolerancias"} />}
            </div>
            {expanded && <ExpandedCard recipe={recipe} closeCard={handleClose} />}
        </motion.div>
    )
}