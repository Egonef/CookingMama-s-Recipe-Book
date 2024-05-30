import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import axios from 'axios';



export default function LoginForm() {


    //Estados de los inputs
    const [isMailFocused, setIsMailFocused] = useState(false);
    const [isPassFocused, setIsPassFocused] = useState(false);
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isLastNameFocused, setIsLastNameFocused] = useState(false);
    const [isUserNameFocused, setIsUserNameFocused] = useState(false);

    const handleMailInputChange = (event) => {
        setIsMailFocused(event.target.value !== '');
        setEmail(event.target.value);
    };

    const handlePassInputChange = (event) => {
        setIsPassFocused(event.target.value !== '');
        setPassword(event.target.value);
    };

    const handleNameInputChange = (event) => {
        setIsNameFocused(event.target.value !== '');
        setFirstName(event.target.value);
        console.log(firstName);
    }

    const handleLastNameInputChange = (event) => {
        setIsLastNameFocused(event.target.value !== '');
        setSecondName(event.target.value);
    }

    const handleUserNameChange = (event) => {
        setIsUserNameFocused(event.target.value !== '');
        setUserName(event.target.value);
    }

    //Estados de los campos del registro
    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        console.log('register function called');
        try {
            console.log('sending post request');
            const response = await axios.post('http://localhost:5000/api/users/register', {
                firstName,
                secondName,
                userName,
                email,
                password
            }, {
                timeout: 500000
            });
            console.log('post request completed', response);
        } catch (error) {
            console.error('error occurred', error);
        }
    }


    return (
        <div className="flex justify-center w-screen h-auto 2xl:mt-24 lg:mt-10">
            <form className=" flex flex-row justify-center shadow-md bg-red-200 w-1/3 h-[40rem] rounded-md p-8">
                <div className="flex flex-col justify-around w-full h-auto mr-5">
                    <div className='flex flex-col mb-2 relative mt-10'>
                        <motion.label htmlFor="text" className="block text-gray-700 text-lg font-bold mt-1 absolute ml-2"
                            animate={{ y: isNameFocused ? -30 : 0 , x: isNameFocused ? -15 : 0 , scale: isNameFocused ? 0.8 : 1}}
                        >
                            Nombre
                        </motion.label>
                        <input type="text"  className="border-2 border-black rounded-lg h-10" onFocus={() => setIsNameFocused(true)}
                        onChange={handleNameInputChange}

                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setIsNameFocused(false);
                            }
                        }}
                        />
                    </div>
                    <div className='flex flex-col mb-2 relative mt-10'>
                        <motion.label htmlFor="text" className="block text-gray-700 text-lg font-bold mt-1 absolute ml-2"
                            animate={{ y: isLastNameFocused ? -30 : 0 , x: isLastNameFocused ? -15 : 0 , scale: isLastNameFocused ? 0.8 : 1}}
                        >
                            Primer Apellido
                        </motion.label>
                        <input type="text"  className="border-2 border-black rounded-lg h-10" onFocus={() => setIsLastNameFocused(true)}
                        onChange={handleLastNameInputChange}

                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setIsLastNameFocused(false);
                            }
                        }}
                        />
                    </div>
                    <div className='flex flex-col mb-2 relative mt-10'>
                        <motion.label htmlFor="text" className="block text-gray-700 text-lg font-bold mt-1 absolute ml-2"
                            animate={{ y: isUserNameFocused ? -30 : 0 , x: isUserNameFocused ? -15 : 0 , scale: isUserNameFocused ? 0.8 : 1}}
                        >
                            Nombre de Usuario
                        </motion.label>
                        <input type="text"  className="border-2 border-black rounded-lg h-10" onFocus={() => setIsUserNameFocused(true)}
                        onChange={handleUserNameChange}

                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setIsUserNameFocused(false);
                            }
                        }}
                        />
                    </div>
                    <div className='flex flex-col mb-2 relative mt-10'>
                        <motion.label htmlFor="email" className="block text-gray-700 text-lg font-bold mt-1 absolute ml-2"
                            animate={{ y: isMailFocused ? -30 : 0 , x: isMailFocused ? -15 : 0 , scale: isMailFocused ? 0.8 : 1}}
                        >
                            Correo Electrónico
                        </motion.label>
                        <input type="text"  className="border-2 border-black rounded-lg h-10" onFocus={() => setIsMailFocused(true)}
                        onChange={handleMailInputChange}

                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setIsMailFocused(false);
                            }
                        }}
                        />
                    </div>
                    <div className='flex flex-col mb-2 relative mt-10'>
                        <motion.label htmlFor="password" className="block text-gray-700 text-lg font-bold mt-1 absolute ml-2"
                                animate={{ y: isPassFocused ? -30 : 0 , x: isPassFocused ? -15 : 0 , scale: isPassFocused ? 0.8 : 1}}
                        >
                            Contraseña
                        </motion.label>
                        <input type="password"  className="border-2 border-black rounded-lg h-10" onFocus={() => setIsPassFocused(true)}
                        onChange={handlePassInputChange}
                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setIsPassFocused(false);
                            }
                        }}
                        />
                    </div>
                    <button type='button' className=" self-center bg-lime-700 text-white rounded-lg p-2 my-5 w-32 h-12" onClick={register}>Registrar</button>
                    <Link to={"/login"} className="flex flex-row justify-center items-center">
                        <p className=' mx-2'>¿Ya tienes cuenta?</p>
                        <button className=" bg-transparent text-lime-900 rounded-lg p-2 my-2" ><b>Inicia Sesión</b></button>
                    </Link>

                </div>
            </form>
        </div>
    );
}