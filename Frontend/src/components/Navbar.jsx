// Objetivo: Crear el componente de la barra de navegación.
import '@fontsource/italiana';
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className=" flex justify-end w-full h-24">
            <div className=" flex flex-row mr-20 my-8 font-[italiana] font-medium text-2xl text text-[#2D3931] ">
                <Link to={'/'} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Home</h1>
                </Link>
                <a href="/" className="mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Contact</h1>
                </a>
                <Link to={'/test2'} className="mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Log In</h1>
                </Link>
                <a href="/" className="mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574]">
                    <h1>Sign Up</h1>
                </a>
            </div>
        </nav>
    )
}