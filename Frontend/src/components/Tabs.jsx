// Filename - Tabs.js

import React, { useState , useEffect } from "react";
import Tab from "./Tab";


const Tabs = ({ tabs , recipe }) => {
	const [activeTab, setActiveTab] = useState(1);

	const handleTabClick = (index) => {
		setActiveTab(index + 1);
        console.log(tabs[0].label)
	};


	return (
		<div className=" w-full flex-grow rounded-br-md h-100% bg-[#f88594]">
			<div className=" flex bg-orange-200">
				{tabs.map((tab, index) => (
					<Tab
						key={index}
						label={tab.label}
						onClick={() =>
							handleTabClick(index)
						}
						isActive={index === activeTab}
					/>
				))}
			</div>
			<div className=" p-3 rounded-br-md whitespace-normal text-2xl">
				Tab {activeTab} is Active { activeTab === 1 ?  <p>
                    Ingredientes
                </p> : <p> {recipe.steps} </p>}
			</div>
		</div>
	);
};

export default Tabs;
