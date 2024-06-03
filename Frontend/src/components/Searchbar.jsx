import { motion } from "framer-motion"
import React, { useState , useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Searchbar () {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState("");
    const [readyToSelect, setReadyToSelect] = useState(false);

    useEffect(() => {
      console.log("Selected definitivo: " + selectedOptions);
    }, [selectedOptions]);
    
    const handleSearch = () => {
        if (searchTerm.trim() && selectedOptions) {
          navigate(`/search?ingredients=${searchTerm}&maxReadyTime=${selectedOptions}`);
        }
      };

      const handleSelectChange = (event) => {
        const selected = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedOptions(selected[0]);
        console.log("Selected: " + selected[0]);
    };

    return (
      <div className="flex flex-row items-center">
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
        <select multiple={true} value={selectedOptions} onClick={() => setReadyToSelect(true)} onChange={handleSelectChange} className={` mx-5 bg-slate-700 w-auto ${readyToSelect === true ? "h-24" : "h-8"} rounded-2xl text-slate-200`}>
          <option className=" text-slate-200" value="" disabled selected>Selecciona tiempo</option>
          {readyToSelect === true ? <option value="15">15</option> : null}
          {readyToSelect === true ? <option value="30">30</option> : null}
          {readyToSelect === true ? <option value="60">60</option> : null}
          
        </select>
      </div>
    );
}
