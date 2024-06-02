// Filename - Tabs.js

import React, { useState , useEffect } from "react";
import Tab from "./Tab";
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Importa useNavigate y useLocation
import '@fontsource/italiana';
import SavedRecipes from "./SavedRecipes";
import CreatedRecipes from "./CreatedRecipes";
import axios from 'axios';
import Navbar from "./Navbar";

const ProfileTabs = ({ tabs , rounded }) => {

	const navigate = useNavigate(); // Accede al objeto navigate
    const location = useLocation(); // Accede al objeto location

    const handleBackClick = () => {
        navigate(-1); // Navega hacia atrás en el historial
    };


	const [activeTab, setActiveTab] = useState(1);

	const handleTabClick = (index) => {
		setActiveTab(index + 1);
        console.log(tabs[0].label)
	};


	return (
		<div className=" flex flex-row rounded-br-md  h-screen bg-[#f88594]">
			<div className=" flex-col bg-orange-200">
				<div className=" flex flex-row mr-20 py-9 font-[italiana] font-medium text-2xl text text-[#2D3931] ">
                    <Link to={location.pathname} onClick={handleBackClick} className=" mx-5 relative inline cursor-pointer font-medium before:bg-[#6B8574] before:absolute before:-bottom-1 before:block before:h-[5px] before:w-full before:origin-bottom-right before:scale-x-0 before:transition before:duration-500 before:ease-in-out hover:before:origin-bottom-left hover:before:scale-x-100 hover:text-[#6B8574] h-1/6"
                    >
                        <h1>Volver</h1>
                    </Link>
                </div>
				{tabs.map((tab, index) => (
					<Tab
						key={index}
						label={tab.label}
						onClick={() =>
							handleTabClick(index)
						}
						isActive={index === activeTab}
						rounded={rounded}
					/>
				))}
			</div>
			<div className=" p-3 rounded-br-md whitespace-normal text-2xl overflow-auto">
				{ activeTab === 1 ? <SavedRecipes />  : <CreatedRecipes />}
			</div>
		</div>
	);
};

export default ProfileTabs;
