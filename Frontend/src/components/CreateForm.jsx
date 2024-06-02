import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import axios from 'axios';



export default function LoginForm() {


    //Estados de los inputs
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isCuisineFocused, setIsCuisineFocused] = useState(false);
    const [isIngredientsFocused, setIsIngredientsFocused] = useState(false);
    const [isStepsFocused, setIsStepsFocused] = useState(false);
    const [isImageFocused, setIsImageFocused] = useState(false);
    const [isMaxReadyTimeFocused, setIsMaxReadyTimeFocused] = useState(false);
    const [isIntolerancesFocused, setIsIntolerancesFocused] = useState(false);

    const handleMailInputChange = (event) => {
        setIsTitleFocused(event.target.value !== '');
        setEmail(event.target.value);
    };

    const handlePassInputChange = (event) => {
        setIsCuisineFocused(event.target.value !== '');
        setPassword(event.target.value);
    };

    const handleNameInputChange = (event) => {
        setIsIngredientsFocused(event.target.value !== '');
        setFirstName(event.target.value);
        console.log(firstName);
    }

    const handleLastNameInputChange = (event) => {
        setIsStepsFocused(event.target.value !== '');
        setSecondName(event.target.value);
    }

    const handleUserNameChange = (event) => {
        setIsImageFocused(event.target.value !== '');
        setUserName(event.target.value);
    }

    const handleMaxReadyTimeChange = (event) => {
        setIsMaxReadyTimeFocused(event.target.value !== '');
        setUserName(event.target.value);
    }

    const handleIntolerancesChange = (event) => {
        setIsIntolerancesFocused(event.target.value !== '');
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
                            Título
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
                            Cocina
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
                            Tiempo de preparación
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
                    <div className='mb-2 relative mt-10'>
                    <div className='flex flex-col'>
                        <motion.label htmlFor="ingredient" className="block text-gray-700 text-lg font-bold mt-1 absolute ml-2"
                            animate={{ y: isMailFocused ? -30 : 0 , x: isMailFocused ? -15 : 0 , scale: isMailFocused ? 0.8 : 1}}
                        >
                        Ingrediente
                        </motion.label>
                        <input type="text" id="ingredient" className="border-2 border-black rounded-lg h-10" onFocus={() => setIsMailFocused(true)}
                            onChange={handleMailInputChange}
                            onBlur={(event) => {
                                if (event.target.value === '') {
                                    setIsMailFocused(false);
                                }
                            }}
                        />
                    </div>
                    {ingredient && (
                        <div className='flex flex-col'>
                        <motion.label htmlFor="quantity" className="block text-gray-700 text-lg font-bold mt-1 absolute ml-2"
                            animate={{ y: isMailFocused ? -30 : 0 , x: isMailFocused ? -15 : 0 , scale: isMailFocused ? 0.8 : 1}}
                        >
                            Cantidad
                        </motion.label>
                        <input type="text" id="quantity" className="border-2 border-black rounded-lg h-10" onChange={handleQuantityInputChange} />
                        </div>
                    )}
                    {quantity && (
                        <div className='flex flex-col'>
                        <motion.label htmlFor="unit" className="block text-gray-700 text-lg font-bold mt-1 absolute ml-2"
                            animate={{ y: isMailFocused ? -30 : 0 , x: isMailFocused ? -15 : 0 , scale: isMailFocused ? 0.8 : 1}}
                        >
                            Unidad
                        </motion.label>
                        <input type="text" id="unit" className="border-2 border-black rounded-lg h-10" onChange={handleUnitInputChange} />
                        </div>
                    )}
                    </div>
                    <div className='mb-2 relative mt-10'>
                        <div className='flex flex-col'>
                            <motion.label htmlFor="password" className="block text-gray-700 text-lg font-bold mt-1 absolute ml-2"
                                animate={{ y: isPassFocused ? -30 : 0 , x: isPassFocused ? -15 : 0 , scale: isPassFocused ? 0.8 : 1}}
                            >
                            Pasos
                            </motion.label>
                            <input type="password" id="password" className="border-2 border-black rounded-lg h-16" onFocus={() => setIsPassFocused(true)}
                                onChange={handlePassInputChange}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setIsPassFocused(false);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className='flex flex-col mb-2 relative mt-10'>
                        <motion.label htmlFor="password" className="block text-gray-700 text-lg font-bold mt-1 absolute ml-2"
                                animate={{ y: isPassFocused ? -30 : 0 , x: isPassFocused ? -15 : 0 , scale: isPassFocused ? 0.8 : 1}}
                        >
                            Intolerancias
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
                    <div className='flex flex-col mb-2 relative mt-10'>
                        <motion.label htmlFor="password" className="block text-gray-700 text-lg font-bold mt-1 absolute ml-2"
                                animate={{ y: isPassFocused ? -30 : 0 , x: isPassFocused ? -15 : 0 , scale: isPassFocused ? 0.8 : 1}}
                        >
                            Imagen
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
                        <button className=" bg-transparent text-lime-900 rounded-lg p-2 my-2" ><b>Crear receta</b></button>
                    </Link>

                </div>
            </form>
        </div>
    );
}