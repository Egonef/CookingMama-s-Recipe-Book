// Objetivo: Crear el componente de la barra de navegación.
import '@fontsource/italiana';
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from 'axios'




export default function Navbar() {

    const [logedIn, setLogedIn] = useState(false);



    useEffect(() => {
        axios.get('http://localhost:5000/api/users/status', {withCredentials: true,})
            .then(response => {
                if (response.loggedIn === true) {
                    setLogedIn(true)
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);

    return (
        <nav className=" flex justify-end w-full h-24">
            <div className=" flex flex-row mr-20 my-8 font-[italiana] font-medium text-2xl text text-[#2D3931] ">
                <Link to={'/'} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Home</h1>
                </Link>


                { logedIn === false ? <Link to={'/login'} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Log in</h1>
                </Link> : null}


                { logedIn === false ? <Link to={'/test2'} className="mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Sign up</h1>
                </Link> : null}


                { logedIn === true ? <Link to={'/test'} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Pruebote</h1>
                </Link> : null}

            </div>
        </nav>
    )
}