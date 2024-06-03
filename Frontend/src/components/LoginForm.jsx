import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import axios from 'axios';

export default function LoginForm() {

    //Estados de los inputs
    const [isMailFocused, setIsMailFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);


    const handleMailInputChange = (event) => {
        setIsMailFocused(event.target.value !== '');
        setEmail(event.target.value);
    };

    const handlePassInputChange = (event) => {
        setIsPassFocused(event.target.value !== '');
        setPassword(event.target.value);
    };

    //Estados de los campos del registro
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
            email,
            password
            }, {
                withCredentials: true, // Esto debe ir aquí
            });
            window.location.href = "/";
            console.log(response);
        } catch (response) {
            setErrorMessage(response.response.data.message);
        }
    }


    return (
        <div className="flex justify-center w-screen h-auto 2xl:mt-44 lg:mt-10">
                {errorMessage && (
                <div className="error-popup absolute top-20 p-5 rounded-lg bg-slate-600 text-slate-100">
                    {errorMessage}
                </div>
                )}
            <form className=" flex flex-row justify-center shadow-md bg-[#F19CBB] w-1/2 h-96 rounded-md p-8 ">
                <div className="flex flex-col justify-center w-1/2 h-auto mr-5">
                    <div className='flex flex-col mb-2 relative'>
                        <motion.label htmlFor="email" className="block text-gray-700 text-md font-bold mb-2 absolute ml-2"
                            animate={{ y: isMailFocused ? -25 : 0 , x: isMailFocused ? -15 : 0 , scale: isMailFocused ? 0.8 : 1}}
                        >
                            Correo electrónico
                        </motion.label>
                        <input type="text"  className="border-2 border-black rounded-lg " onFocus={() => setIsMailFocused(true)}
                        onChange={handleMailInputChange}

                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setIsMailFocused(false);

                            }
                        }}
                        />
                    </div>
                    <div className='flex flex-col mb-2 mt-5'>
                        <motion.label htmlFor="password" className="block text-gray-700 text-md font-bold mb-2 absolute ml-2"
                                animate={{ y: isPassFocused ? -25 : 0 , x: isPassFocused ? -15 : 0 , scale: isPassFocused ? 0.8 : 1}}
                            >
                            Contraseña
                        </motion.label>
                        <input type="password"  className="border-2 border-black rounded-lg " onFocus={() => setIsPassFocused(true)}
                        onChange={handlePassInputChange}

                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setIsPassFocused(false);
                            }
                        }}
                        />
                    </div>

                    <button type='button' className=" flex items-center justify-center self-center bg-lime-700 text-white  rounded-lg p-2 my-5 w-32 h-12 cursor-pointer" onClick={login}>Iniciar sesión</button>
                    <a href={"/register"} className="flex flex-row justify-center items-center">
                        <p className=' mx-2'>¿No tienes cuenta?</p>
                        <button className=" bg-transparent text-lime-900 rounded-lg p-2 my-2"><b>Regístrate</b></button>
                    </a>
                    <div className="flex flex-col justify-center items-center my-2">
                        <p className=' text-center text-sm' >¿Olvidaste tu contraseña?</p>
                        <button className="bg-transparent text-lime-900 w-44 "><b>Recuperar contraseña</b></button>
                    </div>
                </div>

                <div id='divisor' className=" bg-black w-1 h-[100%]"></div>

                <div className="flex flex-col  w-1/2 h-auto ml-5 mt-24">
                    <h1 className="text-2xl">¡Inicia sesión para crear tus recetas personalizadas y guardar recetas favoritas!</h1>
                </div>
            </form>
        </div>
    );
}