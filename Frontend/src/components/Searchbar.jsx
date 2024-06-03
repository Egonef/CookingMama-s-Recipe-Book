import { motion } from "framer-motion"
import { set } from "mongoose";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Searchbar () {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [readyToSelect, setReadyToSelect] = useState(false);

    const handleSearch = () => {
        if (searchTerm.trim()) {
          navigate(`/search?ingredients=${searchTerm}`);
        }
      };

      const handleSelectChange = (event) => {
        const selected = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(selected);
        console.log(selected);
    };

      const fetchOptions = async () => {
        setReadyToSelect(true);
      };

    return (
      <div className="flex flex-row ">
        <motion.div whileHover={{ scale: 1.07 }} className="flex flex-row justify-left items-center bg-orange-100 h-10 w-96 my-4 px-3 rounded-full">
            <motion.input 
                className="bg-transparent outline-none h-19 w-96 rounded-full" 
                type="text"
                placeholder="Pollo,Tomate,Queso,etc..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
            />
            <motion.button className="bg-transparent h-8 w-8 rounded-full ml-2" onClick={handleSearch}>
                <img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png" alt="buscar"/>
            </motion.button>
        </motion.div>
        <select multiple={true} value={selectedOptions} onClick={fetchOptions} onChange={handleSelectChange} className=" mx-5">
          {readyToSelect === true ? <option value="option1">Option 1</option> : null}
          {readyToSelect === true ? <option value="option2">Option 2</option> : null}
          {readyToSelect === true ? <option value="option3">Option 3</option> : null}
          
        </select>
      </div>
    );
}
