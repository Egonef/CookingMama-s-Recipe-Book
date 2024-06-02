import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate y useLocation
import '@fontsource/italiana';
import ProfileTabs from "../components/ProfileTabs";


export default function Profile() {
    const navigate = useNavigate(); // Accede al objeto navigate
    const location = useLocation(); // Accede al objeto location

    const handleBackClick = () => {
        navigate(-1); // Navega hacia atrás en el historial
    };

    return (
        <div className="bg-[#C3B9AB] h-screen">
            <div className="animate-fade-in ">
                <div className=" h-[90vh]">
                    <ProfileTabs tabs={[ { label:"Recetas Guardadas"}, { label:"Recetas Creadas"}]} rounded={true} />
                </div>
            </div>
        </div>
    );
}