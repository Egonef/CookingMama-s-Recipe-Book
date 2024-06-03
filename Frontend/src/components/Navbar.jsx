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
                if (response.data.loggedIn === true) {
                    setLogedIn(true)
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }, []);


    const logout = async () => {
        const response = await axios.post('http://localhost:5000/api/users/logout', {}, {
            withCredentials: true, // Esto debe ir aquí
        });
        window.location.href = '/';
    }

    return (
        <nav className=" flex justify-end w-full h-24">
            <div className=" flex flex-row mr-20 my-8 font-[italiana] font-medium text-2xl text text-[#2D3931] ">
                <Link to={'/'} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Inicio</h1>
                </Link>


                { logedIn === false ? <Link to={'/login'} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Iniciar Sesión</h1>
                </Link> : null}


                { logedIn === false ? <Link to={'/register'} className="mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Registrarse</h1>
                </Link> : null}

                { logedIn === true ? <Link to={'/profile'} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Mi perfil</h1>
                </Link> : null}

                { logedIn === true ? <Link to={'/'} onClick={logout} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Cerrar Sesión</h1>
                </Link> : null}

            </div>
        </nav>
    )
}