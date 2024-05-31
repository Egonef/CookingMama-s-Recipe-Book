// Objetivo: Crear el componente de la barra de navegación.
import '@fontsource/italiana';
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios'




export default function Navbar() {
    /*
    useEffect(() => {
        axios.get('http://localhost:5000/api/users/status')
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);
    */
    return (
        <nav className=" flex justify-end w-full h-24">
            <div className=" flex flex-row mr-20 my-8 font-[italiana] font-medium text-2xl text text-[#2D3931] ">
                <Link to={'/'} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Home</h1>
                </Link>
                <Link to={'/login'} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Log in</h1>
                </Link>
                <Link to={'/test2'} className="mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Test</h1>
                </Link>
                <Link to={'/register'} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Sign up</h1>
                </Link>
            </div>
        </nav>
    )
}