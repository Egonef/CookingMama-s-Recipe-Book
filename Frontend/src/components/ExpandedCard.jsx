import { motion } from "framer-motion"
import React, { useState, useEffect } from 'react';
import Pill from "./pill";
import axios from 'axios'
import Tabs from "./Tabs";


export default function ExpadedCard( { recipe, closeCard }) {

    const [id, setId] = useState(null);
    const [logedIn, setLogedIn] = useState(false);
    const [saved, setSaved] = useState(false);
    //var user = null;

    useEffect(() => {

        setId(recipe._id)
        axios.get(`http://localhost:5000/api/recipes/incrementPopularity/` + recipe._id)  // Reemplaza con la URL de tu API
            .then(response => {
                //console.log(response.data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });


            axios.get('http://localhost:5000/api/users/status', {withCredentials: true,})
                .then(response => {
                    if (response.data.loggedIn === true) {
                        setLogedIn(true)
                        const userId = response.data.user._id;
                        const recipeID = recipe._id;
                        console.log("valor del id user en response: " + userId)
                        console.log("Procedemos a sacar sus recetas guardadas")
                        // Ahora usa 'userId' en lugar de 'user'
                        axios.get(`http://localhost:5000/api/recipes/saved?userID=${userId}`)  // Reemplaza con la URL de tu API
                            .then(response => {
                                console.log("id de la receta que vamos a comparar: " + recipeID)
                                if (response.data.some(recipe => recipeID === recipe._id)) {
                                    setSaved(true)
                                    console.log(saved)
                                }
                            })
                            .catch(error => {
                                console.error('There was an error!', error);
                            });
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

    }, [ ]);

    if (!recipe) {
        return null; // No renderizar nada hasta que los datos de la receta se hayan cargado
    }


    const handleSave = () => {
        console.log("Guardando receta")
        axios.post(`http://localhost:5000/api/recipes/saved/` , {id} , {
            withCredentials: true, // Esto debe ir aquí
        })// Reemplaza con la URL de tu API
        .then(response => {
            console.log(response.data)
        })
    }

    return (
        <motion.div className=" bg-orange-200 fixed xl:top-[10%] xl:left-[8%] 2xl:top-[10%] 2xl:left-[15%] z-50 xl:h-[28rem] xl:w-[70rem]  2xl:h-[50rem] 2xl:w-[85rem] rounded-md opacity-0" style={{opacity: 0}} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>
            <button className="absolute top-0 right-0 p-2 w-10 h-10 rounded-tr-md rounded-bl-md text-2xl bg-red-300" onClick={closeCard}>X</button>
            {recipe ? <img src={recipe.image} alt={recipe.title} className="h-3/5 w-full object-cover rounded-t-md" /> : 'Loading...'}
            <div className=" flex flex-row justify-between h-2/5">
                <div className="p-4">
                    {recipe ? <h1 className="  text-[1.6rem]">{recipe.title}</h1> : 'Loading...'}
                    {recipe ? <p className="text-[1rem]">Tiempo estimado: {recipe.maxReadyTime} min</p> : 'Loading...'}
                    {recipe.intolerances !== "" ? <Pill intolerancia={recipe ? recipe.intolerances : null} /> : <Pill intolerancia={"Sin intolerancias"} />}
                </div>
                <div className="bg-slate-500 w-3/4 h-full flex flex-col rounded-br-md">
                    <Tabs tabs={[ { label:"Ingredientes"}, { label:"Instrucciones"}]} recipe={recipe} className="flex-grow" />
                </div>
            </div>
            { saved !== true ? <button className="absolute bottom-0 left-0 p-2 w-24 h-10 rounded-tr-md rounded-bl-md text-2xl bg-red-300" onClick={handleSave}>Guardar</button> : <div className="absolute bottom-0 left-0 p-2 w-28 h-10 rounded-tr-md rounded-bl-md text-2xl bg-red-300" >Guardada</div>}
        </motion.div>
    )
}