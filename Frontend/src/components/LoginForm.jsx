import { useState } from 'react';
import { motion } from 'framer-motion';


export default function LoginForm() {

    const [isMailFocused, setIsMailFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);


    const handleMailInputChange = (event) => {
        setIsMailFocused(event.target.value !== '');
    };

    const handlePassInputChange = (event) => {
        setIsPassFocused(event.target.value !== '');
    };


    return (
        <div className="flex justify-center w-screen h-auto 2xl:mt-44 lg:mt-10">
            <form className=" flex flex-row justify-center shadow-md bg-red-200 w-1/2 h-96 rounded-md p-8 ">
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

                    <button className=" self-center bg-lime-700 text-white rounded-lg p-2 my-5 w-32 h-12">Iniciar sesión</button>
                    <div className="flex flex-row justify-center items-center">
                        <p className=' mx-2'>¿No tienes cuenta?</p>
                        <button className=" bg-transparent text-lime-900 rounded-lg p-2 my-2"><b>Regístrate</b></button>
                    </div>
                    <div className="flex flex-col justify-center items-center my-2">
                        <p className=' text-center text-sm' >¿Olvidaste tu contraseña?</p>
                        <button className="bg-transparent text-lime-900 w-44 "><b>Recuperar contraseña</b></button>
                    </div>
                </div>

                <div id='divisor' className=" bg-black w-1 h-[100%]"></div>

                <div className="flex flex-col  w-1/2 h-auto ml-5">
                    <h1 className="text-2xl">Este es el placeholder del lopgin</h1>
                </div>
            </form>
        </div>
    );
}