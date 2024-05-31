// Filename - Tab.js

import React, { useState } from "react";

const Tab = ({ label, onClick, isActive }) => (
	<div
		className={`tab ${isActive ? "active" : ""} bg-red-300  cursor-pointer p-3 mr-2 border-b-2 border-transparent hover:border-gray-400`}
		onClick={onClick}
	>
		<p>{label}</p>
	</div>
);

export default Tab;
