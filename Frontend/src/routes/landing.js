//import './Landing.css';
import { useState } from 'react';
import Navbar from "./../components/Navbar";
import CuadroInicio from "./../components/CuadroInicio";
import Librov4 from "./../components/Librov4";
import { Canvas } from "@react-three/fiber";
import '@fontsource/italiana';
import { useNavigate } from 'react-router-dom';


function Landing() {
	const [showCuadroInicio, setShowCuadroInicio] = useState(true);
    const navigate = useNavigate();


    const hideCuadroInicio = () => {
        const cuadroInicio = document.getElementById('CuadroTitulo');
        const divLibro = document.getElementById('divLibro');

        if (cuadroInicio && divLibro) {
        cuadroInicio.style.transition = 'all 1s ease-out';
        cuadroInicio.style.transform = 'translateX(-100%)';
        cuadroInicio.style.opacity = '0';

        divLibro.style.transition = 'all 1s ease-out';
        divLibro.style.transform = 'translateX(-20%)';

        setTimeout(() => {
            divLibro.style.scale = '2.7';
        }, 500);

        setTimeout(() => {
            divLibro.style.scale = '15';
        }, 1000);

        setTimeout(() => {
            setShowCuadroInicio(false);
            const mainElement = document.getElementById('main');
            if (mainElement) {
            mainElement.style.backgroundColor = '#C3B9AB';
            }
            divLibro.style.display = 'none';
            navigate('/recipesHome');
        }, 2000);
        }
    }

	return (
		<div id='main' className=" h-dvh bg-[#FCF8E8] ">
			<Navbar />
			<div id='ContenedorMain' className=" flex flex-row justify-evenly items-center mt-7">
				{showCuadroInicio && <CuadroInicio />}
				<div id='divLibro' className='lg:h-[45rem] lg:w-[45rem] sm:h-[25rem] sm:w-[20rem] '>
					<Canvas className=" bg-[#FCF8E8]" camera={{ fov: 20, position: [0, 200, 100] }}>
					<ambientLight intensity={2} />
					<Librov4  hideCuadroInicio={hideCuadroInicio} />
					</Canvas>
				</div>
			</div>
		</div>
	);
}

export default Landing;
